/* ══════════════════════════════════════════════════════════
   StayOS HMS — Premium App Logic
   Custom cursor · Magnetic buttons · 3D tilt cards
   Scroll-driven animations · All views
   ══════════════════════════════════════════════════════════ */

'use strict';

// ── PROPERTIES ────────────────────────────────────────────
const PROPERTIES = [
  { id: 'himalayan-grove', icon: '🏔️', name: 'Himalayan Grove', city: 'Manali', rooms: 18 },
  { id: 'gateway-sands',   icon: '🌊', name: 'Gateway Sands',   city: 'Goa',    rooms: 45 },
  { id: 'capital-suites',  icon: '🏙️', name: 'Capital Suites',  city: 'Delhi',  rooms: 120 },
];
let currentProperty = PROPERTIES[0];

// ── DATA ──────────────────────────────────────────────────
const ROOMS = [
  {id:101,type:'Deluxe Mtn View'},{id:102,type:'Deluxe Mtn View'},{id:103,type:'Standard'},
  {id:104,type:'Standard'},{id:105,type:'Standard'},{id:201,type:'Premium Suite'},
  {id:202,type:'Premium Suite'},{id:203,type:'Deluxe Mtn View'},{id:204,type:'Cottage'},
  {id:205,type:'Cottage'},{id:301,type:'Premium Suite'},{id:302,type:'Deluxe Mtn View'},
  {id:303,type:'Standard'},{id:304,type:'Standard'},{id:305,type:'Cottage'},
  {id:401,type:'Premium Suite'},{id:402,type:'Deluxe Mtn View'},{id:403,type:'Standard'},
];
const ROOM_STATUS = {101:'occupied',102:'vacant',103:'dirty',104:'occupied',105:'vacant',201:'occupied',202:'checkout',203:'occupied',204:'dirty',205:'vacant',301:'occupied',302:'ooo',303:'vacant',304:'occupied',305:'dirty',401:'occupied',402:'vacant',403:'occupied'};

const GUESTS = [
  {id:1,name:'Arjun Sharma',email:'arjun.sharma@gmail.com',phone:'+91 9876543210',stays:7,lastStay:'14 Jun 2026',segment:'vip',waOptIn:true,spent:'₹1,24,300',color:'#7C3AED',preferences:['Mountain View Room','Late Checkout','Veg Meals'],notes:'Celebrates anniversary in November. Prefers room 201.'},
  {id:2,name:'Priya Mehta',email:'priya.m@outlook.com',phone:'+91 8765432109',stays:3,lastStay:'20 Jun 2026',segment:'repeat',waOptIn:true,spent:'₹38,500',color:'#00B89A',preferences:['Yoga Mat','Herbal Tea','Early Check-in'],notes:'Solo traveler. Do-not-disturb until 10am.'},
  {id:3,name:'Rohit Gupta',email:'rohit.g@techcorp.in',phone:'+91 7654321098',stays:1,lastStay:'19 Jun 2026',segment:'corporate',waOptIn:true,spent:'₹12,200',color:'#10B981',preferences:['High-speed WiFi','Early Breakfast'],notes:'Corporate booking. GST invoice required urgently.'},
  {id:4,name:'Kavya Reddy',email:'kavyar@hotmail.com',phone:'+91 6543210987',stays:1,lastStay:'18 Jun 2026',segment:'new',waOptIn:false,spent:'₹8,400',color:'#F5A623',preferences:[],notes:'First-time guest. Booked via Booking.com.'},
  {id:5,name:'Vikram Patel',email:'vp@vikrampatel.com',phone:'+91 9543210876',stays:12,lastStay:'20 Jun 2026',segment:'vip',waOptIn:true,spent:'₹2,87,600',color:'#EF4444',preferences:['Suite 401','Bonfire','Airport Transfer','Champagne'],notes:'Extremely high-value. Owner of VP Group. Always upgrade.'},
  {id:6,name:'Ananya Singh',email:'ananya.singh@edu.in',phone:'+91 8432109765',stays:2,lastStay:'15 Jun 2026',segment:'repeat',waOptIn:true,spent:'₹19,800',color:'#7C3AED',preferences:['Quiet Room','Extra Blankets'],notes:'Professor, Delhi University. Stays during college breaks.'},
  {id:7,name:'Mohan Das',email:'mohan@gmail.com',phone:'+91 7321098654',stays:1,lastStay:'17 Jun 2026',segment:'new',waOptIn:false,spent:'₹6,800',color:'#00D4B4',preferences:[],notes:''},
];

const BOOKINGS = [
  {id:'B001',room:101,guest:'Arjun Sharma',checkIn:18,checkOut:22,type:'confirmed',source:'Direct',nights:4,amount:'₹38,200'},
  {id:'B002',room:103,guest:'Priya Mehta',checkIn:19,checkOut:21,type:'confirmed',source:'Direct',nights:2,amount:'₹16,800'},
  {id:'B003',room:201,guest:'Vikram Patel',checkIn:17,checkOut:23,type:'confirmed',source:'Direct',nights:6,amount:'₹72,000'},
  {id:'B004',room:203,guest:'Kavya Reddy',checkIn:20,checkOut:22,type:'ota',source:'Booking.com',nights:2,amount:'₹15,400'},
  {id:'B005',room:104,guest:'Rohit Gupta',checkIn:20,checkOut:24,type:'confirmed',source:'Corporate',nights:4,amount:'₹28,800'},
  {id:'B006',room:301,guest:'Ananya Singh',checkIn:22,checkOut:26,type:'pending',source:'Direct',nights:4,amount:'₹34,000'},
  {id:'B007',room:302,guest:'Maintenance Block',checkIn:20,checkOut:22,type:'blocked',source:'',nights:2,amount:'—'},
  {id:'B008',room:304,guest:'Mohan Das',checkIn:21,checkOut:23,type:'ota',source:'MakeMyTrip',nights:2,amount:'₹13,600'},
  {id:'B009',room:401,guest:'Vikram Patel',checkIn:23,checkOut:27,type:'confirmed',source:'Direct',nights:4,amount:'₹58,400'},
  {id:'B010',room:403,guest:'New Guest',checkIn:25,checkOut:28,type:'pending',source:'Agoda',nights:3,amount:'₹22,500'},
];

