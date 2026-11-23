const KEY = 'gelikrooms-premium-admin-demo-v1';
const pageNames = { overview: 'Обзор', bookings: 'Бронирования', calendar: 'Календарь', rooms: 'Апартаменты', rates: 'Тарифы', operations: 'Подготовка', guests: 'Гости', finance: 'Финансы', yookassa: 'ЮKassa', reports: 'Отчёты', messages: 'Сообщения', reviews: 'Отзывы', activity: 'Журнал', settings: 'Настройки' };
const navigation = [
  ['overview','layout-dashboard'],['bookings','calendar-check'],['calendar','calendar-days'],
  ['rooms','bed-double'],['rates','tag'],['operations','clipboard-check'],['guests','users'],['finance','wallet'],['yookassa','credit-card'],['reports','bar-chart'],['messages','message-circle'],
  ['reviews','star'],['activity','activity'],['settings','settings']
];
const shapes = {
  'tag':'<path d="m2 12 10 10 10-10V3h-9L2 12Z"/><circle cx="17" cy="7" r="1.4"/>',
  'bar-chart':'<path d="M3 3v18h18"/><rect x="6" y="12" width="3" height="6" rx="1"/><rect x="12" y="7" width="3" height="11" rx="1"/><rect x="18" y="4" width="3" height="14" rx="1"/>',
  'activity':'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  'receipt':'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3ZM9 9h6M9 13h6"/>',
  'shield-check':'<path d="m12 2 9 4v6c0 5-3.5 8.5-9 10-5.5-1.5-9-5-9-10V6l9-4Zm-4 10 3 3 5-6"/>',
  'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  'calendar-check':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 16l2 2 4-4"/>',
  'calendar-days':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  'bed-double':'<path d="M3 18v3M21 18v3M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13H3zM3 13h18M6 13v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>',
  'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  'wallet':'<rect x="2" y="5" width="20" height="15" rx="3"/><path d="M16 12h6M2 9V6a3 3 0 0 1 3-3h14"/>',
  'message-circle':'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  'star':'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/>',
  'settings':'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-2.8v-.9a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5v-2.8h.9a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L7 8.2l2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V4h2.8v.9a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.9v2.8h-.9a1.7 1.7 0 0 0-1.5 1Z"/>',
  'menu':'<path d="M4 7h16M4 12h16M4 17h16"/>','x':'<path d="M18 6 6 18M6 6l12 12"/>',
  'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>','plus':'<path d="M12 5v14M5 12h14"/>',
  'bell':'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>','chevron-left':'<path d="m15 18-6-6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>','arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'trending-up':'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
  'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  'filter':'<path d="M4 6h16M7 12h10M10 18h4"/>',
  'more-horizontal':'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  'check':'<path d="m5 12 4 4L19 6"/>','check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'send':'<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  'download':'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  'edit':'<path d="m16 4 4 4-11 11-5 1 1-5L16 4ZM14 6l4 4"/>',
  'trash':'<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  'external-link':'<path d="M14 3h7v7M10 14 21 3M19 13v7H4V5h7"/>',
  'credit-card':'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  'building':'<path d="M4 21V3h16v18M2 21h20M8 7h2M14 7h2M8 12h2M14 12h2M10 21v-5h4v5"/>',
  'sparkles':'<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 17l.8 1.2L21 19l-1.2.8L19 21l-.8-1.2L17 19l1.2-.8L19 17Z"/>',
  'circle-help':'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.4 2.1c-1 .8-1.9 1.1-1.9 2.9M12 17h.01"/>',
  'phone':'<path d="M6 2h12v20H6zM11 18h2"/>',
  'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 8 10-8"/>',
  'home':'<path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/>',
  'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  'refresh-cw':'<path d="M20 7V3h-4M4 17v4h4M4 10a8 8 0 0 1 14-5l2 2M20 14a8 8 0 0 1-14 5l-2-2"/>',
  'image':'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  'upload-cloud':'<path d="M12 16V7m-4 4 4-4 4 4"/><path d="M20 17a4 4 0 0 0-.5-8A7.5 7.5 0 0 0 5 11a4.5 4.5 0 0 0 0 9h14"/>',
  'move-left':'<path d="M19 12H5m7-7-7 7 7 7"/>',
  'move-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  'camera':'<path d="M4 7h4l2-3h4l2 3h4v13H4V7Z"/><circle cx="12" cy="13" r="4"/>',
  'maximize':'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  'grip':'<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  'lock':'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  'info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  'sliders-horizontal':'<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>','clipboard-check':'<path d="M9 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 14 3 3 5-6"/>','ban':'<circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/>'
};
const icon = (name, size=20) => `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]||shapes['circle-help']}</svg>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const day = (offset=0) => {const base=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());const d=new Date(`${base}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+offset);return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;};
const asDate = s => new Date(`${s}T12:00:00`);
const addDays = (s,n) => {const d=asDate(s);d.setDate(d.getDate()+n);return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;};
const diffDays = (a,b) => Math.round((asDate(b)-asDate(a))/86400000);
const ruDate = (s, opts={day:'numeric',month:'short'}) => new Intl.DateTimeFormat('ru-RU',opts).format(asDate(s));
const rub = n => `${new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(Math.round(n||0))} ₽`;
const plural = (n,one,few,many) => {let x=Math.abs(n)%100;return x>10&&x<20?many:x%10===1?one:x%10>=2&&x%10<=4?few:many;};
const initials = name => String(name||'?').split(/\s+/).slice(0,2).map(s=>s[0]||'').join('').toUpperCase();
const statusDefs = {
  confirmed:['Подтверждена','mint'],pending:['Ожидает','sand'],checked_in:['Проживает','blue'],checked_out:['Завершена','neutral'],cancelled:['Отменена','rose']
};
function seed() {
  const rooms=[
    {id:'briz',name:'Бриз',kind:'Делюкс с видом на море',size:65,capacity:6,price:8900,tone:'sea',active:true,features:['Вид на море','Балкон','Wi-Fi','Парковка']},
    {id:'panorama',name:'Панорама',kind:'Премиум апартаменты',size:82,capacity:5,price:12900,tone:'gold',active:true,features:['Панорамные окна','Кухня','Балкон','Кондиционер']},
    {id:'laguna',name:'Лагуна',kind:'Семейные апартаменты',size:72,capacity:5,price:10400,tone:'blue',active:true,features:['2 спальни','Кухня','Вид на море','Wi-Fi']},
    {id:'shtil',name:'Штиль',kind:'Уютная студия',size:42,capacity:3,price:6400,tone:'sage',active:true,features:['Терраса','Кухня','Wi-Fi','Кондиционер']}
  ];
  const specs=[
    ['B-1048','Смирнов Владислав','briz',0,4,2,'checked_in',1,'Сайт'],
    ['B-1049','Кузнецова Мария','panorama',1,5,4,'confirmed',0.5,'Яндекс Путешествия'],
    ['B-1050','Иванов Леонид','laguna',3,8,3,'confirmed',0.3,'Сайт'],
    ['B-1051','Орлова Анна','shtil',-4,-1,2,'checked_out',1,'Суточно.ру'],
    ['B-1052','Белов Артём','briz',6,11,3,'pending',0,'Сайт'],
    ['B-1053','Петрова Елена','panorama',10,14,2,'confirmed',1,'Сайт'],
    ['B-1054','Ковалёв Дмитрий','laguna',12,18,5,'confirmed',0.5,'Суточно.ру'],
    ['B-1055','Сафронова Ирина','shtil',5,10,2,'confirmed',0.5,'Сайт'],
    ['B-1056','Морозов Кирилл','briz',-12,-8,4,'checked_out',1,'Сайт'],
    ['B-1057','Волкова Наталья','panorama',-15,-10,2,'checked_out',1,'Сайт'],
    ['B-1058','Андреева Полина','laguna',-20,-15,4,'checked_out',1,'Яндекс Путешествия'],
    ['B-1059','Никитина Ольга','shtil',18,23,2,'pending',0,'Сайт'],
    ['B-1060','Фролов Сергей','briz',-34,-29,2,'checked_out',1,'Сайт'],
    ['B-1061','Захарова Ксения','laguna',-48,-43,2,'checked_out',1,'Суточно.ру'],
    ['B-1062','Новиков Андрей','panorama',-73,-67,3,'checked_out',1,'Сайт'],
    ['B-1063','Соколова Татьяна','shtil',-97,-91,2,'checked_out',1,'Сайт'],
    ['B-1064','Ильина Марина','briz',-125,-118,3,'checked_out',1,'Сайт']
  ];
  const bookings=specs.map(([id,guest,roomId,a,b,persons,status,paidRate,source],i)=>{
    const start=day(a),end=day(b),amount=diffDays(start,end)*rooms.find(r=>r.id===roomId).price;
    return {id,guest,roomId,start,end,persons,status,source,amount,paid:Math.round(amount*paidRate),phone:`+7 900 000 ${pad(i+10)} ${pad(i+23)}`,note:''};
  });
  return {
    rooms,bookings,
    rates:[{id:'RT-101',roomId:'panorama',start:day(7),end:day(26),price:14800,label:'Высокий спрос'}, {id:'RT-102',roomId:'briz',start:day(16),end:day(28),price:10400,label:'Сезонное предложение'}, {id:'RT-103',roomId:'shtil',start:day(3),end:day(12),price:7200,label:'Выходные и праздники'}],
    payments:bookings.filter(b=>b.paid>0).map((b,i)=>({id:`PM-${1001+i}`,bookingId:b.id,date:addDays(b.start,-Math.min(3,Math.max(0,diffDays(day(),b.start)))),amount:b.paid,method:['Карта','Наличные','Перевод'][i%3],note:'Начальная демооплата'})),
    activity:[{id:'EV-1001',date:new Date().toISOString(),kind:'system',title:'Рабочее пространство готово',description:'Демонстрационная версия, все данные локальные'}],
    guestMeta:{},
    blocks:[{id:'BL-001',roomId:'briz',start:day(13),end:day(15),reason:'Профилактика кондиционера'}],
    tasks:[
      {id:'HK-101',roomId:'briz',date:day(),status:'todo',assignee:'Администратор',note:'Проверить бельё и приветственный набор'},
      {id:'HK-102',roomId:'panorama',date:day(1),status:'todo',assignee:'Клининг',note:'Уборка перед заездом'},
      {id:'HK-103',roomId:'laguna',date:day(2),status:'in_progress',assignee:'Клининг',note:'Генеральная уборка'},
      {id:'HK-104',roomId:'shtil',date:day(-1),status:'done',assignee:'Клининг',note:'Комплектование расходниками'}
    ],
    messages:[
      {id:'m1',guest:'Кузнецова Мария',subject:'Ранний заезд',roomId:'panorama',unread:true,items:[{from:'guest',text:'Добрый день! Можно ли заехать в апартаменты немного раньше?',time:'09:42'},{from:'staff',text:'Здравствуйте! Уточним готовность апартаментов и обязательно сообщим.',time:'09:50'},{from:'guest',text:'Спасибо, будем благодарны!',time:'10:02'}]},
      {id:'m2',guest:'Смирнов Владислав',subject:'Парковочное место',roomId:'briz',unread:true,items:[{from:'guest',text:'Подскажите, парковка входит в стоимость проживания?',time:'Вчера, 18:30'}]},
      {id:'m3',guest:'Иванов Леонид',subject:'Бронирование подтверждено',roomId:'laguna',unread:false,items:[{from:'staff',text:'Ваше бронирование подтверждено. До скорой встречи!',time:'Вчера, 12:16'}]},
      {id:'m4',guest:'Петрова Елена',subject:'Детская кроватка',roomId:'panorama',unread:false,items:[{from:'guest',text:'Здравствуйте, у вас есть детская кроватка?',time:'20 ноя, 14:15'},{from:'staff',text:'Да, по запросу подготовим к вашему приезду.',time:'20 ноя, 15:06'}]}
    ],
    reviews:[
      {id:'rv1',guest:'Орлова Анна',roomId:'shtil',rating:5,date:day(-2),text:'Очень уютно и чисто. Всё продумано до мелочей, обязательно вернёмся!',reply:''},
      {id:'rv2',guest:'Морозов Кирилл',roomId:'briz',rating:5,date:day(-8),text:'Вид с балкона просто невероятный. Отличный сервис, спасибо за гостеприимство!',reply:'Благодарим за тёплые слова! Будем рады видеть вас снова.'},
      {id:'rv3',guest:'Волкова Наталья',roomId:'panorama',rating:4,date:day(-10),text:'Прекрасная квартира. Хотелось бы немного больше посуды на кухне.',reply:''},
      {id:'rv4',guest:'Андреева Полина',roomId:'laguna',rating:5,date:day(-18),text:'Отдыхали всей семьёй, остались очень довольны.',reply:''}
    ],
    settings:{company:'GelikRooms',location:'Геленджик, Краснодарский край',email:'hello@gelikrooms.ru',phone:'+7 900 000-00-00',checkIn:'14:00',checkOut:'12:00',currency:'RUB',notifyBooking:true,notifyArrival:true,notifyMessage:true}
  };
}
function load() {try {const raw=JSON.parse(localStorage.getItem(KEY));if(raw && Array.isArray(raw.rooms) && Array.isArray(raw.bookings)){const initial=seed();const migrated={...initial,...raw,rooms:raw.rooms.map(r=>({...r,photos:Array.isArray(r.photos)?r.photos:[],coverPhotoId:r.coverPhotoId||null})),blocks:Array.isArray(raw.blocks)?raw.blocks:[],tasks:Array.isArray(raw.tasks)?raw.tasks:[],rates:Array.isArray(raw.rates)?raw.rates:[],payments:Array.isArray(raw.payments)?raw.payments:raw.bookings.filter(b=>b.paid>0).map((b,i)=>({id:`PM-${1001+i}`,bookingId:b.id,date:b.start,amount:b.paid,method:'Импорт v2',note:'Перенесено из старых данных'})),activity:Array.isArray(raw.activity)?raw.activity:[],guestMeta:raw.guestMeta&&typeof raw.guestMeta==='object'?raw.guestMeta:{},settings:{...initial.settings,...raw.settings}};return migrated;}}catch(_){}return seed();}
let db=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(db));}catch(_){};};
const getRoom=id=>db.rooms.find(r=>r.id===id);
const roomPhotos=r=>Array.isArray(r?.photos)?r.photos:[];
const roomCover=r=>roomPhotos(r).find(x=>x.id===r.coverPhotoId)||roomPhotos(r)[0]||null;
const nightlyRate=(roomId,date)=>db.rates?.find(r=>r.roomId===roomId&&r.start<=date&&r.end>date)?.price??(getRoom(roomId)?.price||0);
const amountFor=(roomId,start,end)=>{if(!start||!end||start>=end)return 0;let total=0;for(let date=start,i=0;date<end&&i<500;date=addDays(date,1),i++)total+=nightlyRate(roomId,date);return total;};
const overlaps=(aStart,aEnd,bStart,bEnd)=>aStart<bEnd&&aEnd>bStart;
const activeBooking=b=>b.status!=='cancelled';
const bookingClash=(roomId,start,end,ignoreId='')=>db.bookings.find(b=>b.id!==ignoreId&&b.roomId===roomId&&activeBooking(b)&&overlaps(start,end,b.start,b.end));
const blockClash=(roomId,start,end,ignoreId='')=>db.blocks.find(b=>b.id!==ignoreId&&b.roomId===roomId&&overlaps(start,end,b.start,b.end));
const roomUnavailable=(roomId,date)=>db.blocks.some(b=>b.roomId===roomId&&b.start<=date&&b.end>date);
const taskStatuses={todo:['К выполнению','sand'],in_progress:['В работе','blue'],done:['Готово','mint']};
const serialId=(prefix,items)=>`${prefix}-${Math.max(100,...items.map(x=>Number(String(x.id).split('-').pop())||0))+1}`;

