/* =====================================================================
   OSULLOC — script.js  (바닐라 JS, 라이브러리 없음)
   데이터: js/data.js (PRODUCTS / CATS / LIFE / JOURNAL)
   구성: 0 유틸 · 1 저장소 · 2 헤더 · 3 메뉴/검색 · 4 메인 슬라이더 · 5 카드 렌더 · 6 탭 · 7 BEST 슬라이더 ·
         8 패널(장바구니/찜/최근/마이) · 9 모달(상세/콘텐츠) · 10 리빌/패럴랙스 · 11 기타
   ===================================================================== */
(function(){
'use strict';

/* ===== 0. 유틸 ===== */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const won=n=>n.toLocaleString('ko-KR')+'원';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPC=()=>matchMedia('(min-width:1024px)').matches;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=id=>PRODUCTS.find(p=>p.id===id);
const pct=p=>p.orig&&p.orig>p.price?Math.round((1-p.price/p.orig)*100):0;
const html=document.documentElement;
function raf(fn){let t=false;return(...a)=>{if(t)return;t=true;requestAnimationFrame(()=>{t=false;fn(...a)})}}

/* ===== 1. 저장소 (localStorage는 실패할 수 있어 try/catch) ===== */
const store={
  get(k,d){try{const v=localStorage.getItem('osl_'+k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem('osl_'+k,JSON.stringify(v))}catch(e){}}
};
let cart=store.get('cart',[]);      // [{id,qty}]
let wish=store.get('wish',[]);      // [id]
let recent=store.get('recent',[]);  // [id]
let user=store.get('user',null);    // {name,email}
let orders=store.get('orders',[]);

const toastEl=$('#toast');let toastT;
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove('on'),2200)}

function updateCounts(){
  const c=cart.reduce((a,b)=>a+b.qty,0);
  const map={cart:c,wish:wish.length,recent:recent.length};
  $$('[data-count]').forEach(el=>{const n=map[el.dataset.count]||0;el.textContent=n;el.classList.toggle('z',n===0)});
}

/* ===== 2. 헤더: 아래로 스크롤하면 숨김, 위로 스크롤하면 표시 ===== */
const hd=$('#hd');let lastY=scrollY;
const onScroll=raf(()=>{
  const y=scrollY;
  const locked=hd.classList.contains('open')||!$('#search').hidden;
  if(!locked){
    if(y>lastY+4&&y>120)hd.classList.add('hide');
    else if(y<lastY-4||y<80)hd.classList.remove('hide');
  }
  lastY=y;
  if(isPC()&&!reduce)parallax();
});
addEventListener('scroll',onScroll,{passive:true});

/* ===== 3. 모바일 메뉴 · PC 메가메뉴 · 검색 ===== */
const burger=$('#burger');
function setMenu(open){
  hd.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open);
  burger.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  html.classList.toggle('lock',open&&!isPC());
  if(open){hd.classList.remove('hide');closeSearch()}
}
burger.addEventListener('click',()=>setMenu(!hd.classList.contains('open')));
$('#gnav').addEventListener('click',e=>{
  const a=e.target.closest('a,button');if(!a)return;
  if(a.matches('a[href^="#"]')||a.dataset.view||a.dataset.doc)setMenu(false);
});
addEventListener('resize',raf(()=>{if(isPC())setMenu(false)}));

// 메가메뉴: 마우스를 올리면 열리고, 약간의 지연으로 깜빡임 방지
$$('.has-mega').forEach(li=>{
  let t;
  li.addEventListener('mouseenter',()=>{if(!isPC())return;clearTimeout(t);$$('.has-mega').forEach(o=>o!==li&&o.classList.remove('mega-open'));li.classList.add('mega-open')});
  li.addEventListener('mouseleave',()=>{t=setTimeout(()=>li.classList.remove('mega-open'),120)});
  li.addEventListener('click',e=>{if(e.target.closest('.mega a'))li.classList.remove('mega-open')});
});

