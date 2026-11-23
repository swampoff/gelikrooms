from playwright.sync_api import sync_playwright
from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
import json
R=Path(__file__).parents[1];OUT=R/'previews'/'v4';OUT.mkdir(exist_ok=True,parents=True)
IMG=R/'tests'/'sample-images';IMG.mkdir(exist_ok=True,parents=True)

def sample(i):
    W,H=1240,780
    tone=[('#d8ddd7','#a2ccd7','#74a4af','#ddd4bb'),('#e7e0d4','#b2c9c3','#6b9eaa','#d4b7a1'),('#dbe0df','#aac7d5','#88a99d','#cfbf9a')][i]
    im=Image.new('RGB',(W,H),tone[0]);d=ImageDraw.Draw(im)
    d.rectangle((155,20,1110,520),fill='#f6f5e8');d.rectangle((172,28,1095,500),fill=tone[1]);d.ellipse((630,90,835,295),fill='#e8dbb7')
    d.polygon([(172,350),(395,285),(605,340),(825,285),(1095,340),(1095,500),(172,500)],fill=tone[2]);d.polygon([(172,408),(540,380),(755,409),(1095,365),(1095,500),(172,500)],fill='#d1e4df')
    for x in [172,640,1095]:d.rectangle((x,27,x+16,500),fill='#fff9ed')
    d.rectangle((0,515,W,H),fill='#dfcdb4')
    d.rounded_rectangle((100,484,720,678),radius=31,fill=tone[3],outline='#c2ac92',width=5)
    d.rounded_rectangle((120,430,391,561),radius=23,fill='#f1ede5');d.rounded_rectangle((402,430,690,561),radius=23,fill='#e9e2d7')
    d.rounded_rectangle((95,580,724,678),radius=25,fill='#b0a390')
    d.rounded_rectangle((750,585,1060,650),radius=9,fill='#c4ad94');d.polygon([(738,640),(1070,640),(1110,676),(700,676)],fill='#9d8872')
    d.ellipse((1110,350,1220,563),fill='#7c9b7f');d.ellipse((1070,400,1180,550),fill='#799a84');d.rectangle((1120,535,1168,660),fill='#aa8b75')
    p=IMG/f'demo-apartment-{i+1}.jpg';im.save(p,quality=87);return p
files=[sample(i) for i in range(3)]
# The environment prohibits navigations to loopback and file URLs, so use a document harness.
# Screenshots are actual Chromium renderings of the app, with an in-memory IndexedDB adapter.
# This harness is for UI coverage and does not verify native browser IndexedDB persistence.
FAKE=r'''(()=>{
 let memory={}; Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v,removeItem:k=>delete memory[k]}});
 window.confirm=()=>true;
 let store=new Map();const dbi={objectStoreNames:{contains:n=>n==='photos'},createObjectStore:n=>({}),transaction:(storeName,mode)=>{
  const tx={oncomplete:null,onerror:null,onabort:null};let pending=0;
  const schedule=(fn)=>{pending++;setTimeout(()=>{fn();pending--;if(pending===0)setTimeout(()=>tx.oncomplete?.(),1);},3);};
  tx.objectStore=()=>({
   put:item=>{schedule(()=>store.set(item.id,item));return {};},
   delete:id=>{schedule(()=>store.delete(id));return {};},
   clear:()=>{schedule(()=>store.clear());return {};},
   get:id=>{const req={};schedule(()=>{req.result=store.get(id);req.onsuccess?.()});return req;}
  });return tx;
 }};
 Object.defineProperty(window,'indexedDB',{configurable:true,value:{open:()=>{const req={};setTimeout(()=>{req.result=dbi;req.onupgradeneeded?.();req.onsuccess?.()},3);return req}}});
 })();'''