const WA_THREADS = [
  {id:1,name:'Arjun Sharma',initials:'AS',color:'#7C3AED',room:'201',checkIn:'18 Jun',checkOut:'22 Jun',unread:2,aiHandled:true,lastMsg:'Bonfire arranged for 8pm 🔥',messages:[
    {from:'guest',text:'Hi! What time is check-in?',time:'9:14 AM'},
    {from:'ai',text:'Hello Arjun! 😊 Check-in is from 2:00 PM. Since you\'re a valued returning guest, I\'ve noted an early check-in request for 11:00 AM — our team will confirm availability by morning!',time:'9:14 AM'},
    {from:'guest',text:'Also can you arrange a bonfire tonight?',time:'10:32 AM'},
    {from:'ai',text:'Absolutely! 🏕️ Bonfire arranged for 8:00 PM near the garden. Hot chocolate, masala chai & s\'mores kit included. You\'ll get a reminder at 7:30 PM!',time:'10:33 AM'},
    {from:'guest',text:'Yes! That sounds great.',time:'10:45 AM'},
    {from:'ai',text:'Bonfire arranged for 8pm 🔥 with hot chocolate, masala chai & s\'mores kit. Is there anything else I can help with?',time:'10:45 AM'},
  ]},
  {id:2,name:'Priya Mehta',initials:'PM',color:'#00B89A',room:'103',checkIn:'19 Jun',checkOut:'21 Jun',unread:0,aiHandled:true,lastMsg:'Namaste! Yoga mat is in room 103.',messages:[
    {from:'guest',text:'Namaste! Is yoga mat available?',time:'7:02 AM'},
    {from:'ai',text:'Namaste Priya! 🙏 A premium yoga mat is in room 103. We also have a guided morning yoga session at 6:30 AM by the mountain-view deck — interested?',time:'7:03 AM'},
    {from:'guest',text:'Yes definitely! Add me in.',time:'7:15 AM'},
    {from:'ai',text:'You\'re all set for tomorrow\'s 6:30 AM yoga session ☀️ Our instructor Kavita will guide you. Shall I arrange a light breakfast after?',time:'7:16 AM'},
  ]},
  {id:3,name:'Rohit Gupta',initials:'RG',color:'#10B981',room:'104',checkIn:'20 Jun',checkOut:'24 Jun',unread:1,aiHandled:false,escalated:true,lastMsg:'I need GST invoice urgently',messages:[
    {from:'guest',text:'Need GST invoice with company details urgently for reimbursement.',time:'2:15 PM'},
    {from:'ai',text:'Hello Rohit! I\'ll generate the GST invoice right away. Could you confirm your GSTIN? I have 29ABCDE1234F1Z5 on file.',time:'2:16 PM'},
    {from:'guest',text:'GSTIN is 27TECHC0001F1Z8. Need it in 30 mins.',time:'2:18 PM'},
    {from:'guest',text:'I need GST invoice urgently',time:'3:45 PM'},
  ]},
  {id:4,name:'Kavya Reddy',initials:'KR',color:'#F5A623',room:'203',checkIn:'20 Jun',checkOut:'22 Jun',unread:0,aiHandled:true,lastMsg:'Checkout at 12 noon. Late: ₹800.',messages:[
    {from:'guest',text:'What time is checkout?',time:'8:00 AM'},
    {from:'ai',text:'Hi Kavya! Checkout is at 12:00 noon. Late checkout until 2 PM is available for ₹800. Shall I arrange that?',time:'8:01 AM'},
    {from:'guest',text:'No thanks, 12 is fine.',time:'8:10 AM'},
  ]},
  {id:5,name:'Vikram Patel',initials:'VP',color:'#EF4444',room:'401',checkIn:'20 Jun',checkOut:'23 Jun',unread:0,aiHandled:true,lastMsg:'Transfer booked for 9 AM to Chandigarh ✓',messages:[
    {from:'guest',text:'Book airport transfer to Chandigarh at 9am tomorrow.',time:'11:00 PM'},
    {from:'ai',text:'Done, Mr. Patel! 🚗 Transfer to Chandigarh Airport booked for 9:00 AM. Driver Ramesh will pick you up from the lobby. ETA: ~3.5 hours.',time:'11:01 PM'},
    {from:'guest',text:'Thanks.',time:'11:03 PM'},
  ]},
];

const ACTIVITY = [
  {title:'Vikram Patel checked in',meta:'Suite 401 · 5 nights · Direct booking',time:'2m ago',color:'#00C896'},
  {title:'New booking via Booking.com',meta:'Room 203 · Kavya Reddy · 2 nights',time:'18m ago',color:'#7C3AED'},
  {title:'Room 202 housekeeping complete',meta:'Cleaned by Sunita · Ready for check-in',time:'34m ago',color:'#10B981'},
  {title:'AI Pricing update applied',meta:'Weekend rates raised 12% · 3 room types',time:'1h ago',color:'#F5A623'},
  {title:'WhatsApp AI resolved 4 queries',meta:'Bonfire, yoga mat, late checkout, transfer',time:'2h ago',color:'#7C3AED'},
];

const CHECKOUTS = [
  {room:'202',name:'Sneha & Rahul Joshi',nights:'3 nights',status:'paid'},
  {room:'105',name:'Dr. Anil Verma',nights:'2 nights',status:'pending'},
  {room:'303',name:'Tanya Kapoor',nights:'4 nights',status:'paid'},
  {room:'204',name:'Sanjay Mehrotra',nights:'1 night',status:'pending'},
];

const HK = {
  dirty:[
    {room:'103',type:'Deluxe Mountain View',prio:'high',notes:'Guest checked out. Deep clean required.',staff:'Sunita R.',sc:'#7C3AED',time:'Due: Now'},
    {room:'204',type:'Cozy Cottage',prio:'high',notes:'Checkout in 30 mins. Prepare for next guest.',staff:'Meena D.',sc:'#00B89A',time:'Due: 12:30 PM'},
    {room:'305',type:'Cozy Cottage',prio:'medium',notes:'Routine morning clean.',staff:'Sunita R.',sc:'#7C3AED',time:'Due: 1 PM'},
  ],
  in_progress:[
    {room:'202',type:'Premium Suite',prio:'high',notes:'Deep clean post-checkout. New arrival 2 PM.',staff:'Meena D.',sc:'#00B89A',time:'Started 11:00 AM'},
    {room:'301',type:'Premium Suite',prio:'medium',notes:'Occupied — light service only.',staff:'Raj K.',sc:'#F5A623',time:'Started 10:30 AM'},
  ],
  clean:[
    {room:'102',type:'Deluxe Mtn View',prio:'low',notes:'Ready for check-in.',staff:'Raj K.',sc:'#F5A623',time:'Done 9:45 AM'},
    {room:'205',type:'Cozy Cottage',prio:'low',notes:'Inspected and approved.',staff:'Sunita R.',sc:'#7C3AED',time:'Done 10:15 AM'},
    {room:'402',type:'Deluxe Mtn View',prio:'low',notes:'Ready.',staff:'Meena D.',sc:'#00B89A',time:'Done 10:00 AM'},
  ],
  ooo:[
    {room:'302',type:'Deluxe Mtn View',prio:'low',notes:'Maintenance: AC unit repair scheduled.',staff:'Mohan T.',sc:'#EF4444',time:'Until 22 Jun'},
  ],
};

const INVOICES = [
  {num:'INV-2026-089',guest:'Vikram Patel',date:'20 Jun 2026',amount:'₹72,000',status:'paid',gst:'₹7,636'},
  {num:'INV-2026-088',guest:'Rohit Gupta',date:'20 Jun 2026',amount:'₹28,800',status:'pending',gst:'₹3,054'},
  {num:'INV-2026-087',guest:'Kavya Reddy',date:'20 Jun 2026',amount:'₹15,400',status:'pending',gst:'₹1,633'},
  {num:'INV-2026-086',guest:'Priya Mehta',date:'19 Jun 2026',amount:'₹16,800',status:'paid',gst:'₹1,781'},
  {num:'INV-2026-085',guest:'Arjun Sharma',date:'18 Jun 2026',amount:'₹38,200',status:'paid',gst:'₹4,049'},
  {num:'INV-2026-084',guest:'Ananya Singh',date:'15 Jun 2026',amount:'₹19,800',status:'draft',gst:'₹2,099'},
];

const INTEGRATIONS = [
  {name:'Booking.com',detail:'Channel Manager · 2 rooms synced',status:'on',icon:'🏨',bg:'#003580'},
  {name:'MakeMyTrip',detail:'Channel Manager · Pending setup',status:'pending',icon:'✈️',bg:'#D4312C'},
  {name:'Razorpay',detail:'Payment Gateway · ₹4.2L processed',status:'on',icon:'💳',bg:'#072654'},
  {name:'Interakt (WhatsApp)',detail:'AI Concierge · 24 active threads',status:'on',icon:'💬',bg:'#25D366'},
  {name:'Agoda',detail:'Channel Manager · Not connected',status:'off',icon:'🌏',bg:'#5C3981'},
  {name:'ClearTax GST',detail:'e-Invoice API · 89 invoices',status:'on',icon:'📄',bg:'#1a7ae0'},
];