const searchBox=$('#search'),searchBtn=$('#searchBtn'),qEl=$('#q'),resEl=$('#results');
function openSearch(){
  setMenu(false);searchBox.hidden=false;searchBtn.setAttribute('aria-expanded','true');hd.classList.remove('hide');
  renderResults('');setTimeout(()=>qEl.focus(),30);
}
function closeSearch(){if(searchBox.hidden)return;searchBox.hidden=true;searchBtn.setAttribute('aria-expanded','false')}
searchBtn.addEventListener('click',()=>searchBox.hidden?openSearch():closeSearch());
$('#searchClose').addEventListener('click',closeSearch);
function renderResults(q){
  q=q.trim().toLowerCase();
  if(!q){resEl.innerHTML='';return}
  const catName=id=>(CATS.find(c=>c.id===id)||{}).name||'';
  const list=PRODUCTS.filter(p=>(p.name+p.short+p.desc+catName(p.cat)).toLowerCase().includes(q)).slice(0,8);
  resEl.innerHTML=list.length?list.map(p=>`<li><button type="button" data-open="${p.id}"><img src="${p.img}" alt="" width="56" height="70" loading="lazy"><span class="nm">${esc(p.name)}<span class="sub">${esc(catName(p.cat))}</span></span><span class="pc">${won(p.price)}</span></button></li>`).join(''):`<li class="empty">‘${esc(q)}’에 맞는 상품이 없어요. 다른 단어로 검색해 보세요.</li>`;
}
qEl.addEventListener('input',()=>renderResults(qEl.value));
$('.search-tags').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;qEl.value=b.textContent.replace('#','');renderResults(qEl.value);qEl.focus()});
resEl.addEventListener('click',e=>{if(e.target.closest('[data-open]'))closeSearch()});

/* ===== 4. 메인 비주얼 슬라이더 (자동재생 · 화살표 · 인디케이터 · 마우스 드래그 · 터치 스와이프) ===== */
(function hero(){
  const root=$('#hero'),slides=$$('.slide',root),dotsBox=$('.dots',root),cur=$('#hCur');
  const DUR=6000;let i=0,timer=null,resumeT=null;
  const dots=$$('button',dotsBox);
  root.style.setProperty('--dur',DUR+'ms');
  function go(n,user){
    i=(n+slides.length)%slides.length;
    slides.forEach((s,k)=>{s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k!==i)});
    dots.forEach((d,k)=>{d.classList.remove('on');if(k===i){void d.offsetWidth;d.classList.add('on')}d.setAttribute('aria-current',k===i)});
    cur.textContent=String(i+1).padStart(2,'0');
    play();
  }
  function play(){clearTimeout(timer);if(reduce||document.hidden||root.classList.contains('paused'))return;timer=setTimeout(()=>go(i+1),DUR)}
  function pause(){root.classList.add('paused');clearTimeout(timer)}
  function resumeLater(){clearTimeout(resumeT);resumeT=setTimeout(()=>{root.classList.remove('paused');go(i)},4000)}
  // 사용자가 조작하면 잠시 멈췄다가 다시 재생
  function user(n){pause();go(n);root.classList.add('paused');resumeLater()}
  $('.prev',root).addEventListener('click',()=>user(i-1));
  $('.next',root).addEventListener('click',()=>user(i+1));
  dots.forEach((d,k)=>d.addEventListener('click',()=>user(k)));
  // 포인터(마우스·터치) 드래그: 가로 이동이 세로의 1.5배 이상일 때만 넘김 → 세로 스크롤 방해 없음
  let sx=0,sy=0,down=false,moved=false;
  root.addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;down=true;moved=false;sx=e.clientX;sy=e.clientY;pause()});
  root.addEventListener('pointermove',e=>{if(down&&Math.abs(e.clientX-sx)>8)moved=true});
  const end=e=>{
    if(!down)return;down=false;
    const dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5){go(i+(dx<0?1:-1));root.classList.add('paused')}
    resumeLater();
  };
  root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);
  root.addEventListener('dragstart',e=>e.preventDefault());
  root.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches){root.classList.add('paused');clearTimeout(timer)}});
  root.addEventListener('mouseleave',()=>{if(matchMedia('(hover:hover)').matches&&!down){root.classList.remove('paused');go(i)}});
  document.addEventListener('visibilitychange',()=>{document.hidden?clearTimeout(timer):go(i)});
  root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')user(i-1);if(e.key==='ArrowRight')user(i+1)});
  go(0);
})();

