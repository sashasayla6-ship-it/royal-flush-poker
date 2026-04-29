const fs = require('fs');
const url = 'https://21d4ea154ea45d.lhr.life';
const SEATS = [
  {x:50,y:10},  // top center
  {x:85,y:25},  // top right
  {x:90,y:60},  // right
  {x:75,y:88},  // bottom right
  {x:25,y:88},  // bottom left
  {x:10,y:60},  // left
  {x:15,y:25},  // top left
  {x:50,y:85},  // bottom center
  {x:50,y:50},  // center (dealer)
];

const html = `<!DOCTYPE html>
<html lang="mn"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<title>Royal Flush Poker</title>
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></scr${'ipt>'}
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
body{background:#06080f;color:#e8dcc8;font-family:'Inter',system-ui,sans-serif;max-width:430px;margin:0 auto;min-height:100vh;overflow-x:hidden;}
:root{--gold:#c9a84c;--gold2:#f0d080;--dark:#06080f;--c1:#0c1018;--c2:#111827;--border:#1a2030;--felt:#071a0f;}
.page{display:none;min-height:100vh;flex-direction:column;}
.page.active{display:flex;}

/* AUTH */
.auth-bg{flex:1;display:flex;flex-direction:column;background:linear-gradient(180deg,#0a1220,#06080f);}
.auth-hero{padding:48px 24px 32px;display:flex;flex-direction:column;align-items:center;background:linear-gradient(135deg,#0a1a10,#0d1525);border-bottom:1px solid rgba(201,168,76,0.1);}
.auth-crown{font-size:48px;margin-bottom:12px;}
.auth-logo{font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:var(--gold);text-shadow:0 0 30px rgba(201,168,76,0.3);letter-spacing:1px;}
.auth-sub{font-size:11px;color:#444;letter-spacing:3px;text-transform:uppercase;margin-top:8px;}
.auth-form{padding:24px;}
.auth-card{background:var(--c1);border:1px solid var(--border);border-radius:20px;padding:24px;}
.tabs{display:flex;background:var(--dark);border-radius:12px;padding:3px;margin-bottom:20px;border:1px solid var(--border);}
.tab{flex:1;padding:10px;border:none;background:transparent;color:#555;border-radius:10px;font-size:14px;cursor:pointer;font-weight:500;}
.tab.active{background:linear-gradient(135deg,#b8860b,#c9a84c);color:#06080f;font-weight:700;}
.flabel{font-size:11px;color:#555;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;display:block;}
input{width:100%;background:var(--dark);border:1px solid var(--border);border-radius:12px;padding:13px 16px;color:#e8dcc8;font-size:15px;margin-bottom:16px;outline:none;}
input:focus{border-color:var(--gold);}
input::placeholder{color:#2a2a2a;}
.btn-gold{width:100%;background:linear-gradient(135deg,#b8860b,#c9a84c,#f0d080);color:#06080f;border:none;border-radius:12px;padding:15px;font-size:16px;font-weight:700;cursor:pointer;}
.btn-gold:active{opacity:0.9;}
.err{color:#e05555;font-size:13px;margin-bottom:10px;min-height:18px;text-align:center;}
.bonus-tag{text-align:center;font-size:12px;color:var(--gold);margin-top:10px;}

/* NAV */
.nav{display:flex;justify-content:space-between;align-items:center;background:var(--c1);padding:14px 16px;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
.nav-logo{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--gold);}
.nav-right{display:flex;align-items:center;gap:8px;}
.chip-badge{background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:6px 14px;font-size:13px;font-weight:700;color:var(--gold);}
.nav-btn{background:var(--c2);color:#e8dcc8;border:1px solid var(--border);border-radius:10px;padding:7px 12px;font-size:13px;cursor:pointer;}

/* LOBBY */
.lobby-body{flex:1;overflow-y:auto;padding-bottom:80px;}
.lobby-banner{background:linear-gradient(135deg,#0a1f13,#0d1525);padding:20px;margin:12px;border-radius:20px;border:1px solid rgba(201,168,76,0.2);position:relative;overflow:hidden;}
.lobby-banner::after{content:"♠";position:absolute;right:-15px;bottom:-15px;font-size:100px;opacity:0.04;color:var(--gold);}
.banner-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--gold);margin-bottom:4px;}
.banner-sub{font-size:12px;color:#555;margin-bottom:8px;}
.banner-chip{display:inline-block;font-size:12px;color:var(--gold);font-weight:600;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:20px;padding:4px 12px;}
.sec-title{font-size:11px;font-weight:600;color:#333;padding:0 16px;margin:16px 0 8px;text-transform:uppercase;letter-spacing:1.5px;}
.filters{display:flex;gap:6px;padding:0 16px 12px;overflow-x:auto;}
.filters::-webkit-scrollbar{display:none;}
.fpill{white-space:nowrap;padding:7px 16px;border:1px solid var(--border);border-radius:20px;font-size:12px;color:#444;background:var(--c1);cursor:pointer;}
.fpill.active{background:rgba(201,168,76,0.1);color:var(--gold);border-color:rgba(201,168,76,0.4);}
.tlist{display:flex;flex-direction:column;gap:12px;padding:0 16px;}
.tcard{background:var(--c1);border:1px solid var(--border);border-radius:20px;padding:18px;position:relative;overflow:hidden;cursor:pointer;}
.tcard:active{border-color:var(--gold);}
.tcard-shine{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);}
.tcard-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
.tcard-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#e8dcc8;}
.mbadge{display:inline-block;font-size:11px;padding:4px 12px;border-radius:10px;font-weight:600;}
.virtual{background:rgba(13,92,58,0.2);color:#2ecc71;border:1px solid rgba(46,204,113,0.2);}
.real{background:rgba(184,134,11,0.15);color:var(--gold);border:1px solid rgba(201,168,76,0.25);}
.tcard-info{display:flex;margin-bottom:14px;background:rgba(0,0,0,0.3);border-radius:12px;overflow:hidden;border:1px solid var(--border);}
.tinfo{flex:1;padding:10px;text-align:center;border-right:1px solid var(--border);}
.tinfo:last-child{border-right:none;}
.tinfo-label{font-size:9px;color:#333;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;}
.tinfo-val{font-size:13px;font-weight:700;color:#e8dcc8;}
.tcard-footer{display:flex;justify-content:space-between;align-items:center;}
.seat-row{display:flex;gap:4px;align-items:center;}
.seat{width:9px;height:9px;border-radius:50%;background:var(--border);}
.seat.on{background:var(--gold);box-shadow:0 0 4px rgba(201,168,76,0.5);}
.seat-count{font-size:11px;color:#333;margin-left:4px;}
.join-btn{background:linear-gradient(135deg,#b8860b,#c9a84c);color:#06080f;border:none;border-radius:12px;padding:9px 20px;font-size:13px;font-weight:700;cursor:pointer;}

/* JOIN MODAL */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:200;display:flex;align-items:flex-end;justify-content:center;}
.modal-bg.hidden{display:none;}
.modal{background:var(--c1);border:1px solid var(--border);border-radius:24px 24px 0 0;padding:28px 24px 40px;width:100%;max-width:430px;}
@keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
.modal{animation:slideUp 0.3s ease;}
.modal-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--gold);margin-bottom:4px;}
.modal-sub{font-size:13px;color:#555;margin-bottom:20px;}
.modal-table{font-size:15px;font-weight:600;color:#e8dcc8;margin-bottom:16px;padding:12px;background:rgba(0,0,0,0.3);border-radius:12px;border:1px solid var(--border);text-align:center;}
.seat-picker{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px;}
.seat-option{padding:12px 8px;border:1px solid var(--border);border-radius:12px;background:var(--dark);cursor:pointer;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;}
.seat-option:active{border-color:var(--gold);}
.seat-option.taken{opacity:0.3;cursor:not-allowed;}
.seat-option.selected{border-color:var(--gold);background:rgba(201,168,76,0.08);}
.seat-icon{font-size:20px;}
.seat-num{font-size:11px;color:#555;}
.modal-btn{width:100%;padding:15px;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px;}
.modal-btn.primary{background:linear-gradient(135deg,#b8860b,#c9a84c);color:#06080f;}
.modal-btn.secondary{background:var(--c2);color:#e8dcc8;border:1px solid var(--border);}

/* PROFILE */
.prof-hero{background:linear-gradient(180deg,#0a1f13,#06080f);padding:32px 16px 24px;display:flex;flex-direction:column;align-items:center;gap:10px;border-bottom:1px solid var(--border);}
.prof-avatar{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,#b8860b,#c9a84c);display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800;color:#06080f;border:3px solid var(--gold);box-shadow:0 0 24px rgba(201,168,76,0.25);}
.prof-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;}
.prof-badge{background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.25);border-radius:20px;padding:4px 16px;font-size:12px;color:var(--gold);}
.prof-level{font-size:11px;color:#555;letter-spacing:2px;text-transform:uppercase;}
.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:16px;}
.stat-card{background:var(--c1);border:1px solid var(--border);border-radius:16px;padding:16px;text-align:center;}
.stat-val{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--gold);margin-bottom:4px;}
.stat-label{font-size:10px;color:#333;text-transform:uppercase;letter-spacing:0.5px;}
.logout-btn{width:calc(100% - 32px);margin:0 16px 16px;background:rgba(180,40,30,0.1);color:#e05555;border:1px solid rgba(180,40,30,0.25);border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;}

/* WALLET */
.wallet-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;padding-bottom:80px;}
.wallet-card{background:var(--c1);border:1px solid var(--border);border-radius:20px;padding:20px;}
.w-label{font-size:11px;color:#333;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.w-amount{font-size:32px;font-weight:700;font-family:'Playfair Display',serif;}
.w-amount.gold{color:var(--gold);}
.deposit-title{font-family:'Playfair Display',serif;font-size:17px;color:var(--gold);margin-bottom:16px;}
.amount-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
.apill{padding:9px 16px;border:1px solid var(--border);border-radius:12px;font-size:13px;cursor:pointer;background:var(--dark);color:#444;font-weight:500;}
.apill.active{border-color:var(--gold);background:rgba(201,168,76,0.08);color:var(--gold);}
.pay-methods{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
.pay-method{display:flex;align-items:center;gap:12px;padding:13px;background:var(--dark);border:1px solid var(--border);border-radius:12px;cursor:pointer;}
.pay-method.selected{border-color:var(--gold);background:rgba(201,168,76,0.05);}
.pay-icon{font-size:24px;}
.pay-name{font-size:14px;font-weight:600;color:#e8dcc8;}
.pay-sub{font-size:11px;color:#444;}
.pay-radio{width:18px;height:18px;border-radius:50%;border:2px solid var(--border);margin-left:auto;}
.pay-radio.on{border-color:var(--gold);background:var(--gold);}

/* GAME */
.game-screen{flex:1;display:flex;flex-direction:column;background:var(--felt);}
.game-nav{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(0,0,0,0.7);border-bottom:1px solid rgba(201,168,76,0.1);}
.game-nav-btn{background:rgba(255,255,255,0.07);color:#e8dcc8;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:7px 12px;font-size:13px;cursor:pointer;}
.game-title{font-family:'Playfair Display',serif;font-size:14px;color:var(--gold);}
.game-phase{font-size:10px;color:rgba(201,168,76,0.4);text-align:center;text-transform:uppercase;letter-spacing:1px;}

/* POKER TABLE */
.table-container{flex:1;position:relative;display:flex;align-items:center;justify-content:center;padding:8px;background:radial-gradient(ellipse at center,#0a1f12 0%,#071a0f 50%,#040d08 100%);}
.poker-table{position:relative;width:100%;padding-bottom:85%;background:radial-gradient(ellipse at center,#0f3520 0%,#0a2518 40%,#071a0f 70%,#040d08 100%);border-radius:50%;border:6px solid #3d2800;box-shadow:0 0 0 2px #c9a84c,0 0 0 4px #3d2800,0 0 40px rgba(0,0,0,0.8),inset 0 0 60px rgba(0,0,0,0.4);}
.poker-table::before{content:"";position:absolute;inset:12px;border-radius:50%;border:2px solid rgba(201,168,76,0.08);}
.poker-table::after{content:"ROYAL FLUSH POKER";position:absolute;top:50%;left:50%;transform:translate(-50%,-20px);font-family:"Playfair Display",serif;font-size:8px;color:rgba(201,168,76,0.08);letter-spacing:3px;white-space:nowrap;}

/* SEATS ON TABLE */
.table-seat{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;z-index:5;}
.seat-avatar{width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,0.6);border:2px dashed rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;color:rgba(255,255,255,0.15);transition:all 0.2s;}
.table-seat.occupied .seat-avatar{background:linear-gradient(135deg,#1a2535,#243050);border:2px solid rgba(201,168,76,0.25);color:#e8dcc8;font-size:14px;font-weight:700;}
.table-seat.occupied.my-seat .seat-avatar{border-color:var(--gold);box-shadow:0 0 12px rgba(201,168,76,0.4);}
.table-seat.active-turn .seat-avatar{border-color:var(--gold);box-shadow:0 0 16px rgba(201,168,76,0.5);}
.dealer-chip{position:absolute;top:-5px;right:-5px;width:14px;height:14px;background:var(--gold);border-radius:50%;font-size:7px;display:flex;align-items:center;justify-content:center;color:#06080f;font-weight:800;}
.seat-cards{display:flex;gap:2px;margin-top:1px;}
.card-back-sm{width:14px;height:20px;background:linear-gradient(135deg,#0d5c3a,#0a3d26);border-radius:2px;border:1px solid rgba(255,255,255,0.1);}
.seat-info{display:flex;flex-direction:column;align-items:center;}
.seat-name{font-size:9px;color:rgba(255,255,255,0.5);max-width:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;}
.seat-chips{font-size:9px;color:var(--gold);font-weight:600;}
.empty-seat-label{font-size:8px;color:rgba(255,255,255,0.1);}

/* CENTER */
.table-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:4px;z-index:3;}
.pot-display{display:flex;align-items:center;gap:4px;}
.pot-chip-sm{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#b8860b,#c9a84c);font-size:10px;display:flex;align-items:center;justify-content:center;}
.pot-num{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:var(--gold);}
.community-row{display:flex;gap:4px;}
.card{width:32px;height:46px;background:linear-gradient(180deg,#fff,#f5f5f5);border-radius:5px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#111;box-shadow:0 3px 10px rgba(0,0,0,0.6);}
.card.red{color:#c0392b;}
.card.mine{border:2px solid var(--gold);box-shadow:0 0 10px rgba(201,168,76,0.5);}
@keyframes deal{from{transform:scale(0.2) rotate(-20deg);opacity:0;}to{transform:scale(1) rotate(0);opacity:1;}}
.card.deal{animation:deal 0.4s cubic-bezier(0.34,1.56,0.64,1);}
.card-rank{font-size:11px;font-weight:800;line-height:1.1;}
.card-suit{font-size:12px;line-height:1.1;}
.card-empty{width:32px;height:46px;border:1px dashed rgba(255,255,255,0.06);border-radius:5px;background:rgba(255,255,255,0.01);}

/* MY HAND */
.my-hand-area{padding:8px 16px;display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(0,0,0,0.4);}
.my-hand-lbl{font-size:9px;color:rgba(201,168,76,0.4);text-transform:uppercase;letter-spacing:1.5px;}
.my-cards{display:flex;gap:10px;}
.my-card{width:42px;height:60px;background:linear-gradient(180deg,#fff,#f5f5f5);border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#111;box-shadow:0 4px 12px rgba(0,0,0,0.6);border:2px solid var(--gold);box-shadow:0 0 14px rgba(201,168,76,0.4);}
.my-card.red{color:#c0392b;}

/* ACTION */
.action-panel{background:linear-gradient(180deg,rgba(0,0,0,0.8),rgba(6,8,15,0.97));padding:10px 12px 16px;border-top:1px solid rgba(201,168,76,0.1);}
.turn-bar{text-align:center;font-size:12px;font-weight:600;margin-bottom:8px;min-height:18px;color:var(--gold);}
.action-row{display:flex;gap:6px;margin-bottom:8px;}
.action-btn{flex:1;padding:12px 4px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;}
.action-btn:active{transform:scale(0.96);}
.btn-fold{background:rgba(180,40,30,0.15);color:#e05555;border:1px solid rgba(180,40,30,0.3);}
.btn-check{background:rgba(255,255,255,0.06);color:#aaa;border:1px solid rgba(255,255,255,0.1);}
.btn-call{background:rgba(30,80,200,0.2);color:#6fa8ff;border:1px solid rgba(30,80,200,0.35);}
.raise-row{display:flex;gap:6px;align-items:center;margin-bottom:8px;}
.raise-slider{flex:1;-webkit-appearance:none;height:4px;border-radius:2px;background:var(--border);outline:none;}
.raise-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--gold);cursor:pointer;}
.raise-val{font-size:12px;color:var(--gold);font-weight:700;min-width:60px;text-align:center;background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.18);border-radius:8px;padding:5px;}
.btn-raise{padding:12px 12px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;background:linear-gradient(135deg,#b8860b,#c9a84c);color:#06080f;white-space:nowrap;}
.deal-row{display:flex;gap:6px;}
.deal-btn{flex:1;padding:8px;border:none;border-radius:10px;font-size:11px;font-weight:600;cursor:pointer;background:rgba(255,255,255,0.04);color:#555;border:1px solid rgba(255,255,255,0.07);}
.game-log{padding:4px 16px;min-height:24px;}
.log-item{font-size:10px;color:rgba(255,255,255,0.2);text-align:center;}

/* BOTTOM NAV */
.bottom-nav{display:flex;background:var(--c1);border-top:1px solid var(--border);padding:10px 0 16px;position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;z-index:50;}
.bnav{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:4px;}
.bnav-icon{font-size:22px;}
.bnav-label{font-size:10px;color:#333;font-weight:500;}
.bnav.active .bnav-label{color:var(--gold);}
</style></head><body>

<!-- AUTH -->
<div class="page active" id="page-auth">
<div class="auth-bg">
<div class="auth-hero">
<div class="auth-crown">👑</div>
<div class="auth-logo">Royal Flush Poker</div>
<div class="auth-sub">Монголын хамгийн шилдэг покер</div>
</div>
<div class="auth-form"><div class="auth-card">
<div class="tabs">
<button class="tab active" onclick="switchTab('login')">Нэвтрэх</button>
<button class="tab" onclick="switchTab('register')">Бүртгүүлэх</button>
</div>
<label class="flabel">Хэрэглэгчийн нэр</label>
<input id="auth-user" placeholder="Нэрээ оруулна уу"/>
<label class="flabel">Нууц үг</label>
<input id="auth-pass" type="password" placeholder="••••••••"/>
<div class="err" id="auth-err"></div>
<button class="btn-gold" id="auth-btn" onclick="doAuth()">Нэвтрэх</button>
<div class="bonus-tag" id="bonus-tag"></div>
</div></div></div></div>

<!-- LOBBY -->
<div class="page" id="page-lobby">
<div class="nav"><div class="nav-logo">♠ Royal Flush</div>
<div class="nav-right">
<div class="chip-badge">🪙 <span id="lobby-chips">0</span></div>
<button class="nav-btn" onclick="showPage('profile')">👤</button>
</div></div>
<div class="lobby-body">
<div class="lobby-banner">
<div class="banner-title">♠ Royal Tables</div>
<div class="banner-sub">Шилдэг тоглогчдын нэгдэл</div>
<div class="banner-chip">🎁 Шинэ тоглогч 10,000 chip авна</div>
</div>
<div class="sec-title">Покер ширээнүүд</div>
<div class="filters">
<button class="fpill active" onclick="filterTable(this,'all')">Бүгд</button>
<button class="fpill" onclick="filterTable(this,'holdem')">Texas Hold'em</button>
<button class="fpill" onclick="filterTable(this,'omaha')">Omaha</button>
<button class="fpill" onclick="filterTable(this,'fivecard')">Five Card</button>
<button class="fpill" onclick="filterTable(this,'virtual')">Virtual</button>
<button class="fpill" onclick="filterTable(this,'real')">💰 Жинхэнэ</button>
</div>
<div class="tlist" id="table-list"></div>
</div>
<div class="bottom-nav">
<div class="bnav active" id="bnav-lobby" onclick="showPage('lobby')"><div class="bnav-icon">🏠</div><div class="bnav-label">Лобби</div></div>
<div class="bnav" id="bnav-profile" onclick="showPage('profile')"><div class="bnav-icon">👤</div><div class="bnav-label">Профайл</div></div>
<div class="bnav" id="bnav-wallet" onclick="showPage('wallet')"><div class="bnav-icon">💰</div><div class="bnav-label">Данс</div></div>
</div></div>

<!-- JOIN MODAL -->
<div class="modal-bg hidden" id="join-modal">
<div class="modal">
<div class="modal-title">🪑 Суудал сонгох</div>
<div class="modal-sub">Та аль суудалд суух вэ?</div>
<div class="modal-table" id="modal-table-name"></div>
<div class="seat-picker" id="seat-picker"></div>
<button class="modal-btn primary" onclick="confirmJoin()">Суух</button>
<button class="modal-btn secondary" onclick="closeModal()">Болих</button>
</div></div>

<!-- PROFILE -->
<div class="page" id="page-profile">
<div class="nav"><div class="nav-logo">♠ Профайл</div>
<button class="nav-btn" onclick="showPage('lobby')">← Буцах</button></div>
<div style="flex:1;overflow-y:auto;padding-bottom:80px;">
<div class="prof-hero">
<div class="prof-avatar" id="prof-avatar">?</div>
<div class="prof-name" id="prof-name"></div>
<div class="prof-badge">👑 Royal Member</div>
<div class="prof-level" id="prof-level">BRONZE PLAYER</div>
</div>
<div class="stats-grid">
<div class="stat-card"><div class="stat-val" id="stat-chips">0</div><div class="stat-label">Chips</div></div>
<div class="stat-card"><div class="stat-val" id="stat-games">0</div><div class="stat-label">Тоглосон</div></div>
<div class="stat-card"><div class="stat-val" id="stat-wins">0</div><div class="stat-label">Хожсон</div></div>
<div class="stat-card"><div class="stat-val" id="stat-rate">0%</div><div class="stat-label">Хожлын %</div></div>
</div>
<button class="logout-btn" onclick="logout()">Гарах</button>
</div>
<div class="bottom-nav">
<div class="bnav" onclick="showPage('lobby')"><div class="bnav-icon">🏠</div><div class="bnav-label">Лобби</div></div>
<div class="bnav active" onclick="showPage('profile')"><div class="bnav-icon">👤</div><div class="bnav-label">Профайл</div></div>
<div class="bnav" onclick="showPage('wallet')"><div class="bnav-icon">💰</div><div class="bnav-label">Данс</div></div>
</div></div>

<!-- WALLET -->
<div class="page" id="page-wallet">
<div class="nav"><div class="nav-logo">♠ Данс</div>
<button class="nav-btn" onclick="showPage('lobby')">← Буцах</button></div>
<div class="wallet-body">
<div class="wallet-card">
<div class="w-label">Virtual Chips</div>
<div class="w-amount gold" id="w-chips">0</div>
</div>
<div class="wallet-card">
<div class="w-label">Жинхэнэ мөнгө</div>
<div class="w-amount">₮0</div>
</div>
<div class="wallet-card">
<div class="deposit-title">💳 Цэнэглэх</div>
<div class="amount-pills">
<div class="apill active" onclick="selAmt(this,10000)">₮10,000</div>
<div class="apill" onclick="selAmt(this,25000)">₮25,000</div>
<div class="apill" onclick="selAmt(this,50000)">₮50,000</div>
<div class="apill" onclick="selAmt(this,100000)">₮100,000</div>
</div>
<div class="pay-methods">
<div class="pay-method selected" onclick="selPay(this,'qpay')"><div class="pay-icon">📱</div><div><div class="pay-name">QPay</div><div class="pay-sub">Шуурхай шилжүүлэг</div></div><div class="pay-radio on" id="radio-qpay"></div></div>
<div class="pay-method" onclick="selPay(this,'social')"><div class="pay-icon">🏦</div><div><div class="pay-name">SocialPay</div><div class="pay-sub">Голомт банк</div></div><div class="pay-radio" id="radio-social"></div></div>
<div class="pay-method" onclick="selPay(this,'khan')"><div class="pay-icon">🦁</div><div><div class="pay-name">Khan Bank</div><div class="pay-sub">Хаан банк</div></div><div class="pay-radio" id="radio-khan"></div></div>
<div class="pay-method" onclick="selPay(this,'visa')"><div class="pay-icon">💳</div><div><div class="pay-name">Visa / Mastercard</div><div class="pay-sub">Олон улсын карт</div></div><div class="pay-radio" id="radio-visa"></div></div>
</div>
<button class="btn-gold" onclick="doDeposit()">Цэнэглэх</button>
</div></div>
<div class="bottom-nav">
<div class="bnav" onclick="showPage('lobby')"><div class="bnav-icon">🏠</div><div class="bnav-label">Лобби</div></div>
<div class="bnav" onclick="showPage('profile')"><div class="bnav-icon">👤</div><div class="bnav-label">Профайл</div></div>
<div class="bnav active" onclick="showPage('wallet')"><div class="bnav-icon">💰</div><div class="bnav-label">Данс</div></div>
</div></div>

<!-- GAME -->
<div class="page" id="page-game">
<div class="game-screen">
<div class="game-nav">
<button class="game-nav-btn" onclick="leaveGame()">← Гарах</button>
<div style="text-align:center;">
<div class="game-title">♠ Royal Table</div>
<div class="game-phase" id="game-phase">Хүлээж байна</div>
</div>
<div style="font-size:12px;color:var(--gold);font-weight:600;">🪙<span id="my-chips-val">0</span></div>
</div>
<div class="table-container">
<div class="poker-table" id="poker-table">
<div class="table-center">
<div class="pot-display">
<div class="pot-chip-sm">🪙</div>
<div class="pot-num" id="pot-display">0</div>
</div>
<div class="community-row" id="community">
<div class="card-empty"></div><div class="card-empty"></div><div class="card-empty"></div><div class="card-empty"></div><div class="card-empty"></div>
</div>
</div>
</div>
</div>
<div class="my-hand-area">
<div class="my-hand-lbl">Таны карт</div>
<div class="my-cards" id="my-hand"></div>
</div>
<div class="action-panel">
<div class="turn-bar" id="turn-bar"></div>
<div class="action-row">
<button class="action-btn btn-fold" onclick="act('fold')">✕ Fold</button>
<button class="action-btn btn-check" onclick="act('check')">— Check</button>
<button class="action-btn btn-call" onclick="act('call',100)">↑ Call</button>
</div>
<div class="raise-row">
<input type="range" id="raise-slider" min="100" max="5000" value="500" step="100" class="raise-slider" oninput="updateRaise(this.value)"/>
<div class="raise-val" id="raise-val">500</div>
<button class="btn-raise" onclick="act('raise',+document.getElementById('raise-slider').value)">🔥 Raise</button>
</div>
<div class="deal-row">
<button class="deal-btn" onclick="act('deal_flop')">▶ Flop</button>
<button class="deal-btn" onclick="act('deal_turn')">▶ Turn</button>
<button class="deal-btn" onclick="act('deal_river')">▶ River</button>
</div>
</div>
<div class="game-log" id="game-log"></div>
</div></div>

<script>
const SUITS={S:'♠',H:'♥',D:'♦',C:'♣'};
const RED={H:true,D:true};
const SEAT_POS=[
  {top:'8%',left:'50%'},
  {top:'18%',left:'82%'},
  {top:'45%',left:'92%'},
  {top:'72%',left:'80%'},
  {top:'82%',left:'50%'},
  {top:'72%',left:'20%'},
  {top:'45%',left:'8%'},
  {top:'18%',left:'18%'},
];
const TABLES=[
  {id:'room1',name:'Royal Grand',type:'holdem',blind:'1,000/2,000',mode:'virtual',max:6,players:3},
  {id:'room2',name:'Diamond VIP',type:'holdem',blind:'10,000/20,000',mode:'real',max:6,players:1},
  {id:'room3',name:'Bronze Hall',type:'holdem',blind:'100/200',mode:'virtual',max:9,players:5},
  {id:'room4',name:'Five Card Elite',type:'fivecard',blind:'2,000/4,000',mode:'virtual',max:6,players:2},
  {id:'room5',name:'High Roller Suite',type:'holdem',blind:'50,000/100,000',mode:'real',max:6,players:1},
  {id:'room6',name:'Omaha Royale',type:'omaha',blind:'500/1,000',mode:'virtual',max:9,players:4},
  {id:'room7',name:'Silver Lounge',type:'holdem',blind:'500/1,000',mode:'virtual',max:6,players:2},
];
let user=null,curRoom=null,curTable=null,socket=null,logItems=[],authTab='login',gamesPlayed=0,gamesWon=0,selAmount=10000,selPay_='qpay',selectedSeat=null,takenSeats={};

function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  if(p==='profile')updateProfile();
  const m={lobby:'bnav-lobby',profile:'bnav-profile',wallet:'bnav-wallet'};
  document.querySelectorAll('.bnav').forEach(b=>b.classList.remove('active'));
  if(m[p]&&document.getElementById(m[p]))document.getElementById(m[p]).classList.add('active');
}
function switchTab(t){authTab=t;document.querySelectorAll('.tab').forEach((el,i)=>el.classList.toggle('active',i===(t==='login'?0:1)));document.getElementById('auth-btn').textContent=t==='login'?'Нэвтрэх':'Бүртгүүлэх';document.getElementById('bonus-tag').textContent=t==='register'?'🎁 Шинэ тоглогч 10,000 chip авна!':'';}
async function doAuth(){
  const u=document.getElementById('auth-user').value.trim();
  const p=document.getElementById('auth-pass').value.trim();
  if(!u||!p){document.getElementById('auth-err').textContent='Нэр болон нууц үгээ оруулна уу';return;}
  document.getElementById('auth-btn').textContent='...';
  try{
    const res=await fetch('${url}/api/'+authTab,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})});
    const data=await res.json();
    if(data.error){document.getElementById('auth-err').textContent=data.error;document.getElementById('auth-btn').textContent=authTab==='login'?'Нэвтрэх':'Бүртгүүлэх';return;}
    user=data;gamesPlayed=data.games||0;gamesWon=data.wins||0;
    updateChips();renderTables('all');initSocket();showPage('lobby');
  }catch(e){document.getElementById('auth-err').textContent='Сервертэй холбогдож чадсангүй';document.getElementById('auth-btn').textContent=authTab==='login'?'Нэвтрэх':'Бүртгүүлэх';}
}
function updateChips(){document.getElementById('lobby-chips').textContent=Number(user.chips).toLocaleString();document.getElementById('w-chips').textContent=Number(user.chips).toLocaleString();document.getElementById('my-chips-val').textContent=Number(user.chips).toLocaleString();}
function getLevel(c){if(c>=100000)return'💎 DIAMOND';if(c>=50000)return'🥇 GOLD';if(c>=20000)return'🥈 SILVER';return'🥉 BRONZE';}
function updateProfile(){if(!user)return;document.getElementById('prof-avatar').textContent=user.username[0].toUpperCase();document.getElementById('prof-name').textContent=user.username;document.getElementById('stat-chips').textContent=Number(user.chips).toLocaleString();document.getElementById('stat-games').textContent=gamesPlayed;document.getElementById('stat-wins').textContent=gamesWon;document.getElementById('stat-rate').textContent=gamesPlayed?Math.round(gamesWon/gamesPlayed*100)+'%':'0%';document.getElementById('prof-level').textContent=getLevel(user.chips);}
function logout(){user=null;if(socket)socket.disconnect();showPage('auth');}

function renderTables(filter){
  const list=document.getElementById('table-list');
  const filtered=filter==='all'?TABLES:TABLES.filter(t=>t.type===filter||t.mode===filter);
  list.innerHTML=filtered.map(t=>{
    const seats=Array(t.max).fill(0).map((_,i)=>'<div class="seat'+(i<t.players?' on':'')+'"></div>').join('');
    return '<div class="tcard" onclick="openJoinModal(\''+t.id+'\')"><div class="tcard-shine"></div><div class="tcard-top"><div class="tcard-name">'+t.name+'</div><div class="mbadge '+(t.mode==='virtual'?'virtual':'real')+'">'+(t.mode==='virtual'?'Virtual':'💰 Жинхэнэ')+'</div></div><div class="tcard-info"><div class="tinfo"><div class="tinfo-label">Төрөл</div><div class="tinfo-val">'+t.type+'</div></div><div class="tinfo"><div class="tinfo-label">Блайнд</div><div class="tinfo-val">'+t.blind+'</div></div><div class="tinfo"><div class="tinfo-label">Тоглогч</div><div class="tinfo-val">'+t.players+'/'+t.max+'</div></div></div><div class="tcard-footer"><div class="seat-row">'+seats+'<span class="seat-count">'+t.players+'/'+t.max+'</span></div><button class="join-btn">Нэгдэх →</button></div></div>';
  }).join('');
}
function filterTable(btn,f){document.querySelectorAll('.fpill').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderTables(f);}

function openJoinModal(id){
  curRoom=id;
  curTable=TABLES.find(t=>t.id===id);
  selectedSeat=null;
  document.getElementById('modal-table-name').textContent=curTable?curTable.name+' — Блайнд: '+curTable.blind:'';
  const max=curTable?curTable.max:6;
  const picker=document.getElementById('seat-picker');
  picker.innerHTML=Array(max).fill(0).map((_,i)=>{
    const taken=takenSeats[curRoom]&&takenSeats[curRoom][i+1];
    return '<div class="seat-option'+(taken?' taken':'')+'" onclick="pickSeat('+(i+1)+',this)" id="so-'+(i+1)+'"><div class="seat-icon">'+(taken?'👤':'🪑')+'</div><div class="seat-num">'+(taken?'Эзэлсэн')+(i+1)+'-р суудал</div></div>';
  }).join('');
  document.getElementById('join-modal').classList.remove('hidden');
}
function pickSeat(n,el){
  if(el.classList.contains('taken'))return;
  document.querySelectorAll('.seat-option').forEach(s=>s.classList.remove('selected'));
  el.classList.add('selected');
  selectedSeat=n;
}
function closeModal(){document.getElementById('join-modal').classList.add('hidden');selectedSeat=null;}
function confirmJoin(){
  if(!selectedSeat){alert('Суудал сонгоно уу!');return;}
  closeModal();
  document.getElementById('pot-display').textContent='0';
  document.getElementById('community').innerHTML='<div class="card-empty"></div>'.repeat(5);
  document.getElementById('my-hand').innerHTML='';
  document.getElementById('turn-bar').textContent='';
  document.getElementById('game-phase').textContent='Хүлээж байна';
  logItems=[];document.getElementById('game-log').innerHTML='';
  renderTableSeats([],curTable?curTable.max:6,{});
  if(socket)socket.emit('join_room',{room:curRoom,username:user.username,seat:selectedSeat});
  gamesPlayed++;showPage('game');
}
function leaveGame(){if(socket&&curRoom)socket.emit('leave_room',{room:curRoom,username:user.username});showPage('lobby');}

function renderTableSeats(players,max,seats){
  const table=document.getElementById('poker-table');
  const existing=table.querySelectorAll('.table-seat');
  existing.forEach(e=>e.remove());
  const seatCount=Math.min(max,8);
  for(let i=0;i<seatCount;i++){
    const pos=SEAT_POS[i];
    const seatNum=i+1;
    const player=players.find(p=>p.seat===seatNum);
    const isMe=player&&player.username===user.username;
    const el=document.createElement('div');
    el.className='table-seat'+(player?' occupied':'')+(isMe?' my-seat':'');
    el.style.top=pos.top;
    el.style.left=pos.left;
    el.innerHTML=player?
      '<div class="seat-avatar">'+player.username[0].toUpperCase()+'</div>'+
      '<div class="seat-cards"><div class="card-back-sm"></div><div class="card-back-sm"></div></div>'+
      '<div class="seat-info"><div class="seat-name">'+player.username+'</div><div class="seat-chips">'+Number(player.chips).toLocaleString()+'🪙</div></div>'
      :
      '<div class="seat-avatar">🪑</div><div class="empty-seat-label">'+(seatNum)+'-р</div>';
    table.appendChild(el);
  }
}

function initSocket(){
  socket=io('${url}');
  socket.on('room_update',r=>{
    if(!takenSeats[curRoom])takenSeats[curRoom]={};
    r.players.forEach(p=>{if(p.seat)takenSeats[curRoom][p.seat]=p.username;});
    renderTableSeats(r.players,r.max||6,r.seats||{});
  });
  socket.on('game_started',r=>{
    document.getElementById('pot-display').textContent='0';
    document.getElementById('community').innerHTML='<div class="card-empty"></div>'.repeat(5);
    document.getElementById('game-phase').textContent='Pre-flop';
    renderTableSeats(r.players,curTable?curTable.max:6,{});
    const me=r.players.find(p=>p.username===user.username);
    if(me){
      setTimeout(()=>{
        document.getElementById('my-hand').innerHTML=me.hand.map((c,i)=>'<div class="my-card deal'+(RED[c.suit]?' red':'')+'" style="animation-delay:'+(i*0.2)+'s"><span class="card-rank">'+c.rank+'</span><span class="card-suit">'+SUITS[c.suit]+'</span></div>').join('');
      },300);
    }
    addLog('🃏 Карт таарагдлаа!');
  });
  socket.on('turn_update',({username})=>{
    const isMe=username===user.username;
    document.getElementById('turn-bar').textContent=isMe?'⭐ Таны ээлж!':username+' тоглож байна...';
    document.querySelectorAll('.table-seat').forEach(s=>{s.classList.remove('active-turn');});
  });
  socket.on('community_update',cards=>{
    const phase=cards.length===3?'Flop':cards.length===4?'Turn':'River';
    document.getElementById('game-phase').textContent=phase;
    document.getElementById('community').innerHTML=
      cards.map((c,i)=>'<div class="card deal'+(RED[c.suit]?' red':'')+'" style="animation-delay:'+(i*0.1)+'s"><span class="card-rank">'+c.rank+'</span><span class="card-suit">'+SUITS[c.suit]+'</span></div>').join('')+
      '<div class="card-empty"></div>'.repeat(5-cards.length);
    addLog('♠ '+phase+' таарагдлаа');
  });
  socket.on('player_action',function(d){
    if(d.pot)document.getElementById('pot-display').textContent=Number(d.pot).toLocaleString();
    const icons={fold:'✕',call:'↑',raise:'🔥',check:'—'};
    addLog((icons[d.action]||'')+' '+d.username+': '+d.action+(d.amount?' +'+Number(d.amount).toLocaleString()+'🪙':''));
  });
}
function act(a,amt){if(socket&&curRoom)socket.emit('action',{room:curRoom,action:a,amount:amt,username:user.username});}
function addLog(m){logItems=[m,...logItems].slice(0,2);document.getElementById('game-log').innerHTML=logItems.map(l=>'<div class="log-item">'+l+'</div>').join('');}
function updateRaise(v){document.getElementById('raise-val').textContent=Number(v).toLocaleString();}
function selAmt(el,amt){document.querySelectorAll('.apill').forEach(p=>p.classList.remove('active'));el.classList.add('active');selAmount=amt;}
function selPay(el,method){document.querySelectorAll('.pay-method').forEach(p=>p.classList.remove('selected'));el.classList.add('selected');document.querySelectorAll('.pay-radio').forEach(r=>r.classList.remove('on'));const r=document.getElementById('radio-'+method);if(r)r.classList.add('on');selPay_=method;}
function doDeposit(){const methods={qpay:'QPay',social:'SocialPay',khan:'Khan Bank',visa:'Visa/Mastercard'};alert('✅ '+Number(selAmount).toLocaleString()+'₮ '+methods[selPay_]+'-аар цэнэглэлт илгээгдлээ!');}
</script></body></html>`;

fs.writeFileSync('index.html', html);
console.log('Done! Size:', html.length);