const TEAM = [
  {name:'Vansh Kapoor',role:'Owner',color:'#F5A623',init:'VK',rc:'#7C3AED'},
  {name:'Suman Thakur',role:'Front Desk Manager',color:'#00B89A',init:'ST',rc:'#00C896'},
  {name:'Raj Kumar',role:'Housekeeping Lead',color:'#7C3AED',init:'RK',rc:'#10B981'},
  {name:'Meena Devi',role:'Housekeeping Staff',color:'#EF4444',init:'MD',rc:'#10B981'},
];

const PRICING_SIGNALS = [
  {icon:'🎉',title:'Manali Music Fest',val:'June 28–30 · 2.3 km away',impact:'up'},
  {icon:'📈',title:'High Demand Weekend',val:'Sat–Sun: 94% avg occupancy',impact:'up'},
  {icon:'🌤️',title:'Clear Skies Forecast',val:'Next 7 days — ideal conditions',impact:'up'},
  {icon:'🏨',title:'Snow Valley Rate Drop',val:'Competitor dropped rates 8%',impact:'neutral'},
  {icon:'📅',title:'School Holidays',val:'HP schools holiday June 22–July 3',impact:'up'},
];

const COMPETITORS = [
  {name:'Snow Valley Resort',rate:'₹7,200',diff:'You\'re ₹1,300 higher',type:'lower'},
  {name:'Manali Heights',rate:'₹9,100',diff:'You\'re ₹600 lower',type:'higher'},
  {name:'Himalayan Club',rate:'₹8,600',diff:'Comparable rates',type:'higher'},
  {name:'Rocky Meadows',rate:'₹6,800',diff:'You\'re ₹1,700 higher',type:'lower'},
];

// ── PROPERTY SWITCHER ─────────────────────────────────────
function togglePropertyDropdown() {
  const dd = document.getElementById('propertyDropdown');
  const chevron = document.getElementById('propChevron');
  if (!dd) return;
  const open = dd.style.display !== 'none' && dd.style.display !== '';
  if (open) {
    closePropertyDropdown();
  } else {
    renderPropertyDropdown();
    dd.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

function closePropertyDropdown() {
  const dd = document.getElementById('propertyDropdown');
  const chevron = document.getElementById('propChevron');
  if (dd) dd.style.display = 'none';
  if (chevron) chevron.style.transform = 'rotate(0deg)';
}

function renderPropertyDropdown() {
  const dd = document.getElementById('propertyDropdown');
  if (!dd) return;
  dd.innerHTML = PROPERTIES.map(p => `
    <div class="prop-item ${p.id === currentProperty.id ? 'active' : ''}" data-pid="${p.id}">
      <div class="prop-item-icon">${p.icon}</div>
      <div class="prop-item-details">
        <div class="prop-item-name">${p.name}</div>
        <div class="prop-item-meta">${p.city} · ${p.rooms} rooms</div>
      </div>
      ${p.id === currentProperty.id ? '<div class="prop-item-check">✓</div>' : ''}
    </div>
  `).join('');
  dd.querySelectorAll('.prop-item').forEach(item => {
    item.addEventListener('click', () => {
      const prop = PROPERTIES.find(p => p.id === item.dataset.pid);
      if (prop) switchProperty(prop);
    });
  });
}

function switchProperty(prop) {
  if (prop.id === currentProperty.id) { closePropertyDropdown(); return; }
  currentProperty = prop;

  const iconEl = document.getElementById('propIcon');
  const nameEl = document.getElementById('propName');
  const metaEl = document.getElementById('propMeta');

  // Spring blur → update → unblur transition
  [nameEl, metaEl].forEach(el => {
    if (el) { el.style.transition = 'filter 0.12s ease, opacity 0.12s ease'; el.style.filter = 'blur(5px)'; el.style.opacity = '0'; }
  });
  setTimeout(() => {
    if (iconEl) iconEl.textContent = prop.icon;
    if (nameEl) nameEl.textContent = prop.name;
    if (metaEl) metaEl.textContent = `${prop.city} · ${prop.rooms} rooms`;
    [nameEl, metaEl].forEach(el => {
      if (el) { el.style.filter = 'blur(0)'; el.style.opacity = '1'; }
    });
  }, 120);

  closePropertyDropdown();
  showToast('info', prop.name, `Switched to ${prop.city} · ${prop.rooms} rooms`);
}

// ── CHART INSTANCES ────────────────────────────────────────
const charts = {};

// ── NAVIGATION ────────────────────────────────────────────
let currentView = 'dashboard';
const VIEW_NAMES = {
  dashboard:'Dashboard',calendar:'Booking Calendar',guests:'Guest CRM',
  whatsapp:'WhatsApp Concierge',pricing:'Dynamic Pricing',
  housekeeping:'Housekeeping',billing:'Billing & GST',
  analytics:'Analytics',settings:'Settings',
};

function navigate(id) {
  if (id === currentView) return;

  const doIt = () => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const v = document.getElementById('view-' + id);
    if (v) v.classList.add('active');
    const nb = document.getElementById('nav-' + id);
    if (nb) nb.classList.add('active');
    const bc = document.getElementById('bcCurrent');
    if (bc) bc.textContent = VIEW_NAMES[id] || id;

    currentView = id;
    initView(id);
  };

  if (document.startViewTransition) {
    document.startViewTransition({ update: doIt, types: ['forward'] });
  } else {
    doIt();
  }
}

function initView(id) {
  const fns = {
    dashboard: initDashboard,
    calendar: initCalendar,
    guests: initGuests,
    whatsapp: initWhatsApp,
    pricing: initPricing,
    housekeeping: initHousekeeping,
    billing: initBilling,
    analytics: initAnalytics,
    settings: initSettings,
  };
  fns[id]?.();
}

// ── CUSTOM CURSOR ─────────────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let rx = 0, ry = 0;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  (function animRing() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

// ── 3D TILT CARDS ─────────────────────────────────────────
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  });
}

// ── MAGNETIC BUTTONS ──────────────────────────────────────
function initMagnetic() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => btn.style.transition = '', 400);
    });
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform 0.15s ease'; });
  });
}

// ── CHART DEFAULTS ─────────────────────────────────────────
function chartOpts() {
  return {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 600, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10,16,32,0.95)',
        borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1,
        titleColor: '#F8FAFC', bodyColor: '#94A3B8',
        padding: 12, cornerRadius: 10,
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.03)', drawBorder:false }, ticks: { color: '#475569', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.03)', drawBorder:false }, ticks: { color: '#475569', font: { size: 11 } } }
    }
  };
}

function mkChart(id, type, data, opts = {}) {
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  charts[id] = new Chart(canvas, { type, data, options: { ...chartOpts(), ...opts } });
  return charts[id];
}

function mkSparkline(id, data, color) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  charts[id] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map((_,i) => i),
      datasets: [{ data, borderColor: color, borderWidth: 2, fill: true, backgroundColor: color + '22', tension: 0.4, pointRadius: 0 }]
    },
    options: {
      responsive: false, animation: false,
      plugins: { legend: { display:false }, tooltip: { enabled:false } },
      scales: { x: { display:false }, y: { display:false } }
    }
  });
}