/* ===== 5. 상품 카드 ===== */
const heart='<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>';
function card(p,lazy=true){
  const d=pct(p),w=wish.includes(p.id);
  return `<article class="card" data-id="${p.id}">
  <div class="im-wrap" style="position:relative">
    <button type="button" class="im" data-open="${p.id}" aria-label="${esc(p.name)} 상세보기">
      <img src="${p.img}" alt="${esc(p.name)}" ${lazy?'loading="lazy" decoding="async"':''}>
      ${p.img2?`<img class="alt" src="${p.img2}" alt="" loading="lazy" decoding="async">`:''}
    </button>
    ${p.badge?`<span class="badge ${p.badge}">${p.badge}</span>`:''}
    <button type="button" class="wish" data-wish="${p.id}" aria-pressed="${w}" aria-label="찜하기">${heart}</button>
  </div>
  <button type="button" class="nm" data-open="${p.id}">${esc(p.name)}</button>
  <p class="ds">${esc(p.desc)}</p>
  <p class="pr">${d?`<span class="pct">${d}%</span>`:''}<b>${won(p.price)}</b>${d?`<s>${won(p.orig)}</s>`:''}</p>
  <p class="un">${esc(p.unit||'')}</p>
  <button type="button" class="add" data-add="${p.id}">장바구니 담기</button>
</article>`;
}

/* ===== 6. CATEGORY 탭 (페이드 전환) ===== */
const tabsEl=$('#tabs'),gridEl=$('#catGrid');let curCat=CATS[0].id,tabT;
tabsEl.innerHTML=CATS.map(c=>`<button type="button" role="tab" id="tab-${c.id}" data-tab="${c.id}" aria-selected="${c.id===curCat}">${c.name}<small>${PRODUCTS.filter(p=>p.cat===c.id).length}</small></button>`).join('');
function renderGrid(){gridEl.innerHTML=PRODUCTS.filter(p=>p.cat===curCat).map(p=>card(p)).join('')}
function setCat(id,instant){
  if(id===curCat&&gridEl.children.length)return;
  curCat=id;
  $$('button',tabsEl).forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===id));
  const act=$('#tab-'+id);if(act)act.scrollIntoView({inline:'center',block:'nearest',behavior:reduce||instant?'auto':'smooth'});
  if(instant||reduce){renderGrid();return}
  gridEl.classList.add('out');clearTimeout(tabT);
  tabT=setTimeout(()=>{renderGrid();requestAnimationFrame(()=>gridEl.classList.remove('out'))},220);
}
tabsEl.addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)setCat(b.dataset.tab)});
tabsEl.addEventListener('keydown',e=>{
  if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
  const ids=CATS.map(c=>c.id),n=(ids.indexOf(curCat)+(e.key==='ArrowRight'?1:-1)+ids.length)%ids.length;
  setCat(ids[n]);$('#tab-'+ids[n]).focus();
});
renderGrid();

// data-cat 링크(메뉴·배너·슬라이드 버튼): 해당 탭을 열고 SHOP으로 이동
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-cat]');if(!a||a.matches('[data-tab]'))return;
  e.preventDefault();setCat(a.dataset.cat);
  $('#shop').scrollIntoView({behavior:reduce?'auto':'smooth'});
  history.replaceState(null,'','#shop');
});

