/* Run with `node tests/smoke.cjs`. No npm packages required. */
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const elements = {
  app: { innerHTML: '' },
  'toast-root': { innerHTML: '' },
  'form-error': { textContent: '' },
};
const listeners = {};
const values = new Map();
const context = vm.createContext({
  document: {
    title: '',
    getElementById(id) {return elements[id] ||= {textContent: '',innerHTML:''};},
    querySelector(){return null;},
    addEventListener(type,cb){listeners[type]=cb;},
  },
  window: {scrollTo(){},addEventListener(){},clearTimeout(){}},
  location: {hash: ''},
  localStorage: {getItem(key){return values.get(key)||null;},setItem(key,v){values.set(key,v);}},
  FormData: class {constructor(form){this.data=form.data;}entries(){return Object.entries(this.data);}},
  requestAnimationFrame(){},
  confirm(){return true;},
  setTimeout(){return 1;},
  clearTimeout(){},
  console,
  Blob, URL,
});
vm.runInContext(source,context,{filename:'app.js'});
const evalJS = code => vm.runInContext(code,context);
const form = (data,checkboxes={}) => ({data,elements:Object.fromEntries(Object.entries(checkboxes).map(([key,value])=>[key,{checked:value}]))});
const err=()=>elements['form-error'].textContent;
const clearErr=()=>{elements['form-error'].textContent='';};
const count = expr=>evalJS(expr);
assert.match(elements.app.innerHTML,/GELIKROOMS/);
for(const [tab,title] of Object.entries({overview:'Добро пожаловать',bookings:'Бронирования',calendar:'Календарь занятости',rooms:'Коллекция апартаментов',operations:'Подготовка и обслуживание',guests:'Ваши гости',finance:'Финансы',rates:'Тарифы и сезонность',reports:'Аналитика бизнеса',activity:'Журнал действий',messages:'Сообщения',reviews:'Отзывы гостей',settings:'Настройки'})){
  evalJS(`goto('${tab}')`);
  assert.ok(elements.app.innerHTML.includes(title), `Missing ${tab}: ${title}`);
}
// Add a housekeeping task, update status, preserve HTML escaping.
const n=count('db.tasks.length');
context.__form=form({id:'',roomId:'briz',date:'2026-12-20',assignee:'Тест',status:'todo',note:'Проверить <окна>'});
evalJS('saveTask(__form)');
assert.equal(count('db.tasks.length'),n+1);
evalJS("goto('operations')");
assert.ok(elements.app.innerHTML.includes('&lt;окна&gt;'));
const taskId=evalJS('db.tasks[0].id');
evalJS("db.tasks[0].status='done';save();render()");
assert.equal(count('db.tasks[0].status'),'done');
// Add apartment from room form.
const roomCount=count('db.rooms.length');
context.__form=form({id:'',name:'Тестовая студия',kind:'Демо',price:'4800',size:'39',capacity:'2',features:'Wi-Fi,Балкон'}, {active:true});
evalJS('saveRoom(__form)');
assert.equal(count('db.rooms.length'),roomCount+1);
// Cannot block dates that are already booked.
const roomId='briz';
const existing=count('db.bookings.find(b=>b.roomId==="briz" && b.status==="checked_in")');
let blocks=count('db.blocks.length');
context.__form=form({id:'',roomId,start:existing.start,end:existing.end,reason:'Ремонт'});
clearErr();evalJS('saveBlock(__form)');
assert.match(err(),/уже есть бронирование/);
assert.equal(count('db.blocks.length'),blocks);
// A free period can be closed.
const periodStart=evalJS('day(28)');
const periodEnd=evalJS('day(30)');
context.__form=form({id:'',roomId,start:periodStart,end:periodEnd,reason:'Проверка сантехники'});
clearErr();evalJS('saveBlock(__form)');
assert.equal(count('db.blocks.length'),blocks+1);
assert.equal(count('blockClash("briz",day(28),day(30))!==undefined'),true);
// Booking for a closed date is rejected; neighboring free dates are accepted.
const guest='Тест <script>alert(1)</script>';
const bookingData={id:'',guest,phone:'',roomId:'briz',persons:'2',start:periodStart,end:periodEnd,source:'Телефон',status:'confirmed',amount:'',paid:'0',note:''};
const old=count('db.bookings.length');
context.__form=form(bookingData);
clearErr();evalJS('saveBooking(__form)');
assert.match(err(),/закрыт/);
assert.equal(count('db.bookings.length'),old);
bookingData.start=evalJS('day(25)');bookingData.end=evalJS('day(27)');
context.__form=form(bookingData);
clearErr();evalJS('saveBooking(__form)');
assert.equal(count('db.bookings.length'),old+1);
assert.equal(count('db.bookings[0].amount'),count('amountFor("briz",day(25),day(27))'));
assert.equal(count('db.bookings[0].guest'),guest);
assert.ok(!elements.app.innerHTML.includes('<script>alert(1)</script>'));
// Render calendar with blocked ranges, screen with operations tasks and finance.
evalJS("goto('calendar');changeMonth(1);render()");
assert.ok(elements.app.innerHTML.includes('cal-block'));
evalJS("goto('finance')");
assert.ok(elements.app.innerHTML.includes('Журнал операций'));
console.log('PASS: 10 screens, housekeeping, apartment creation, closed dates, collision prevention, booking, escaping, finance graph.');