// ══════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════
function initDashboard() {
  renderRoomMosaic();
  renderActivityList();
  renderCoList();
  renderHeroChart();
  renderDashSparklines();
  renderRevChart();
  initTilt();
  initMagnetic();
}

function renderRoomMosaic() {
  const el = document.getElementById('roomMosaic');
  if (!el) return;
  const labels = { occupied:'Occupied', vacant:'Available', dirty:'Dirty', ooo:'OOO', checkout:'Checkout' };
  el.innerHTML = ROOMS.map(r => {
    const st = ROOM_STATUS[r.id] || 'vacant';
    return `<div class="room-tile ${st}" title="Room ${r.id} — ${r.type}">
      <span class="rt-num">${r.id}</span>
      <span class="rt-type">${r.type}</span>
      <span class="rt-status">${labels[st]}</span>
    </div>`;
  }).join('');
}

function renderActivityList() {
  const el = document.getElementById('activityList');
  if (!el) return;
  el.innerHTML = ACTIVITY.map(a => `
    <div class="act-row">
      <div class="act-dot" style="background:${a.color}"></div>
      <div class="act-body">
        <div class="act-title">${a.title}</div>
        <div class="act-meta">${a.meta}</div>
      </div>
      <div class="act-time">${a.time}</div>
    </div>
  `).join('');
}

function renderCoList() {
  const el = document.getElementById('coList');
  if (!el) return;
  el.innerHTML = CHECKOUTS.map(c => `
    <div class="co-item">
      <div class="co-room">${c.room}</div>
      <div class="co-info"><div class="co-name">${c.name}</div><div class="co-nights">${c.nights}</div></div>
      <span class="co-pill ${c.status}">${c.status === 'paid' ? '✓ Paid' : '⏳ Pending'}</span>
    </div>
  `).join('');
}

function renderHeroChart() {
  mkChart('heroOccChart', 'line', {
    labels: ['Mo','Tu','We','Th','Fr','Sa','Su'],
    datasets: [{
      data: [65,70,68,75,80,78,78],
      borderColor:'#00C896', borderWidth:2,
      fill:true, backgroundColor:'rgba(0,200,150,0.15)',
      tension:0.4, pointRadius:0,
    }]
  }, { responsive:false, animation:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}} });
}

function renderDashSparklines() {
  mkSparkline('spark1',[7600,7800,7950,8100,8200,8250,8340],'#F59E0B');
  mkSparkline('spark2',[5200,5500,5800,6000,6200,6400,6505],'#7C3AED');
}

function renderRevChart() {
  const labels = ['14 Jun','15','16','17','18','19','20 Jun'];
  mkChart('revChart7','bar',{
    labels,
    datasets:[
      {label:'Direct',data:[38000,42500,31000,56000,68000,52000,71000],backgroundColor:'rgba(0,200,150,0.2)',borderColor:'#00C896',borderWidth:2,borderRadius:6},
      {label:'OTA',data:[22000,18500,29000,24000,21000,33000,28000],backgroundColor:'rgba(124,58,237,0.2)',borderColor:'#7C3AED',borderWidth:2,borderRadius:6},
    ]
  },{plugins:{legend:{display:false}}});
}

// ── Animate occupancy counter
function animateCounter(el, target, suffix='') {
  let start = 0;
  const duration = 1200;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.querySelector('.kpi-mega').innerHTML = Math.round(ease * target) + `<span>${suffix}</span>`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ══════════════════════════════════════════════════════════
// BOOKING CALENDAR
// ══════════════════════════════════════════════════════════
let calOffset = 19, calDays = 14;

function initCalendar() {
  renderCal();
  document.getElementById('calPrev')?.addEventListener('click', () => { calOffset = Math.max(1, calOffset - 7); renderCal(); });
  document.getElementById('calNext')?.addEventListener('click', () => { calOffset += 7; renderCal(); });
  document.getElementById('closeBP')?.addEventListener('click', () => { document.getElementById('bookingPanel').style.display = 'none'; });
  document.getElementById('addCalBooking')?.addEventListener('click', openModal);
}

function renderCal() {
  const days = Array.from({length:calDays},(_,i)=>calOffset+i);
  const head = document.getElementById('calHead');
  const body = document.getElementById('calBody');
  if (!head || !body) return;

  const cols = `120px ${days.map(()=>'80px').join(' ')}`;
  head.style.gridTemplateColumns = cols;

  const DN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  head.innerHTML = `<div class="ch-cell">Room</div>` + days.map(d => {
    const dt = new Date(2026,5,d);
    const tod = d===20;
    return `<div class="ch-cell ${tod?'today-h':''}">
      <div style="font-size:9px">${DN[dt.getDay()]}</div>
      <div style="font-size:16px;font-weight:800;color:${tod?'var(--teal)':'var(--t1)'}">${d}</div>
      <div style="font-size:9px;color:var(--t3)">${MN[5]}</div>
    </div>`;
  }).join('');

  body.innerHTML = '';
  ROOMS.forEach(room => {
    const row = document.createElement('div');
    row.className = 'cal-row';
    row.style.gridTemplateColumns = cols;
    let html = `<div class="cal-room-cell"><div class="cr-num">${room.id}</div><div class="cr-type">${room.type}</div></div>`;
    days.forEach(d => {
      const bk = BOOKINGS.find(b => b.room===room.id && d>=b.checkIn && d<b.checkOut);
      const tod = d===20;
      let inner = '';
      if (bk && d===bk.checkIn) inner = `<div class="cal-blk ${bk.type}" data-bid="${bk.id}">${bk.guest}</div>`;
      else if (bk) inner = `<div class="cal-blk ${bk.type}" style="opacity:0.2" data-bid="${bk.id}"></div>`;
      html += `<div class="cal-cell ${tod?'today-c':''}" data-r="${room.id}" data-d="${d}">${inner}</div>`;
    });
    row.innerHTML = html;
    body.appendChild(row);

    row.querySelectorAll('.cal-blk').forEach(el => {
      el.addEventListener('click', e => { e.stopPropagation(); showBP(el.dataset.bid); });
    });
    row.querySelectorAll('.cal-cell').forEach(el => {
      el.addEventListener('click', () => { if (!el.querySelector('.cal-blk')) openModal(); });
    });
  });
}

function showBP(bid) {
  const b = BOOKINGS.find(x=>x.id===bid);
  if (!b) return;
  const panel = document.getElementById('bookingPanel');
  document.getElementById('bpGuestName').textContent = b.guest;
  document.getElementById('bpBody').innerHTML = `
    <div class="bp-row"><span>Room</span><span>${b.room}</span></div>
    <div class="bp-row"><span>Check-in</span><span>Jun ${b.checkIn}, 2026</span></div>
    <div class="bp-row"><span>Check-out</span><span>Jun ${b.checkOut}, 2026</span></div>
    <div class="bp-row"><span>Nights</span><span>${b.nights}</span></div>
    <div class="bp-row"><span>Source</span><span>${b.source||'—'}</span></div>
    <div class="bp-row"><span>Amount</span><span style="color:var(--teal);font-weight:800">${b.amount}</span></div>
    <div class="bp-row"><span>Status</span><span>${cap(b.type)}</span></div>
    <div class="bp-actions">
      <button class="ghost-btn">Edit</button>
      <button class="cta-btn magnetic-btn" onclick="showToast('success','Check-in Processed','Room ${b.room} marked as occupied')">Check-in</button>
    </div>
  `;
  panel.style.display = 'block';
  initMagnetic();
}

// ══════════════════════════════════════════════════════════
// GUEST CRM
// ══════════════════════════════════════════════════════════
let selGuest = null;

function initGuests() {
  renderGuestTable(GUESTS);
  const si = document.getElementById('guestSearch');
  si?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    renderGuestTable(GUESTS.filter(g => g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q)));
  });
}

