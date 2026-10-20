/* ============ Extras: sincronización, rachas, pomodoro, plan de examen, notas, enfoque, vista previa, PDF, accesibilidad, PWA ============ */

/* ---------- Sincronización con un Gist privado de GitHub ---------- */
const SYNC_FILE = 'resumenes-datos.json';
const syncCfg = () => { try { return JSON.parse(localStorage.getItem('rv-sync')) || {}; } catch { return {}; } };
const setSyncCfg = o => { try { localStorage.setItem('rv-sync', JSON.stringify(o)); } catch {} };
let syncing = false, syncT = null;
function syncSoon() { if (syncing || !syncCfg().token) return; clearTimeout(syncT); syncT = setTimeout(() => syncNow(false), 5000); }
const ghApi = (p, o = {}) => fetch('https://api.github.com' + p, { ...o, headers: { Authorization: 'Bearer ' + syncCfg().token, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' } });
const jparse = s => { try { return JSON.parse(s); } catch { return undefined; } };
const syncStatus = () => { const c = syncCfg(); return c.err ? 'Error: ' + c.err : syncing ? 'Sincronizando…' : c.last ? 'Última sincronización: ' + new Date(c.last).toLocaleString('es-ES') : 'Pendiente de la primera sincronización'; };
function paintSync() { const e = $('#syncSt'); if (e) e.textContent = syncStatus(); }
async function syncNow(manual) {
  const c = syncCfg();
  if (!c.token) { if (manual) toast('Configura la sincronización en Ajustes'); return; }
  if (syncing) return; syncing = true; clearTimeout(syncT); paintSync();
  try {
    let id = c.gist, remote = { meta: {}, data: {} };
    if (!id) {
      const r = await ghApi('/gists?per_page=100'); if (!r.ok) throw new Error(r.status === 401 ? 'token no válido' : 'HTTP ' + r.status);
      const g = (await r.json()).find(x => x.files && x.files[SYNC_FILE]); if (g) id = g.id;
    }
    if (id) {
      const r = await ghApi('/gists/' + id);
      if (r.status === 404) id = null;
      else if (!r.ok) throw new Error(r.status === 401 ? 'token no válido' : 'HTTP ' + r.status);
      else { const g = await r.json(), fi = g.files && g.files[SYNC_FILE]; if (fi) { const txt = fi.truncated ? await (await fetch(fi.raw_url)).text() : fi.content; remote = jparse(txt) || remote; remote.meta = remote.meta || {}; remote.data = remote.data || {}; } }
    }
    const meta = jparse(localStorage.getItem('rv-meta') || '{}') || {};
    const out = { meta: { ...remote.meta }, data: { ...remote.data } };
    let pulled = 0, pushed = !id;
    const keys = new Set([...store.keys().filter(k => !SYNC_SKIP.has(k)), ...Object.keys(remote.data)].filter(k => !SYNC_SKIP.has(k)));
    for (const k of keys) {
      const raw = localStorage.getItem(k), lv = raw != null ? jparse(raw) : undefined, rv = remote.data[k];
      const lt = meta[k] || 0, rt = remote.meta[k] || 0;
      if (k === K.log && Array.isArray(lv) && Array.isArray(rv)) {
        const seen = new Set(), all = [...lv, ...rv].filter(e => { const s = e.t + '|' + e.k + '|' + (e.p || ''); if (seen.has(s)) return false; seen.add(s); return true; }).sort((a, b) => a.t - b.t).slice(-4000);
        if (all.length !== lv.length) { try { localStorage.setItem(k, JSON.stringify(all)); } catch {} mem[k] = all; pulled++; }
        if (all.length !== rv.length) { out.data[k] = all; out.meta[k] = Date.now(); pushed = true; }
        meta[k] = Date.now(); continue;
      }
      if (rv !== undefined && rt > lt) { try { localStorage.setItem(k, JSON.stringify(rv)); } catch {} mem[k] = rv; meta[k] = rt; pulled++; }
      else if (lv !== undefined && (rv === undefined || lt > rt || JSON.stringify(lv) !== JSON.stringify(rv))) { out.data[k] = lv; out.meta[k] = lt || Date.now(); meta[k] = out.meta[k]; pushed = true; }
    }
    try { localStorage.setItem('rv-meta', JSON.stringify(meta)); } catch {}
    if (pushed) {
      const body = JSON.stringify({ description: 'Resúmenes: datos de estudio', public: false, files: { [SYNC_FILE]: { content: JSON.stringify({ app: 'resumenes', v: 1, date: new Date().toISOString(), ...out }) } } });
      const r = id ? await ghApi('/gists/' + id, { method: 'PATCH', body }) : await ghApi('/gists', { method: 'POST', body });
      if (!r.ok) throw new Error(r.status === 404 || r.status === 403 ? 'el token necesita el permiso «gist»' : 'HTTP ' + r.status);
      id = (await r.json()).id;
    }
    setSyncCfg({ token: c.token, gist: id, last: Date.now() });
    if (pulled) { renderSide(); if (!SESS && !QZ && !$('.ov')) rerender(); }
    if (manual) toast(pulled ? `Sincronizado (${pulled} cambios recibidos)` : 'Sincronizado');
  } catch (e) {
    setSyncCfg({ ...syncCfg(), err: String(e.message || e) });
    if (manual) toast('No se pudo sincronizar: ' + (e.message || e));
  } finally { syncing = false; paintSync(); }
}
function syncPanel() {
  const c = syncCfg();
  return `<section class="pnl"><h3 class="lh nm">${ico('cloud')} Sincronizar entre dispositivos</h3>
    <p class="muted">Guarda tus datos (estados, favoritos, notas, tarjetas, tareas…) en un <b>Gist privado</b> de tu cuenta de GitHub y los comparte entre tus dispositivos. Crea un token en <a href="https://github.com/settings/tokens/new?scopes=gist&description=Resumenes" target="_blank" rel="noopener">GitHub → Tokens (classic)</a> marcando <b>solo el permiso «gist»</b>, y pégalo aquí en cada dispositivo. El token se guarda únicamente en este navegador.</p>
    ${c.token ? `<p><b id="syncSt">${esc(syncStatus())}</b></p><div class="dh-act"><button class="btn pri" data-act="sync-now">${ico('repeat')} Sincronizar ahora</button><button class="btn" data-act="sync-off">Desconectar</button></div>`
      : `<div class="fld"><label for="syncTok">Token de GitHub</label><input class="inp" id="syncTok" type="password" autocomplete="off" placeholder="ghp_…"></div><div class="dh-act"><button class="btn pri" data-act="sync-save">${ico('cloud')} Conectar y sincronizar</button></div>`}</section>`;
}
ACT['sync-save'] = async () => { const t = ($('#syncTok') || {}).value; if (!t || !t.trim()) { toast('Pega el token primero'); return; } setSyncCfg({ token: t.trim() }); await syncNow(true); rerender(); };
ACT['sync-now'] = async () => { await syncNow(true); rerender(); };
ACT['sync-off'] = () => confirmModal('Se dejará de sincronizar en este navegador. Los datos del Gist y los locales no se borran.', () => { setSyncCfg({}); rerender(); }, 'Desconectar');

/* ---------- Rachas y objetivo semanal ---------- */
const getGoal = () => Math.max(1, Math.min(50, +(store.get(K.goal, {}).week) || 5));
const weekStart = () => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };
const SESSION_KINDS = ['cards', 'quiz', 'review', 'pomo'];
const weekSessions = () => store.get(K.log, []).filter(e => e.t >= weekStart() && SESSION_KINDS.includes(e.k)).length;
function calcStreak() {
  const days = new Set(store.get(K.log, []).map(e => ymd(new Date(e.t))));
  const d = new Date(); if (!days.has(ymd(d))) d.setDate(d.getDate() - 1);
  let n = 0; while (days.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function bestStreak() {
  const days = [...new Set(store.get(K.log, []).map(e => ymd(new Date(e.t))))].sort();
  let best = 0, cur = 0, prev = null;
  for (const d of days) { cur = prev && diffDays(d, prev) === 1 ? cur + 1 : 1; best = Math.max(best, cur); prev = d; }
  return best;
}
let goalChecking = false;
function updateStreak() {
  if (goalChecking) return; goalChecking = true;
  try {
    const g = store.get(K.goal, {}), ws = ymd(new Date(weekStart()));
    if (weekSessions() >= getGoal() && g.hit !== ws) { store.set(K.goal, { ...g, hit: ws }); toast('¡Objetivo semanal cumplido!'); }
  } finally { goalChecking = false; }
}
function goalPanel() {
  const n = weekSessions(), g = getGoal(), s = calcStreak(), pct = Math.min(100, Math.round(n / g * 100));
  return `<section class="pnl"><h3 class="lh nm">${ico('flame')} Racha y objetivo semanal</h3>
    <p class="muted">Racha actual: <b>${plural(s, 'día', 'días')}</b> · mejor racha: <b>${plural(bestStreak(), 'día', 'días')}</b>. Cuentan lecturas, repasos, tarjetas, quizzes y pomodoros.</p>
    <div class="fld"><label for="goalN">Sesiones de estudio por semana (repasos, tarjetas, quizzes, pomodoros): <b id="goalV">${g}</b></label><input id="goalN" type="range" min="1" max="30" value="${g}"></div>
    <div class="pbar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del objetivo semanal"><i style="width:${pct}%"></i></div><p class="muted">Esta semana: ${n} de ${g}</p></section>`;
}

/* ---------- Ancho de lectura ---------- */
const MW = [[640, 'Estrecho'], [800, 'Normal'], [1000, 'Ancho']];
const getMw = () => { const v = +store.get('rv-mw', 800); return MW.some(m => m[0] === v) ? v : 800; };
const applyMw = () => document.documentElement.style.setProperty('--mw', getMw() + 'px');
function widthPanel() {
  const w = getMw();
  return `<section class="pnl"><h3 class="lh nm">Ancho de lectura</h3><div class="seg3" role="group" aria-label="Ancho de lectura">${MW.map(([v, l]) => `<button data-act="mw" data-w="${v}" class="${w === v ? 'on' : ''}" aria-pressed="${w === v}">${l}</button>`).join('')}</div>
    <p class="muted">También puedes usar el modo enfoque (tecla <kbd>F</kbd>) dentro de un resumen.</p></section>`;
}
ACT.mw = el => { store.set('rv-mw', +el.dataset.w); applyMw(); rerender(); };

/* ---------- Pomodoro ---------- */
let PM = Object.assign({ mode: 'work', w: 25, b: 5, left: 25 * 60, end: null }, store.get(K.pomo, {}));
let pmIv = null;
const pmSave = () => { try { localStorage.setItem(K.pomo, JSON.stringify(PM)); } catch {} };
const fmtT = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const pomosToday = () => { const t = today(); return store.get(K.log, []).filter(e => e.k === 'pomo' && ymd(new Date(e.t)) === t).length; };
function beep() { try { const a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 880; g.gain.setValueAtTime(.15, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .6); o.start(); o.stop(a.currentTime + .6); } catch {} }
function pmPaint() {
  const left = PM.end ? Math.max(0, Math.round((PM.end - Date.now()) / 1000)) : PM.left, run = !!PM.end;
  const t = $('#pmT'), b = $('#pomoBtn');
  if (t) { t.textContent = fmtT(left); $('#pmMode').textContent = PM.mode === 'work' ? 'Enfoque' : 'Descanso'; $('#pmGo').textContent = run ? 'Pausar' : (left < (PM.mode === 'work' ? PM.w : PM.b) * 60 ? 'Continuar' : 'Iniciar'); $('#pmN').textContent = `Pomodoros hoy: ${pomosToday()}`; $('#pomo').dataset.mode = PM.mode; }
  if (b) { b.classList.toggle('run', run); b.dataset.t = run ? fmtT(left) : ''; b.setAttribute('aria-label', run ? `Pomodoro: quedan ${fmtT(left)}` : 'Pomodoro'); }
}
function pmDone() {
  clearInterval(pmIv); pmIv = null; beep();
  if (PM.mode === 'work') {
    log('pomo', S.cur ? S.cur.path : null, { m: PM.w });
    PM.mode = 'break'; PM.left = PM.b * 60; PM.end = Date.now() + PM.left * 1000; toast('Pomodoro completado. ¡Descansa!', 4500);
    try { if (document.hidden && 'Notification' in window && Notification.permission === 'granted') new Notification('Pomodoro completado', { body: 'Hora de descansar.' }); } catch {}
    pmRun();
  } else { PM.mode = 'work'; PM.left = PM.w * 60; PM.end = null; toast('Descanso terminado', 3500); }
  pmSave(); pmPaint(); if (S.view === 'tool:estadisticas') rerender();
}
function pmRun() { clearInterval(pmIv); pmIv = setInterval(() => { if (PM.end && PM.end - Date.now() <= 0) pmDone(); else pmPaint(); }, 500); }
function togglePomo(open) { const p = $('#pomo'); if (!p) return; const show = typeof open === 'boolean' ? open : p.hidden; p.hidden = !show; if (show) { pmPaint(); const g = $('#pmGo'); if (g) g.focus(); } }
ACT['pomo-close'] = () => togglePomo(false);
ACT['pomo-toggle'] = () => {
  if (PM.end) { PM.left = Math.max(1, Math.round((PM.end - Date.now()) / 1000)); PM.end = null; clearInterval(pmIv); pmIv = null; }
  else { PM.end = Date.now() + PM.left * 1000; pmRun(); try { if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission(); } catch {} }
  pmSave(); pmPaint();
};
ACT['pomo-reset'] = () => { clearInterval(pmIv); pmIv = null; PM.end = null; PM.mode = 'work'; PM.left = PM.w * 60; pmSave(); pmPaint(); };
ACT['pomo-skip'] = () => { clearInterval(pmIv); pmIv = null; PM.end = null; PM.mode = PM.mode === 'work' ? 'break' : 'work'; PM.left = (PM.mode === 'work' ? PM.w : PM.b) * 60; pmSave(); pmPaint(); };
function pmCfg() {
  const w = Math.max(1, Math.min(90, +$('#pmW').value || 25)), b = Math.max(1, Math.min(30, +$('#pmB').value || 5));
  PM.w = w; PM.b = b; if (!PM.end) PM.left = (PM.mode === 'work' ? w : b) * 60; pmSave(); pmPaint();
}

/* ---------- Plan de estudio para un examen ---------- */
function planExam(e) {
  const t = today(), N = Math.max(0, diffDays(e.date, t));
  const docs = (e.docs || []).map(p => S.byPath.get(p)).filter(f => f && getSt(f) !== 'dom');
  if (!N || !docs.length) return null;
  const R = N >= 6 ? 2 : N >= 3 ? 1 : 0, SD = N - R, W = { pend: 1, curso: .7, repasar: .5 }, wt = f => (f.diff || 2) * (W[getSt(f)] || 1);
  const days = Array.from({ length: N }, (_, i) => ({ date: addDays(t, i), kind: i < SD ? 'estudio' : 'repaso', docs: [] }));
  const tot = docs.reduce((a, f) => a + wt(f), 0); let cum = 0;
  docs.forEach(f => { const w = wt(f); const mid = (cum + w / 2) / tot; cum += w; days[Math.min(SD - 1, Math.floor(mid * SD))].docs.push(f); });
  for (let i = SD; i < N; i++) days[i].docs = docs.slice();
  return days.filter(d => d.docs.length);
}
ACT['ex-plan'] = el => {
  const e = getExams().find(x => x.id === el.dataset.id); if (!e) return;
  const plan = planExam(e);
  if (!plan) { toast('No hay temas pendientes o el examen es hoy'); return; }
  const lines = plan.map(d => `<span class="pl"><b>${fmtDate(d.date)}</b> · <i>${d.kind === 'estudio' ? 'Estudiar' : 'Repasar todo'}</i>: ${d.docs.map(f => esc(f.title)).join(', ')}</span>`).join('');
  formModal({
    title: 'Plan de estudio: ' + e.name, wide: true, submit: 'Añadir repasos al calendario',
    text: `Repartido según dificultad y estado de cada tema; los últimos días se reservan para repasar.<br><span class="plans">${lines}</span>`,
    onSubmit: () => {
      const r = store.get(K.rev, []); let n = 0;
      for (const d of plan) for (const f of d.docs) if (!r.some(x => x.path === f.path && x.date === d.date)) { r.push({ id: uid(), path: f.path, date: d.date, done: false }); n++; }
      store.set(K.rev, r); renderSide(); toast(`${n} repasos añadidos al calendario`);
    }
  });
};

/* ---------- Subrayados, notas y tarjetas desde la selección ---------- */
const getNotes = () => store.get(K.notes, {});
const getHl = () => store.get(K.hl, {});
function flat(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('.katex,script,style,button,.cp,.hstar,.mermaid') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const idx = []; let s = '', n; while ((n = w.nextNode())) { idx.push([s.length, n]); s += n.nodeValue; }
  return { s, idx };
}
function wrapRange(root, start, end, id) {
  for (const [o, n] of flat(root).idx) {
    const a = Math.max(start, o), b = Math.min(end, o + n.nodeValue.length);
    if (a < b) { const r = document.createRange(); r.setStart(n, a - o); r.setEnd(n, b - o); const m = document.createElement('mark'); m.className = 'uh'; m.dataset.id = id; r.surroundContents(m); }
  }
}
function applyHl(f) {
  const md = $('#md'); if (!md) return;
  $$('mark.uh', md).forEach(m => { const p = m.parentNode; while (m.firstChild) p.insertBefore(m.firstChild, m); m.remove(); p.normalize(); });
  for (const h of (getHl()[f.path] || [])) {
    const { s } = flat(md); let pos = -1, k = h.n || 0;
    do { pos = s.indexOf(h.t, pos + 1); } while (k-- > 0 && pos >= 0);
    if (pos >= 0) { try { wrapRange(md, pos, pos + h.t.length, h.id); } catch {} }
  }
}
function selInfo() {
  const sel = getSelection(), md = $('#md'); if (!sel || !sel.rangeCount || sel.isCollapsed || !md) return null;
  const r = sel.getRangeAt(0); if (!md.contains(r.commonAncestorContainer)) return null;
  const text = sel.toString().replace(/\s+/g, ' ').trim(); if (text.length < 2) return null;
  const { s, idx } = flat(md); let start = -1;
  const ent = idx.find(([, n]) => n === r.startContainer);
  if (ent && r.startContainer.nodeType === 3) start = ent[0] + r.startOffset;
  const t = start >= 0 ? s.slice(start, start + sel.toString().length) : text;
  let n = 0, p = -1; const lim = start >= 0 ? start : s.indexOf(t);
  while ((p = s.indexOf(t, p + 1)) >= 0 && p < lim) n++;
  return { text, hl: t.length <= 400 && s.includes(t) ? { t, n } : null, rect: r.getBoundingClientRect() };
}
let SEL = null, selT = null;
function updateSelBar() {
  const bar = $('#selbar'); if (!bar) return;
  SEL = S.view === 'doc' ? selInfo() : null;
  if (!SEL) { bar.hidden = true; return; }
  bar.hidden = false; bar.querySelector('[data-act="sel-hl"]').hidden = !SEL.hl;
  const w = bar.offsetWidth || 260, r = SEL.rect;
  bar.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
  bar.style.top = (r.top > 70 ? r.top - 46 : r.bottom + 8) + 'px';
}
ACT['sel-hl'] = () => {
  const f = S.cur; if (!SEL || !SEL.hl || !f) return;
  const all = getHl(); (all[f.path] = all[f.path] || []).push({ id: uid(), t: SEL.hl.t, n: SEL.hl.n }); store.set(K.hl, all);
  getSelection().removeAllRanges(); applyHl(f); paintNotes(f); $('#selbar').hidden = true;
};
ACT['sel-card'] = () => { const f = S.cur; if (!SEL || !f) return; const a = SEL.text; getSelection().removeAllRanges(); $('#selbar').hidden = true; cardForm(null, { q: '', a, subj: f.subj, path: f.path }); };
ACT['sel-note'] = () => {
  const f = S.cur; if (!SEL || !f) return;
  const n = getNotes(), cur = n[f.path] ? n[f.path].t : ''; n[f.path] = { t: (cur ? cur + '\n\n' : '') + '> ' + SEL.text + '\n\n', u: Date.now() }; store.set(K.notes, n);
  getSelection().removeAllRanges(); $('#selbar').hidden = true; paintNotes(f); const ta = $('#noteTa'); if (ta) { ta.scrollIntoView({ block: 'center' }); ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
};
ACT['hl-del'] = el => { const f = S.cur; if (!f) return; const all = getHl(); all[f.path] = (all[f.path] || []).filter(h => h.id !== el.dataset.id); if (!all[f.path].length) delete all[f.path]; store.set(K.hl, all); applyHl(f); paintNotes(f); };
ACT['hl-card'] = el => { const f = S.cur; const h = f && (getHl()[f.path] || []).find(x => x.id === el.dataset.id); if (h) cardForm(null, { q: '', a: h.t, subj: f.subj, path: f.path }); };
function paintNotes(f) {
  const box = $('#notes'); if (!box) return;
  const hs = getHl()[f.path] || [], n = getNotes()[f.path];
  const ta = $('#noteTa'); if (ta && document.activeElement !== ta) ta.value = n ? n.t : '';
  $('#hlList').innerHTML = hs.length ? `<h4>Subrayados (${hs.length})</h4><ul class="hls">${hs.map(h => `<li><q>${esc(h.t.length > 160 ? h.t.slice(0, 160) + '…' : h.t)}</q><span><button class="ib sm" data-act="hl-card" data-id="${h.id}" title="Crear tarjeta" aria-label="Crear tarjeta con este subrayado">${ico('cards')}</button><button class="ib sm" data-act="hl-del" data-id="${h.id}" title="Quitar subrayado" aria-label="Quitar subrayado">${ico('x')}</button></span></li>`).join('')}</ul>` : '<p class="muted">Selecciona texto del resumen para subrayarlo, crear una tarjeta o añadirlo a tus notas.</p>';
}
function afterDoc(f) {
  const md = $('#md'); if (!md) return;
  const sec = document.createElement('section'); sec.className = 'pnl notes'; sec.id = 'notes';
  sec.innerHTML = `<h3 class="lh nm">${ico('pen')} Mis notas</h3><label class="sr" for="noteTa">Notas personales de este resumen</label><textarea id="noteTa" rows="4" placeholder="Notas personales sobre este resumen…"></textarea><div class="muted" id="noteSt" aria-live="polite"></div><div id="hlList"></div>`;
  md.insertAdjacentElement('afterend', sec);
  paintNotes(f); applyHl(f);
  let t; const ta = $('#noteTa');
  ta.addEventListener('input', () => {
    clearTimeout(t); $('#noteSt').textContent = 'Guardando…';
    t = setTimeout(() => { const n = getNotes(); if (ta.value.trim()) n[f.path] = { t: ta.value, u: Date.now() }; else delete n[f.path]; store.set(K.notes, n); $('#noteSt').textContent = 'Guardado'; }, 500);
  });
}

/* ---------- Modo enfoque ---------- */
function toggleFocus() {
  const on = document.body.classList.toggle('focus');
  const x = $('#focusX'); if (x) x.hidden = !on;
  if (on) { toast('Modo enfoque: pulsa F o Esc para salir', 2200); window.scrollTo({ top: scrollY }); }
}
ACT.focus = toggleFocus;

/* ---------- Vista previa al pasar el ratón ---------- */
let hvT = null, hvEl = null;
const hvHide = () => { clearTimeout(hvT); const c = $('#hv'); if (c) c.hidden = true; hvEl = null; };
function snippetOf(f) {
  const body = parseFM(f.text || '').body.replace(/```[\s\S]*?```/g, '').split(/\n{2,}/).map(x => x.trim()).filter(x => x && !/^(#|\||>|[-*+] |\d+\. |!\[|<)/.test(x));
  const p = body.find(x => x.length > 40) || body[0] || '';
  const t = p.replace(/\$[^$]*\$/g, '…').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`~#>]/g, '').replace(/\s+/g, ' ').trim();
  return t.length > 220 ? t.slice(0, 220).replace(/\s\S*$/, '') + '…' : t;
}
async function hvShow(a) {
  const p = (() => { try { return decodeURIComponent(a.getAttribute('href').slice(2).split('?')[0]); } catch { return ''; } })();
  const f = S.byPath.get(p); if (!f || f === S.cur) return;
  await ensureText(f); if (hvEl !== a) return;
  const c = $('#hv'); if (!c) return;
  c.innerHTML = `<div class="hv-h">${subjBadge(f)}<span class="dot ${getSt(f)}" title="${esc(STATES.find(s => s[0] === getSt(f))[1])}"></span></div><b>${esc(f.title)}</b><p>${esc(snippetOf(f) || 'Sin texto de introducción.')}</p>${f.tags.length ? `<div class="hv-t">${f.tags.slice(0, 4).map(t => '#' + esc(t)).join(' ')}</div>` : ''}`;
  c.style.setProperty('--c', f.s.color); c.hidden = false;
  const r = a.getBoundingClientRect(), w = c.offsetWidth, h = c.offsetHeight;
  c.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left)) + 'px';
  c.style.top = (r.bottom + h + 12 < innerHeight ? r.bottom + 8 : Math.max(8, r.top - h - 8)) + 'px';
}
document.addEventListener('mouseover', e => {
  if (!matchMedia('(hover:hover)').matches) return;
  const a = e.target.closest && e.target.closest('#md a[href^="#/"], #rel a[href^="#/"]');
  if (!a) { if (hvEl && !(e.target.closest && e.target.closest('#hv'))) hvHide(); return; }
  if (a === hvEl) return; hvHide(); hvEl = a; hvT = setTimeout(() => hvShow(a), 380);
});
addEventListener('scroll', hvHide, { passive: true });

/* ---------- Exportar a PDF ---------- */
function pdfModal(subj) {
  formModal({
    title: 'Exportar a PDF', wide: true, submit: 'Exportar',
    text: 'Elige los resúmenes. Se abrirá el diálogo de impresión: selecciona «Guardar como PDF».',
    fields: [
      { name: 'subj', label: 'Asignatura', type: 'select', value: subj || '', options: [['', 'Todas las asignaturas'], ...S.subjects.map(s => [s.key, s.key + (s.name ? ' · ' + s.name : '')])] },
      { name: 'docs', label: 'Resúmenes', type: 'checks', all: true, options: v => allDocs().filter(f => !v.subj || f.subj === v.subj).map(f => [f.path, `${f.subj} · ${f.title}`]) }
    ],
    onSubmit: v => { if (!v.docs.length) { toast('Elige al menos un resumen'); return false; } setTimeout(() => printDocs(v.docs), 60); }
  });
}
ACT.pdf = el => pdfModal(el.dataset.s);
async function printDocs(paths) {
  toast('Preparando el PDF…');
  const docs = allDocs().filter(f => paths.includes(f.path));
  await Promise.all(docs.map(ensureText));
  let area = $('#printArea'); if (area) area.remove();
  area = document.createElement('div'); area.id = 'printArea'; document.body.append(area);
  for (const f of docs) {
    if (f.text == null) continue;
    const s = document.createElement('section'); s.className = 'pd'; s.innerHTML = `<div class="pd-k">${esc(f.subj)}${f.sub ? ' · ' + esc(f.sub) : ''}</div><div class="md"></div>`;
    area.append(s); const md = $('.md', s); md.innerHTML = renderDoc(f); fixContent(md, f);
    $$('.pw .cp, .hstar', md).forEach(x => x.remove());
  }
  try { await new Promise(r => setTimeout(r, 400)); } catch {}
  const done = () => { document.body.classList.remove('printing'); area.remove(); removeEventListener('afterprint', done); };
  addEventListener('afterprint', done);
  document.body.classList.add('printing'); window.print();
}

/* ---------- Después de cada ruta / documento ---------- */
function afterRoute() {
  hvHide(); const b = $('#selbar'); if (b) b.hidden = true;
  if (S.view !== 'doc' && document.body.classList.contains('focus')) { document.body.classList.remove('focus'); const x = $('#focusX'); if (x) x.hidden = true; }
  if (S.fresh && !(document.activeElement && document.activeElement.id === 'q')) { const m = $('#main'); if (m) m.focus({ preventScroll: true }); }
  pmPaint();
}

/* ---------- Accesibilidad: foco en diálogos ---------- */
let lastFocus = null;
function watchDialogs() {
  new MutationObserver(ms => {
    for (const m of ms) {
      m.addedNodes.forEach(n => { if (n.classList && n.classList.contains('ov')) { lastFocus = lastFocus || document.activeElement; } });
      m.removedNodes.forEach(n => { if (n.classList && n.classList.contains('ov') && !$('.ov')) { const f = lastFocus; lastFocus = null; if (f && document.contains(f) && f !== document.body) { try { f.focus({ preventScroll: true }); } catch {} } } });
    }
  }).observe(document.body, { childList: true });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const ov = $('.ov'); if (!ov) return;
    const els = $$('a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select,textarea,[tabindex]:not([tabindex="-1"])', ov).filter(x => x.offsetParent !== null);
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (!ov.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- Arranque de los extras ---------- */
function extraInit() {
  applyMw();
  const body = document.body;
  // enlace "saltar al contenido"
  const skip = document.createElement('button'); skip.className = 'skip'; skip.id = 'skip'; skip.textContent = 'Saltar al contenido';
  skip.onclick = () => { const m = $('#main'); m.focus(); m.scrollIntoView(); }; body.prepend(skip);
  $('#main').setAttribute('tabindex', '-1');
  const tw = $('#toasts'); tw.setAttribute('role', 'status'); tw.setAttribute('aria-live', 'polite');
  // botón del pomodoro en la cabecera
  const pb = document.createElement('button'); pb.className = 'ib'; pb.id = 'pomoBtn'; pb.title = 'Pomodoro (P)'; pb.setAttribute('aria-label', 'Pomodoro'); pb.innerHTML = ico('timer');
  pb.onclick = () => togglePomo(); $('#themeBtn').before(pb);
  // panel del pomodoro
  const pm = document.createElement('div'); pm.id = 'pomo'; pm.className = 'pomo'; pm.hidden = true; pm.setAttribute('role', 'dialog'); pm.setAttribute('aria-label', 'Pomodoro');
  pm.innerHTML = `<div class="pm-h"><b id="pmMode">Enfoque</b><button class="ib sm" data-act="pomo-close" aria-label="Cerrar pomodoro">${ico('x')}</button></div><div class="pm-t" id="pmT">25:00</div>
    <div class="pm-b"><button class="btn pri" id="pmGo" data-act="pomo-toggle">Iniciar</button><button class="btn" data-act="pomo-reset">Reiniciar</button><button class="btn" data-act="pomo-skip">Saltar</button></div>
    <div class="pm-c"><label>Trabajo <input id="pmW" type="number" min="1" max="90" value="${PM.w}"> min</label><label>Descanso <input id="pmB" type="number" min="1" max="30" value="${PM.b}"> min</label></div><p class="muted" id="pmN"></p>`;
  body.append(pm); pm.addEventListener('change', e => { if (e.target.id === 'pmW' || e.target.id === 'pmB') pmCfg(); });
  if (PM.end) { if (PM.end - Date.now() <= 0) pmDone(); else pmRun(); }
  pmPaint();
  // barra de selección, vista previa, salida del enfoque
  const sb = document.createElement('div'); sb.id = 'selbar'; sb.className = 'selbar'; sb.hidden = true; sb.setAttribute('role', 'toolbar'); sb.setAttribute('aria-label', 'Acciones sobre el texto seleccionado');
  sb.innerHTML = `<button data-act="sel-hl">${ico('pen')} Subrayar</button><button data-act="sel-card">${ico('cards')} Tarjeta</button><button data-act="sel-note">${ico('note')} Nota</button>`;
  sb.addEventListener('mousedown', e => e.preventDefault()); body.append(sb);
  document.addEventListener('selectionchange', () => { clearTimeout(selT); selT = setTimeout(updateSelBar, 140); });
  const hv = document.createElement('div'); hv.id = 'hv'; hv.className = 'hv'; hv.hidden = true; hv.setAttribute('role', 'tooltip'); body.append(hv);
  const fx = document.createElement('button'); fx.id = 'focusX'; fx.className = 'btn focusx'; fx.hidden = true; fx.innerHTML = `${ico('eye')} Salir del modo enfoque`; fx.onclick = toggleFocus; body.append(fx);
  // meta de objetivo y subrayados clicables
  document.addEventListener('input', e => { if (e.target.id === 'goalN') { const g = store.get(K.goal, {}); store.set(K.goal, { ...g, week: +e.target.value }); $('#goalV').textContent = e.target.value; } });
  document.addEventListener('click', e => { const m = e.target.closest && e.target.closest('mark.uh'); if (m && getSelection().isCollapsed) confirmModal('¿Quitar este subrayado?', () => ACT['hl-del']({ dataset: { id: m.dataset.id } }), 'Quitar'); });
  // atajos F y P, Esc sale del enfoque
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape' && body.classList.contains('focus') && !$('.ov') && !$('.pal')) { toggleFocus(); return; }
    if (typing() || $('.ov')) return;
    const k = e.key.toLowerCase();
    if (k === 'f' && S.view === 'doc') toggleFocus(); else if (k === 'p') togglePomo();
  });
  watchDialogs();
  // sincronización y conexión
  addEventListener('online', () => { toast('De nuevo en línea'); syncSoon(); });
  addEventListener('offline', () => toast('Sin conexión: se usarán los datos guardados', 3500));
  document.addEventListener('visibilitychange', () => { if (!document.hidden && syncCfg().token) syncNow(false); });
  if (syncCfg().token) setTimeout(() => syncNow(false), 1500);
  // PWA
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => {});
}
