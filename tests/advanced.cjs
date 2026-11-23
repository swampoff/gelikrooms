const vm=require('node:vm');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const elements={app:{innerHTML:''},'toast-root':{innerHTML:''},'form-error':{textContent:''}};
const listeners={};const values=new Map();
const ctx=vm.createContext({
 document:{title:'',getElementById(id){return elements[id] ||= {innerHTML:'',textContent:''};},querySelector(){return null;},addEventListener(ev,fn){listeners[ev]=fn;}},
 window:{scrollTo(){},addEventListener(){},clearTimeout(){}},
 location:{hash:'',protocol:'file:'},
 localStorage:{getItem(key){return values.get(key)||null;},setItem(k,v){values.set(k,v);}},
 FormData:class{constructor(f){this.f=f;}entries(){return Object.entries(this.f.data);}},
 setTimeout(){return 1;},clearTimeout(){},requestAnimationFrame(){},confirm(){return true;},
 navigator:{},console,Blob,URL,
});
vm.runInContext(source,ctx,{filename:'app.js'});
const evalJS=code=>vm.runInContext(code,ctx);
const form=(data,flags={})=>({data,elements:Object.fromEntries(Object.entries(flags).map(([key,checked])=>[key,{checked}]))});
const resetErr=()=>{elements['form-error'].textContent='';};
for(const [tab,label] of Object.entries({overview:'Добро пожаловать',bookings:'Бронирования',calendar:'Календарь занятости',rooms:'Коллекция апартаментов',rates:'Тарифы и сезонность',operations:'Подготовка и обслуживание',guests:'Ваши гости',finance:'Финансы и платежи',reports:'Аналитика бизнеса',messages:'Сообщения',reviews:'Отзывы гостей',activity:'Журнал действий',settings:'Настройки'})){
 evalJS(`goto('${tab}')`);assert.ok(elements.app.innerHTML.includes(label),tab);
}
// Tariff for a free period, a conflicting interval cannot be saved.
const rateStart=evalJS('day(65)'), rateEnd=evalJS('day(70)'), rateId='RT-ABC';
const nr=evalJS('db.rates.length');
ctx.__form=form({id:'',roomId:'briz',label:'Тестовый тариф',price:'15000',start:rateStart,end:rateEnd});
resetErr();evalJS('saveRate(__form)');assert.equal(evalJS('db.rates.length'),nr+1);
assert.equal(evalJS(`nightlyRate('briz','${rateStart}')`),15000);
assert.equal(evalJS(`amountFor('briz','${rateStart}','${rateEnd}')`),75000);
ctx.__form=form({id:'',roomId:'briz',label:'Дубликат',price:'15000',start:evalJS('day(66)'),end:evalJS('day(71)')});
resetErr();evalJS('saveRate(__form)');assert.match(elements['form-error'].textContent,/уже есть/);
assert.equal(evalJS('db.rates.length'),nr+1);
// Newly created booking with partial payment, never double counts the balance.
const bStart=evalJS('day(65)'),bEnd=evalJS('day(67)');
ctx.__form=form({id:'',roomId:'briz',guest:'Тестовый гость',phone:'',persons:'2',start:bStart,end:bEnd,source:'Сайт',status:'confirmed',amount:'',paid:'5000',note:'Тестовый сценарий'});
resetErr();evalJS('saveBooking(__form)');assert.equal(elements['form-error'].textContent,'');
const id=evalJS("db.bookings.find(b=>b.guest==='Тестовый гость').id");
assert.equal(evalJS(`db.bookings.find(b=>b.id==='${id}').amount`),30000);
assert.equal(evalJS(`db.bookings.find(b=>b.id==='${id}').paid`),5000);
assert.equal(evalJS(`db.payments.filter(p=>p.bookingId==='${id}').reduce((a,p)=>a+p.amount,0)`),5000);
// Booking edit adjusts ledger by exact difference.
ctx.__form=form({id,roomId:'briz',guest:'Тестовый гость',phone:'',persons:'2',start:bStart,end:bEnd,source:'Сайт',status:'confirmed',amount:'30000',paid:'7500',note:''});
evalJS('saveBooking(__form)');assert.equal(evalJS(`db.bookings.find(b=>b.id==='${id}').paid`),7500);
assert.equal(evalJS(`db.payments.filter(p=>p.bookingId==='${id}').reduce((a,p)=>a+p.amount,0)`),7500);
// Explicit payment / refund safeguards.
ctx.__form=form({bookingId:id,kind:'payment',amount:'8000',date:evalJS('day()'),method:'Перевод',note:'Доплата'});
resetErr();evalJS('savePayment(__form)');assert.equal(evalJS(`db.bookings.find(b=>b.id==='${id}').paid`),15500);
ctx.__form=form({bookingId:id,kind:'refund',amount:'18000',date:evalJS('day()'),method:'Карта',note:'Слишком много'});
resetErr();evalJS('savePayment(__form)');assert.match(elements['form-error'].textContent,/превышает/);
ctx.__form=form({bookingId:id,kind:'refund',amount:'1500',date:evalJS('day()'),method:'Карта',note:'Возврат'});
resetErr();evalJS('savePayment(__form)');assert.equal(evalJS(`db.bookings.find(b=>b.id==='${id}').paid`),14000);
assert.equal(evalJS(`db.payments.filter(p=>p.bookingId==='${id}').reduce((a,p)=>a+p.amount,0)`),14000);
// Report capacity, performance KPIs and activity.
assert.ok(evalJS('reportMetrics(30).occupancy')>=0);assert.ok(evalJS('reportMetrics(30).occupancy')<=100);
assert.ok(evalJS('reportMetrics(30).adr')>=0);
assert.ok(evalJS('db.activity.some(a=>a.kind==="payment")'));
// VIP notes are escaped and persist.
ctx.__form=form({name:'Тестовый гость',note:'Предпочитает тишину <script>',vip:'on'},{vip:true});
evalJS('saveGuestMeta(__form)');assert.ok(elements.app.innerHTML.includes('&lt;script&gt;'));assert.ok(!elements.app.innerHTML.includes('<script>'));
// Local backup structure is compatible and records stay in storage.
const persisted=JSON.parse(values.values().next().value);
assert.equal(persisted.bookings.find(b=>b.id===id).paid,14000);
assert.equal(persisted.payments.filter(p=>p.bookingId===id).reduce((a,p)=>a+p.amount,0),14000);
assert.ok(persisted.rates.length>nr);
console.log('PASS: 13 screens, pricing, overlap prevention, booking edits, payment ledger, refunds, report metrics, activity feed, VIP notes and local state.');