function renderGuestTable(guests) {
  const tb = document.getElementById('crmTbody');
  if (!tb) return;
  tb.innerHTML = guests.map(g => {
    const init = g.name.split(' ').map(n=>n[0]).join('');
    return `<tr data-gid="${g.id}" class="${selGuest===g.id?'sel':''}">
      <td><div class="g-cell"><div class="g-ava" style="background:${g.color}">${init}</div><div><div class="g-name">${g.name}</div><div class="g-email">${g.email}</div></div></div></td>
      <td>${g.lastStay}</td><td>${g.stays}</td>
      <td><span class="wa-pill ${g.waOptIn?'yes':'no'}">${g.waOptIn?'✓ Yes':'✗ No'}</span></td>
      <td><span class="seg-tag ${g.segment}">${cap(g.segment)}</span></td>
      <td style="font-weight:700">${g.spent}</td>
      <td><button class="tb-view-btn">Profile →</button></td>
    </tr>`;
  }).join('');
  tb.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      selGuest = parseInt(row.dataset.gid);
      tb.querySelectorAll('tr').forEach(r=>r.classList.remove('sel'));
      row.classList.add('sel');
      showGuestProfile(selGuest);
    });
  });
}

function showGuestProfile(gid) {
  const g = GUESTS.find(x=>x.id===gid);
  if (!g) return;
  document.getElementById('profileEmpty').style.display = 'none';
  const det = document.getElementById('profileDetail');
  det.style.display = 'block';
  const init = g.name.split(' ').map(n=>n[0]).join('');
  det.innerHTML = `
    <div class="prof-hero">
      <div class="prof-ava" style="background:${g.color}">${init}</div>
      <div>
        <div class="prof-name">${g.name}</div>
        <div class="prof-since">Since 2024 · ${g.phone}</div>
        ${g.waOptIn?'<div style="font-size:11px;color:var(--green);margin-top:3px">✓ WhatsApp Opted-in</div>':''}
      </div>
    </div>
    <div class="prof-stats">
      <div class="prof-stat"><span class="prof-stat-val">${g.stays}</span><span class="prof-stat-label">Stays</span></div>
      <div class="prof-stat"><span class="prof-stat-val" style="font-size:11px;color:var(--teal)"><span class="seg-tag ${g.segment}">${cap(g.segment)}</span></span><span class="prof-stat-label">Segment</span></div>
      <div class="prof-stat"><span class="prof-stat-val" style="font-size:13px">${g.spent}</span><span class="prof-stat-label">Spent</span></div>
    </div>
    ${g.preferences.length?`<div class="prof-section">Preferences</div><div>${g.preferences.map(p=>`<span class="pref-tag">${p}</span>`).join('')}</div>`:''}
    ${g.notes?`<div class="prof-section">Notes</div><div class="prof-note">${g.notes}</div>`:''}
    <div class="prof-actions">
      <button class="ghost-btn" onclick="navigate('whatsapp')">WhatsApp</button>
      <button class="cta-btn magnetic-btn" onclick="openModal()">New Booking</button>
    </div>
  `;
  initMagnetic();
}

// ══════════════════════════════════════════════════════════
// WHATSAPP AI CONCIERGE
// ══════════════════════════════════════════════════════════
let activeThread = WA_THREADS[2];

function initWhatsApp() {
  renderThreads();
  renderChat(activeThread);
  renderWaInfo(activeThread);
}

