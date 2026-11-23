"""Screenshot and usability checks for v5 with Chromium; no payment requests are performed."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'previews'/'v5'
OUT.mkdir(parents=True,exist_ok=True)
# Navigation to loopback and file:// is restricted in this sandbox; render the actual app in an isolated document.
FAKE='''(()=>{let memory={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v,removeItem:k=>delete memory[k]}});window.confirm=()=>true;})();'''

def mount(page):
 page.set_content('<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body><div id="app"></div><div id="toast-root"></div></body></html>')
 for f in ['styles.css','premium.css','gallery.css','native.css']:
  page.add_style_tag(content=(ROOT/f).read_text().split('\n',1)[1] if f=='styles.css' else (ROOT/f).read_text())
 page.add_script_tag(content=FAKE)
 page.add_script_tag(content=(ROOT/'app.js').read_text())
 page.evaluate("goto('yookassa')")

with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  errors=[]
  desktop=browser.new_context(viewport={'width':1440,'height':1000}, device_scale_factor=1)
  page=desktop.new_page();page.on('pageerror',lambda err:errors.append(str(err)))
  mount(page);page.wait_for_timeout(300)
  assert page.locator('h1').inner_text()=='ЮKassa',page.locator('h1').inner_text()
  assert page.get_by_text('Платежи под контролем').is_visible()
  page.screenshot(path=str(OUT/'01-desktop-yookassa.png'),full_page=True)
  page.get_by_role('button',name='Подключить оператора').click()
  assert page.locator('#yoo-connect-form').is_visible()
  assert page.locator('#yoo-connect-form input[type=password]').count()==1
  page.screenshot(path=str(OUT/'02-desktop-connect.png'),full_page=True)
  page.locator('[data-action="close-modal"]').last.click()
  page.locator('[data-nav="finance"]').first.click()
  assert page.locator('h1').inner_text().startswith('Финансы')
  page.screenshot(path=str(OUT/'03-desktop-finance.png'),full_page=True)
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1')
  mobile=browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
  m=mobile.new_page();m.on('pageerror',lambda err:errors.append(str(err)))
  mount(m);m.wait_for_timeout(300)
  assert m.locator('h1').inner_text()=='ЮKassa'
  m.screenshot(path=str(OUT/'04-mobile-yookassa.png'),full_page=False)
  print('mobile scroll width',m.evaluate('({scroll:document.documentElement.scrollWidth,width:window.innerWidth})'))
  assert m.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1')
  m.locator('.mobile-bottom [data-action="toggle-menu"]').click()
  assert m.locator('.sidebar.is-open').is_visible()
  assert m.locator('.sidebar.is-open [data-nav="yookassa"]').is_visible()
  m.screenshot(path=str(OUT/'05-mobile-navigation.png'),full_page=False)
  m.locator('.sidebar.is-open [data-nav="bookings"]').click()
  assert m.locator('h1').inner_text()=='Бронирования'
  m.screenshot(path=str(OUT/'06-mobile-bookings.png'),full_page=False)
  assert m.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1')
  m.locator('.mobile-bottom [data-nav="rooms"]').click()
  assert m.locator('h1').inner_text()=='Коллекция апартаментов'
  m.screenshot(path=str(OUT/'07-mobile-rooms.png'),full_page=False)
  m.evaluate("goto('yookassa')")
  m.get_by_role('button',name='Подключить оператора').click()
  assert m.locator('#yoo-connect-form').is_visible()
  m.screenshot(path=str(OUT/'08-mobile-connect-sheet.png'),full_page=False)
  for width in [320,375,390,768,1024]:
    testctx=browser.new_context(viewport={'width':width,'height':800},device_scale_factor=1,is_mobile=width<768,has_touch=width<768)
    testpage=testctx.new_page(); testpage.on('pageerror',lambda err:errors.append(str(err)))
    mount(testpage)
    for key in ['overview','bookings','calendar','rooms','rates','operations','guests','finance','yookassa','reports','messages','reviews','activity','settings']:
      testpage.evaluate('goto(arguments[0])' if False else f"goto('{key}')")
      scroll=testpage.evaluate('document.documentElement.scrollWidth')
      if scroll>width+1: print('Overflow on',width,key,scroll, testpage.evaluate('Array.from(document.querySelectorAll("*")).filter(e=>e.getBoundingClientRect().right>window.innerWidth+1&&e.offsetWidth>0).slice(0,15).map(e=>({tag:e.tagName,cls:e.className?.baseVal||e.className,txt:e.innerText?.slice(0,35),w:e.offsetWidth,right:Math.round(e.getBoundingClientRect().right)}))'))
      assert scroll<=width+1,(width,key,scroll)
    testctx.close()
  print('14 sections tested at widths 320, 375, 390, 768, 1024')
  print('browser runtime errors:',errors)
  assert not errors,errors
  browser.close()
  print('PASS screenshots in',OUT)