def build(p,browser,width,height,mobile=False):
    ctx=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,is_mobile=mobile,has_touch=mobile,accept_downloads=True)
    page=ctx.new_page()
    errs=[];page.on('pageerror',lambda e:errs.append(str(e)))
    page.set_content('<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/></head><body><div id="app"></div><div id="toast-root"></div></body></html>')
    page.add_style_tag(content=(R/'styles.css').read_text().split('\n',1)[1]);page.add_style_tag(content=(R/'premium.css').read_text());page.add_style_tag(content=(R/'gallery.css').read_text())
    page.add_script_tag(content=FAKE);page.add_script_tag(content=(R/'app.js').read_text())
    page.evaluate("goto('rooms')")
    page.locator('.room-card').first.wait_for()
    return ctx,page,errs

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    ctx,page,errs=build(p,browser,1440,940)
    page.screenshot(path=str(OUT/'01-desktop-apartments-empty.png'),full_page=True)
    page.locator('[data-action="manage-photos"]').first.click()
    page.locator('.gallery-modal').wait_for()
    page.screenshot(path=str(OUT/'02-desktop-upload-empty.png'),full_page=False)
    page.locator('#gallery-upload').set_input_files([str(f) for f in files]);page.wait_for_function('document.querySelectorAll(".gallery-tile").length===3',timeout=20000)
    page.locator('.gallery-modal').screenshot(path=str(OUT/'03-desktop-gallery-filled.png'))
    assert page.locator('.gallery-tile.is-cover').count()==1
    # Caption editing and same-position photo replacement
    page.locator('[data-action="edit-photo-caption"]').first.click()
    page.locator('#photo-caption-form input[name="caption"]').fill('Гостиная и панорамный вид')
    page.locator('#photo-caption-form button[type="submit"]').click()
    assert 'Гостиная и панорамный вид' in page.locator('.gallery-tile').first.inner_text()
    orig_id=page.locator('.gallery-tile').first.get_attribute('data-photo-item')
    page.locator('[data-replace-photo]').first.set_input_files(str(files[2]))
    page.wait_for_function('document.querySelectorAll(".gallery-tile").length===3')
    assert page.locator('.gallery-tile').first.get_attribute('data-photo-item')==orig_id
    second=page.locator('.gallery-tile').nth(1).get_attribute('data-photo-item')
    page.locator('[data-action="cover-photo"]').nth(1).click()
    assert page.locator('.gallery-tile.is-cover').get_attribute('data-photo-item')==second
    page.locator('[data-action="move-photo"][data-direction="-1"]').nth(1).click()
    assert page.locator('.gallery-tile').first.get_attribute('data-photo-item')==second
    page.locator('[data-action="view-photo"]').first.click()
    page.locator('.photo-lightbox img').wait_for()
    page.screenshot(path=str(OUT/'04-desktop-lightbox.png'))
    page.locator('.photo-lightbox-bar button').click()
    page.locator('[data-action="delete-photo"]').last.click()
    page.wait_for_function('document.querySelectorAll(".gallery-tile").length===2')
    page.locator('.gallery-modal').screenshot(path=str(OUT/'05-desktop-deleted.png'))
    page.evaluate('clearPhotoUrls();db=load();render();hydratePhotos()')
    page.wait_for_function('document.querySelectorAll(".gallery-tile img").length===2',timeout=7000)

    page.locator('.gallery-modal-footer [data-action="close-modal"]').click()
    page.screenshot(path=str(OUT/'06-desktop-apartments-with-photo.png'),full_page=True)
    # Backup includes all surviving photo IDs
    page.evaluate("goto('settings')")
    with page.expect_download(timeout=10000) as download:
        page.locator('[data-action="backup-export"]').click()
    backup=OUT/'sample-gallery-backup.json';download.value.save_as(backup)
    data=json.loads(backup.read_text());assert data['schema']=='gelikrooms.demo.v4';assert len(data['photos'])==2
    # Validate replacement metadata and full reset/import cycle.
    assert any(x.get('caption')=='Гостиная и панорамный вид' for x in data['data']['rooms'][0]['photos'])
    page.locator('[data-action="reset-demo"]').click()
    page.evaluate("goto('settings')")
    page.locator('#backup-import').set_input_files(str(backup))
    page.wait_for_timeout(1300)
    print("IMPORT DEBUG",page.locator("#toast-root").inner_text(),page.evaluate('JSON.parse(localStorage.getItem("gelikrooms-premium-admin-demo-v1")).rooms[0].photos?.length'))
    page.wait_for_function('(JSON.parse(localStorage.getItem("gelikrooms-premium-admin-demo-v1")).rooms[0].photos||[]).length===2',timeout=11000)
    page.evaluate("goto('rooms')")
    page.wait_for_function('document.querySelector(".room-card .uploaded-room-photo")!==null',timeout=15000)
    page.locator('[data-action="manage-photos"]').first.click()
    assert page.locator('.gallery-tile').count()==2
    assert 'Гостиная и панорамный вид' in page.locator('.gallery-modal').inner_text()
    page.locator('.gallery-modal-footer [data-action="close-modal"]').click()

    assert not errs,errs
    ctx.close()

    ctx,m,errs=build(p,browser,390,844,mobile=True)
    m.screenshot(path=str(OUT/'07-mobile-apartments-empty.png'),full_page=True)
    m.locator('[data-action="manage-photos"]').first.click()
    m.locator('#gallery-upload').set_input_files([str(f) for f in files]);m.wait_for_function('document.querySelectorAll(".gallery-tile").length===3',timeout=20000)
    m.evaluate("document.getElementById('toast-root').innerHTML=''")
    m.screenshot(path=str(OUT/'08-mobile-gallery-filled.png'),full_page=False)
    m.locator('[data-action="view-photo"]').first.click();m.locator('.photo-lightbox img').wait_for();m.screenshot(path=str(OUT/'09-mobile-lightbox.png'))
    assert m.evaluate('document.documentElement.scrollWidth <= window.innerWidth+2'),(m.evaluate('document.documentElement.scrollWidth'),m.evaluate('window.innerWidth'))
    assert not errs,errs
    ctx.close();browser.close()
print('PASS: chromium UI upload, cover, reorder, gallery preview, deletion, photo backup export, responsive mobile')
print(*[x.name for x in sorted(OUT.glob('*.png'))],sep='\n')