function renderThreads() {
  const el = document.getElementById('waThreads');
  if (!el) return;
  el.innerHTML = `<div style="padding:10px 14px 6px;font-size:9px;font-weight:700;color:var(--t4);letter-spacing:0.1em">ACTIVE THREADS</div>`
    + WA_THREADS.map(t => `
    <div class="thread-item ${t.id===activeThread.id?'active':''}" data-tid="${t.id}">
      <div class="th-ava" style="background:${t.color}">${t.initials}</div>
      <div class="th-body">
        <div class="th-name">${t.name}</div>
        <div class="th-preview">${t.lastMsg}</div>
      </div>
      <div class="th-meta">
        <div class="th-time">${t.messages.at(-1).time}</div>
        ${t.unread?`<div class="th-unread">${t.unread}</div>`:''}
        ${t.aiHandled?'<div class="th-ai">AI</div>':''}
        ${t.escalated?'<div class="th-esc">⚠ Human needed</div>':''}
      </div>
    </div>`).join('');

  el.querySelectorAll('.thread-item').forEach(item => {
    item.addEventListener('click', () => {
      const tid = parseInt(item.dataset.tid);
      activeThread = WA_THREADS.find(t=>t.id===tid);
      el.querySelectorAll('.thread-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      renderChat(activeThread);
      renderWaInfo(activeThread);
    });
  });
}

function renderChat(thread) {
  const top = document.getElementById('waChatTop');
  const msgs = document.getElementById('waMsgs');
  if (!top || !msgs) return;

  top.innerHTML = `
    <div class="wct-ava" style="background:${thread.color}">${thread.initials}</div>
    <div>
      <div class="wct-name">${thread.name}</div>
      <div class="wct-status">${thread.aiHandled?'✦ AI Concierge Active':'● Online'}</div>
    </div>
    <div class="wct-badges">
      ${thread.aiHandled?'<span class="ai-pill">Claude 3.5</span>':''}
      ${thread.escalated?'<span class="esc-badge">⚠ Needs Human</span>':''}
    </div>`;

  let html = '';
  if (thread.escalated) {
    html += `<div class="esc-bar">⚠ Rohit is waiting for a GST invoice urgently. Tap to take over from AI.</div>`;
  }
  html += thread.messages.map(m => {
    const cls = m.from==='guest'?'from-guest':(m.from==='ai'?'from-ai':'from-staff');
    const avaColor = m.from==='guest'?thread.color:(m.from==='ai'?'#7C3AED':'#00C896');
    const avaText = m.from==='guest'?thread.initials:(m.from==='ai'?'AI':'ST');
    return `<div class="wa-msg ${cls}">
      <div class="msg-ava" style="background:${avaColor}">${avaText}</div>
      <div class="msg-content">
        <div class="bubble">${m.text}</div>
        <div class="msg-time">${m.time}</div>
        ${m.from==='ai'?'<div class="ai-label">✦ AI Concierge</div>':''}
      </div>
    </div>`;
  }).join('');

  msgs.innerHTML = html;
  msgs.scrollTop = msgs.scrollHeight;

  // Send
  const sendBtn = document.getElementById('sendBtn');
  const input = document.getElementById('composeInput');
  const aiTog = document.getElementById('aiToggle');

  const doSend = () => {
    const txt = input?.value.trim();
    if (!txt) return;
    const isAI = aiTog?.checked;
    activeThread.messages.push({ from: isAI ? 'ai' : 'staff', text: txt, time: new Date().toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'}) });
    if (input) input.value = '';
    renderChat(activeThread);
    showToast('success', 'Sent!', isAI ? 'AI response delivered via WhatsApp' : 'Staff reply sent');
  };
  sendBtn?.addEventListener('click', doSend);
  input?.addEventListener('keydown', e => { if (e.key==='Enter') doSend(); });
}

function renderWaInfo(thread) {
  const el = document.getElementById('waInfo');
  if (!el) return;
  const g = GUESTS.find(x=>x.name===thread.name) || {};
  el.innerHTML = `
    <div style="border-bottom:1px solid var(--glass-b);padding-bottom:14px;margin-bottom:14px">
      <div style="font-size:9px;font-weight:700;color:var(--t4);letter-spacing:0.1em;margin-bottom:10px">GUEST</div>
      <div style="display:flex;gap:9px;align-items:center;margin-bottom:10px">
        <div style="width:38px;height:38px;border-radius:50%;background:${thread.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white">${thread.initials}</div>
        <div><div style="font-size:13px;font-weight:600">${thread.name}</div><div style="font-size:11px;color:var(--t3)">Room ${thread.room}</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;font-size:12px">
        <div style="display:flex;justify-content:space-between"><span style="color:var(--t3)">Check-in</span><span>${thread.checkIn}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--t3)">Check-out</span><span>${thread.checkOut}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--t3)">Segment</span><span>${g.segment?`<span class="seg-tag ${g.segment}">${cap(g.segment)}</span>`:'—'}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:var(--t3)">AI Resolved</span><span style="color:var(--teal)">${thread.messages.filter(m=>m.from==='ai').length} msgs</span></div>
      </div>
    </div>
    <div style="font-size:9px;font-weight:700;color:var(--t4);letter-spacing:0.1em;margin-bottom:10px">QUICK ACTIONS</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${['📋 Send GST Invoice','⏰ Late Checkout Offer','⭐ Request Review','🚗 Book Taxi'].map(a =>
        `<button class="ghost-btn" style="text-align:left;font-size:11px;padding:7px 10px" onclick="showToast('info','Action','${a.split(' ').slice(1).join(' ')} sent to ${thread.name}')">${a}</button>`
      ).join('')}
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
// DYNAMIC PRICING
// ══════════════════════════════════════════════════════════
function initPricing() {
  renderPricingChart();
  renderSignals();
  renderRateTable();
  renderCompetitors();
}

function renderPricingChart() {
  const labels = Array.from({length:14},(_,i)=>`Jun ${20+i}`);
  const current = [8500,8500,9200,9200,9800,9800,8800,8200,8200,9500,9500,10500,10500,9800];
  const ai = [8800,9100,9600,9900,10200,10500,9200,8500,8700,9800,10000,11200,11000,10200];
  mkChart('pricingChartCanvas','line',{
    labels,
    datasets:[
      {label:'Current',data:current,borderColor:'#475569',borderWidth:2,borderDash:[4,4],fill:false,tension:0.3,pointRadius:3,pointBackgroundColor:'#475569'},
      {label:'AI Suggested',data:ai,borderColor:'#00C896',borderWidth:2.5,fill:true,backgroundColor:'rgba(0,200,150,0.05)',tension:0.3,pointRadius:4,pointBackgroundColor:'#00C896'},
    ]
  },{plugins:{legend:{display:true,labels:{color:'#64748B',font:{size:11},boxWidth:14,padding:14}},tooltip:{callbacks:{label:ctx=>`₹${ctx.parsed.y.toLocaleString()}`}}}});
}

function renderSignals() {
  const el = document.getElementById('pricingSignals');
  if (!el) return;
  el.innerHTML = PRICING_SIGNALS.map(s => `
    <div class="signal-item">
      <div class="sig-icon">${s.icon}</div>
      <div class="sig-body">
        <div class="sig-title">${s.title}</div>
        <div class="sig-val">${s.val}</div>
        <span class="sig-impact ${s.impact}">${s.impact==='up'?'↑ Raise Rates':'→ Monitor'}</span>
      </div>
    </div>`).join('');
}

function renderRateTable() {
  const el = document.getElementById('rateTableWrap');
  if (!el) return;
  const rates = [
    {type:'Standard Room',curr:'₹6,800',ai:'₹7,200',chg:'+5.9%'},
    {type:'Deluxe Mtn View',curr:'₹8,500',ai:'₹9,100',chg:'+7.1%'},
    {type:'Premium Suite',curr:'₹12,000',ai:'₹13,200',chg:'+10%'},
    {type:'Cozy Cottage',curr:'₹7,200',ai:'₹7,800',chg:'+8.3%'},
  ];
  el.innerHTML = `<table class="rate-tbl">
    <thead><tr><th>Room Type</th><th>Current</th><th>AI Rate</th><th>Change</th></tr></thead>
    <tbody>${rates.map(r=>`<tr>
      <td>${r.type}</td>
      <td style="color:var(--t3)">${r.curr}</td>
      <td class="ai-rate">${r.ai}</td>
      <td><span class="rate-up">${r.chg}</span></td>
    </tr>`).join('')}</tbody>
  </table>`;
}

function renderCompetitors() {
  const el = document.getElementById('compRates');
  if (!el) return;
  el.innerHTML = COMPETITORS.map(c => `
    <div class="comp-item">
      <div><div class="comp-name">${c.name}</div><div class="comp-diff ${c.type}">${c.diff}</div></div>
      <div class="comp-rate">${c.rate}</div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════════════
// HOUSEKEEPING
// ══════════════════════════════════════════════════════════
function initHousekeeping() {
  const cols = [
    {key:'dirty',title:'Needs Cleaning',color:'#F59E0B'},
    {key:'in_progress',title:'In Progress',color:'#7C3AED'},
    {key:'clean',title:'Clean & Ready',color:'#10B981'},
    {key:'ooo',title:'Out of Order',color:'#EF4444'},
  ];
  const kanban = document.getElementById('kanban');
  if (!kanban) return;

  kanban.innerHTML = cols.map(col => `
    <div class="kanban-col">
      <div class="kanban-head">
        <div class="kh-title"><span class="kh-dot" style="background:${col.color}"></span>${col.title}</div>
        <span class="kh-count" style="background:color-mix(in srgb,${col.color} 12%,transparent);color:${col.color}">${HK[col.key].length}</span>
      </div>
      <div class="kanban-body" id="kb-${col.key}">
        ${HK[col.key].map(t => mkHKCard(t)).join('')}
      </div>
    </div>`).join('');

  // Drag & drop
  kanban.querySelectorAll('.hk-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/html', card.outerHTML);
      setTimeout(() => card.style.opacity = '0.3', 0);
    });
    card.addEventListener('dragend', () => { card.style.opacity = '1'; });
  });
  kanban.querySelectorAll('.kanban-body').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.outline = '2px dashed var(--teal)'; zone.style.outlineOffset = '-4px'; });
    zone.addEventListener('dragleave', () => { zone.style.outline = ''; });
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.style.outline = '';
      zone.insertAdjacentHTML('beforeend', e.dataTransfer.getData('text/html'));
      showToast('success','Room Status Updated','Task moved successfully');
    });
  });
}