const getPage=()=>pageNames[location.hash.slice(1)]?location.hash.slice(1):'overview';
let yk={token:'',health:null,summary:null,busy:false,lastUrl:'',error:''};
let ui={page:getPage(),search:'',filter:'all',calendarMonth:new Date().getMonth(),calendarYear:new Date().getFullYear(),modal:null,detail:null,mobileMenu:false,messageId:'m1',reviewFilter:'all',financePeriod:'year',taskFilter:'open',lightbox:null,photoBusy:false,photoProgress:'',editPhotoId:null};
const bookingStatus=(status)=>{const def=statusDefs[status]||statusDefs.pending;return `<span class="status status-${def[1]}"><i></i>${def[0]}</span>`;};
const tileTitle = (name,subtitle,action='')=>`<div class="section-title"><div><h2>${name}</h2>${subtitle?`<p>${subtitle}</p>`:''}</div>${action}</div>`;
function brand(){return `<div class="brand-mark"><svg viewBox="0 0 92 49" width="65" height="40" fill="none" aria-hidden="true"><path d="M25 31a21 21 0 1 1 42 0M46 0v7M16 9l6 6M76 9l-6 6M6 31h9M77 31h9M15 39c12 0 17-8 30-8 14 0 18 8 31 8M19 46c12-1 17-6 27-6s16 5 27 6" stroke="#D9B17B" stroke-width="2.2" stroke-linecap="round"/></svg></div><div class="brand-name">GELIKROOMS</div><div class="brand-sub">PRIVATE COLLECTION</div>`;}
function navMarkup(mobile=false){return navigation.map(([k,i])=>`<button class="nav-link ${ui.page===k?'active':''}" data-nav="${k}" type="button" aria-label="${pageNames[k]}" ${ui.page===k?'aria-current="page"':''}>${icon(i,19)}<span>${pageNames[k]}</span>${k==='messages' && db.messages.filter(m=>m.unread).length?`<b class="nav-count">${db.messages.filter(m=>m.unread).length}</b>`:''}</button>`).join('');}
// Photo media is stored in IndexedDB, separately from the tiny localStorage room metadata.
// Browser-local only: no server upload or cross-device synchronization.
const PHOTO_DB_NAME='gelikrooms-premium-photo-gallery-v1';
const PHOTO_MAX_PER_ROOM=30;
const PHOTO_MAX_FILE_BYTES=15*1024*1024;
const PHOTO_MAX_EDGE=2200;
const photoUrls=new Map();
let photoDbPromise=null;
function photoDb(){
 if(photoDbPromise)return photoDbPromise;
 if(typeof indexedDB==='undefined')return Promise.reject(new Error('Хранилище фотографий недоступно в этом браузере'));
 photoDbPromise=new Promise((resolve,reject)=>{
  const req=indexedDB.open(PHOTO_DB_NAME,1);
  req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('photos'))req.result.createObjectStore('photos',{keyPath:'id'});};
  req.onsuccess=()=>resolve(req.result);
  req.onerror=()=>reject(req.error||new Error('Невозможно открыть базу фотографий'));
 }).catch(error=>{photoDbPromise=null;throw error;});
 return photoDbPromise;
}
async function photoStoreRead(id){
 const dbi=await photoDb();return new Promise((resolve,reject)=>{
  const tx=dbi.transaction('photos','readonly');const req=tx.objectStore('photos').get(id);
  req.onsuccess=()=>resolve(req.result?.blob||null);req.onerror=()=>reject(req.error);
 });
}
async function photoStoreWrite(photo){
 const dbi=await photoDb();return new Promise((resolve,reject)=>{
  const tx=dbi.transaction('photos','readwrite');tx.objectStore('photos').put({id:photo.id,blob:photo.blob});
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Не удалось сохранить фотографию'));tx.onabort=()=>reject(tx.error||new Error('Запись прервана'));
 });
}
async function photoStoreDelete(id){
 const dbi=await photoDb();return new Promise((resolve,reject)=>{
  const tx=dbi.transaction('photos','readwrite');tx.objectStore('photos').delete(id);
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Не удалось удалить фотографию'));tx.onabort=()=>reject(tx.error||new Error('Удаление прервано'));
 });
}
async function photoStoreReplace(items){
 const dbi=await photoDb();return new Promise((resolve,reject)=>{
  const tx=dbi.transaction('photos','readwrite'),store=tx.objectStore('photos');store.clear();items.forEach(item=>store.put({id:item.id,blob:item.blob}));
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('Не удалось восстановить галерею'));tx.onabort=()=>reject(tx.error||new Error('Импорт галереи прерван'));
 });
}
function clearPhotoUrls(){for(const url of photoUrls.values())URL.revokeObjectURL(url);photoUrls.clear();}
async function hydratePhotos(){
 try{
  const metas=db.rooms.flatMap(roomPhotos);if(!metas.length)return;
  await Promise.all(metas.map(async meta=>{
   const blob=await photoStoreRead(meta.id);
   if(blob&&!photoUrls.has(meta.id))photoUrls.set(meta.id,URL.createObjectURL(blob));
  }));render();
 }catch(error){console.warn('GelikRooms photo gallery:',error.message);}
}
function photoSrc(room){return photoUrls.get(roomCover(room)?.id)||null;}
function photoHero(room,small=false){
 const src=photoSrc(room);
 return src?`<img class="uploaded-room-photo" src="${esc(src)}" alt="${esc(room.name)}: главное фото" loading="lazy"/>`:roomArt(room.tone,small);
}
function photoCard(room,meta,i){
 const src=photoUrls.get(meta.id);const cover=roomCover(room)?.id===meta.id;
 return `<article class="gallery-tile ${cover?'is-cover':''}" data-photo-item="${esc(meta.id)}" draggable="true" data-photo-room="${esc(room.id)}">
 <button type="button" class="gallery-preview" data-action="view-photo" data-room="${esc(room.id)}" data-id="${esc(meta.id)}" aria-label="Открыть фото ${i+1}">${src?`<img src="${esc(src)}" alt="${esc(meta.name)}" loading="lazy"/>`:`<div class="photo-loading">${icon('image',25)}<span>Загрузка</span></div>`}</button>
 <div class="gallery-number">${pad(i+1)}</div>${cover?'<span class="cover-flag">Главное фото</span>':''}
 <div class="gallery-tile-info"><strong title="${esc(meta.caption||meta.name)}">${esc(meta.caption||meta.name)}</strong><small>${meta.width||'?'} × ${meta.height||'?'} · ${Math.max(1,Math.round((meta.size||0)/1024))} КБ</small></div>
 <div class="gallery-file-actions"><button type="button" data-action="edit-photo-caption" data-id="${esc(meta.id)}">${icon('edit',13)} Подпись</button><label>${icon('refresh-cw',13)} Заменить<input type="file" data-replace-photo="${esc(meta.id)}" data-room="${esc(room.id)}" accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif"/></label></div>
 ${ui.editPhotoId===meta.id?`<form class="photo-caption-form" id="photo-caption-form"><input type="hidden" name="roomId" value="${esc(room.id)}"/><input type="hidden" name="id" value="${esc(meta.id)}"/><input name="caption" type="text" aria-label="Подпись фотографии" value="${esc(meta.caption||'')}" maxlength="140" placeholder="Например, гостиная с видом на море"/><div><button class="btn btn-primary" type="submit">Сохранить</button><button type="button" class="btn btn-outline" data-action="cancel-photo-caption">Отмена</button></div></form>`:''}
 <div class="gallery-tools"><button type="button" data-action="cover-photo" data-room="${esc(room.id)}" data-id="${esc(meta.id)}" class="gallery-tool ${cover?'selected':''}" title="Сделать главным" aria-label="Сделать главным">${icon('star',16)}</button><button type="button" data-action="move-photo" data-room="${esc(room.id)}" data-id="${esc(meta.id)}" data-direction="-1" class="gallery-tool" ${i===0?'disabled':''} title="Переместить левее" aria-label="Переместить левее">${icon('move-left',16)}</button><button type="button" data-action="move-photo" data-room="${esc(room.id)}" data-id="${esc(meta.id)}" data-direction="1" class="gallery-tool" ${i===roomPhotos(room).length-1?'disabled':''} title="Переместить правее" aria-label="Переместить правее">${icon('move-right',16)}</button><button type="button" data-action="delete-photo" data-room="${esc(room.id)}" data-id="${esc(meta.id)}" class="gallery-tool danger" title="Удалить фото" aria-label="Удалить фото">${icon('trash',16)}</button></div></article>`;
}
function photoManagerModal(){
 const room=getRoom(ui.modal?.id);if(!room)return '';
 const photos=roomPhotos(room);
 return `<div class="modal-backdrop" data-action="close-modal"><section class="modal gallery-modal" role="dialog" aria-modal="true" aria-label="Галерея: ${esc(room.name)}">
 <div class="modal-head gallery-modal-head"><div><div class="eyebrow">GELIKROOMS / МЕДИА-БИБЛИОТЕКА</div><h2>Фотографии · ${esc(room.name)}</h2><p>${photos.length} из ${PHOTO_MAX_PER_ROOM} фотографий · ${photos.length?'управление обложкой, подписями и порядком':'Добавьте первый снимок'}</p></div><button type="button" class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div>
 <div class="gallery-modal-body"><label class="gallery-drop ${ui.photoBusy?'is-busy':''}" id="gallery-drop" for="gallery-upload"><span class="gallery-upload-icon">${icon('upload-cloud',30)}</span><strong>${ui.photoBusy?'Обработка фотографий...':'Добавить фотографии'}</strong><span>Нажмите для выбора или перетащите файлы сюда</span><small>JPG, PNG, WebP, AVIF, HEIC* · до 15 МБ · оптимизируем до JPEG (*при поддержке браузера)</small><input id="gallery-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif" multiple ${ui.photoBusy?'disabled':''}/></label>
 <div class="gallery-toolbar"><div><h3>Галерея объекта</h3><p>Перетаскивайте карточки, используйте стрелки для сортировки. Звезда выбирает обложку. Подписи и замена доступны под каждым снимком.</p></div><span class="gallery-progress" aria-live="polite">${esc(ui.photoProgress||`${photos.length} ${plural(photos.length,'снимок','снимка','снимков')}`)}</span></div>
 <div class="gallery-grid">${photos.length?photos.map((meta,i)=>photoCard(room,meta,i)).join(''):`<div class="gallery-empty">${icon('camera',40)}<strong>Пока нет фотографий</strong><p>Загрузите снимки апартаментов. Здесь можно менять порядок, открывать и удалять изображения.</p></div>`}</div>
 <div class="gallery-note">${icon('info',17)} Фото сохраняются в этом браузере и доступны после перезагрузки. Для синхронизации между сотрудниками потребуется серверное хранилище. Для переноса на другое устройство используйте резервную копию с фотографиями.</div></div>
 <div class="gallery-modal-footer"><button class="btn btn-outline" data-action="edit-room" data-id="${esc(room.id)}">${icon('edit',17)} Данные апартаментов</button><button class="btn btn-primary" data-action="close-modal">${icon('check',17)} Готово</button></div></section></div>`;
}
function photoLightbox(){
 if(!ui.lightbox)return '';
 const room=getRoom(ui.lightbox.roomId),photos=roomPhotos(room),index=photos.findIndex(meta=>meta.id===ui.lightbox.id);
 if(index<0)return '';
 const meta=photos[index],src=photoUrls.get(meta.id);
 return `<div class="photo-lightbox" data-action="close-photo-preview"><div class="photo-lightbox-bar"><span><strong>${esc(room.name)}</strong><small>${index+1} / ${photos.length} · ${esc(meta.name)}</small></span><button data-action="close-photo-preview" class="icon-button" aria-label="Закрыть просмотр">${icon('x',23)}</button></div><div class="photo-lightbox-stage"><button class="photo-lightbox-arrow" data-action="step-photo-preview" data-step="-1" ${photos.length<2?'disabled':''} aria-label="Предыдущее фото">${icon('chevron-left',26)}</button>${src?`<img src="${esc(src)}" alt="${esc(meta.name)}"/>`:roomArt(room.tone)}<button class="photo-lightbox-arrow" data-action="step-photo-preview" data-step="1" ${photos.length<2?'disabled':''} aria-label="Следующее фото">${icon('chevron-right',26)}</button></div><div class="photo-lightbox-foot">${roomCover(room)?.id===meta.id?'Главное фото':'Просмотр фотографии'} · ${meta.width} × ${meta.height}</div></div>`;
}
function sortRoomPhoto(room,id,target){
 const photos=roomPhotos(room);const src=photos.findIndex(x=>x.id===id),dest=photos.findIndex(x=>x.id===target);
 if(src<0||dest<0||src===dest)return false;
 const [item]=photos.splice(src,1);photos.splice(dest,0,item);recordActivity('photo','Изменён порядок фотографий',room.name);save();render();return true;
}
async function processPhoto(file){
 if(!file||!['image/jpeg','image/png','image/webp','image/avif','image/heic','image/heif'].includes(file.type))throw new Error('Поддерживаются JPG, PNG, WebP, AVIF, а HEIC/HEIF только при поддержке браузером');
 if(file.size>PHOTO_MAX_FILE_BYTES)throw new Error(`${file.name}: превышены 15 МБ`);
 let bitmap=null,src=null,dimensions;
 try{
  if(typeof createImageBitmap==='function'){
   bitmap=await createImageBitmap(file,{imageOrientation:'from-image'});dimensions={width:bitmap.width,height:bitmap.height};
  }else{
   src=URL.createObjectURL(file);const im=new Image();im.src=src;await im.decode();bitmap=im;dimensions={width:im.naturalWidth,height:im.naturalHeight};
  }
  if(dimensions.width*dimensions.height>65_000_000)throw new Error('Слишком высокое разрешение фотографии');
  const scale=Math.min(1,PHOTO_MAX_EDGE/Math.max(dimensions.width,dimensions.height));const width=Math.round(dimensions.width*scale),height=Math.round(dimensions.height*scale);
  if(width<1||height<1)throw new Error('Повреждённое изображение');
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Обработка фото недоступна');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.drawImage(bitmap,0,0,width,height);
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Не удалось сжать фото')),'image/jpeg',.84));
  return {blob,width,height};
 }finally{if(bitmap&&typeof bitmap.close==='function')bitmap.close();if(src)URL.revokeObjectURL(src);}
}
async function uploadRoomPhotos(roomId,files){
 const room=getRoom(roomId);if(!room||!files?.length||ui.photoBusy)return;
 ui.photoBusy=true;let added=0,failures=[];
 try{
  await photoDb();
  for(const file of Array.from(files)){
   if(roomPhotos(room).length>=PHOTO_MAX_PER_ROOM){failures.push('Достигнут лимит 30 фотографий');break;}
   ui.photoProgress=`Загружено ${added} из ${files.length}`;
   try{
    const {blob,width,height}=await processPhoto(file);
    const id=`IMG-${typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
    await photoStoreWrite({id,blob});
    const meta={id,name:file.name.slice(0,110),type:blob.type,size:blob.size,width,height,createdAt:new Date().toISOString()};
    (room.photos ||= []).push(meta);if(!room.coverPhotoId)room.coverPhotoId=id;
    photoUrls.set(id,URL.createObjectURL(blob));save();added++;
   }catch(e){failures.push(`${file.name}: ${e.message}`);}
  }
  if(added)recordActivity('photo','Добавлены фотографии',`${room.name} · ${added} шт.`);
  save();toast(added?`Добавлено ${added} ${plural(added,'фото','фото','фото')}`:'Ничего не загружено',!added);
  if(failures.length)toast(failures.slice(0,2).join(' · '),true);
 }catch(e){toast(`Хранилище фото недоступно: ${e.message}`,true);}
 finally{ui.photoBusy=false;ui.photoProgress='';render();}
}
async function replaceRoomPhoto(roomId,id,file){
 const room=getRoom(roomId),meta=roomPhotos(room).find(p=>p.id===id);
 if(!meta||!file||ui.photoBusy)return;
 ui.photoBusy=true;
 try{
  const photo=await processPhoto(file);
  await photoStoreWrite({id,blob:photo.blob});
  const oldUrl=photoUrls.get(id),newUrl=URL.createObjectURL(photo.blob);
  photoUrls.set(id,newUrl);if(oldUrl)URL.revokeObjectURL(oldUrl);
  Object.assign(meta,{name:file.name.slice(0,110),size:photo.blob.size,type:photo.blob.type,width:photo.width,height:photo.height,createdAt:new Date().toISOString()});
  recordActivity('photo','Заменена фотография',`${room.name} · ${meta.name}`);save();toast('Фото заменено, порядок и обложка сохранены');
 }catch(e){toast(`Не удалось заменить фото: ${e.message}`,true);}
 finally{ui.photoBusy=false;render();}
}
function savePhotoCaption(form){
 const v=parseForm(form),room=getRoom(v.roomId),meta=roomPhotos(room).find(x=>x.id===v.id);
 if(!meta)return;
 meta.caption=v.caption.trim().slice(0,140);
 ui.editPhotoId=null;recordActivity('photo','Подпись фотографии изменена',`${room.name} · ${meta.caption||meta.name}`);save();render();toast('Подпись сохранена');
}
async function deleteRoomPhoto(roomId,id){
 const room=getRoom(roomId),meta=roomPhotos(room).find(x=>x.id===id);if(!meta||ui.photoBusy)return;
 if(!confirm(`Удалить фотографию «${meta.name}»? Восстановить можно только из резервной копии.`))return;
 ui.photoBusy=true;
 try{
  await photoStoreDelete(id);
  room.photos=roomPhotos(room).filter(p=>p.id!==id);
  if(room.coverPhotoId===id)room.coverPhotoId=room.photos[0]?.id||null;
  const url=photoUrls.get(id);if(url)URL.revokeObjectURL(url);photoUrls.delete(id);
  if(ui.lightbox?.id===id)ui.lightbox=null;if(ui.editPhotoId===id)ui.editPhotoId=null;
  recordActivity('photo','Удалена фотография',`${room.name} · ${meta.name}`);save();toast('Фотография удалена');
 }catch(e){toast(`Не удалось удалить фото: ${e.message}`,true);}
 finally{ui.photoBusy=false;render();}
}
function fileToDataUrl(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob);});}
function dataUrlToBlob(value){
 const m=/^data:(image\/(?:jpeg|png|webp|avif));base64,([A-Za-z0-9+/=]+)$/.exec(value);
 if(!m)throw new Error('Недопустимый формат изображения в копии');
 const binary=atob(m[2]);const bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
 return new Blob([bytes],{type:m[1]});
}
function roomArt(tone='sea',small=false) {
  let palette={sea:['#a7d7cf','#e0c6a5','#6b9d9c'],gold:['#efddbf','#e1ac7e','#679f9d'],blue:['#bad5e4','#e8dac8','#5d9faf'],sage:['#e0dcca','#b1c8b5','#8ba2a0']}[tone]||['#cbdcd7','#d9b78a','#6b9394'];
  return `<svg class="room-art ${small?'room-art-small':''}" viewBox="0 0 330 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="glass-${tone}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="#f6f1e9"/></linearGradient></defs><rect width="330" height="220" fill="#e7dfd2"/><rect width="330" height="147" fill="#f5eee3"/><path d="M0 143h330v77H0" fill="${palette[1]}" opacity=".7"/><rect x="79" y="0" width="174" height="145" fill="url(#glass-${tone})"/><path d="M79 90q30-24 60-5t60-5q35-22 54 0v65H79z" fill="${palette[2]}" opacity=".62"/><path d="M79 110q47-26 87 3t87-2v34H79z" fill="#d8ece5" opacity=".85"/><path d="M164 0v145M79 145V0M253 145V0" stroke="#fff9ef" stroke-width="8"/><path d="M18 167h192v30H18z" fill="#fcfbf8"/><path d="M25 146h177a13 13 0 0 1 13 13v29H12v-29a13 13 0 0 1 13-13" fill="#d4d9ce"/><rect x="24" y="136" width="65" height="35" rx="11" fill="#ede9dd"/><rect x="99" y="136" width="65" height="35" rx="11" fill="#e9e6db"/><rect x="18" y="190" width="12" height="13" fill="#c0ae9d"/><rect x="187" y="190" width="12" height="13" fill="#c0ae9d"/><path d="M232 203h89" stroke="#766e61" stroke-width="5"/><rect x="250" y="161" width="54" height="35" rx="3" fill="#caa987"/><rect x="246" y="157" width="62" height="8" rx="3" fill="#e8c4a4"/><path d="M276 158v-34" stroke="#7d8573" stroke-width="3"/><ellipse cx="276" cy="120" rx="19" ry="10" fill="#a0af94"/><path d="M303 133c-7-16-20-10-27-2" fill="none" stroke="#829c83" stroke-width="5"/><rect x="0" y="0" width="330" height="220" fill="url(#shade)" opacity=".08"/></svg>`;
}
function sidebar(){return `<aside class="sidebar ${ui.mobileMenu?'is-open':''}" aria-label="Главное меню"><div class="brand">${brand()}</div><div class="side-label">РАБОЧЕЕ ПРОСТРАНСТВО</div><nav class="side-nav">${navMarkup()}</nav><div class="sidebar-bottom"><div class="side-tip">${icon('sparkles',18)}<span>Каждая деталь важна</span></div><div class="coast-scene"><svg viewBox="0 0 240 165" preserveAspectRatio="none"><path d="M0 120q44-17 74-16 31 0 50 11 41-45 116-42v92H0z" fill="#3c6777" opacity=".42"/><path d="M0 136q55-20 102-15 42-14 77-8 35 4 61 11v41H0z" fill="#2d5367"/><path d="M0 154q50-4 77-1 56-13 101-5 26-3 62-8" stroke="#c5a678" opacity=".58" stroke-width="1.3"/><path d="M172 136l3-39 24 39z" fill="#ecddc9"/><path d="M175 100v36" stroke="#c0cfca"/></svg></div></div></aside>`;}
function topbar(){const today= new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric'}).format(new Date());return `<header class="topbar"><button class="icon-button menu-trigger" data-action="toggle-menu" aria-label="Открыть меню">${icon('menu',22)}</button><div class="topbar-section">Панель управления <span class="topbar-dot">/</span> <strong>${pageNames[ui.page]}</strong></div><label class="search-box">${icon('search',19)}<input aria-label="Поиск" placeholder="Поиск брони, гостя, апартамента" data-search="global" value="${esc(ui.search)}" /></label><div class="topbar-actions"><span class="demo-pill">DEMO · V5</span><div class="today">${icon('calendar-days',18)} ${today}</div><button class="icon-button notification" data-nav="activity" aria-label="Журнал событий">${icon('bell',20)}${db.messages.some(m=>m.unread)?'<i></i>':''}</button><button class="avatar top-avatar" data-action="profile" aria-label="Профиль администратора">GR</button></div></header>`;}
function mobileBottom(){return `<nav class="mobile-bottom" aria-label="Быстрые разделы">${[['overview','layout-dashboard','Обзор'],['bookings','calendar-check','Брони'],['calendar','calendar-days','Календарь'],['rooms','bed-double','Номера']].map(([k,i,l])=>`<button data-nav="${k}" class="${ui.page===k?'active':''}">${icon(i,21)}<span>${l}</span></button>`).join('')}<button data-action="toggle-menu" class="${!['overview','bookings','calendar','rooms'].includes(ui.page)?'active':''}">${icon('menu',21)}<span>Ещё</span></button></nav>`;}
function shellTitle(kicker,title,subtitle,primary=true){return `<div class="page-intro"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${primary?`<button class="btn btn-primary desktop-new" data-action="new-booking">${icon('plus',18)} Новая бронь</button>`:''}</div>`;}
function roomName(roomId){return getRoom(roomId)?.name||'Не указан';}
function kpi(label,value,subtitle,ico,trend='',type=''){return `<div class="kpi"><div class="kpi-top"><span>${label}</span><span class="kpi-icon ${type}">${icon(ico,20)}</span></div><div class="kpi-value">${value}</div><div class="kpi-foot">${trend?`<span class="positive">${icon('trending-up',15)} ${trend}</span>`:''}<span>${subtitle}</span></div></div>`;}
function chartBars(finance=false){
  const months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const year=new Date().getFullYear();
  // A demo booking's paid amount is grouped by its check-in month; not a payment ledger.
  const monthly=months.map((_,i)=>db.payments.filter(p=>p.date.slice(0,4)===String(year)&&asDate(p.date).getMonth()===i).reduce((sum,p)=>sum+p.amount,0));
  const max=Math.max(1000,...monthly)*1.15;
  const current=new Date().getMonth();
  return `<div class="bar-chart ${finance?'bar-chart-lg':''}"><div class="y-legend"><span>${rub(max)}</span><span>${rub(max/2)}</span><span>0 ₽</span></div><div class="bars-area">${monthly.map((n,i)=>`<div class="bar-column"><div class="bar-track"><div class="bar-fill ${i===current?'highlight':''}" style="height:${Math.max(n?3:0,(n/max)*100)}%"><span class="bar-tip">${rub(n)}</span></div></div><span>${months[i]}</span></div>`).join('')}</div></div><p class="data-note">${icon('info',14)} По датам локальных демоплатежей в ${year} году. Не банковская выписка.</p>`;
}
function upcoming(){return db.bookings.filter(b=>b.status!=='cancelled' && b.status!=='checked_out' && b.start>=day()).sort((a,b)=>a.start.localeCompare(b.start)).slice(0,4);}
function arrivalList(){const arr=upcoming();return arr.length?arr.map(b=>`<button class="arrival-row" data-booking="${b.id}"><span class="person-avatar">${esc(initials(b.guest))}</span><span class="arrival-person"><strong>${esc(b.guest)}</strong><small>${b.persons} ${plural(b.persons,'гость','гостя','гостей')} · ${esc(roomName(b.roomId))}</small></span><span class="arrival-date">${ruDate(b.start)}<small>${b.start===day()?'Сегодня':b.start===day(1)?'Завтра':'Заезд'}</small></span></button>`).join(''):`<p class="empty-inline">Пока нет предстоящих заездов</p>`;}
function overview(){const occupied=db.bookings.filter(b=>b.status!=='cancelled' && b.start<=day() && b.end>day()).length;const active=db.bookings.filter(b=>!['cancelled','checked_out'].includes(b.status));const currentMonth=new Date().getMonth();const currentYear=new Date().getFullYear();const revenue=db.payments.filter(p=>asDate(p.date).getMonth()===currentMonth&&asDate(p.date).getFullYear()===currentYear).reduce((a,b)=>a+b.amount,0);const ar=db.bookings.filter(b=>b.start===day()).length;
return `${shellTitle('GELIKROOMS / ОБЗОР','Добро пожаловать домой','Все важные события и цифры вашего бизнеса в одном месте.')}
<section class="welcome-banner"><div class="welcome-content"><div class="banner-label">ВАША КОЛЛЕКЦИЯ АПАРТАМЕНТОВ</div><h2>Море возможностей.<br><em>Полный контроль.</em></h2><p>Держите руку на пульсе бронирований, гостей и финансов.</p><button class="btn banner-btn" data-nav="calendar">Открыть календарь ${icon('arrow-right',17)}</button></div><div class="banner-art"><span class="sun-disc"></span><span class="banner-horizon"></span><span class="banner-wave w1"></span><span class="banner-wave w2"></span></div></section>
<div class="kpi-grid">${kpi('Получено за месяц',rub(revenue),'Сумма оплаченных броней','wallet','','gold')}${kpi('Загрузка сегодня',`${Math.round(100*occupied/Math.max(1,db.rooms.filter(r=>r.active).length))}%`,`${occupied} из ${db.rooms.filter(r=>r.active).length} апартаментов`,'bed-double','','teal')}${kpi('Активные брони',active.length,'Предстоящие и текущие','calendar-check','','blue')}${kpi('Заезды сегодня',ar,`${db.bookings.filter(b=>b.end===day()).length} выездов`,'users','','gold')}</div>
<div class="content-grid"><section class="panel revenue-panel">${tileTitle('Платежи по месяцам','Поступления и возвраты по датам операций',`<button class="subtle-button" data-nav="finance">Подробнее ${icon('arrow-right',16)}</button>`)}${chartBars()}</section><section class="panel arrivals-panel">${tileTitle('Ближайшие заезды','Гости, которых стоит встречать',`<button class="subtle-button" data-nav="bookings">Все брони ${icon('arrow-right',16)}</button>`)}<div class="arrival-list">${arrivalList()}</div></section></div>
${operationsSnippet()}<section class="panel week-panel">${tileTitle('Календарь ближайших дней','Быстрый обзор загрузки',`<button class="subtle-button" data-nav="calendar">Полный календарь ${icon('arrow-right',16)}</button>`)}${weekPreview()}</section>`;}
function weekPreview(){const days=Array.from({length:7},(_,i)=>day(i));return `<div class="week-scroll"><div class="week-grid"><div class="week-heading">Апартаменты</div>${days.map(d=>`<div class="week-date ${d===day()?'is-today':''}"><b>${ruDate(d,{weekday:'short'})}</b><span>${asDate(d).getDate()}</span></div>`).join('')}${db.rooms.map(r=>`<div class="week-room">${esc(r.name)}</div>${days.map(d=>{const b=db.bookings.find(b=>b.roomId===r.id&&b.start<=d&&b.end>d&&b.status!=='cancelled');const block=db.blocks.find(x=>x.roomId===r.id&&x.start<=d&&x.end>d);const blocked=!!block;return `<button class="week-cell ${b?'is-booked':blocked?'is-blocked':''}" data-action="${b?'booking-detail':blocked?'edit-block':'calendar-new'}" data-id="${b?.id||block?.id||''}" data-room="${r.id}" data-date="${d}" aria-label="${esc(r.name)}: ${b?esc(b.guest):blocked?'закрыто':'свободно'}">${b?`<span>${esc(b.guest.split(' ')[0])}</span>`:blocked?'×':'+'}</button>`;}).join('')}`).join('')}</div></div>`;}
function operationsSnippet(){
 const open=db.tasks.filter(t=>t.status!=='done');const due=open.filter(t=>t.date<=day(1)).length;
 return `<section class="operations-overview panel"><div class="operations-overview-title"><span class="mini-insignia">${icon('clipboard-check',23)}</span><div><h2>Подготовка апартаментов</h2><p>Уборка, обслуживание и готовность к заселению</p></div></div><div class="ops-overview-stat"><strong>${due}</strong><span>задачи на сегодня и завтра</span></div><button class="btn btn-outline" data-nav="operations">Открыть задачи ${icon('arrow-right',17)}</button></section>`;
}
function taskStatus(t){const d=taskStatuses[t.status]||taskStatuses.todo;return `<span class="status status-${d[1]}"><i></i>${d[0]}</span>`;}
function operationsPage(){
 const open=db.tasks.filter(t=>t.status!=='done');
 const filtered=[...db.tasks].filter(t=>ui.taskFilter==='all'||(ui.taskFilter==='open'?t.status!=='done':t.status===ui.taskFilter)).filter(t=>[roomName(t.roomId),t.assignee,t.note].some(x=>String(x).toLowerCase().includes(ui.search.toLowerCase()))).sort((a,b)=>a.date.localeCompare(b.date));
 const upcomingBlocks=[...db.blocks].sort((a,b)=>a.start.localeCompare(b.start));
 return `${shellTitle('СЕРВИС / ПОДГОТОВКА','Подготовка и обслуживание','Уборка, готовность апартаментов и закрытые для продажи даты.',false)}
 <div class="ops-summary"><div class="panel ops-stat"><span class="ops-kicker">НЕЗАКРЫТЫЕ ЗАДАЧИ</span><strong>${open.length}</strong><small>ожидают выполнения</small></div><div class="panel ops-stat"><span class="ops-kicker">СЕГОДНЯ</span><strong>${open.filter(t=>t.date===day()).length}</strong><small>важно выполнить до заезда</small></div><div class="panel ops-stat"><span class="ops-kicker">ЗАКРЫТЫЕ ПЕРИОДЫ</span><strong>${db.blocks.filter(b=>b.end>day()).length}</strong><small>действующие и будущие</small></div></div>
 <div class="inline-actions"><button class="btn btn-primary" data-action="new-task">${icon('plus',18)} Новая задача</button><button class="btn btn-outline" data-action="new-block">${icon('ban',17)} Заблокировать даты</button></div>
 <section class="panel ops-panel"><div class="panel-toolbar"><div class="panel-heading"><h2>Задачи команды</h2><span class="count-chip">${filtered.length}</span></div><div class="toolbar-controls"><label class="tiny-search">${icon('search',17)}<input data-search="page" placeholder="Объект, сотрудник, задача" value="${esc(ui.search)}"/></label><select id="task-filter" aria-label="Фильтр задач">${[['open','Открытые'],['all','Все'],['todo','К выполнению'],['in_progress','В работе'],['done','Готово']].map(([v,l])=>`<option value="${v}" ${ui.taskFilter===v?'selected':''}>${l}</option>`).join('')}</select></div></div>
 <div class="task-list">${filtered.map(t=>`<article class="task-card"><div class="task-date"><strong>${ruDate(t.date,{day:'2-digit'})}</strong><small>${ruDate(t.date,{month:'short'})}</small></div><div class="task-info"><strong>${esc(roomName(t.roomId))} <span>· ${esc(t.assignee)}</span></strong><p>${esc(t.note||'Подготовить апартаменты к заезду')}</p><div class="task-tags">${taskStatus(t)}<small>${ruDate(t.date,{weekday:'long',day:'numeric',month:'short'})}</small></div></div><div class="task-actions"><label>Статус<select data-task-status="${esc(t.id)}" aria-label="Статус задачи ${esc(t.id)}">${Object.entries(taskStatuses).map(([key,val])=>`<option value="${key}" ${t.status===key?'selected':''}>${val[0]}</option>`).join('')}</select></label><button type="button" class="icon-button" data-action="edit-task" data-id="${esc(t.id)}" aria-label="Редактировать задачу">${icon('edit',18)}</button></div></article>`).join('')}</div>${!filtered.length?empty('Пока нет задач','Создайте первую задачу или смените фильтр.'):''}</section>
 <section class="panel ops-panel"><div class="panel-toolbar"><div class="panel-heading"><h2>Блокировки дат</h2><span class="count-chip">${upcomingBlocks.length}</span></div><button class="subtle-button" data-nav="calendar">Открыть календарь ${icon('arrow-right',16)}</button></div><div class="block-list">${upcomingBlocks.map(b=>`<div class="block-item"><span class="block-symbol">${icon('ban',20)}</span><div class="block-details"><strong>${esc(roomName(b.roomId))}</strong><small>${ruDate(b.start)} – ${ruDate(b.end)} · ${diffDays(b.start,b.end)} ${plural(diffDays(b.start,b.end),'ночь','ночи','ночей')}</small><p>${esc(b.reason)}</p></div><button class="btn btn-outline" data-action="edit-block" data-id="${esc(b.id)}">Изменить ${icon('edit',15)}</button></div>`).join('')}</div>${!upcomingBlocks.length?empty('Закрытых дат нет','Все апартаменты доступны для продажи при отсутствии брони.'):''}</section>`;
}
function taskModal(){
 const existing=db.tasks.find(t=>t.id===ui.modal?.id);const t=existing||{id:'',roomId:db.rooms[0]?.id,date:day(),assignee:'Клининг',status:'todo',note:''};
 return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="${existing?'Редактирование задачи':'Новая задача'}"><div class="modal-head"><div><div class="eyebrow">ОПЕРАЦИОННЫЕ ЗАДАЧИ</div><h2>${existing?'Редактировать задачу':'Новая задача'}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div><form class="modal-body" id="task-form"><input name="id" type="hidden" value="${esc(t.id)}"/><div class="form-grid"><label>Апартаменты<select name="roomId">${db.rooms.map(r=>`<option value="${esc(r.id)}" ${r.id===t.roomId?'selected':''}>${esc(r.name)}</option>`).join('')}</select></label><label>Дата выполнения<input name="date" type="date" required value="${t.date}"/></label></div><div class="form-grid"><label>Исполнитель<input name="assignee" required maxlength="80" value="${esc(t.assignee)}"/></label><label>Статус<select name="status">${Object.entries(taskStatuses).map(([key,val])=>`<option value="${key}" ${t.status===key?'selected':''}>${val[0]}</option>`).join('')}</select></label></div><label>Что сделать<textarea name="note" rows="3" required maxlength="600">${esc(t.note)}</textarea></label><p class="form-error" id="form-error" role="alert"></p><div class="modal-actions">${existing?`<button type="button" class="btn btn-danger" data-action="delete-task" data-id="${esc(t.id)}">Удалить</button>`:''}<button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">Сохранить</button></div></form></section></div>`;
}
function blockModal(){
 const existing=db.blocks.find(b=>b.id===ui.modal?.id);const b=existing||{id:'',roomId:ui.modal?.room||db.rooms[0]?.id,start:ui.modal?.date||day(1),end:addDays(ui.modal?.date||day(1),2),reason:''};
 return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Блокировка дат"><div class="modal-head"><div><div class="eyebrow">НЕДОСТУПНО ДЛЯ БРОНИРОВАНИЯ</div><h2>${existing?'Редактировать блокировку':'Закрыть даты'}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div><form class="modal-body" id="block-form"><input name="id" type="hidden" value="${esc(b.id)}"/><label>Апартаменты<select name="roomId">${db.rooms.map(r=>`<option value="${esc(r.id)}" ${r.id===b.roomId?'selected':''}>${esc(r.name)}</option>`).join('')}</select></label><div class="form-grid"><label>С даты включительно<input name="start" type="date" value="${b.start}" required /></label><label>До даты не включительно<input name="end" type="date" value="${b.end}" required /></label></div><label>Причина<input name="reason" maxlength="200" required placeholder="Например, техническое обслуживание" value="${esc(b.reason)}"/></label><div class="notice-box">${icon('info',18)} В закрытые даты нельзя создавать бронирования. Уже существующие брони не изменяются.</div><p class="form-error" id="form-error" role="alert"></p><div class="modal-actions">${existing?`<button type="button" class="btn btn-danger" data-action="delete-block" data-id="${esc(b.id)}">Удалить</button>`:''}<button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">Сохранить</button></div></form></section></div>`;
}
function saveTask(form){const v=parseForm(form),err=document.getElementById('form-error');if(!getRoom(v.roomId)||!/^\d{4}-\d{2}-\d{2}$/.test(v.date)||!v.assignee.trim()||!v.note.trim()||!taskStatuses[v.status]){err.textContent='Заполните все поля корректно.';return;}const existing=db.tasks.find(t=>t.id===v.id);const data={roomId:v.roomId,date:v.date,assignee:v.assignee.trim(),status:v.status,note:v.note.trim()};if(existing){Object.assign(existing,data);}else db.tasks.unshift({id:serialId('HK',db.tasks),...data});recordActivity('task',existing?'Обновлена задача':'Создана задача',`${roomName(data.roomId)} · ${data.note}`);save();ui.modal=null;render();toast(existing?'Задача обновлена':'Задача создана');}
function saveBlock(form){const v=parseForm(form),err=document.getElementById('form-error');if(!getRoom(v.roomId)||!v.start||!v.end||v.start>=v.end||!v.reason.trim()){err.textContent='Укажите апартаменты, причину и корректный диапазон дат.';return;}if(bookingClash(v.roomId,v.start,v.end)){err.textContent='На этот период уже есть бронирование. Измените даты.';return;}if(blockClash(v.roomId,v.start,v.end,v.id)){err.textContent='На этот период уже есть другая блокировка.';return;}const existing=db.blocks.find(b=>b.id===v.id);const data={roomId:v.roomId,start:v.start,end:v.end,reason:v.reason.trim()};if(existing){Object.assign(existing,data);}else db.blocks.push({id:serialId('BL',db.blocks),...data});recordActivity('block',existing?'Изменена блокировка':'Закрыты даты',`${roomName(data.roomId)} · ${data.start} – ${data.end}`);save();ui.modal=null;render();toast(existing?'Блокировка изменена':'Даты закрыты для бронирований');}

function pageToolbar(title,count,filterOptions,extra=""){return `<div class="panel-toolbar"><div class="panel-heading"><h2>${title}</h2><span class="count-chip">${count}</span></div><div class="toolbar-controls"><label class="tiny-search">${icon('search',17)}<input data-search="page" placeholder="Найти..." value="${esc(ui.search)}" /></label>${filterOptions?`<select id="status-filter" aria-label="Фильтр статуса">${filterOptions.map(([v,l])=>`<option value="${v}" ${ui.filter===v?'selected':''}>${l}</option>`).join('')}</select>`:''}${extra}</div></div>`;}
function bookingsPage(){let list=db.bookings.filter(b=>ui.filter==='all'||b.status===ui.filter).filter(b=>[b.guest,b.id,roomName(b.roomId),b.source].some(t=>t.toLowerCase().includes(ui.search.toLowerCase()))).sort((a,b)=>b.start.localeCompare(a.start));return `${shellTitle('УПРАВЛЕНИЕ / БРОНИРОВАНИЯ','Бронирования','История, статусы, оплаты и детали каждого размещения.')}
<section class="panel panel-list">${pageToolbar('Все бронирования',list.length,[['all','Все статусы'],...Object.entries(statusDefs).map(([k,v])=>[k,v[0]])],`<button class="export-btn" data-action="export">${icon('download',16)}<span>Экспорт CSV</span></button>`)}<div class="table-scroll"><table class="data-table"><thead><tr><th>Гость / бронь</th><th>Апартаменты</th><th>Даты проживания</th><th>Сумма</th><th>Статус</th><th></th></tr></thead><tbody>${list.map(b=>`<tr data-booking="${b.id}"><td><div class="cell-person"><span class="person-avatar">${esc(initials(b.guest))}</span><span><strong>${esc(b.guest)}</strong><small>${b.id} · ${esc(b.source)}</small></span></div></td><td>${esc(roomName(b.roomId))}</td><td><strong>${ruDate(b.start)} – ${ruDate(b.end)}</strong><small>${diffDays(b.start,b.end)} ${plural(diffDays(b.start,b.end),'ночь','ночи','ночей')}</small></td><td><strong>${rub(b.amount)}</strong><small>Оплачено ${rub(b.paid)}</small></td><td>${bookingStatus(b.status)}</td><td>${icon('chevron-right',18)}</td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${list.map(b=>`<button class="booking-mobile" data-booking="${b.id}"><div class="booking-mobile-head"><span class="person-avatar">${esc(initials(b.guest))}</span><div><strong>${esc(b.guest)}</strong><small>${b.id} · ${esc(roomName(b.roomId))}</small></div>${bookingStatus(b.status)}</div><div class="booking-mobile-meta"><span>${icon('calendar-days',16)} ${ruDate(b.start)} – ${ruDate(b.end)}</span><strong>${rub(b.amount)}</strong></div></button>`).join('')}</div>${!list.length?empty('Бронирований не найдено','Попробуйте изменить фильтры или создайте новую бронь','new-booking'):''}</section>`;}
function empty(title,desc,action){return `<div class="empty-state"><div class="empty-icon">${icon('search',25)}</div><h3>${title}</h3><p>${desc}</p>${action?`<button class="btn btn-primary" data-action="${action}">${icon('plus',17)} Новая бронь</button>`:''}</div>`;}
function monthDate(d){return `${ui.calendarYear}-${pad(ui.calendarMonth+1)}-${pad(d)}`;}
function changeMonth(offset){const d=new Date(ui.calendarYear,ui.calendarMonth+offset,1);ui.calendarMonth=d.getMonth();ui.calendarYear=d.getFullYear();}
function calendarPage(){const days=new Date(ui.calendarYear,ui.calendarMonth+1,0).getDate();const dates=Array.from({length:days},(_,i)=>monthDate(i+1));const todayStr=day();const label=new Intl.DateTimeFormat('ru-RU',{month:'long',year:'numeric'}).format(new Date(ui.calendarYear,ui.calendarMonth,1));const col=`grid-template-columns:172px repeat(${days}, 58px)`;
return `${shellTitle('УПРАВЛЕНИЕ / КАЛЕНДАРЬ','Календарь занятости','Все объекты и бронирования в одной временной шкале.')}
<section class="panel calendar-panel"><div class="calendar-tools"><div class="calendar-nav"><button class="icon-button" data-action="prev-month" aria-label="Предыдущий месяц">${icon('chevron-left',19)}</button><strong>${label}</strong><button class="icon-button" data-action="next-month" aria-label="Следующий месяц">${icon('chevron-right',19)}</button><button class="today-btn" data-action="today">Сегодня</button><button class="today-btn" data-action="new-block">${icon('ban',15)} Закрыть даты</button></div><div class="legend"><span><i class="legend-dot mint"></i> Подтверждена</span><span><i class="legend-dot sand"></i> Ожидает</span><span><i class="legend-dot blue"></i> Проживает</span><span><i class="legend-dot blocked"></i> Закрыто</span></div></div><div class="cal-viewport"><div class="cal-table"><div class="cal-head" style="${col}"><div class="cal-corner">Апартаменты</div>${dates.map(d=>`<div class="cal-day ${d===todayStr?'today-cell':''} ${(asDate(d).getDay()===0||asDate(d).getDay()===6)?'weekend':''}"><span>${ruDate(d,{weekday:'short'})}</span><b>${asDate(d).getDate()}</b></div>`).join('')}</div>${db.rooms.map(r=>`<div class="cal-row" style="${col}"><div class="cal-room"><span class="room-mini-icon">${icon('bed-double',19)}</span><span><strong>${esc(r.name)}</strong><small>${rub(r.price)} / ночь</small></span></div>${dates.map((d,i)=>`<button class="cal-cell ${d===todayStr?'today-cell':''} ${(asDate(d).getDay()===0||asDate(d).getDay()===6)?'weekend':''}" style="grid-column:${i+2};grid-row:1" data-action="calendar-new" data-room="${r.id}" data-date="${d}" title="Новая бронь: ${esc(r.name)}, ${d}"></button>`).join('')}${db.blocks.filter(b=>b.roomId===r.id&&b.start<=dates[days-1]&&b.end>dates[0]).map(b=>{const a=Math.max(0,diffDays(dates[0],b.start));const end=Math.min(days,diffDays(dates[0],b.end));return `<button class="cal-booking cal-block" style="grid-column:${a+2} / span ${Math.max(1,end-a)};grid-row:1" data-action="edit-block" data-id="${b.id}" title="${esc(b.reason)}">${icon('ban',13)} <span>Закрыто</span></button>`;}).join('')}${db.bookings.filter(b=>b.roomId===r.id&&b.status!=='cancelled'&&b.start<=addDays(dates[days-1],0)&&b.end>dates[0]).map(b=>{const a=Math.max(0,diffDays(dates[0],b.start));const end=Math.min(days,diffDays(dates[0],b.end));const n=Math.max(1,end-a);return `<button class="cal-booking cal-booking-${statusDefs[b.status][1]}" style="grid-column:${a+2} / span ${n};grid-row:1" data-booking="${b.id}" title="${esc(b.guest)}: ${ruDate(b.start)} - ${ruDate(b.end)}"><span>${esc(b.guest.split(' ')[0])}</span></button>`;}).join('')}</div>`).join('')}</div></div><div class="cal-hint">${icon('info',16)} На телефоне прокручивайте календарь горизонтально. Нажмите свободную дату для создания брони.</div></section>`;}
function roomsPage(){return `${shellTitle('ОБЪЕКТЫ / АПАРТАМЕНТЫ','Коллекция апартаментов','Управляйте размещением, вместимостью и стоимостью проживания.',false)}<div class="inline-actions"><button class="btn btn-primary" data-action="new-room">${icon('plus',17)} Добавить апартаменты</button><button class="btn btn-outline" data-nav="operations">Подготовка и блокировки ${icon('arrow-right',17)}</button><button class="btn btn-outline" data-nav="rates">Тарифы по датам ${icon('tag',17)}</button></div>
<div class="rooms-summary"><div><strong>${db.rooms.length}</strong><span>Объекта в коллекции</span></div><div><strong>${db.rooms.filter(r=>r.active).length}</strong><span>Доступно к продаже</span></div><div><strong>${rub(Math.min(...db.rooms.map(r=>r.price)))}</strong><span>Стоимость от / ночь</span></div></div><div class="rooms-grid">${db.rooms.map(r=>{const current=db.bookings.find(b=>b.roomId===r.id&&b.status!=='cancelled'&&b.start<=day()&&b.end>day());return `<article class="room-card"><div class="room-picture theme-${r.tone}">${photoHero(r)}<span class="room-photo-count">${icon('camera',15)} ${roomPhotos(r).length}</span><span class="room-photo-tag">${r.active?(current?'Занято сегодня':roomUnavailable(r.id,day())?'Закрыто на работы':'Доступно'):'Приостановлено'}</span></div><div class="room-body"><button class="room-media-link" type="button" data-action="manage-photos" data-id="${esc(r.id)}">${icon('camera',16)} <strong>${roomPhotos(r).length} ${plural(roomPhotos(r).length,'фотография','фотографии','фотографий')}</strong><span>Управлять галереей ${icon('arrow-right',15)}</span></button><div class="room-header"><div><div class="room-overline">GELIKROOMS COLLECTION</div><h2>${esc(r.name)}</h2><p>${esc(r.kind)}</p></div><button class="round-edit" data-action="edit-room" data-id="${r.id}" aria-label="Редактировать ${esc(r.name)}">${icon('edit',18)}</button></div><div class="room-specs"><span>${icon('building',17)} ${r.size} м²</span><span>${icon('users',17)} До ${r.capacity} гостей</span></div><div class="feature-tags">${r.features.slice(0,3).map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="room-bottom"><div><small>Стоимость за ночь</small><strong>${rub(r.price)}</strong></div><button class="btn btn-outline" data-action="edit-room" data-id="${r.id}">Управление ${icon('arrow-right',16)}</button></div></div></article>`;}).join('')}</div>`;}
function getGuests(){const names=[...new Set(db.bookings.map(b=>b.guest))];return names.map(n=>{const history=db.bookings.filter(b=>b.guest===n).sort((a,b)=>b.start.localeCompare(a.start));return {name:n,history,visits:history.length,last:history[0],total:history.reduce((a,b)=>a+b.paid,0)};});}
function guestsPage(){const list=getGuests().filter(g=>g.name.toLowerCase().includes(ui.search.toLowerCase())||g.history.some(b=>b.phone.includes(ui.search)));return `${shellTitle('CRM / ГОСТИ','Ваши гости','История проживания и персональное внимание к каждому гостю.',false)}<section class="panel panel-list">${pageToolbar('База гостей',list.length)}<div class="table-scroll"><table class="data-table"><thead><tr><th>Гость</th><th>Последний объект</th><th>Заезд</th><th>Бронирований</th><th>Оплачено</th><th></th></tr></thead><tbody>${list.map(g=>`<tr data-guest="${esc(g.name)}"><td><div class="cell-person"><span class="person-avatar">${esc(initials(g.name))}</span><span><strong>${esc(g.name)}</strong><small>${esc(g.last.phone)}</small></span></div></td><td>${esc(roomName(g.last.roomId))}</td><td>${ruDate(g.last.start)}</td><td>${g.visits}</td><td><strong>${rub(g.total)}</strong></td><td>${icon('chevron-right',18)}</td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${list.map(g=>`<button class="guest-mobile" data-guest="${esc(g.name)}"><span class="person-avatar">${esc(initials(g.name))}</span><span><strong>${esc(g.name)}</strong><small>${esc(roomName(g.last.roomId))} · ${ruDate(g.last.start)}</small></span><span>${icon('chevron-right',18)}</span></button>`).join('')}</div>${!list.length?empty('Гостей не найдено','Измените поисковый запрос.'):''}</section>`;}
function financePage(){const live=db.bookings.filter(b=>b.status!=='cancelled');const totalPaid=live.reduce((a,b)=>a+b.paid,0);const expected=live.reduce((a,b)=>a+b.amount,0);const due=expected-totalPaid;const transactions=[...live].sort((a,b)=>b.start.localeCompare(a.start));return `${shellTitle('АНАЛИТИКА / ФИНАНСЫ','Финансы','Доходы, поступления и задолженности под вашим контролем.',false)}
<div class="kpi-grid three">${kpi('Оплачено всего',rub(totalPaid),'По всем демоброням','wallet','','teal')}${kpi('Стоимость бронирований',rub(expected),'Общий объём размещений','trending-up','','gold')}${kpi('Ожидается к оплате',rub(due),'Оставшаяся сумма','credit-card','','blue')}</div>
<section class="panel revenue-wide">${tileTitle('Динамика оплаченных сумм','Оплаченные суммы по месяцам заезда')} ${chartBars(true)}</section><section class="panel panel-list">${pageToolbar('Оплаты по бронированиям',transactions.length)}<div class="table-scroll"><table class="data-table"><thead><tr><th>Гость</th><th>Бронь</th><th>Дата заезда</th><th>Сумма</th><th>Оплачено</th><th>Остаток</th></tr></thead><tbody>${transactions.filter(b=>[b.guest,b.id].some(t=>t.toLowerCase().includes(ui.search.toLowerCase()))).map(b=>`<tr data-booking="${b.id}"><td><strong>${esc(b.guest)}</strong></td><td>${b.id}</td><td>${ruDate(b.start)}</td><td>${rub(b.amount)}</td><td><strong>${rub(b.paid)}</strong></td><td><span class="${b.paid>=b.amount?'positive':'negative'}">${rub(b.amount-b.paid)}</span></td></tr>`).join('')}</tbody></table></div><div class="mobile-cards">${transactions.filter(b=>b.guest.toLowerCase().includes(ui.search.toLowerCase())).map(b=>`<button class="finance-mobile" data-booking="${b.id}"><span><strong>${esc(b.guest)}</strong><small>${b.id} · ${ruDate(b.start)}</small></span><span><strong>${rub(b.paid)}</strong><small>из ${rub(b.amount)}</small></span></button>`).join('')}</div></section>`;}
function messagesPage(){const messages=db.messages.filter(m=>[m.guest,m.subject,roomName(m.roomId)].some(t=>t.toLowerCase().includes(ui.search.toLowerCase())));const active=messages.find(m=>m.id===ui.messageId) || messages[0];return `${shellTitle('КОММУНИКАЦИЯ / СООБЩЕНИЯ','Сообщения','Будьте на связи с каждым гостем.',false)}<div class="message-layout"><section class="panel message-list"><div class="message-list-heading"><h2>Диалоги</h2><span class="count-chip">${db.messages.filter(m=>m.unread).length} новых</span></div><label class="tiny-search inbox-search">${icon('search',17)}<input data-search="page" placeholder="Поиск диалога" value="${esc(ui.search)}" /></label><div class="threads">${messages.map(m=>`<button class="thread ${active?.id===m.id?'selected':''}" data-message="${m.id}"><span class="person-avatar">${esc(initials(m.guest))}</span><span><strong>${esc(m.guest)}${m.unread?'<i class="unread-dot"></i>':''}</strong><small>${esc(m.subject)}</small><em>${esc(m.items[m.items.length-1]?.text||'')}</em></span></button>`).join('')}</div>${!messages.length?empty('Диалогов не найдено','Попробуйте другой запрос.'):''}</section><section class="panel chat-panel">${active?`<div class="chat-head"><span class="person-avatar">${esc(initials(active.guest))}</span><span><strong>${esc(active.guest)}</strong><small>${esc(roomName(active.roomId))} · ${esc(active.subject)}</small></span><span class="chat-online">История диалога</span></div><div class="chat-body">${active.items.map(m=>`<div class="chat-bubble ${m.from==='staff'?'outgoing':''}"><p>${esc(m.text)}</p><small>${esc(m.time)}</small></div>`).join('')}</div><form id="reply-form" class="chat-compose"><input aria-label="Текст ответа" name="reply" placeholder="Напишите сообщение гостю..." required maxlength="1000"/><button class="btn btn-primary" type="submit" aria-label="Отправить ответ">${icon('send',19)}<span>Отправить</span></button></form>`:empty('Нет выбранного диалога','Выберите сообщение слева.')}</section></div><p class="data-note beneath">${icon('info',15)} Ответы сохраняются только в демоверсии браузера, реальные сообщения не отправляются.</p>`;}
function reviewsPage(){const items=db.reviews.filter(r=>ui.reviewFilter==='all'||(ui.reviewFilter==='unanswered'&&!r.reply)||(ui.reviewFilter==='answered'&&r.reply));const rating=db.reviews.reduce((a,r)=>a+r.rating,0)/Math.max(1,db.reviews.length);return `${shellTitle('РЕПУТАЦИЯ / ОТЗЫВЫ','Отзывы гостей','Ценим обратную связь и заботимся о репутации.',false)}<div class="reviews-summary"><div class="rating-big"><strong>${rating.toFixed(1).replace('.',',')}</strong><span><span class="gold-stars">★★★★★</span><small>Средняя оценка</small></span></div><div><strong>${db.reviews.length}</strong><span>Всего отзывов</span></div><div><strong>${db.reviews.filter(r=>!r.reply).length}</strong><span>Ждут ответа</span></div></div><div class="reviews-filter"><button class="chip ${ui.reviewFilter==='all'?'active':''}" data-review-filter="all">Все</button><button class="chip ${ui.reviewFilter==='unanswered'?'active':''}" data-review-filter="unanswered">Без ответа</button><button class="chip ${ui.reviewFilter==='answered'?'active':''}" data-review-filter="answered">С ответом</button></div><div class="reviews-grid">${items.map(r=>`<article class="panel review-card"><div class="review-top"><span class="person-avatar">${esc(initials(r.guest))}</span><div><strong>${esc(r.guest)}</strong><small>${esc(roomName(r.roomId))} · ${ruDate(r.date)}</small></div><span class="gold-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></div><p>${esc(r.text)}</p>${r.reply?`<div class="reply-note"><b>Ответ GelikRooms</b><p>${esc(r.reply)}</p></div>`:''}<button class="subtle-button" data-action="reply-review" data-id="${r.id}">${icon('edit',16)} ${r.reply?'Изменить ответ':'Ответить гостю'}</button></article>`).join('')}</div>${!items.length?empty('Нет отзывов','Смените фильтр для просмотра отзывов.'):''}`;}
function settingsPage(){const s=db.settings;return `${shellTitle('СИСТЕМА / НАСТРОЙКИ','Настройки','Основные параметры вашего рабочего пространства.',false)}<div class="settings-layout"><form id="settings-form" class="panel settings-form"><div class="form-section"><h2>${icon('building',20)} Основная информация</h2><p>Информация, которая отображается в панели управления.</p><div class="form-grid"><label>Название компании<input name="company" value="${esc(s.company)}" required/></label><label>Местоположение<input name="location" value="${esc(s.location)}" /></label><label>E-mail<input name="email" type="email" value="${esc(s.email)}"/></label><label>Телефон<input name="phone" value="${esc(s.phone)}"/></label></div></div><div class="form-section"><h2>${icon('clock',20)} Правила проживания</h2><p>Время заезда и выезда по умолчанию.</p><div class="form-grid"><label>Время заезда<input name="checkIn" type="time" value="${esc(s.checkIn)}" /></label><label>Время выезда<input name="checkOut" type="time" value="${esc(s.checkOut)}" /></label></div></div><div class="form-section"><h2>${icon('bell',20)} Уведомления</h2><p>Настройте визуальные напоминания. Отправка SMS и e-mail не подключена.</p>${[['notifyBooking','Новые бронирования','Показывать события по новым броням'],['notifyArrival','Прибытие гостей','Напоминания о предстоящих заездах'],['notifyMessage','Сообщения гостей','Отображать уведомления о сообщениях']].map(([id,name,desc])=>`<label class="switch-row"><span><strong>${name}</strong><small>${desc}</small></span><input type="checkbox" name="${id}" ${s[id]?'checked':''}/><i class="switch-ui"></i></label>`).join('')}</div><div class="form-footer"><button class="btn btn-primary" type="submit">${icon('check',18)} Сохранить настройки</button></div></form><aside class="settings-side"><div class="panel settings-brand"><div class="settings-logo">${icon('sun',34)}</div><h3>GelikRooms</h3><p>Ваше пространство для безупречного управления.</p><span>PREMIUM COLLECTION · DEMO</span></div><div class="panel settings-reset"><h3>История изменений</h3><p>Просмотр действий и изменений, внесённых в локальной админке.</p><button class="btn btn-outline" data-nav="activity">${icon('activity',17)} Открыть журнал</button></div><div class="panel settings-reset"><h3>Демоданные</h3><p>Восстановить первоначальные бронирования, отзывы и сообщения.</p><button class="btn btn-outline" data-action="reset-demo">${icon('refresh-cw',17)} Сбросить демоданные</button></div><div class="panel settings-reset"><h3>Резервная копия демо</h3><p>Перенос локальных изменений между браузерами. Не загружайте реальные персональные данные гостей.</p><button class="btn btn-outline" data-action="backup-export">${icon('download',17)} Сохранить JSON</button><label class="backup-import">Загрузить JSON<input id="backup-import" type="file" accept="application/json,.json"/></label></div></aside></div>`;}
function dialogRoomModal(){const id=ui.modal?.id;const existing=getRoom(id);const r=existing||{id:'',name:'',kind:'',size:50,capacity:2,price:7000,active:true,features:[]};return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Редактирование апартаментов"><div class="modal-head"><div><div class="eyebrow">КОЛЛЕКЦИЯ АПАРТАМЕНТОВ</div><h2>${existing?'Управление: '+esc(r.name):'Новые апартаменты'}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div><form id="room-form" class="modal-body"><input type="hidden" name="id" value="${r.id}"/><div class="form-grid"><label>Название<input name="name" value="${esc(r.name)}" required/></label><label>Стоимость за ночь, ₽<input name="price" type="number" min="0" step="100" value="${r.price}" required/></label><label>Площадь, м²<input name="size" type="number" min="1" value="${r.size}" required/></label><label>Максимум гостей<input name="capacity" type="number" min="1" value="${r.capacity}" required/></label></div><label>Описание типа<input name="kind" value="${esc(r.kind)}" required/></label><label>Удобства (через запятую)<input name="features" value="${esc(r.features.join(', '))}"/></label><label class="toggle-simple"><input name="active" type="checkbox" ${r.active?'checked':''}/> Объект доступен для бронирования</label><div class="room-form-gallery"><span class="gallery-mini-icon">${icon('camera',23)}</span><div><strong>Фотогалерея</strong><small>${existing?`${roomPhotos(r).length} фото · управление порядком, обложкой и удалением`: 'Сначала сохраните новый объект, чтобы добавить фотографии'}</small></div>${existing?`<button type="button" class="btn btn-outline" data-action="manage-photos" data-id="${esc(r.id)}">Открыть галерею</button>`:''}</div><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button class="btn btn-primary" type="submit">Сохранить</button></div></form></section></div>`;}
function dialogBookingModal(){const existing=ui.modal?.id?db.bookings.find(b=>b.id===ui.modal.id):null;const selected=ui.modal?.room||existing?.roomId||db.rooms.find(r=>r.active)?.id||db.rooms[0]?.id;const start=ui.modal?.date||existing?.start||day(1);const end=existing?.end||(addDays(start,3));return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="${existing?'Редактировать бронь':'Новая бронь'}"><div class="modal-head"><div><div class="eyebrow">БРОНИРОВАНИЕ</div><h2>${existing?'Редактировать бронь':'Новое бронирование'}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div><form id="booking-form" class="modal-body"><input type="hidden" name="id" value="${esc(existing?.id||'')}"/><div class="form-grid"><label>Имя и фамилия гостя<input name="guest" value="${esc(existing?.guest||'')}" required maxlength="90" placeholder="Например, Анна Петрова"/></label><label>Контактный телефон<input name="phone" value="${esc(existing?.phone||'')}" placeholder="+7 ..."/></label><label>Апартаменты<select name="roomId">${db.rooms.filter(r=>r.active||r.id===selected).map(r=>`<option value="${r.id}" ${r.id===selected?'selected':''}>${esc(r.name)} · ${rub(r.price)}/ночь</option>`).join('')}</select></label><label>Количество гостей<input name="persons" type="number" min="1" value="${existing?.persons||2}" required /></label><label>Заезд<input name="start" type="date" value="${start}" required/></label><label>Выезд<input name="end" type="date" value="${end}" required/></label><label>Источник<select name="source">${['Сайт','Телефон','Суточно.ру','Яндекс Путешествия','Другое'].map(s=>`<option ${existing?.source===s?'selected':''}>${s}</option>`).join('')}</select></label><label>Статус<select name="status">${Object.entries(statusDefs).map(([k,v])=>`<option value="${k}" ${(existing?.status||'confirmed')===k?'selected':''}>${v[0]}</option>`).join('')}</select></label><label>Стоимость брони, ₽ <small>Оставьте пустым для расчёта по тарифу</small><input name="amount" type="number" min="0" step="1" placeholder="Рассчитается автоматически" value="${existing?.amount??''}"/></label><label>Уже оплачено, ₽<input name="paid" type="number" min="0" step="1" value="${existing?.paid||0}"/></label></div><label>Примечание<textarea name="note" rows="2" placeholder="Пожелания гостя и заметки">${esc(existing?.note||'')}</textarea></label><div id="booking-quote" class="booking-quote"><span>${icon('tag',18)} Расчёт по тарифам</span><strong>${rub(amountFor(selected,start,end))}</strong><small>${diffDays(start,end)} ${plural(diffDays(start,end),'ночь','ночи','ночей')} · итог, если поле стоимости оставить пустым</small></div><p id="form-error" class="form-error" role="alert"></p><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">${icon('check',18)} ${existing?'Сохранить':'Создать бронь'}</button></div></form></section></div>`;}
function reviewModal(){const r=db.reviews.find(x=>x.id===ui.modal.id);if(!r)return '';return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Ответ на отзыв"><div class="modal-head"><div><div class="eyebrow">ОТВЕТ НА ОТЗЫВ</div><h2>${esc(r.guest)}</h2></div><button class="icon-button" data-action="close-modal">${icon('x',22)}</button></div><form class="modal-body" id="review-form"><input type="hidden" name="id" value="${r.id}"/><div class="quoted-review">${esc(r.text)}</div><label>Ваш ответ<textarea name="reply" required rows="5" placeholder="Благодарим за отзыв...">${esc(r.reply)}</textarea></label><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button class="btn btn-primary" type="submit">Сохранить ответ</button></div></form></section></div>`;}

function ykStatusText(status) {return ({pending:'Ожидает оплаты',succeeded:'Оплачен',waiting_for_capture:'Ожидает списания',canceled:'Отменён'})[status]||status||'Неизвестно';}
function ykSafeId(value){return /^[\w-]{2,96}$/.test(String(value||''));}
function ykPage() {
 const status=yk.health,items=yk.summary?.bookings||[],payments=yk.summary?.payments||[];
 const paid=payments.filter(p=>p.status==='succeeded').reduce((sum,p)=>sum+p.amount_minor,0)/100;
 const pending=payments.filter(p=>p.status==='pending').length;
 const card=(title,body,ico)=>`<article class="payment-guide-step"><span>${icon(ico,21)}</span><h3>${title}</h3><p>${body}</p></article>`;
 return `${shellTitle('ПЛАТЕЖИ / ИНТЕГРАЦИЯ','ЮKassa','Приём оплаты без банковских данных в админке. Окончательный статус подтверждает только сервер.',false)}
 <div class="yoo-hero"><div><div class="eyebrow">GELIKROOMS · PAYMENT HUB</div><h2>Платежи под контролем</h2><p>Ссылки для гостей, статусы, возвраты и фискальные чеки. Демооперации браузера не считаются онлайн-платежами.</p><div class="yoo-hero-actions"><button class="btn btn-light" data-action="yoo-check">${icon('refresh-cw',17)} Проверить сервер</button>${yk.token?`<button class="btn btn-light-outline" data-action="yoo-logout">Отключить сеанс</button>`:`<button class="btn btn-light-outline" data-action="yoo-connect">${icon('lock',16)} Подключить оператора</button>`}</div></div><div class="yoo-hero-symbol">${icon('shield-check',66)}<span>SECURE PAYMENT</span></div></div>
 <div class="yoo-connection"><div><span class="yoo-led ${status?.configured?'on':'off'}"></span><div><strong>${status?.configured?'Платёжный сервер настроен':status?'Сервер доступен, но магазин не настроен':'Подключение не проверено'}</strong><small>${yk.token?'Сеанс оператора подключён': 'Потребуется HTTPS, Shop ID и серверные ключи. Никаких секретов в исходниках.'}</small></div></div><button class="btn btn-outline" data-action="yoo-check">${icon('refresh-cw',16)} Обновить</button></div>
 ${yk.error?`<p class="yoo-error" role="alert">${esc(yk.error)}</p>`:''}
 <div class="yoo-stats"><div class="yoo-stat"><span>Подтверждено ЮKassa</span><strong>${rub(paid)}</strong><small>Только серверные подтверждения</small></div><div class="yoo-stat"><span>Ожидают оплаты</span><strong>${pending}</strong><small>Ссылки и ожидающие операции</small></div><div class="yoo-stat"><span>Бронирования на сервере</span><strong>${items.length}</strong><small>Без локальных демоброней</small></div></div>
 ${yk.lastUrl?`<div class="yoo-created"><div>${icon('check-circle',21)}<span><strong>Ссылка создана</strong><small>Скопируйте и передайте гостю безопасным каналом.</small></span></div><button class="btn btn-primary" data-action="yoo-copy-url">${icon('external-link',17)} Скопировать ссылку</button></div>`:''}
 <div class="yoo-columns"><section class="panel yoo-panel"><div class="yoo-panel-head"><div><div class="eyebrow">ОПЛАТЫ</div><h2>Бронирования для оплаты</h2><p>Бронь должна существовать на защищённом сервере. Локальные брони демонстрационного интерфейса не отправляются автоматически.</p></div><button class="btn btn-outline" data-action="yoo-refresh" ${!yk.token?'disabled':''}>${icon('refresh-cw',16)} Обновить</button></div>
 ${!yk.token?`<div class="yoo-empty">${icon('lock',27)}<strong>Нет активной сессии оператора</strong><p>Подключите серверный API, чтобы видеть платежи. Не вводите секретный ключ ЮKassa в браузер.</p><button class="btn btn-primary" data-action="yoo-connect">Подключить</button></div>`:
 items.length?`<div class="yoo-items">${items.map(b=>`<div class="yoo-item"><div><strong>${esc(b.label)}</strong><small>${esc(b.booking_id)} · Остаток ${rub((b.amount_minor-b.paid_minor+b.refunded_minor)/100)}</small></div><button class="btn btn-primary" data-action="yoo-checkout" data-id="${esc(b.booking_id)}" ${!status?.configured||yk.busy||b.amount_minor-b.paid_minor+b.refunded_minor<=0?'disabled':''}>${icon('external-link',16)} Создать ссылку</button></div>`).join('')}</div>`:`<div class="yoo-empty">${icon('credit-card',27)}<strong>Бронирований пока нет</strong><p>В production они поступают с защищённого сервера бронирования. Ручное создание демоброни допускается только в изолированной тестовой среде.</p></div>`}
 </section><section class="panel yoo-panel"><div class="yoo-panel-head"><div><div class="eyebrow">СТАТУСЫ</div><h2>Операции ЮKassa</h2><p>Возвраты доступны только после сверки подтверждённого платежа.</p></div></div>
 ${payments.length?`<div class="yoo-items">${payments.map(p=>`<div class="yoo-item yoo-payment-row"><div><strong>${esc(p.booking_id)} · ${rub(p.amount_minor/100)}</strong><small>${ykStatusText(p.status)} · ${esc(p.payment_id)}</small></div><div class="yoo-inline-actions"><button class="yoo-icon-action" title="Проверить статус" aria-label="Проверить статус" data-action="yoo-reconcile" data-id="${esc(p.payment_id)}">${icon('refresh-cw',18)}</button>${p.status==='succeeded'?`<button class="yoo-icon-action" title="Возврат" aria-label="Оформить возврат" data-action="yoo-refund" data-id="${esc(p.payment_id)}">${icon('refresh-cw',18)}</button>`:''}</div></div>`).join('')}</div>`:`<div class="yoo-empty">${icon('receipt',27)}<strong>Нет подтверждённых операций</strong><p>После подключения магазина здесь появятся статусы платежей.</p></div>`}
 </section></div>
 <div class="yoo-guide">${card('1. Бронирование','Проверить даты, стоимость и контакт гостя в защищённой базе.', 'calendar-check')}${card('2. Оплата','Создать ссылку на страницу ЮKassa и отправить гостю.', 'credit-card')}${card('3. Подтверждение','Дождаться серверного webhook и сверки объекта через API.', 'shield-check')}${card('4. Чек и возврат','Хранить статус чека и проводить возврат через сервер.', 'receipt')}</div>
 <p class="yoo-footnote">${icon('info',16)} Прототип frontend и независимый платёжный сервер. Для запуска на gelikrooms.ru необходимы реальные авторизованные брони, защищённая сессия, кассовые настройки и тестирование с магазином ЮKassa.</p>`;
}
function yooConnectionModal(){return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Подключение к платежному серверу"><div class="modal-head"><div><div class="eyebrow">ПЛАТЁЖНЫЙ СЕРВЕР / СЕАНС</div><h2>Подключение оператора</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">${icon('x',22)}</button></div><form class="modal-body" id="yoo-connect-form"><div class="notice-box">${icon('lock',18)} Укажите административный токен отдельного сервера GelikRooms, не секретный ключ магазина ЮKassa. Токен действует только в текущей вкладке и не сохраняется в браузере.</div><label>Токен оператора<input name="token" type="password" autocomplete="off" minlength="24" placeholder="Токен сервера GelikRooms" required/></label><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button type="submit" class="btn btn-primary">Подключить</button></div></form></section></div>`;}
function yooRefundModal(){const p=yk.summary?.payments?.find(x=>x.payment_id===ui.modal.id);return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Возврат платежа"><div class="modal-head"><div><div class="eyebrow">ЮKASSA / ВОЗВРАТ</div><h2>Оформить возврат</h2></div><button class="icon-button" data-action="close-modal">${icon('x',22)}</button></div><form class="modal-body" id="yoo-refund-form"><p class="notice-box">${icon('info',18)} Это реальная финансовая операция при подключённом магазине. Подтвердите сумму и право на возврат.</p><label>Сумма, ₽<input name="amount_rub" type="number" min="1" step="0.01" max="${p?(p.amount_minor/100).toFixed(2):0}" value="${p?(p.amount_minor/100).toFixed(2):0}" required/></label><div class="modal-actions"><button class="btn btn-outline" type="button" data-action="close-modal">Отмена</button><button class="btn btn-danger" type="submit">Подтвердить возврат</button></div></form></section></div>`;}
async function yooRequest(path,options={}){const headers={'Content-Type':'application/json',...(yk.token?{'Authorization':'Bearer '+yk.token}:{})};const res=await fetch(path,{...options,credentials:'same-origin',cache:'no-store',headers});let data;try{data=await res.json()}catch(_){throw new Error('Сервер не ответил JSON. Настройте reverse proxy для /api/')}if(!res.ok)throw new Error(typeof data.detail==='string'?data.detail:`Ошибка сервера ${res.status}`);return data;}
async function yooHealth(){yk.busy=true;yk.error='';try{yk.health=await yooRequest('/api/health');if(yk.token)await yooRefresh();else render();}catch(e){yk.health=null;yk.error='Платёжный сервер не подключён: '+e.message;render();}finally{yk.busy=false;}}
async function yooRefresh(){if(!yk.token)return;yk.busy=true;yk.error='';try{yk.summary=await yooRequest('/api/admin/summary');render();}catch(e){yk.error=e.message;yk.summary=null;render();}finally{yk.busy=false;}}
async function yooCheckout(id){if(!yk.token||!ykSafeId(id))return;yk.busy=true;yk.error='';try{const result=await yooRequest('/api/admin/payments/checkout',{method:'POST',body:JSON.stringify({booking_id:id})});yk.lastUrl=result.confirmation_url||'';toast(result.reused?'Существующая ссылка открыта':'Платёжная ссылка создана');await yooRefresh();}catch(e){yk.error=e.message;render();}finally{yk.busy=false;}}
async function yooReconcile(id){if(!yk.token||!ykSafeId(id))return;try{const result=await yooRequest('/api/admin/payments/'+encodeURIComponent(id)+'/reconcile',{method:'POST'});toast('Статус ЮKassa: '+ykStatusText(result.status));await yooRefresh();}catch(e){yk.error=e.message;render();}}
async function yooConnect(form){const value=form.elements.token.value.trim();yk.token=value;ui.modal=null;await yooHealth();if(yk.error){yk.token='';toast('Не удалось подключиться: проверьте настройки',true);}else toast('Сеанс оператора подключён');}
async function yooRefund(form){const id=ui.modal?.id;if(!ykSafeId(id)||!yk.token)return;const amount=Number(form.elements.amount_rub.value);if(!Number.isFinite(amount)||amount<=0)return;if(!confirm(`Подтвердить возврат ${rub(amount)} через ЮKassa?`))return;ui.modal=null;try{const result=await yooRequest('/api/admin/payments/'+encodeURIComponent(id)+'/refund',{method:'POST',body:JSON.stringify({amount_rub:amount.toFixed(2)})});toast(result.status==='succeeded'?'Возврат подтверждён ЮKassa':'Возврат отправлен. Дождитесь подтверждения.');await yooRefresh();}catch(e){yk.error=e.message;render();}}
function modalMarkup(){if(!ui.modal)return '';return ui.modal.type==='booking'?dialogBookingModal():ui.modal.type==='room'?dialogRoomModal():ui.modal.type==='photos'?photoManagerModal():ui.modal.type==='task'?taskModal():ui.modal.type==='block'?blockModal():ui.modal.type==='rate'?rateModal():ui.modal.type==='payment'?paymentModal():ui.modal.type==='yoo-connect'?yooConnectionModal():ui.modal.type==='yoo-refund'?yooRefundModal():ui.modal.type==='guest-meta'?guestMetaModal():reviewModal();}
function bookingDetail(b){const r=getRoom(b.roomId);return `<div class="drawer-backdrop" data-action="close-detail"></div><aside class="detail-drawer" role="dialog" aria-modal="true" aria-label="Информация о бронировании"><div class="drawer-head"><div><div class="eyebrow">БРОНИРОВАНИЕ ${esc(b.id)}</div><h2>Детали размещения</h2></div><button class="icon-button" data-action="close-detail">${icon('x',22)}</button></div><div class="drawer-content"><div class="detail-hero">${r?photoHero(r):roomArt()}<div><span>GELIKROOMS COLLECTION</span><h3>${esc(r?.name||'Апартаменты')}</h3></div></div><div class="detail-guest"><span class="person-avatar large">${esc(initials(b.guest))}</span><div><strong>${esc(b.guest)}</strong><p>${esc(b.phone||'Номер не указан')}</p></div></div><div class="drawer-status">${bookingStatus(b.status)}</div><div class="detail-grid"><div><small>Дата заезда</small><strong>${ruDate(b.start,{day:'numeric',month:'long',year:'numeric'})}</strong></div><div><small>Дата выезда</small><strong>${ruDate(b.end,{day:'numeric',month:'long',year:'numeric'})}</strong></div><div><small>Продолжительность</small><strong>${diffDays(b.start,b.end)} ${plural(diffDays(b.start,b.end),'ночь','ночи','ночей')}</strong></div><div><small>Количество гостей</small><strong>${b.persons}</strong></div><div><small>Источник</small><strong>${esc(b.source)}</strong></div><div><small>Статус оплаты</small><strong>${b.paid>=b.amount?'Оплачено':'Частично / не оплачено'}</strong></div></div><div class="detail-payment"><div><span>Общая стоимость</span><strong>${rub(b.amount)}</strong></div><div><span>Оплачено</span><strong>${rub(b.paid)}</strong></div><div class="payment-left"><span>Остаток</span><strong>${rub(b.amount-b.paid)}</strong></div></div>${b.note?`<div class="detail-note"><b>Примечание</b><p>${esc(b.note)}</p></div>`:''}<label class="detail-select">Изменить статус<select data-booking-status="${b.id}">${Object.entries(statusDefs).map(([k,v])=>`<option value="${k}" ${b.status===k?'selected':''}>${v[0]}</option>`).join('')}</select></label><div class="detail-ledger"><h3>История оплат</h3>${db.payments.filter(p=>p.bookingId===b.id).map(p=>`<div><span>${esc(p.method)} · ${ruDate(p.date)}</span><strong class="${p.amount<0?'money-out':'money-in'}">${p.amount<0?'−':'+'}${rub(Math.abs(p.amount))}</strong></div>`).join('')||'<p>Платежей не было</p>'}<button class="btn btn-outline" data-action="new-payment" data-booking-id="${b.id}">${icon('plus',16)} Добавить операцию</button><button class="btn btn-yoo" data-nav="yookassa">${icon('credit-card',16)} ЮKassa: онлайн-оплаты</button></div><div class="drawer-buttons">${['confirmed','pending'].includes(b.status)&&b.start<=day()&&b.end>day()?`<button class="btn btn-accent" data-action="quick-checkin" data-id="${b.id}">${icon('check-circle',17)} Заселить гостя</button>`:''}${b.status==='checked_in'?`<button class="btn btn-accent" data-action="quick-checkout" data-id="${b.id}">${icon('check',17)} Завершить проживание</button>`:''}<button class="btn btn-primary" data-action="edit-booking" data-id="${b.id}">${icon('edit',17)} Редактировать</button>${b.paid<b.amount?`<button class="btn btn-outline" data-action="mark-paid" data-id="${b.id}">${icon('check-circle',17)} Оплачено полностью</button>`:''}<button class="btn btn-danger" data-action="cancel-booking" data-id="${b.id}">${icon('trash',17)} Отменить бронь</button></div></div></aside>`;}
function guestDetail(name){const g=getGuests().find(x=>x.name===name);if(!g)return '';return `<div class="drawer-backdrop" data-action="close-detail"></div><aside class="detail-drawer" role="dialog" aria-modal="true" aria-label="Карточка гостя"><div class="drawer-head"><div><div class="eyebrow">КАРТОЧКА ГОСТЯ</div><h2>Профиль гостя</h2></div><button class="icon-button" data-action="close-detail">${icon('x',22)}</button></div><div class="drawer-content"><div class="guest-profile"><span class="person-avatar xlarge">${esc(initials(name))}</span><h2>${esc(name)}</h2><p>${esc(g.last.phone)}</p></div><div class="guest-stats"><div><strong>${g.visits}</strong><small>Бронирований</small></div><div><strong>${rub(g.total)}</strong><small>Оплачено</small></div></div><div class="guest-vip-note">${db.guestMeta?.[name]?.vip?`<b>★ Постоянный гость / VIP</b>`:''}${db.guestMeta?.[name]?.note?`<p>${esc(db.guestMeta[name].note)}</p>`:'<p>Заметки пока нет</p>'}<button class="subtle-button" data-action="edit-guest-meta" data-name="${esc(name)}">${icon('edit',16)} Изменить заметку</button></div><h3>История размещений</h3>${g.history.map(b=>`<button class="guest-history" data-booking="${b.id}"><span><strong>${esc(roomName(b.roomId))}</strong><small>${ruDate(b.start)} – ${ruDate(b.end)} · ${b.id}</small></span>${bookingStatus(b.status)}</button>`).join('')}</div></aside>`;}
function detailMarkup(){if(!ui.detail)return '';return ui.detail.type==='booking'?bookingDetail(db.bookings.find(b=>b.id===ui.detail.id)||db.bookings[0]):guestDetail(ui.detail.name);}
function render(){const pages={overview,bookings:bookingsPage,calendar:calendarPage,rooms:roomsPage,rates:ratesPage,operations:operationsPage,guests:guestsPage,finance:financePage,yookassa:ykPage,reports:reportsPage,messages:messagesPage,reviews:reviewsPage,activity:activityPage,settings:settingsPage};document.title=`${pageNames[ui.page]} · GelikRooms`;document.getElementById('app').innerHTML=`<div class="app-shell">${sidebar()}${ui.mobileMenu?'<div class="mobile-overlay" data-action="toggle-menu"></div>':''}<div class="main-shell">${topbar()}<main class="main-content" id="main-content">${pages[ui.page]()}</main></div>${mobileBottom()}${['overview','bookings','calendar'].includes(ui.page)?`<button class="mobile-fab" aria-label="Новая бронь" data-action="new-booking">${icon('plus',24)}</button>`:''}</div>${modalMarkup()}${detailMarkup()}${photoLightbox()}`;if(ui.page==='calendar'){const pane=document.querySelector('.cal-viewport');if(pane && ui.calendarYear===new Date().getFullYear() && ui.calendarMonth===new Date().getMonth()){pane.scrollLeft=Math.max(0,(new Date().getDate()-8)*58);}}if(ui.page==='messages'){const chat=document.querySelector('.chat-body');if(chat)chat.scrollTop=chat.scrollHeight;}}
function goto(page){if(!pageNames[page])return;ui.page=page;ui.mobileMenu=false;ui.search='';ui.filter='all';ui.detail=null;ui.modal=null;location.hash=page;render();window.scrollTo(0,0);}
function toast(message,bad=false){const root=document.getElementById('toast-root');root.innerHTML=`<div class="toast ${bad?'bad':''}">${icon(bad?'info':'check-circle',19)}<span>${esc(message)}</span></div>`;clearTimeout(window.__toastTimeout);window.__toastTimeout=setTimeout(()=>root.innerHTML='',3500);}
function openBooking(id){const b=db.bookings.find(b=>b.id===id);if(b){ui.modal=null;ui.detail={type:'booking',id};render();}}
function openGuest(name){ui.detail={type:'guest',name};render();}
function openBookingModal(id=null,room=null,date=null){ui.detail=null;ui.modal={type:'booking',id,room,date};render();requestAnimationFrame(()=>document.querySelector('#booking-form [name="guest"]')?.focus());}
function searchRerender(input){const selStart=input.selectionStart,selEnd=input.selectionEnd,name=input.getAttribute('data-search');ui.search=input.value;render();const newInput=document.querySelector(`[data-search="${name}"]`);if(newInput){newInput.focus();newInput.setSelectionRange(selStart,selEnd);}}
function parseForm(form){return Object.fromEntries(new FormData(form).entries());}
function saveBooking(form){const v=parseForm(form);const err=document.getElementById('form-error');const persons=Number(v.persons),amount=v.amount===''?amountFor(v.roomId,v.start,v.end):Number(v.amount),paid=Number(v.paid||0);if(!v.guest.trim()||!v.start||!v.end||v.start>=v.end){err.textContent='Проверьте имя гостя и даты заезда и выезда.';return;}if(!Number.isFinite(persons)||persons<1||persons>(getRoom(v.roomId)?.capacity||0)){err.textContent=`Максимум гостей для выбранного объекта: ${getRoom(v.roomId)?.capacity}.`;return;}if(!Number.isFinite(amount)||amount<0||!Number.isFinite(paid)||paid<0||paid>amount){err.textContent='Проверьте стоимость и сумму оплаты. Оплата не может превышать общую сумму.';return;}if(v.status!=='cancelled'&&bookingClash(v.roomId,v.start,v.end,v.id)){err.textContent='Этот объект уже забронирован на выбранные даты. Выберите другой период.';return;}if(v.status!=='cancelled'&&blockClash(v.roomId,v.start,v.end)){err.textContent='На эти даты объект закрыт для обслуживания.';return;}const current=db.bookings.find(b=>b.id===v.id);const previousPaid=current?.paid||0;const id=current?.id||`B-${Math.max(1100,...db.bookings.map(b=>Number(b.id.replace(/\D/g,''))||0))+1}`;const record={id,guest:v.guest.trim(),phone:v.phone.trim(),roomId:v.roomId,persons,start:v.start,end:v.end,source:v.source,status:v.status,amount,paid,note:v.note.trim()};if(current){Object.assign(current,record);}else db.bookings.unshift(record);if(paid!==previousPaid)recordPayment({id,paid:previousPaid},paid-previousPaid,'Корректировка','Из формы бронирования');recordActivity('booking',current?'Изменено бронирование':'Создано бронирование',`${record.id} · ${record.guest}`);save();ui.modal=null;ui.detail={type:'booking',id};render();toast(current?'Бронирование обновлено':'Бронирование создано');}
function saveRoom(form){
 const v=parseForm(form);const r=getRoom(v.id);const price=Number(v.price),size=Number(v.size),capacity=Number(v.capacity);
 if(!v.name.trim()||!v.kind.trim()||!Number.isFinite(price)||price<0||!Number.isFinite(size)||size<1||!Number.isInteger(capacity)||capacity<1){toast('Проверьте параметры апартаментов',true);return;}
 if(r && db.bookings.some(b=>b.roomId===r.id&&activeBooking(b)&&b.persons>capacity)){toast('Нельзя снизить вместимость: есть брони на большее число гостей',true);return;}
 const data={name:v.name.trim(),kind:v.kind.trim(),price,size,capacity,active:!!form.elements.active.checked,features:v.features.split(',').map(t=>t.trim()).filter(Boolean)};
 if(r){Object.assign(r,data);}else db.rooms.push({id:serialId('ROOM',db.rooms),tone:['sea','gold','blue','sage'][db.rooms.length%4],photos:[],coverPhotoId:null,...data});
 const roomId=r?.id||db.rooms[db.rooms.length-1].id;recordActivity('room',r?'Изменены апартаменты':'Добавлены апартаменты',data.name);save();ui.modal=r?null:{type:'photos',id:roomId};render();toast(r?'Данные апартаментов сохранены':'Апартаменты добавлены. Теперь загрузите фото');
}
function updateSettings(form){const v=parseForm(form);db.settings={...db.settings,...v,notifyBooking:!!form.elements.notifyBooking.checked,notifyArrival:!!form.elements.notifyArrival.checked,notifyMessage:!!form.elements.notifyMessage.checked};recordActivity('system','Изменены настройки','Основная информация и уведомления');save();toast('Настройки сохранены');}
function exportBookings(){const cols=['ID','Гость','Телефон','Апартаменты','Заезд','Выезд','Гостей','Сумма','Оплачено','Статус'];const lines=[cols,...db.bookings.map(b=>[b.id,b.guest,b.phone,roomName(b.roomId),b.start,b.end,b.persons,b.amount,b.paid,statusDefs[b.status][0]])];const csv='\ufeff'+lines.map(row=>row.map(v=>{let t=String(v);if(/^[\s]*[=+@-]/.test(t) && !/^-[0-9]+$/.test(t))t=`'${t}`;return `"${t.replaceAll('\"','\"\"')}"`;}).join(';')).join('\r\n');const file=new Blob([csv],{type:'text/csv;charset=utf-8'});const href=URL.createObjectURL(file);const a=document.createElement('a');a.href=href;a.download='gelikrooms-bookings-demo.csv';a.click();setTimeout(()=>URL.revokeObjectURL(href),2000);toast('CSV экспортирован');}
async function exportBackup(){
 try{
  const photos=[];
  for(const meta of db.rooms.flatMap(roomPhotos)){
   const blob=await photoStoreRead(meta.id);
   if(!blob)throw new Error(`Не найден снимок ${meta.name}. Копия не создана.`);
   photos.push({id:meta.id,dataUrl:await fileToDataUrl(blob)});
  }
  const payload={schema:'gelikrooms.demo.v4',createdAt:new Date().toISOString(),data:db,photos};
  const blob=new Blob([JSON.stringify(payload)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`gelikrooms-backup-with-photos-${day()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
  toast(`Резервная копия с ${photos.length} фотографиями сохранена`);
 }catch(e){toast(`Не удалось создать копию: ${e.message}`,true);}
}
async function importBackup(file){
 if(!file)return;
 if(file.size>100_000_000){toast('Файл слишком большой: максимум 100 МБ',true);return;}
 try{
  const parsed=JSON.parse(await file.text());
  if(!['gelikrooms.demo.v2','gelikrooms.demo.v3','gelikrooms.demo.v4'].includes(parsed.schema))throw new Error('Неверный формат резервной копии');
  const data=parsed.data;
  if(!data||!Array.isArray(data.rooms)||!Array.isArray(data.bookings)||!Array.isArray(data.tasks)||!Array.isArray(data.blocks)||!Array.isArray(data.messages)||!Array.isArray(data.reviews)||!data.settings)throw new Error('Неполная резервная копия');
  const ids=new Set(data.rooms.map(r=>r.id));const safeId=x=>typeof x==='string'&&/^[a-zA-Z0-9_-]{1,60}$/.test(x);const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(asDate(x).getTime());
  if(!data.rooms.every(r=>safeId(r.id)&&typeof r.name==='string'&&typeof r.kind==='string'&&['sea','gold','blue','sage'].includes(r.tone)&&Array.isArray(r.features)&&r.features.every(t=>typeof t==='string')&&Number.isFinite(r.price)&&r.price>=0&&Number.isFinite(r.size)&&r.size>0&&Number.isInteger(r.capacity)&&r.capacity>=1)||ids.size!==data.rooms.length)throw new Error('Некорректные апартаменты');
  if(!data.bookings.every(b=>safeId(b.id)&&ids.has(b.roomId)&&typeof b.guest==='string'&&validDate(b.start)&&validDate(b.end)&&b.start<b.end&&Number.isInteger(b.persons)&&b.persons>=1&&b.persons<=data.rooms.find(r=>r.id===b.roomId).capacity&&Number.isFinite(b.amount)&&b.amount>=0&&Number.isFinite(b.paid)&&b.paid>=0&&b.paid<=b.amount&&statusDefs[b.status]))throw new Error('Некорректные бронирования');
  if(!data.blocks.every(b=>safeId(b.id)&&ids.has(b.roomId)&&validDate(b.start)&&validDate(b.end)&&b.start<b.end&&typeof b.reason==='string')||!data.tasks.every(t=>safeId(t.id)&&ids.has(t.roomId)&&validDate(t.date)&&typeof t.note==='string'&&typeof t.assignee==='string'&&taskStatuses[t.status]))throw new Error('Некорректные задачи и блокировки');
  if(!data.messages.every(m=>safeId(m.id)&&typeof m.guest==='string'&&typeof m.subject==='string'&&Array.isArray(m.items)&&m.items.every(x=>['staff','guest'].includes(x.from)&&typeof x.text==='string'&&typeof x.time==='string'))||!data.reviews.every(r=>safeId(r.id)&&typeof r.text==='string'&&typeof r.guest==='string'&&typeof r.reply==='string'&&Number.isFinite(r.rating)))throw new Error('Некорректные сообщения и отзывы');
  if(['gelikrooms.demo.v3','gelikrooms.demo.v4'].includes(parsed.schema)){
   if(!Array.isArray(data.rates)||!data.rates.every(r=>safeId(r.id)&&ids.has(r.roomId)&&typeof r.label==='string'&&r.label.length<=100&&validDate(r.start)&&validDate(r.end)&&r.start<r.end&&Number.isFinite(r.price)&&r.price>0))throw new Error('Некорректные тарифы');
   if(data.rates.some((r,i)=>data.rates.slice(i+1).some(x=>r.roomId===x.roomId&&overlaps(r.start,r.end,x.start,x.end))))throw new Error('Пересечения тарифов');
   if(!Array.isArray(data.payments)||!data.payments.every(p=>safeId(p.id)&&data.bookings.some(b=>b.id===p.bookingId)&&validDate(p.date)&&Number.isFinite(p.amount)&&p.amount!==0&&typeof p.method==='string'&&typeof p.note==='string'))throw new Error('Некорректные платежи');
   if(data.bookings.some(b=>Math.abs(b.paid-data.payments.filter(p=>p.bookingId===b.id).reduce((a,p)=>a+p.amount,0))>0.01))throw new Error('Баланс платежей не совпадает с бронями');
   if(!Array.isArray(data.activity)||!data.activity.every(a=>typeof a.date==='string'&&!Number.isNaN(new Date(a.date).getTime())&&typeof a.kind==='string'&&typeof a.title==='string'&&typeof a.description==='string'))throw new Error('Некорректный журнал событий');
  }
  if(data.bookings.some((b,i)=>activeBooking(b)&&data.bookings.slice(i+1).some(other=>activeBooking(other)&&b.roomId===other.roomId&&overlaps(b.start,b.end,other.start,other.end)))||data.blocks.some(block=>data.bookings.some(b=>activeBooking(b)&&b.roomId===block.roomId&&overlaps(b.start,b.end,block.start,block.end)))||data.blocks.some((block,i)=>data.blocks.slice(i+1).some(other=>block.roomId===other.roomId&&overlaps(block.start,block.end,other.start,other.end))))throw new Error('Есть пересечения бронирований и закрытых дат');
  let importedPhotos=[];
  if(parsed.schema==='gelikrooms.demo.v4'){
   if(!Array.isArray(parsed.photos))throw new Error('Отсутствует галерея фотографий');
   const allIds=data.rooms.flatMap(r=>r.photos||[]).map(p=>p.id);
   if(allIds.length>data.rooms.length*PHOTO_MAX_PER_ROOM||new Set(allIds).size!==allIds.length||allIds.length!==parsed.photos.length)throw new Error('Неверное количество фотографий');
   if(!data.rooms.every(r=>Array.isArray(r.photos)&&r.photos.length<=PHOTO_MAX_PER_ROOM&&r.photos.every(p=>safeId(p.id)&&typeof p.name==='string'&&p.name.length<130&&(p.caption===undefined||typeof p.caption==='string'&&p.caption.length<=140)&&Number.isFinite(p.size)&&Number.isInteger(p.width)&&Number.isInteger(p.height)&&p.width>0&&p.height>0&&p.width<=PHOTO_MAX_EDGE&&p.height<=PHOTO_MAX_EDGE)&&(!r.coverPhotoId||r.photos.some(p=>p.id===r.coverPhotoId))))throw new Error('Повреждены метаданные фотографий');
   importedPhotos=parsed.photos.map(p=>{if(!safeId(p.id)||!allIds.includes(p.id)||typeof p.dataUrl!=='string')throw new Error('Некорректная фотография');const blob=dataUrlToBlob(p.dataUrl);if(blob.size>PHOTO_MAX_FILE_BYTES)throw new Error('Слишком большая фотография');return {id:p.id,blob};});
  }
  if(!confirm('Заменить текущие данные? В том числе фотографии. Сначала сохраните резервную копию текущей галереи.'))return;
  await photoStoreReplace(importedPhotos);clearPhotoUrls();
  db={...seed(),...data,rooms:data.rooms.map(r=>({...r,photos:parsed.schema==='gelikrooms.demo.v4'?r.photos:[],coverPhotoId:parsed.schema==='gelikrooms.demo.v4'?r.coverPhotoId:null})),rates:Array.isArray(data.rates)?data.rates:[],payments:Array.isArray(data.payments)?data.payments:data.bookings.filter(b=>b.paid>0).map((b,i)=>({id:`PM-${1001+i}`,bookingId:b.id,date:b.start,amount:b.paid,method:'Импорт v2',note:'Миграция'})),activity:Array.isArray(data.activity)?data.activity:[],guestMeta:data.guestMeta||{}};recordActivity('system','Импорт данных','Восстановление резервной копии');save();ui.modal=null;ui.detail=null;ui.search='';render();await hydratePhotos();toast('Резервная копия загружена, включая фотографии');
 }catch(e){toast(`Не удалось загрузить JSON: ${e.message}`,true);}
}

// === GelikRooms v3 · tariff engine, receipts ledger, reporting, guest care and activity ===
function recordActivity(kind,title,description='') {
  db.activity ||= [];
  db.activity.unshift({id:`EV-${Date.now()}-${Math.floor(Math.random()*999)}`,date:new Date().toISOString(),kind,title,description:String(description)});
  db.activity=db.activity.slice(0,150);
}
function recordPayment(b,amount,method='Перевод',note='',date=day()) {
  if(!b||!Number.isFinite(amount)||!amount)return;
  db.payments ||= [];
  db.payments.push({id:serialId('PM',db.payments),bookingId:b.id,date,amount,method,note});
  b.paid=Math.max(0,Math.round((b.paid+amount)*100)/100);
  recordActivity('payment',amount>0?'Получена оплата':'Оформлен возврат',`${b.id} · ${rub(Math.abs(amount))} · ${method}`);
}
function barMini(value,max,extra='') {
  return `<div class="meter ${extra}" role="meter" aria-valuemin="0" aria-valuemax="${Math.max(1,max)}" aria-valuenow="${Math.max(0,value)}"><span style="width:${Math.min(100,100*value/Math.max(1,max))}%"></span></div>`;
}
function ratesPage() {
  const selected=[...db.rates].sort((a,b)=>a.start.localeCompare(b.start));
  const affected=new Set(selected.filter(r=>r.end>day()).map(r=>r.roomId));
  const rateRows=db.rooms.filter(r=>r.active).map(r=>{
    const next=Array.from({length:7},(_,i)=>({date:day(i),price:nightlyRate(r.id,day(i)),special:db.rates.some(a=>a.roomId===r.id&&a.start<=day(i)&&a.end>day(i))}));
    return `<article class="panel rate-room"><div class="rate-room-heading"><div class="rate-ico">${icon('bed-double',21)}</div><div><strong>${esc(r.name)}</strong><small>${esc(r.kind)} · базовый тариф ${rub(r.price)}</small></div><button data-action="new-rate" data-room="${r.id}" class="subtle-button">${icon('plus',16)} Период</button></div><div class="rate-days">${next.map(x=>`<div class="rate-day ${x.special?'special':''}"><span>${ruDate(x.date,{weekday:'short'})}</span><b>${rub(x.price)}</b><small>${ruDate(x.date,{day:'numeric',month:'short'})}</small></div>`).join('')}</div></article>`;
  }).join('');
  return `${shellTitle('УПРАВЛЕНИЕ / ТАРИФЫ','Тарифы и сезонность','Управляйте стоимостью каждой ночи и специальными периодами.',false)}
  <div class="inline-actions"><button class="btn btn-primary" data-action="new-rate">${icon('plus',17)} Создать тарифный период</button><button class="btn btn-outline" data-nav="calendar">${icon('calendar-days',16)} Календарь занятости</button></div>
  <div class="rate-hero"><div><span class="eyebrow">УМНОЕ ЦЕНООБРАЗОВАНИЕ</span><h2>Правильная цена.<br><em>В правильный день.</em></h2><p>Периоды переопределяют базовую цену объекта. Новая бронь рассчитывается по каждой ночи отдельно.</p></div><div class="rate-hero-badge"><strong>${selected.length}</strong><span>тарифных периодов</span><small>${affected.size} объекта с особой ценой</small></div></div>
  <div class="rate-collection">${rateRows}</div>
  <section class="panel ops-panel rate-table-panel">${tileTitle('Сезонные периоды','Редактируйте правила или удаляйте больше не актуальные')}
  <div class="rate-period-list">${selected.map(r=>`<article class="rate-period"><span class="rate-period-icon">${icon('tag',20)}</span><div class="rate-period-main"><strong>${esc(r.label)}</strong><small>${esc(roomName(r.roomId))} · ${ruDate(r.start)} – ${ruDate(r.end)} (выезд, не включительно)</small></div><strong>${rub(r.price)}<span> / ночь</span></strong><button class="icon-button" aria-label="Изменить" data-action="edit-rate" data-id="${r.id}">${icon('edit',17)}</button></article>`).join('')}${!selected.length?empty('Пока нет тарифов','Базовые цены продолжают действовать.'):''}</div>
  </section><p class="data-note">${icon('info',15)} Изменение тарифа не пересчитывает уже подтверждённые бронирования. Все значения демонстрационные.</p>`;
}
function rateModal() {
  const r=db.rates.find(x=>x.id===ui.modal?.id)||{id:'',roomId:ui.modal?.room||db.rooms[0]?.id,start:day(1),end:day(8),price:9900,label:''};
  return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Тарифный период"><div class="modal-head"><div><div class="eyebrow">ЦЕНООБРАЗОВАНИЕ</div><h2>${r.id?'Редактировать тариф':'Новый тариф'}</h2></div><button class="icon-button" data-action="close-modal">${icon('x',22)}</button></div><form id="rate-form" class="modal-body"><input type="hidden" name="id" value="${esc(r.id)}"/><label>Название периода<input name="label" required maxlength="60" value="${esc(r.label)}" placeholder="Например, Бархатный сезон"/></label><label>Апартаменты<select name="roomId">${db.rooms.map(room=>`<option value="${room.id}" ${room.id===r.roomId?'selected':''}>${esc(room.name)}</option>`).join('')}</select></label><div class="form-grid"><label>Начало (включительно)<input name="start" type="date" value="${r.start}" required/></label><label>Конец (не включительно)<input name="end" type="date" value="${r.end}" required/></label></div><label>Цена за ночь, ₽<input name="price" type="number" min="1" step="100" required value="${r.price}"/></label><p id="form-error" class="form-error" role="alert"></p><div class="modal-actions">${r.id?`<button type="button" class="btn btn-danger" data-action="delete-rate" data-id="${r.id}">${icon('trash',16)} Удалить</button>`:''}<button class="btn btn-primary" type="submit">${icon('check',17)} Сохранить</button></div></form></section></div>`;
}
function saveRate(form) {
  const v=parseForm(form),err=document.getElementById('form-error');
  if(!getRoom(v.roomId)||!v.label.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(v.start)||!/^\d{4}-\d{2}-\d{2}$/.test(v.end)||v.start>=v.end||diffDays(v.start,v.end)>365||!Number.isFinite(Number(v.price))||Number(v.price)<=0){err.textContent='Заполните название, период до 365 ночей и положительную стоимость.';return;}
  if(db.rates.some(r=>r.id!==v.id&&r.roomId===v.roomId&&overlaps(r.start,r.end,v.start,v.end))){err.textContent='Для этих апартаментов уже есть специальный тариф на выбранные даты.';return;}
  const item=db.rates.find(r=>r.id===v.id),data={roomId:v.roomId,start:v.start,end:v.end,price:Number(v.price),label:v.label.trim()};
  if(item)Object.assign(item,data);else db.rates.push({id:serialId('RT',db.rates),...data});
  recordActivity('rate',item?'Обновлён тариф':'Создан тариф',`${data.label} · ${roomName(data.roomId)}`);save();ui.modal=null;render();toast(item?'Тариф обновлён':'Тариф создан');
}
function financialTotals() {
  const active=db.bookings.filter(b=>b.status!=='cancelled');
  return {received:db.payments.reduce((a,p)=>a+p.amount,0),gross:db.payments.filter(p=>p.amount>0).reduce((a,p)=>a+p.amount,0),refunded:-db.payments.filter(p=>p.amount<0).reduce((a,p)=>a+p.amount,0),due:active.reduce((a,b)=>a+Math.max(0,b.amount-b.paid),0),total:active.reduce((a,b)=>a+b.amount,0)};
}
function financePage() {
  const t=financialTotals(),q=ui.search.toLowerCase();
  const payments=[...db.payments].filter(p=>{const b=db.bookings.find(x=>x.id===p.bookingId);return [p.id,p.method,p.note,p.bookingId,b?.guest||'',roomName(b?.roomId)].some(x=>String(x).toLowerCase().includes(q));}).sort((a,b)=>b.date.localeCompare(a.date));
  const debt=db.bookings.filter(b=>b.status!=='cancelled'&&b.amount>b.paid).sort((a,b)=>b.amount-b.paid-(a.amount-a.paid)).slice(0,5);
  return `${shellTitle('ФИНАНСЫ / ДВИЖЕНИЕ СРЕДСТВ','Финансы и платежи','Оплаты, возвраты и обязательства в едином реестре.',false)}
  <div class="inline-actions"><button class="btn btn-primary" data-action="new-payment">${icon('plus',17)} Записать оплату</button><button class="btn btn-outline" data-action="export-payments">${icon('download',16)} Скачать операции CSV</button><button class="btn btn-yoo" data-nav="yookassa">${icon('credit-card',17)} ЮKassa</button><button class="btn btn-outline" data-nav="reports">${icon('bar-chart',16)} Отчёты</button></div>
  <div class="kpi-grid">${kpi('Получено',rub(t.received),'С учётом возвратов','wallet','','teal')}${kpi('Объём бронирований',rub(t.total),'Без отменённых','receipt','','blue')}${kpi('Осталось получить',rub(t.due),'По активным броням','clock','','gold')}${kpi('Возвраты',rub(t.refunded),'Отрицательные операции','refresh-cw','','gold')}</div>
  <div class="content-grid finance-content"><section class="panel revenue-panel">${tileTitle('Денежный поток','Поступления минус возвраты, по месяцам')}${chartBars(true)}</section><section class="panel arrivals-panel">${tileTitle('Ожидаем оплату','Нажмите на бронь для деталей')}${debt.map(b=>`<button class="arrival-row" data-booking="${b.id}"><span class="person-avatar">${esc(initials(b.guest))}</span><span class="arrival-person"><strong>${esc(b.guest)}</strong><small>${esc(roomName(b.roomId))} · ${b.id}</small></span><span class="arrival-date">${rub(b.amount-b.paid)}<small>остаток</small></span></button>`).join('')||'<p class="empty-inline">Всё оплачено</p>'}</section></div>
  <section class="panel panel-list"><div class="panel-toolbar"><div class="panel-heading"><h2>Журнал операций</h2><span class="count-chip">${payments.length}</span></div><div class="toolbar-controls"><label class="tiny-search">${icon('search',16)}<input data-search="page" placeholder="Поиск по операции" value="${esc(ui.search)}"/></label></div></div>
  <div class="table-scroll"><table class="data-table"><thead><tr><th>Операция</th><th>Гость / бронь</th><th>Дата</th><th>Способ</th><th>Сумма</th><th></th></tr></thead><tbody>${payments.map(p=>{const b=db.bookings.find(x=>x.id===p.bookingId);return `<tr data-booking="${esc(p.bookingId)}"><td><div class="cell-person"><span class="payment-icon ${p.amount<0?'is-refund':''}">${icon(p.amount<0?'refresh-cw':'credit-card',17)}</span><span><strong>${p.amount<0?'Возврат':'Поступление'}</strong><small>${esc(p.id)} · ${esc(p.note||'Без комментария')}</small></span></div></td><td><strong>${esc(b?.guest||'Удалённая бронь')}</strong><small>${esc(p.bookingId)} · ${esc(roomName(b?.roomId))}</small></td><td>${ruDate(p.date)}</td><td>${esc(p.method)}</td><td><strong class="${p.amount<0?'money-out':'money-in'}">${p.amount<0?'−':'+'}${rub(Math.abs(p.amount))}</strong></td><td>${icon('chevron-right',17)}</td></tr>`}).join('')}</tbody></table></div>
  <div class="mobile-cards">${payments.map(p=>{const b=db.bookings.find(x=>x.id===p.bookingId);return `<button class="booking-mobile" data-booking="${p.bookingId}"><div class="booking-mobile-head"><span class="payment-icon ${p.amount<0?'is-refund':''}">${icon('credit-card',18)}</span><div><strong>${esc(b?.guest||p.bookingId)}</strong><small>${esc(p.method)} · ${ruDate(p.date)}</small></div><strong class="${p.amount<0?'money-out':'money-in'}">${p.amount<0?'−':'+'}${rub(Math.abs(p.amount))}</strong></div></button>`}).join('')}</div>${!payments.length?empty('Нет операций','Измените поиск или зарегистрируйте первую оплату.'):''}</section><p class="data-note beneath">${icon('info',14)} Учёт работает только в браузере. Это не платёжная система и не бухгалтерская отчётность.</p>`;
}
function paymentModal() {
  const selected=ui.modal?.id;
  const b=db.bookings.find(x=>x.id===selected);
  return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Добавить операцию"><div class="modal-head"><div><div class="eyebrow">ФИНАНСЫ / НОВАЯ ОПЕРАЦИЯ</div><h2>Оплата или возврат</h2></div><button class="icon-button" data-action="close-modal">${icon('x',22)}</button></div><form id="payment-form" class="modal-body"><label>Бронирование<select name="bookingId">${db.bookings.map(x=>`<option value="${x.id}" ${b?.id===x.id?'selected':''}>${esc(x.id)} · ${esc(x.guest)} · ${esc(roomName(x.roomId))}</option>`).join('')}</select></label><div class="form-grid"><label>Вид операции<select name="kind"><option value="payment">Поступление</option><option value="refund">Возврат</option></select></label><label>Сумма, ₽<input name="amount" type="number" step="1" min="1" required value="${b?Math.max(0,b.amount-b.paid):''}"/></label><label>Дата<input name="date" type="date" value="${day()}" required/></label><label>Способ<select name="method">${['Перевод','Наличные','Банковская карта','СБП','Другое'].map(m=>`<option>${m}</option>`).join('')}</select></label></div><label>Комментарий<input name="note" maxlength="120" placeholder="Предоплата, доплата, возврат..." /></label><p class="notice-box">${icon('info',16)} Операция изменит локальный баланс бронирования. Реальное списание или перевод денег не происходит.</p><p id="form-error" class="form-error" role="alert"></p><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Отмена</button><button class="btn btn-primary" type="submit">${icon('check',17)} Сохранить операцию</button></div></form></section></div>`;
}
function savePayment(form) {
  const v=parseForm(form),err=document.getElementById('form-error'),b=db.bookings.find(x=>x.id===v.bookingId),num=Number(v.amount);
  if(!b||!Number.isFinite(num)||num<=0||!/^\d{4}-\d{2}-\d{2}$/.test(v.date)||!v.method){err.textContent='Проверьте бронь, дату и сумму.';return;}
  if(v.kind==='payment'&&(b.status==='cancelled'||num>b.amount-b.paid)){err.textContent='Для отменённой брони или сверх остатка добавить оплату нельзя.';return;}
  if(v.kind==='refund'&&num>b.paid){err.textContent='Возврат превышает ранее оплаченную сумму.';return;}
  recordPayment(b,v.kind==='refund'?-num:num,v.method,v.note.trim(),v.date);save();ui.modal=null;render();toast(v.kind==='refund'?'Возврат зарегистрирован':'Оплата зарегистрирована');
}
function downloadCsv(rows,filename) {
  const contents='\ufeff'+rows.map(r=>r.map(cell=>{let v=String(cell??'');if(/^[\s]*[=+@-]/.test(v)&&!/^-[0-9]+$/.test(v))v=`'${v}`;return `"${v.replaceAll('"','""')}"`;}).join(';')).join('\r\n');
  const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function exportPayments(){downloadCsv([['ID','Бронь','Дата','Тип','Сумма','Метод','Примечание'],...db.payments.map(p=>[p.id,p.bookingId,p.date,p.amount<0?'Возврат':'Оплата',p.amount,p.method,p.note])],'gelikrooms-payments-demo.csv');toast('Журнал операций выгружен');}
function reportMetrics(days=30) {
  const start=day(1-days),end=day(1),rooms=db.rooms.filter(r=>r.active),bookings=db.bookings.filter(b=>activeBooking(b)&&overlaps(b.start,b.end,start,end)),capacity=Math.max(1,rooms.length*days);
  let nights=0,bookedRevenue=0;
  for(const b of bookings){const actual=Math.max(0,diffDays(b.start>start?b.start:start,b.end<end?b.end:end));if(rooms.some(r=>r.id===b.roomId)){nights+=actual;bookedRevenue+=actual*(b.amount/Math.max(1,diffDays(b.start,b.end)));}}
  const collected=db.payments.filter(p=>p.date>=start&&p.date<end).reduce((a,p)=>a+p.amount,0);
  const sources=Object.entries(bookings.reduce((acc,b)=>{const revenue=(b.amount/Math.max(1,diffDays(b.start,b.end)))*Math.max(0,diffDays(b.start>start?b.start:start,b.end<end?b.end:end));acc[b.source]=(acc[b.source]||0)+revenue;return acc;},{})).sort((a,b)=>b[1]-a[1]);
  const properties=rooms.map(r=>{const rb=bookings.filter(b=>b.roomId===r.id);const roomNights=rb.reduce((a,b)=>a+Math.max(0,diffDays(b.start>start?b.start:start,b.end<end?b.end:end)),0);return {room:r,nights:roomNights,percent:Math.min(100,Math.round(roomNights/days*100))};});
  return {start,end,days,rooms,nights,capacity,occupancy:Math.min(100,Math.round(nights/capacity*100)),bookedRevenue,collected,adr:nights?Math.round(bookedRevenue/nights):0,revpar:Math.round(bookedRevenue/capacity),sources,properties};
}
function reportsPage(){
  const days=Number(ui.reportDays)||30,m=reportMetrics(days),maxSource=Math.max(1,...m.sources.map(x=>x[1]));
  return `${shellTitle('АНАЛИТИКА / ОТЧЁТЫ','Аналитика бизнеса','Показатели объектов, выручка по ночам и каналы продаж.',false)}
  <div class="report-toolbar"><div class="report-tabs">${[[7,'7 дней'],[30,'30 дней'],[90,'90 дней']].map(([n,l])=>`<button data-report-days="${n}" class="${days===n?'selected':''}">${l}</button>`).join('')}</div><div class="report-range">${icon('calendar-days',16)} ${ruDate(m.start)} – ${ruDate(addDays(m.end,-1))}</div><button class="btn btn-outline" data-action="export-report">${icon('download',16)} Выгрузить CSV</button></div>
  <div class="kpi-grid">${kpi('Загрузка',`${m.occupancy}%`,`${m.nights} занятых ночей`,'bed-double','','teal')}${kpi('ADR',rub(m.adr),'Средняя выручка за занятую ночь','trending-up','','gold')}${kpi('RevPAR',rub(m.revpar),'Выручка на доступную ночь','bar-chart','','blue')}${kpi('Поступления',rub(m.collected),'По реестру платежей','wallet','','teal')}</div>
  <div class="report-panels"><section class="panel report-panel">${tileTitle('Загрузка по апартаментам',`${m.days} дней · ${m.rooms.length} действующих объектов`)}<div class="report-meters">${m.properties.map(x=>`<div class="report-metric"><span>${esc(x.room.name)}<small>${x.nights} ${plural(x.nights,'ночь','ночи','ночей')}</small></span>${barMini(x.percent,100)}<strong>${x.percent}%</strong></div>`).join('')}</div><div class="report-note">${icon('info',15)} Загрузка считается по пересечению дат проживания с периодом отчёта.</div></section>
  <section class="panel report-panel">${tileTitle('Источники бронирований','Распределение стоимости занятых ночей')}${m.sources.map(([name,amount],i)=>`<div class="source-line"><div><b>${esc(name)}</b><strong>${rub(amount)}</strong></div>${barMini(amount,maxSource,`source-${i}`)}</div>`).join('')||'<p class="empty-inline">Нет броней в периоде</p>'}<div class="report-note">${icon('info',15)} Стоимость распределена по ночам и не равна поступлениям на счёт.</div></section></div>
  <section class="panel report-panel report-footer-panel"><div class="report-conclusion"><div class="report-conclusion-symbol">${icon('sparkles',26)}</div><div><strong>Единая картина по вашему бизнесу</strong><p>Раздел соединяет бронирования, тарифы и локальный журнал оплат. Для коммерческого использования потребуется серверный учёт, сверка транзакций и подключение реальных каналов.</p></div></div></section>`;
}
function exportReport(){const m=reportMetrics(Number(ui.reportDays)||30);downloadCsv([['Метрика','Значение'],['Начало',m.start],['Конец (не включительно)',m.end],['Загрузка %',m.occupancy],['Занято ночей',m.nights],['Выручка за ночи',Math.round(m.bookedRevenue)],['ADR',m.adr],['RevPAR',m.revpar],['Поступления',m.collected],...m.properties.map(x=>[`Загрузка: ${x.room.name}`,x.percent])],`gelikrooms-report-${m.days}-days.csv`);toast('Отчёт выгружен');}
function activityPage(){const events=[...db.activity].filter(a=>[a.title,a.description,a.kind].some(v=>String(v).toLowerCase().includes(ui.search.toLowerCase()))).sort((a,b)=>b.date.localeCompare(a.date));const iconByKind={booking:'calendar-check',room:'bed-double',rate:'tag',payment:'credit-card',system:'settings',task:'clipboard-check',review:'star',message:'message-circle',block:'ban',guest:'users'};return `${shellTitle('КОНТРОЛЬ / ЖУРНАЛ','Журнал действий','История изменений в демоверсии и текущие события.',false)}<div class="activity-banner"><span>${icon('shield-check',26)}</span><div><strong>Прозрачность операций</strong><p>Любые важные действия, изменения дат и платежей отображаются здесь. В боевой системе журнал хранится на сервере.</p></div></div><section class="panel ops-panel"><div class="panel-toolbar"><div class="panel-heading"><h2>Лента событий</h2><span class="count-chip">${events.length}</span></div><label class="tiny-search">${icon('search',16)}<input data-search="page" value="${esc(ui.search)}" placeholder="Поиск по действиям"/></label></div><div class="activity-feed">${events.map(ev=>`<article class="activity-event"><span class="activity-icon">${icon(iconByKind[ev.kind]||'activity',19)}</span><div><b>${esc(ev.title)}</b><p>${esc(ev.description)}</p></div><time>${new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(ev.date))}</time></article>`).join('')}${!events.length?empty('Событий пока нет','Начните работу с бронированиями или тарифами.'):''}</div></section>`;}
function guestMetaModal(){const name=ui.modal?.name,m=db.guestMeta?.[name]||{vip:false,note:''};return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal-small" role="dialog" aria-modal="true" aria-label="Заметка о госте"><div class="modal-head"><div><div class="eyebrow">ГОСТИ / ЗАМЕТКИ</div><h2>${esc(name)}</h2></div><button class="icon-button" data-action="close-modal">${icon('x',22)}</button></div><form id="guest-meta-form" class="modal-body"><input type="hidden" name="name" value="${esc(name)}"/><label class="toggle-simple"><input type="checkbox" name="vip" ${m.vip?'checked':''}/> Постоянный / VIP гость</label><label>Внутренняя заметка<textarea name="note" maxlength="600" rows="4" placeholder="Предпочтения, важные детали для команды">${esc(m.note)}</textarea></label><p class="notice-box">${icon('lock',16)} Только локальная демонстрация. Для персональных данных необходим защищённый сервер.</p><div class="modal-actions"><button class="btn btn-primary" type="submit">${icon('check',17)} Сохранить заметку</button></div></form></section></div>`;}
function saveGuestMeta(form){const v=parseForm(form);db.guestMeta[v.name]={vip:!!form.elements.vip.checked,note:v.note.trim()};recordActivity('guest','Обновлена карточка гостя',v.name);save();ui.modal=null;ui.detail={type:'guest',name:v.name};render();toast('Заметка сохранена');}

document.addEventListener('click',e=>{
  const nav=e.target.closest('[data-nav]');if(nav){goto(nav.dataset.nav);return;}
  const b=e.target.closest('[data-booking]');if(b){openBooking(b.dataset.booking);return;}
  const g=e.target.closest('[data-guest]');if(g){openGuest(g.dataset.guest);return;}
  const m=e.target.closest('[data-message]');if(m){ui.messageId=m.dataset.message;const msg=db.messages.find(x=>x.id===ui.messageId);if(msg){msg.unread=false;save();}render();return;}
  const f=e.target.closest('[data-review-filter]');if(f){ui.reviewFilter=f.dataset.reviewFilter;render();return;}
  const period=e.target.closest('[data-report-days]');if(period){ui.reportDays=Number(period.dataset.reportDays);render();return;}
  const action=e.target.closest('[data-action]');if(!action)return;if(action.classList.contains('modal-backdrop')&&e.target!==action)return;if(action.classList.contains('photo-lightbox')&&e.target!==action)return;const v=action.dataset.action,id=action.dataset.id;
  switch(v){
    case 'toggle-menu':ui.mobileMenu=!ui.mobileMenu;render();break;
    case 'new-booking':openBookingModal();break;
    case 'edit-booking':openBookingModal(id);break;
    case 'booking-detail':openBooking(id);break;
    case 'calendar-new':openBookingModal(null,action.dataset.room,action.dataset.date);break;
    case 'close-modal':ui.modal=null;ui.lightbox=null;render();break;
    case 'close-detail':ui.detail=null;render();break;
    case 'prev-month':changeMonth(-1);render();break;
    case 'next-month':changeMonth(1);render();break;
    case 'today':ui.calendarYear=new Date().getFullYear();ui.calendarMonth=new Date().getMonth();render();break;
    case 'edit-room':ui.modal={type:'room',id};ui.lightbox=null;render();break;
    case 'manage-photos':ui.modal={type:'photos',id};ui.editPhotoId=null;ui.lightbox=null;render();break;
    case 'edit-photo-caption':ui.editPhotoId=id;render();break;
    case 'cancel-photo-caption':ui.editPhotoId=null;render();break;
    case 'view-photo':ui.lightbox={roomId:action.dataset.room,id};render();break;
    case 'close-photo-preview':ui.lightbox=null;render();break;
    case 'step-photo-preview':{const room=getRoom(ui.lightbox?.roomId),photos=roomPhotos(room),i=photos.findIndex(p=>p.id===ui.lightbox?.id);if(i>=0&&photos.length>1){ui.lightbox.id=photos[(i+Number(action.dataset.step)+photos.length)%photos.length].id;render();}break;}
    case 'cover-photo':{const room=getRoom(action.dataset.room);if(room&&roomPhotos(room).some(x=>x.id===id)){room.coverPhotoId=id;recordActivity('photo','Обложка апартаментов изменена',room.name);save();render();toast('Главное фото обновлено');}break;}
    case 'move-photo':{const room=getRoom(action.dataset.room),photos=roomPhotos(room),idx=photos.findIndex(x=>x.id===id),dest=idx+Number(action.dataset.direction);if(idx>=0&&dest>=0&&dest<photos.length)sortRoomPhoto(room,id,photos[dest].id);break;}
    case 'delete-photo':deleteRoomPhoto(action.dataset.room,id);break;
    case 'new-room':ui.modal={type:'room',id:null};render();break;
    case 'new-rate':ui.modal={type:'rate',id:null,room:action.dataset.room||null};render();break;
    case 'edit-rate':ui.modal={type:'rate',id};render();break;
    case 'delete-rate':if(confirm('Удалить этот тарифный период?')){db.rates=db.rates.filter(r=>r.id!==id);ui.modal=null;recordActivity('rate','Удалён период тарифа',id);save();render();toast('Период удалён');}break;
    case 'new-payment':ui.modal={type:'payment',id:action.dataset.bookingId||null};ui.detail=null;render();break;
    case 'edit-guest-meta':ui.modal={type:'guest-meta',name:action.dataset.name};ui.detail=null;render();break;
    case 'export-payments':exportPayments();break;
    case 'export-report':exportReport();break;
    case 'new-task':ui.modal={type:'task',id:null};render();break;
    case 'edit-task':ui.modal={type:'task',id};render();break;
    case 'new-block':ui.modal={type:'block',id:null};render();break;
    case 'edit-block':ui.modal={type:'block',id};render();break;
    case 'delete-task':if(confirm('Удалить эту задачу?')){db.tasks=db.tasks.filter(t=>t.id!==id);recordActivity('task','Задача удалена',id);save();ui.modal=null;render();toast('Задача удалена');}break;
    case 'delete-block':if(confirm('Удалить блокировку и открыть даты для бронирования?')){db.blocks=db.blocks.filter(b=>b.id!==id);recordActivity('block','Даты открыты',id);save();ui.modal=null;render();toast('Даты открыты');}break;
    case 'backup-export':exportBackup();break;
    case 'reply-review':ui.modal={type:'review',id};render();break;
    case 'yoo-check':yooHealth();break;
    case 'yoo-refresh':yooRefresh();break;
    case 'yoo-connect':ui.modal={type:'yoo-connect'};render();break;
    case 'yoo-logout':yk.token='';yk.summary=null;yk.lastUrl='';render();toast('Сеанс отключён');break;
    case 'yoo-checkout':yooCheckout(id);break;
    case 'yoo-copy-url':if(yk.lastUrl)navigator.clipboard?.writeText(yk.lastUrl).then(()=>toast('Ссылка скопирована')).catch(()=>toast('Не удалось скопировать',true));break;
    case 'yoo-reconcile':yooReconcile(id);break;
    case 'yoo-refund':ui.modal={type:'yoo-refund',id};render();break;
    case 'profile':goto('settings');break;
    case 'quick-checkin':{const book=db.bookings.find(b=>b.id===id);if(book&&['confirmed','pending'].includes(book.status)){book.status='checked_in';recordActivity('booking','Гость заселён',`${book.id} · ${book.guest}`);save();render();toast('Гость заселён');}break;}
    case 'quick-checkout':{const book=db.bookings.find(b=>b.id===id);if(book&&book.status==='checked_in'){book.status='checked_out';if(!db.tasks.some(t=>t.roomId===book.roomId&&t.date===day()&&t.note.includes(book.id))){db.tasks.unshift({id:serialId('HK',db.tasks),roomId:book.roomId,date:day(),status:'todo',assignee:'Клининг',note:`Уборка после выезда · ${book.id}`});}recordActivity('booking','Гость выехал',`${book.id} · Назначена уборка`);save();render();toast('Проживание завершено. Уборка добавлена');}break;}
    case 'mark-paid':{const book=db.bookings.find(b=>b.id===id);if(book){recordPayment(book,book.amount-book.paid,'Безналичный расчёт','Полное погашение');save();render();toast('Оплата добавлена в журнал');}break;}
    case 'cancel-booking':{const book=db.bookings.find(b=>b.id===id);if(book && confirm(`Отменить бронирование ${book.id}?`)){book.status='cancelled';recordActivity('booking','Бронь отменена',`${book.id} · ${book.guest}`);save();render();toast('Бронирование отменено');}break;}
    case 'reset-demo':if(confirm('Сбросить все демоданные и безвозвратно удалить все загруженные фотографии?')){(async()=>{try{await photoStoreReplace([]);clearPhotoUrls();db=seed();save();ui.detail=null;ui.modal=null;goto('overview');toast('Демоданные и фотографии сброшены');}catch(e){toast(`Не удалось удалить галерею: ${e.message}`,true);}})();}break;
    case 'export':exportBookings();break;
  }
});
document.addEventListener('submit',e=>{
  const form=e.target;const formType=form.getAttribute('id');if(!['booking-form','room-form','review-form','reply-form','settings-form','task-form','block-form','rate-form','payment-form','guest-meta-form','photo-caption-form','yoo-connect-form','yoo-refund-form'].includes(formType))return;e.preventDefault();
  if(formType==='yoo-connect-form'){yooConnect(form);return;}
  if(formType==='yoo-refund-form'){yooRefund(form);return;}
  if(formType==='booking-form')saveBooking(form);
  if(formType==='task-form')saveTask(form);
  if(formType==='block-form')saveBlock(form);
  if(formType==='room-form')saveRoom(form);
  if(formType==='rate-form')saveRate(form);
  if(formType==='payment-form')savePayment(form);
  if(formType==='guest-meta-form')saveGuestMeta(form);
  if(formType==='photo-caption-form')savePhotoCaption(form);
  if(formType==='settings-form')updateSettings(form);
  if(formType==='review-form'){const v=parseForm(form);const r=db.reviews.find(x=>x.id===v.id);if(r){r.reply=v.reply.trim();recordActivity('review','Ответ на отзыв',r.guest);save();ui.modal=null;render();toast('Ответ на отзыв сохранён');}}
  if(formType==='reply-form'){const input=form.elements.reply;const value=input.value.trim();const m=db.messages.find(x=>x.id===ui.messageId);if(value&&m){m.items.push({from:'staff',text:value,time:new Intl.DateTimeFormat('ru-RU',{hour:'2-digit',minute:'2-digit'}).format(new Date())});m.unread=false;recordActivity('message','Ответ гостю сохранён',`${m.guest} · ${m.subject}`);save();render();toast('Ответ сохранён в демодиалоге');}}
});
document.addEventListener('change',e=>{
  if(e.target.id==='status-filter'){ui.filter=e.target.value;render();}
  if(e.target.id==='task-filter'){ui.taskFilter=e.target.value;render();}
  if(e.target.dataset.taskStatus){const task=db.tasks.find(t=>t.id===e.target.dataset.taskStatus);if(task&&taskStatuses[e.target.value]){task.status=e.target.value;recordActivity('task','Статус задачи изменён',`${task.id} · ${taskStatuses[task.status][0]}`);save();render();toast('Статус задачи обновлён');}}
  if(e.target.id==='backup-import'){importBackup(e.target.files?.[0]);return;}
  if(e.target.id==='gallery-upload'){uploadRoomPhotos(ui.modal?.id,e.target.files);return;}
  if(e.target.dataset.replacePhoto){replaceRoomPhoto(e.target.dataset.room,e.target.dataset.replacePhoto,e.target.files?.[0]);return;}
  if(e.target.closest('#booking-form')&&['start','end','roomId'].includes(e.target.name)){updateBookingQuote();}
  const id=e.target.dataset.bookingStatus;if(id){const b=db.bookings.find(x=>x.id===id);if(b){if(e.target.value!=='cancelled'&&(bookingClash(b.roomId,b.start,b.end,id)||blockClash(b.roomId,b.start,b.end))){toast('Нельзя активировать бронь: даты заняты или закрыты',true);render();return;}b.status=e.target.value;recordActivity('booking','Статус брони изменён',`${b.id} · ${statusDefs[b.status][0]}`);save();render();toast('Статус брони обновлён');}}
});
function updateBookingQuote(){const f=document.getElementById('booking-form'),q=document.getElementById('booking-quote');if(!f||!q)return;const room=f.elements.roomId.value,start=f.elements.start.value,end=f.elements.end.value;if(start&&end&&start<end){q.querySelector('strong').textContent=rub(amountFor(room,start,end));q.querySelector('small').textContent=`${diffDays(start,end)} ${plural(diffDays(start,end),'ночь','ночи','ночей')} · расчёт по тарифам`; }else{q.querySelector('strong').textContent='Проверьте даты';}}
document.addEventListener('input',e=>{if(e.target.matches('[data-search]'))searchRerender(e.target);if(e.target.closest('#booking-form')&&['start','end','roomId'].includes(e.target.name))updateBookingQuote();});
let draggedPhotoId=null;
document.addEventListener('dragstart',e=>{const tile=e.target.closest('[data-photo-item]');if(tile&&!ui.photoBusy){draggedPhotoId=tile.dataset.photoItem;e.dataTransfer?.setData('text/plain',draggedPhotoId);if(e.dataTransfer)e.dataTransfer.effectAllowed='move';}});
document.addEventListener('dragover',e=>{if(e.target.closest('#gallery-drop')||e.target.closest('[data-photo-item]'))e.preventDefault();});
document.addEventListener('drop',e=>{
 const drop=e.target.closest('#gallery-drop');if(drop){e.preventDefault();if(!ui.photoBusy)uploadRoomPhotos(ui.modal?.id,e.dataTransfer?.files);return;}
 const tile=e.target.closest('[data-photo-item]');if(tile&&draggedPhotoId){e.preventDefault();const room=getRoom(tile.dataset.photoRoom);if(room)sortRoomPhoto(room,draggedPhotoId,tile.dataset.photoItem);draggedPhotoId=null;}
});
document.addEventListener('dragend',()=>{draggedPhotoId=null;});
document.addEventListener('keydown',e=>{
 if(ui.lightbox&&['ArrowLeft','ArrowRight'].includes(e.key)){const room=getRoom(ui.lightbox.roomId),photos=roomPhotos(room),i=photos.findIndex(p=>p.id===ui.lightbox.id);if(i>=0){ui.lightbox.id=photos[(i+(e.key==='ArrowRight'?1:-1)+photos.length)%photos.length].id;render();}return;}
 if(e.key==='Escape'){if(ui.lightbox){ui.lightbox=null;render();return;}if(ui.modal||ui.detail||ui.mobileMenu){ui.modal=null;ui.detail=null;ui.mobileMenu=false;render();}}
});
window.addEventListener('hashchange',()=>{const p=getPage();if(p!==ui.page)goto(p);});
render();
if(typeof indexedDB!=='undefined')hydratePhotos();

if(typeof navigator!=='undefined' && 'serviceWorker' in navigator && location.protocol!=='file:'){window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));}
// Native-like mobile gesture: dismiss sheets by swiping down from their header.
let sheetGesture=null;
document.addEventListener('touchstart',e=>{
 if(window.innerWidth>720||e.touches.length!==1)return;
 const header=e.target.closest('.modal-head,.gallery-modal-head,.drawer-head,.sidebar .brand');
 if(!header)return;
 sheetGesture={y:e.touches[0].clientY,x:e.touches[0].clientX,type:header.closest('.sidebar')?'menu':header.closest('.detail-drawer')?'detail':'modal'};
},{passive:true});
document.addEventListener('touchend',e=>{
 if(!sheetGesture||!e.changedTouches.length)return;
 const {y,x,type}=sheetGesture;sheetGesture=null;
 const dy=e.changedTouches[0].clientY-y,dx=e.changedTouches[0].clientX-x;
 if(dy<95||Math.abs(dx)>Math.abs(dy)*.7)return;
 if(type==='menu')ui.mobileMenu=false;
 if(type==='detail')ui.detail=null;
 if(type==='modal')ui.modal=null;
 render();
},{passive:true});