/* ===== 7. BEST 가로 슬라이더 (스크롤 스냅 + 버튼 + 마우스 드래그 + 위치 표시) ===== */
(function best(){
  const tr=$('#bTrack'),bar=$('#bProg');
  tr.innerHTML=PRODUCTS.filter(p=>p.best).map(p=>card(p)).join('');
  const step=()=>{const c=tr.querySelector('.card');return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(tr).columnGap||0):300};
  const upd=raf(()=>{
    const max=tr.scrollWidth-tr.clientWidth,r=max>0?tr.scrollLeft/max:0,w=Math.max(.15,tr.clientWidth/tr.scrollWidth);
    bar.style.width=(w*100)+'%';bar.style.left=(r*(1-w)*100)+'%';
    $('#bPrev').disabled=tr.scrollLeft<4;$('#bNext').disabled=tr.scrollLeft>max-4;
  });
  tr.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  $('#bPrev').addEventListener('click',()=>tr.scrollBy({left:-step()*2,behavior:reduce?'auto':'smooth'}));
  $('#bNext').addEventListener('click',()=>tr.scrollBy({left:step()*2,behavior:reduce?'auto':'smooth'}));
  tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight')tr.scrollBy({left:step(),behavior:'smooth'});if(e.key==='ArrowLeft')tr.scrollBy({left:-step(),behavior:'smooth'})});
  // 마우스 드래그 (터치는 브라우저 기본 스와이프 사용)
  let dn=false,sx=0,sl=0,mv=false;
  tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;dn=true;mv=false;sx=e.clientX;sl=tr.scrollLeft});
  addEventListener('pointermove',e=>{if(!dn)return;const dx=e.clientX-sx;if(Math.abs(dx)>5){mv=true;tr.classList.add('drag')}if(mv)tr.scrollLeft=sl-dx});
  addEventListener('pointerup',()=>{if(!dn)return;dn=false;tr.classList.remove('drag');
    if(mv){const s=step();tr.scrollTo({left:Math.round(tr.scrollLeft/s)*s,behavior:'smooth'})}});
  tr.addEventListener('click',e=>{if(mv){e.preventDefault();e.stopPropagation();mv=false}},true);
  upd();
})();

/* ===== TEA LIFE · JOURNAL 렌더 ===== */
$('#lifeGrid').innerHTML=LIFE.map((l,k)=>`<button type="button" class="lc rv" style="--d:${k*.08}s" data-life="${l.id}"><span class="im"><img src="${l.img}" alt="${esc(l.title)}" width="400" height="400" loading="lazy" decoding="async"></span><span class="tp">${esc(l.type)}</span><h3>${esc(l.title)}</h3><span class="go">자세히 보기</span></button>`).join('');
const jGrid=$('#jGrid'),jMore=$('#jMore');let jShown=3;
function jCard(j,k,fresh){return `<button type="button" class="jc ${fresh?'fresh':'rv'}" style="--d:${(k%3)*.08}s" data-journal="${k}"><span class="im"><img src="${j.img}" alt="" width="400" height="300" loading="lazy" decoding="async"></span><span><span class="tg">${esc(j.tag)}</span><h3>${esc(j.title)}</h3><time>${esc(j.date)}</time></span></button>`}
jGrid.innerHTML=JOURNAL.slice(0,jShown).map((j,k)=>jCard(j,k)).join('');
jMore.addEventListener('click',()=>{
  const next=JOURNAL.slice(jShown,jShown+3);
  jGrid.insertAdjacentHTML('beforeend',next.map((j,k)=>jCard(j,jShown+k,true)).join(''));
  jShown+=next.length;
  if(jShown>=JOURNAL.length){jMore.hidden=true;toast('모든 이야기를 불러왔어요')}
});