function mkHKCard(t) {
  const init = t.staff.split(' ').map(n=>n[0]).join('');
  return `<div class="hk-card" draggable="true">
    <div class="hk-card-top">
      <div><div class="hk-room">${t.room}</div><div class="hk-type">${t.type}</div></div>
      <span class="hk-prio ${t.prio}">${cap(t.prio)}</span>
    </div>
    <div class="hk-notes">${t.notes}</div>
    <div class="hk-footer">
      <div class="hk-staff"><div class="hk-sava" style="background:${t.sc}">${init}</div>${t.staff}</div>
      <div class="hk-time">${t.time}</div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════
// BILLING
// ══════════════════════════════════════════════════════════
function initBilling() {
  const stats = document.getElementById('billingStats');
  if (stats) stats.innerHTML = `
    <div><span class="bstat-val">₹4,23,800</span><div class="bstat-label">Total Revenue</div></div>
    <div><span class="bstat-val" style="color:var(--teal)">₹38,142</span><div class="bstat-label">GST Collected</div></div>
    <div><span class="bstat-val" style="color:var(--amber)">3</span><div class="bstat-label">Pending Invoices</div></div>
    <div><span class="bstat-val" style="color:var(--green)">₹2,11,900</span><div class="bstat-label">Direct Revenue</div></div>
  `;
  const list = document.getElementById('invList');
  if (!list) return;
  list.innerHTML = INVOICES.map(inv => `
    <div class="inv-item">
      <div class="inv-num">${inv.num}</div>
      <div class="inv-guest-info"><div class="inv-gname">${inv.guest}</div><div class="inv-date">${inv.date} · GST: ${inv.gst}</div></div>
      <div class="inv-amt">${inv.amount}</div>
      <span class="inv-pill ${inv.status}">${cap(inv.status)}</span>
    </div>`).join('');

  document.getElementById('newInvoiceBtn')?.addEventListener('click', openModal);
}

// ══════════════════════════════════════════════════════════
// ANALYTICS
// ══════════════════════════════════════════════════════════
function initAnalytics() {
  mkChart('occTrendChart','line',{
    labels:['14 Jun','15','16','17','18','19','20 Jun'],
    datasets:[{
      label:'Occupancy %',
      data:[68,72,65,80,85,78,78],
      borderColor:'#00C896',borderWidth:2.5,
      fill:true,backgroundColor:'rgba(0,200,150,0.07)',
      tension:0.4,pointRadius:5,pointBackgroundColor:'#00C896',
      pointBorderColor:'rgba(0,200,150,0.3)',pointBorderWidth:4,
    }]
  },{scales:{y:{ticks:{callback:v=>v+'%',color:'#475569',font:{size:11}},max:100,grid:{color:'rgba(255,255,255,0.03)'}},x:{ticks:{color:'#475569',font:{size:11}},grid:{color:'rgba(255,255,255,0.03)'}}}});

  mkChart('srcChart','doughnut',{
    labels:['Direct (StayOS)','Booking.com','MakeMyTrip','Walk-in','Agoda'],
    datasets:[{data:[42,22,18,12,6],backgroundColor:['#00C896','#7C3AED','#F59E0B','#10B981','#EF4444'],borderWidth:0,hoverOffset:10}]
  },{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{color:'#94A3B8',font:{size:11},boxWidth:10,padding:10}},tooltip:{callbacks:{label:ctx=>`${ctx.label}: ${ctx.parsed}%`}}}});

  mkChart('adrChart','line',{
    labels:['14 Jun','15','16','17','18','19','20 Jun'],
    datasets:[
      {label:'ADR (₹)',data:[7900,8100,8000,8200,8300,8320,8340],borderColor:'#F59E0B',borderWidth:2,fill:false,tension:0.4,pointRadius:4,pointBackgroundColor:'#F59E0B'},
      {label:'RevPAR (₹)',data:[5372,5832,5200,6560,7055,6490,6505],borderColor:'#7C3AED',borderWidth:2,fill:false,tension:0.4,pointRadius:4,pointBackgroundColor:'#7C3AED'},
    ]
  },{plugins:{legend:{display:true,labels:{color:'#64748B',font:{size:11},boxWidth:12,padding:12}},tooltip:{callbacks:{label:ctx=>`₹${ctx.parsed.y.toLocaleString()}`}}}});

  initTilt();
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.period-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      showToast('info','Period Changed',`Showing ${btn.dataset.p.toUpperCase()} data`);
    });
  });
}

// ══════════════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════════════
function initSettings() {
  const form = document.getElementById('settingsForm');
  if (form) form.innerHTML = `
    <label class="field"><span>Hotel Name</span><input class="fi" value="Himalayan Grove"/></label>
    <label class="field"><span>Location</span><input class="fi" value="Manali, Himachal Pradesh"/></label>
    <label class="field"><span>GSTIN</span><input class="fi" value="02AABCU9603R1ZZ"/></label>
    <label class="field"><span>Total Rooms</span><input class="fi" type="number" value="18"/></label>
    <button class="cta-btn magnetic-btn" style="margin-top:4px" onclick="showToast('success','Saved!','Hotel profile updated successfully')">Save Changes</button>
  `;

  const il = document.getElementById('integList');
  if (il) il.innerHTML = INTEGRATIONS.map(i => `
    <div class="integ-item">
      <div class="int-ico" style="background:${i.bg}20;border:1px solid ${i.bg}30">${i.icon}</div>
      <div class="int-info"><div class="int-name">${i.name}</div><div class="int-detail">${i.detail}</div></div>
      <span class="int-stat ${i.status}">${cap(i.status)}</span>
    </div>`).join('');

  const tl = document.getElementById('teamList');
  if (tl) tl.innerHTML = TEAM.map(m => `
    <div class="team-item">
      <div class="team-ava" style="background:${m.color}">${m.init}</div>
      <div class="team-info"><div class="team-name">${m.name}</div><div class="team-role">${m.role}</div></div>
      <span class="role-badge" style="background:color-mix(in srgb,${m.rc} 12%,transparent);color:${m.rc};border:1px solid color-mix(in srgb,${m.rc} 20%,transparent)">${m.role.split(' ')[0]}</span>
    </div>`).join('');

  const wac = document.getElementById('waConfigForm');
  if (wac) wac.innerHTML = `
    <label class="field"><span>Provider</span><select class="fi"><option>Interakt</option><option>WATI</option><option>Gupshup</option></select></label>
    <label class="field"><span>API Key</span><input class="fi" type="password" value="sk-••••••••••••••••"/></label>
    <label class="field"><span>AI Model</span><select class="fi"><option>Claude 3.5 Sonnet</option><option>Gemini 1.5 Pro</option><option>GPT-4o</option></select></label>
    <div class="field"><span>Auto-escalate after</span>
      <div style="display:flex;gap:6px;margin-top:4px">
        ${['2 mins','5 mins','10 mins'].map((t,i)=>`<button class="ghost-btn ${i===0?'active':''}" style="font-size:11px;padding:5px 10px;${i===0?'border-color:var(--teal);color:var(--teal)':''}">${t}</button>`).join('')}
      </div>
    </div>
  `;
  initMagnetic();
}

// ══════════════════════════════════════════════════════════
// MODAL
// ══════════════════════════════════════════════════════════
function openModal() {
  const m = document.getElementById('bookingModal');
  m.style.display = 'flex';
  const today = new Date(2026,5,20);
  const co = new Date(2026,5,22);
  const fmt = d => d.toISOString().split('T')[0];
  document.getElementById('bkIn').value = fmt(today);
  document.getElementById('bkOut').value = fmt(co);
  updateTotal();
  setTimeout(() => {
    initMagnetic();
  }, 50);
}

function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
}

function updateTotal() {
  const ci = new Date(document.getElementById('bkIn')?.value);
  const co = new Date(document.getElementById('bkOut')?.value);
  const rate = parseInt(document.getElementById('bkRate')?.value) || 0;
  const nights = Math.max(0, Math.round((co - ci) / 86400000));
  document.getElementById('modalTotal').textContent = `₹${(rate*nights).toLocaleString('en-IN')} (${nights} night${nights!==1?'s':''})`;
}

// ══════════════════════════════════════════════════════════
// COMMAND PALETTE
// ══════════════════════════════════════════════════════════
const CMD_ITEMS = [
  { group: 'Navigate', icon: '⬛', label: 'Dashboard',           action: () => navigate('dashboard') },
  { group: 'Navigate', icon: '📅', label: 'Booking Calendar',    action: () => navigate('calendar') },
  { group: 'Navigate', icon: '👥', label: 'Guest CRM',           action: () => navigate('guests') },
  { group: 'Navigate', icon: '💬', label: 'WhatsApp Concierge',  action: () => navigate('whatsapp') },
  { group: 'Navigate', icon: '📈', label: 'Dynamic Pricing',     action: () => navigate('pricing') },
  { group: 'Navigate', icon: '🧹', label: 'Housekeeping',        action: () => navigate('housekeeping') },
  { group: 'Navigate', icon: '🧾', label: 'Billing & GST',       action: () => navigate('billing') },
  { group: 'Navigate', icon: '📊', label: 'Analytics',           action: () => navigate('analytics') },
  { group: 'Navigate', icon: '⚙️', label: 'Settings',            action: () => navigate('settings') },
  { group: 'Actions',  icon: '➕', label: 'New Booking',         action: openModal },
  { group: 'Actions',  icon: '🔔', label: 'Notifications',       action: () => document.getElementById('notifBtn')?.click() },
  { group: 'Properties', icon: '🏔️', label: 'Himalayan Grove · Manali', action: () => switchProperty(PROPERTIES[0]) },
  { group: 'Properties', icon: '🌊', label: 'Gateway Sands · Goa',       action: () => switchProperty(PROPERTIES[1]) },
  { group: 'Properties', icon: '🏙️', label: 'Capital Suites · Delhi',    action: () => switchProperty(PROPERTIES[2]) },
];

let cmdFocusIdx = -1;

function openCmdPalette() {
  const bd = document.getElementById('cmdBackdrop');
  if (!bd) return;
  bd.style.display = 'flex';
  cmdFocusIdx = -1;
  setTimeout(() => {
    const input = document.getElementById('cmdInput');
    if (input) { input.value = ''; input.focus(); }
    renderCmdResults('');
  }, 30);
}

function closeCmdPalette() {
  const bd = document.getElementById('cmdBackdrop');
  if (bd) bd.style.display = 'none';
  cmdFocusIdx = -1;
}

function fuzzyMatch(str, query) {
  if (!query) return true;
  const s = str.toLowerCase();
  const q = query.toLowerCase();
  let si = 0;
  for (let qi = 0; qi < q.length; qi++) {
    while (si < s.length && s[si] !== q[qi]) si++;
    if (si >= s.length) return false;
    si++;
  }
  return true;
}

function renderCmdResults(query) {
  const el = document.getElementById('cmdResults');
  if (!el) return;
  cmdFocusIdx = -1;

  const filtered = CMD_ITEMS.filter(item => fuzzyMatch(item.label, query));
  if (!filtered.length) {
    el.innerHTML = `<div class="cmd-empty">No results for "${query}"</div>`;
    return;
  }

  const groups = {};
  filtered.forEach(item => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });

  el.innerHTML = Object.entries(groups).map(([group, items]) => `
    <div class="cmd-result-group">${group}</div>
    ${items.map(item => `
      <div class="cmd-item" data-label="${item.label}" role="button" tabindex="-1">
        <div class="cmd-item-icon">${item.icon}</div>
        <div class="cmd-item-label">${item.label}</div>
      </div>
    `).join('')}
  `).join('');

  el.querySelectorAll('.cmd-item').forEach((node, i) => {
    node.addEventListener('click', () => {
      closeCmdPalette();
      filtered[i].action();
    });
    node.addEventListener('mouseenter', () => {
      cmdFocusIdx = i;
      updateCmdFocus(el.querySelectorAll('.cmd-item'));
    });
  });
}

function updateCmdFocus(items) {
  items.forEach((item, i) => item.classList.toggle('focused', i === cmdFocusIdx));
  const f = items[cmdFocusIdx];
  if (f) f.scrollIntoView({ block: 'nearest' });
}

function initCmdPalette() {
  const input = document.getElementById('cmdInput');
  if (!input) return;
  input.addEventListener('input', () => renderCmdResults(input.value.trim()));
  input.addEventListener('keydown', e => {
    const items = document.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdFocusIdx = Math.min(cmdFocusIdx + 1, items.length - 1);
      updateCmdFocus(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdFocusIdx = Math.max(cmdFocusIdx - 1, 0);
      updateCmdFocus(items);
    } else if (e.key === 'Enter') {
      const f = document.querySelector('.cmd-item.focused');
      if (f) f.click();
    }
  });
}

// ══════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════
function showToast(type, title, msg) {
  const svgIcons = {
    success: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--green)"><polyline points="20 6 9 17 4 12"/></svg>`,
    info:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--teal)"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--amber)"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    error:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--red)"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  };
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="toast-ico">${svgIcons[type] || ''}</div><div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

// ══════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

// ══════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initCursor();

  // Nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { const v = btn.dataset.view; if (v) navigate(v); });
  });

  // Sidebar collapse
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  document.getElementById('sidebarPin')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });

  // Modal
  document.getElementById('addBookingBtn')?.addEventListener('click', openModal);
  document.getElementById('closeModal')?.addEventListener('click', closeModal);
  document.getElementById('cancelModal')?.addEventListener('click', closeModal);
  document.getElementById('bookingModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  ['bkIn','bkOut','bkRate'].forEach(id => document.getElementById(id)?.addEventListener('input', updateTotal));
  document.getElementById('confirmBooking')?.addEventListener('click', () => {
    const name = document.getElementById('bkName')?.value.trim() || 'Guest';
    closeModal();
    showToast('success','Booking Confirmed!',`${name}'s reservation created`);
    setTimeout(() => showToast('info','WhatsApp Sent','Confirmation & directions delivered in < 3s ✓'), 800);
  });

  // Notifications
  document.getElementById('notifBtn')?.addEventListener('click', () => {
    showToast('warning','3 Alerts','GST invoice needed · Room 302 OOO · Weekend surge pricing ready');
  });

  // Analytics period buttons
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.period-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Property switcher
  document.getElementById('propertySwitcher')?.addEventListener('click', togglePropertyDropdown);
  document.addEventListener('click', e => {
    if (!e.target.closest('#propertySwitcher') && !e.target.closest('#propertyDropdown')) {
      closePropertyDropdown();
    }
  });

  // Command palette — open on ⌘K or clicking search bar
  document.getElementById('searchBar')?.addEventListener('click', openCmdPalette);
  document.getElementById('cmdBackdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCmdPalette();
  });
  initCmdPalette();

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCmdPalette();
      return;
    }
    if (e.key === 'Escape') {
      const bd = document.getElementById('cmdBackdrop');
      if (bd && bd.style.display === 'flex') { closeCmdPalette(); return; }
      closeModal();
    }
  });

  // Init first view
  initDashboard();

  // Init magnetic on all existing magnetic buttons
  initMagnetic();

  // Welcome toasts
  setTimeout(() => showToast('success', 'Welcome back, Vansh', 'Himalayan Grove is at 78% occupancy tonight'), 600);
  setTimeout(() => showToast('info', 'AI Concierge active', '22 of 24 guest queries resolved automatically today'), 1800);
  setTimeout(() => showToast('warning', 'Action needed', 'Rohit Gupta is waiting on a GST invoice — Room 104'), 3200);
});