/* ===== 8. 사이드 패널 (장바구니 / 찜 / 최근 본 / 마이페이지) ===== */
const drawer=$('#drawer'),veil=$('#veil'),dBody=$('#dBody'),dTitle=$('#dTitle');
let curView=null,lastFocus=null;
function openDrawer(view){
  closeModal(true);setMenu(false);closeSearch();
  lastFocus=document.activeElement;curView=view;renderView();
  veil.hidden=false;requestAnimationFrame(()=>veil.classList.add('on'));
  drawer.classList.add('on');drawer.setAttribute('aria-hidden','false');html.classList.add('lock');
  setTimeout(()=>$('[data-close]',drawer).focus(),50);
}
function closeDrawer(){
  if(!drawer.classList.contains('on'))return;
  drawer.classList.remove('on');drawer.setAttribute('aria-hidden','true');curView=null;
  if(!modal.classList.contains('on')){veil.classList.remove('on');setTimeout(()=>{if(!veil.classList.contains('on'))veil.hidden=true},300);html.classList.remove('lock')}
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
const lineItem=(p,extra)=>`<li class="li"><img src="${p.img}" alt="" width="72" height="90" data-open="${p.id}"><div><button type="button" class="nm" data-open="${p.id}">${esc(p.name)}</button><p class="pc">${won(p.price)}</p>${extra}</div></li>`;
function emptyMsg(t){return `<p class="empty-t">${t}</p>`}
function renderView(){
  if(!curView)return;
  if(curView==='cart'){
    dTitle.textContent='BAG';
    const items=cart.map(c=>({p:byId(c.id),q:c.qty})).filter(x=>x.p);
    if(!items.length){dBody.innerHTML=emptyMsg('장바구니가 비어 있어요.<br>마음에 드는 차를 담아 보세요.');return}
    const sum=items.reduce((a,x)=>a+x.p.price*x.q,0),FREE=30000,left=FREE-sum;
    dBody.innerHTML=`<ul>${items.map(x=>lineItem(x.p,`<div class="ctl"><div class="qty"><button type="button" data-q="${x.p.id}" data-d="-1" aria-label="수량 줄이기">−</button><span>${x.q}</span><button type="button" data-q="${x.p.id}" data-d="1" aria-label="수량 늘리기">+</button></div><button type="button" class="lnk" data-rm="${x.p.id}">삭제</button></div>`)).join('')}</ul>
    <div class="d-foot"><p class="ship">${left>0?`${won(left)} 더 담으면 <b>무료배송</b>`:'🌿 무료배송 혜택이 적용되었어요'}</p><div class="ship-bar"><i style="width:${Math.min(100,sum/FREE*100)}%"></i></div>
    <div class="sum"><span>총 상품금액</span><b>${won(sum)}</b></div><button type="button" class="btn fill" data-checkout>주문하기</button></div>`;
  }else if(curView==='wish'){
    dTitle.textContent='WISH';
    const items=wish.map(byId).filter(Boolean);
    dBody.innerHTML=items.length?`<ul>${items.map(p=>lineItem(p,`<div class="ctl"><button type="button" class="btn" style="height:36px;padding:0 14px;font-size:.72rem" data-add="${p.id}">담기</button><button type="button" class="lnk" data-wish="${p.id}">삭제</button></div>`)).join('')}</ul>`:emptyMsg('찜한 상품이 없어요.<br>하트를 눌러 담아 두세요.');
  }else if(curView==='recent'){
    dTitle.textContent='RECENT';
    const items=recent.map(byId).filter(Boolean);
    dBody.innerHTML=items.length?`<ul>${items.map(p=>lineItem(p,'')).join('')}</ul>`:emptyMsg('최근 본 상품이 없어요.');
  }else if(curView==='my'){
    dTitle.textContent='MY';
    if(!user){
      dBody.innerHTML=`<form class="form" id="loginForm"><label>이름<input name="name" required autocomplete="name" placeholder="홍길동"></label><label>이메일<input name="email" type="email" required autocomplete="email" placeholder="tea@example.com"></label><button class="btn fill" type="submit">로그인</button><p class="note">학습용 데모입니다. 입력한 정보는 서버로 전송되지 않고 이 브라우저에만 저장됩니다.</p></form>`;
    }else{
      dBody.innerHTML=`<div class="pf"><b>${esc(user.name)} 님</b><span style="font-size:.85rem;opacity:.7">${esc(user.email)}</span></div>
      <div class="stats"><div><strong>${orders.length}</strong>주문</div><div><strong>${wish.length}</strong>찜</div><div><strong>${cart.reduce((a,b)=>a+b.qty,0)}</strong>장바구니</div></div>
      <p class="d-h">ORDER HISTORY</p>${orders.length?`<ul>${orders.slice().reverse().map(o=>`<li class="li" style="grid-template-columns:1fr"><div><p class="nm" style="cursor:default">${esc(o.no)}</p><p style="font-size:.78rem;opacity:.7">${esc(o.date)} · ${o.items}개 상품</p><p class="pc">${won(o.total)}</p></div></li>`).join('')}</ul>`:'<p class="empty-t" style="padding:24px 0">주문 내역이 없어요.</p>'}
      <button type="button" class="btn" style="margin-top:20px;width:100%" data-logout>로그아웃</button>`;
    }
  }
}
function syncUser(){const b=$('#loginBtn');if(b)b.textContent=user?'마이페이지':'로그인'}
function saveAll(){store.set('cart',cart);store.set('wish',wish);store.set('recent',recent);updateCounts()}

function addCart(id,qty=1,btn){
  const it=cart.find(c=>c.id===id);if(it)it.qty=Math.min(99,it.qty+qty);else cart.push({id,qty});
  saveAll();toast(`‘${byId(id).name}’을(를) 담았어요`);
  if(btn&&btn.classList.contains('add')){btn.classList.add('done');const o=btn.textContent;btn.textContent='✓ 담았어요';setTimeout(()=>{btn.classList.remove('done');btn.textContent=o},1400)}
  if(curView==='cart')renderView();
}
function toggleWish(id){
  const k=wish.indexOf(id);k>-1?wish.splice(k,1):wish.unshift(id);
  saveAll();toast(k>-1?'찜을 해제했어요':'찜 목록에 담았어요');
  $$(`[data-wish="${id}"]`).forEach(b=>b.setAttribute('aria-pressed',k===-1));
  if(curView==='wish')renderView();
}

/* ===== 9. 모달 (상품 상세 · 콘텐츠 · 약관 · 주문 완료) ===== */
const modal=$('#modal'),mBody=$('#mBody');
let modalFocus=null;
function openModal(h){
  modalFocus=document.activeElement;mBody.innerHTML=h;$('.m-box',modal).scrollTop=0;
  veil.hidden=false;requestAnimationFrame(()=>veil.classList.add('on'));
  modal.classList.add('on');modal.setAttribute('aria-hidden','false');html.classList.add('lock');
  setTimeout(()=>$('.m-x',modal).focus(),50);
}
function closeModal(silent){
  if(!modal.classList.contains('on'))return;
  modal.classList.remove('on');modal.setAttribute('aria-hidden','true');
  if(location.hash.startsWith('#p/'))history.replaceState(null,'',location.pathname+location.search);
  if(!drawer.classList.contains('on')&&!silent){veil.classList.remove('on');setTimeout(()=>{if(!veil.classList.contains('on'))veil.hidden=true},300);html.classList.remove('lock')}
  if(!silent&&modalFocus&&modalFocus.focus)modalFocus.focus();
}
function openProduct(id,fromHash){
  const p=byId(id);if(!p)return;
  recent=[id,...recent.filter(x=>x!==id)].slice(0,10);saveAll();
  closeDrawer();
  const d=pct(p),w=wish.includes(id),catName=(CATS.find(c=>c.id===p.cat)||{}).name;
  openModal(`<div class="pd" data-pd="${id}"><div class="pd-g"><div class="main"><img id="pdMain" src="${p.img}" alt="${esc(p.name)}"></div><div class="thumbs"><button type="button" data-th="${p.img}" aria-current="true" aria-label="이미지 1"><img src="${p.img}" alt=""></button>${p.img2?`<button type="button" data-th="${p.img2}" aria-current="false" aria-label="이미지 2"><img src="${p.img2}" alt=""></button>`:''}</div></div>
  <div class="pd-i">${p.badge?`<span class="badge ${p.badge}">${p.badge}</span>`:''}<p class="eb" style="margin-top:10px">${esc(p.short)}</p><h2>${esc(p.name)}</h2><p class="d">${esc(p.desc)}</p>
  <p class="pr">${d?`<span class="pct">${d}%</span>`:''}<b>${won(p.price)}</b>${d?`<s>${won(p.orig)}</s>`:''}<span class="un">${esc(p.unit||'')}</span></p>
  <div class="buy-row"><div class="qty"><button type="button" data-pq="-1" aria-label="수량 줄이기">−</button><span id="pdQty">1</span><button type="button" data-pq="1" aria-label="수량 늘리기">+</button></div><strong id="pdTot">${won(p.price)}</strong></div>
  <div class="pd-btns"><button type="button" class="btn" data-pd-add>장바구니</button><button type="button" class="btn fill" data-pd-buy>바로 구매</button><button type="button" class="wish" data-wish="${id}" aria-pressed="${w}" aria-label="찜하기">${heart}</button></div>
  <dl class="spec"><div><dt>카테고리</dt><dd>${esc(catName||'')}</dd></div><div><dt>배송</dt><dd>3만원 이상 무료배송 · 제주 산간 추가 배송비</dd></div><div><dt>보관</dt><dd>직사광선을 피해 서늘하고 건조한 곳에 보관</dd></div></dl></div></div>`);
  if(!fromHash)history.replaceState(null,'','#p/'+id);
}
mBody.addEventListener('click',e=>{
  const pd=e.target.closest('[data-pd]');
  const th=e.target.closest('[data-th]');
  if(th){$('#pdMain').src=th.dataset.th;$$('[data-th]',mBody).forEach(b=>b.setAttribute('aria-current',b===th))}
  if(pd){
    const id=pd.dataset.pd,q=$('#pdQty'),p=byId(id);
    const pq=e.target.closest('[data-pq]');
    if(pq){q.textContent=Math.min(99,Math.max(1,+q.textContent+ +pq.dataset.pq));$('#pdTot').textContent=won(p.price*+q.textContent)}
    if(e.target.closest('[data-pd-add]'))addCart(id,+q.textContent);
    if(e.target.closest('[data-pd-buy]')){addCart(id,+q.textContent);closeModal(true);openDrawer('cart')}
  }
  if(e.target.closest('[data-go-shop]')){closeModal();$('#shop').scrollIntoView({behavior:'smooth'})}
});
const doc={
  terms:['TERMS','이용약관','본 사이트는 학습·포트폴리오 목적의 데모이며 실제 결제나 주문이 이루어지지 않습니다. 표시된 상품·가격·문구는 모두 예시입니다.'],
  privacy:['PRIVACY','개인정보처리방침','로그인 시 입력한 이름과 이메일은 서버로 전송되지 않고 사용자의 브라우저(localStorage)에만 저장되며, 로그아웃하면 삭제됩니다.'],
  shipping:['SHIPPING','배송 · 교환 · 반품','데모 사이트로 실제 배송은 진행되지 않습니다. 실제 서비스라면 이 영역에 배송 기간, 무료배송 기준(3만원 이상), 교환·반품 절차가 안내됩니다.']
};
function contentModal(o){
  openModal(`<div class="ct-img"><img src="${o.img}" alt="" width="800" height="500"></div><div class="ct"><p class="eb">${esc(o.eb)}</p><h2>${esc(o.title)}</h2><p class="lead">${esc(o.lead)}</p>${o.steps?`<ol>${o.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`:''}${o.body?`<p class="t">${esc(o.body)}</p>`:''}${o.btn?`<button type="button" class="btn" data-go-shop>차 둘러보기</button>`:''}</div>`);
}
function textModal(k){const d=doc[k];openModal(`<div class="ct" style="padding-top:64px"><p class="eb">${d[0]}</p><h2>${d[1]}</h2><p class="t">${esc(d[2])}</p></div>`)}

/* ===== 전역 클릭 위임 ===== */
document.addEventListener('click',e=>{
  const t=e.target;let el;
  if((el=t.closest('[data-open]'))){e.preventDefault();openProduct(el.dataset.open);return}
  if((el=t.closest('[data-add]'))){addCart(el.dataset.add,1,el);return}
  if((el=t.closest('[data-wish]'))){toggleWish(el.dataset.wish);return}
  if((el=t.closest('[data-view]'))){openDrawer(el.dataset.view);return}
  if((el=t.closest('[data-life]'))){e.preventDefault();const l=LIFE.find(x=>x.id===el.dataset.life);if(l)contentModal({img:l.img,eb:l.type,title:l.title,lead:l.lead,steps:l.steps});return}
  if((el=t.closest('[data-journal]'))){const j=JOURNAL[+el.dataset.journal];contentModal({img:j.img,eb:j.tag+' · '+j.date,title:j.title,lead:'',body:j.body});return}
  if(t.closest('[data-story]')){e.preventDefault();contentModal({img:'assets/photos/story.jpg',eb:'BRAND STORY',title:'제주의 바람과 햇살로 한 잎씩',lead:'차밭의 시간을 한 잔에 담아 전합니다.',body:'제주의 화산송이 토양과 바다 안개 속에서 자란 찻잎을 이른 아침에 따고, 정성껏 덖어 차로 만듭니다. 이 사이트는 오설록 브랜드를 참고해 만든 학습용 디자인이며 공식 사이트가 아닙니다.',btn:true});return}
  if(t.closest('[data-museum]')){contentModal({img:'assets/photos/museum.jpg',eb:'TEA MUSEUM',title:'차를 보고, 배우고, 마시는 곳',lead:'차의 역사와 문화를 천천히 둘러보는 공간.',body:'전시관, 티 클래스, 티 카페로 이루어진 복합 공간을 상상해 만든 소개 화면입니다. 운영 시간과 체험 예약은 실제 서비스에서는 이 영역에 안내됩니다.',btn:true});return}
  if((el=t.closest('[data-doc]'))){textModal(el.dataset.doc);return}
  if((el=t.closest('[data-q]'))){const it=cart.find(c=>c.id===el.dataset.q);if(it){it.qty+=+el.dataset.d;if(it.qty<1)it.qty=1;if(it.qty>99)it.qty=99;saveAll();renderView()}return}
  if((el=t.closest('[data-rm]'))){cart=cart.filter(c=>c.id!==el.dataset.rm);saveAll();renderView();return}
  if(t.closest('[data-checkout]')){
    const items=cart.filter(c=>byId(c.id)),total=items.reduce((a,c)=>a+byId(c.id).price*c.qty,0),no='OS'+Date.now().toString().slice(-8);
    orders.push({no,date:new Date().toLocaleDateString('ko-KR'),items:items.reduce((a,c)=>a+c.qty,0),total});store.set('orders',orders);
    cart=[];saveAll();closeDrawer();
    openModal(`<div class="ct" style="padding-top:64px;text-align:center"><p class="eb" style="justify-content:center">ORDER COMPLETE</p><h2>주문이 완료되었어요</h2><p class="t">주문번호 ${no}<br>결제 금액 ${won(total)}<br><span style="font-size:.8rem;opacity:.7">데모 사이트라 실제 결제·배송은 이루어지지 않습니다.</span></p><button type="button" class="btn" data-close style="margin-top:24px">닫기</button></div>`);return}
  if(t.closest('[data-logout]')){user=null;store.set('user',null);syncUser();renderView();toast('로그아웃 되었어요');return}
  if(t.closest('[data-close]')){closeModal();closeDrawer();return}
  if(t===veil){closeModal();closeDrawer();return}
  if(t===modal){closeModal();return}
  if(t.closest('#toTop'))scrollTo({top:0,behavior:reduce?'auto':'smooth'});
});
dBody.addEventListener('submit',e=>{
  if(e.target.id!=='loginForm')return;e.preventDefault();
  const f=new FormData(e.target);user={name:String(f.get('name')).trim(),email:String(f.get('email')).trim()};
  store.set('user',user);syncUser();renderView();toast(`${user.name} 님, 환영합니다`);
});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(modal.classList.contains('on'))closeModal();
  else if(drawer.classList.contains('on'))closeDrawer();
  else if(!searchBox.hidden)closeSearch();
  else if(hd.classList.contains('open'))setMenu(false);
});
function hashOpen(){const m=location.hash.match(/^#p\/(\w+)/);if(m&&byId(m[1]))openProduct(m[1],true)}
addEventListener('hashchange',hashOpen);

/* ===== 10. 스크롤 등장(IntersectionObserver) · PC 패럴랙스 ===== */
(function reveal(){
  const els=$$('.sec-h,.brand-grid>*,.vals li,.museum-grid>*,.promo-grid>*,.ft-grid>*,.rv').filter((v,i,a)=>a.indexOf(v)===i);
  els.forEach(el=>el.classList.add('rv'));
  if(!('IntersectionObserver' in window)||reduce){els.forEach(el=>el.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(el=>io.observe(el));
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1&&n.classList.contains('rv')){io.observe(n)}}))).observe(jGrid,{childList:true});
})();
const par=$('.b-par'),parBox=$('.b-par');
function parallax(){
  if(!par)return;const r=parBox.getBoundingClientRect(),vh=innerHeight;
  if(r.bottom<0||r.top>vh)return;
  const p=(r.top+r.height/2-vh/2)/vh;par.style.transform=`translate3d(0,${(p*-24).toFixed(1)}px,0)`;
}


/* ===== 11. 초기화 ===== */
syncUser();updateCounts();onScroll();hashOpen();
// 터치 기기에서 스크롤 중 이미지 드래그 방지
document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG')e.preventDefault()});
})();
