'use strict';
/* ============ CONFIGURACIÓN ============ */
const CFG = {
  owner: 'AlvGJ-UGR',
  repo: 'Resumenes-Varios-',
  branch: 'main',
  titulo: 'Resúmenes',
  // Orden de las carpetas (las que no estén aquí se añaden detrás automáticamente)
  orden: ['CCE', 'SD', 'ST', 'TC', 'TO'],
  // Nombre completo de cada asignatura (opcional; también puede ir en el front matter: asignatura: ...)
  nombres: { CCE: '', SD: '', ST: '', TC: '', TO: '' },
  // Icono por asignatura (opcional). Ej.: { SD: 'network' }. Disponibles: calc network wave cpu atom code flask globe shield layers bolt book sigma
  iconos: {}
};
/* ======================================= */

/* ---------- Iconos SVG (24x24, trazo) ---------- */
const ICONS = {
  cloud: '<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 0 9.5z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
  note: '<path d="M5 4h14v12l-5 5H5z"/><path d="M14 21v-5h5M8 9h8M8 13h4"/>',
  pen: '<path d="m4 20 4-1 11-11-3-3L5 16z"/><path d="m14 6 3 3"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 14h6M9 17h4"/>',
  plan: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 13h3M8 17h6"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  library: '<path d="M4 4v16M9 4v16"/><path d="m14 5 4-1 3 15-4 1z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cards: '<rect x="3" y="7" width="14" height="12" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>',
  sigma: '<path d="M18 5H6l6 7-6 7h12"/>',
  map: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  tasks: '<path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6.5h9M11 12.5h9M11 18.5h9"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  chart: '<path d="M5 20V11M11 20V4M17 20v-6M3 20h18"/>',
  settings: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
  print: '<path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2"/><rect x="7" y="14" width="10" height="6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3"/>',
  edit: '<path d="m4 20 1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/>',
  chev: '<path d="m9 6 6 6-6 6"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  download: '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 9l5-5 5 5M5 20h14"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19V5.5"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5.5M12 12l6 5.5"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  wave: '<path d="M2 12h3l2-6 4 12 3-9 2 3h6"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 15h9"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/>',
  atom: '<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  bolt: '<path d="M13 3 5 13h6l-1 8 8-10h-6z"/>',
  tag: '<path d="M5 9h14M4 15h14M10 4 8 20M16 4l-2 16"/>',
  filter: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  panel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  repeat: '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  flame: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>'
};
const SUBJECT_ICONS = ['calc', 'network', 'wave', 'cpu', 'atom'];

/* ---------- Utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const ico = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"></use></svg>`;
const encPath = p => p.split('/').map(encodeURIComponent).join('/');
const REPO = `https://github.com/${CFG.owner}/${CFG.repo}`;
const rawUrl = p => `https://raw.githubusercontent.com/${CFG.owner}/${CFG.repo}/${CFG.branch}/${encPath(p)}`;
const ghUrl = p => `${REPO}/blob/${CFG.branch}/${encPath(p)}`;
const folderUrl = k => `${REPO}/tree/${CFG.branch}/${encodeURIComponent(k)}`;
const href = p => '#/' + encPath(p);
const toolHref = (id, qs) => '#/_/' + id + (qs ? '?' + qs : '');
const prettify = f => f.replace(/\.(md|markdown)$/i, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim();
const cmp = (a, b) => String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' });
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;
const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = pd(s); d.setDate(d.getDate() + n); return ymd(d); };
const diffDays = (a, b) => Math.round((pd(a) - pd(b)) / 864e5);
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fmtDate = s => { const d = pd(s); return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`; };
const relDay = s => { const n = diffDays(s, today()); return n === 0 ? 'hoy' : n === 1 ? 'mañana' : n === -1 ? 'ayer' : n > 0 ? `en ${n} días` : `hace ${-n} días`; };
const toList = v => Array.isArray(v) ? v.map(x => String(x).trim()).filter(Boolean) : v ? String(v).split(/[,;]/).map(x => x.trim()).filter(Boolean) : [];
const typing = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName) || (document.activeElement && document.activeElement.isContentEditable);

/* ---------- Almacenamiento local (con copia en memoria si el navegador lo bloquea) ---------- */
const mem = {};
const SYNC_SKIP = new Set(['rv-tree-v1', 'rv-meta', 'rv-sync', 'rv-theme', 'rv-noside', 'rv-pos', 'rv-fs', 'rv-mw', 'rv-pomo']);
const stamp = k => { if (SYNC_SKIP.has(k)) return; try { const m = JSON.parse(localStorage.getItem('rv-meta') || '{}'); m[k] = Date.now(); localStorage.setItem('rv-meta', JSON.stringify(m)); } catch {} if (typeof syncSoon === 'function') syncSoon(); };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); if (v != null) return JSON.parse(v); } catch {} return k in mem ? mem[k] : d; },
  set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch {} stamp(k); },
  del(k) { delete mem[k]; try { localStorage.removeItem(k); } catch {} },
  keys() { const r = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('rv-') && k !== 'rv-tree-v1' && k !== 'rv-meta' && k !== 'rv-sync') r.push(k); } } catch {} return r; }
};
const K = { st: 'rv-st', fav: 'rv-fav', hist: 'rv-hist', exams: 'rv-exams', tasks: 'rv-tasks', rev: 'rv-rev', uc: 'rv-ucards', srs: 'rv-srs', log: 'rv-log', pos: 'rv-pos', notes: 'rv-notes', hl: 'rv-hl', pomo: 'rv-pomo', goal: 'rv-goal' };

/* ---------- Estado global ---------- */
const S = { subjects: [], byPath: new Map(), bySubj: new Map(), view: '', tok: 0, noAnim: false, offline: false, curDoc: null, cur: null, refs: new Map() };
const IDX = { started: false, ready: false, done: 0, total: 0 };
const UI = { lib: { q: '', subj: '', tipo: '', dif: '', est: '', tag: '', tema: '', fav: false }, form: { subj: '', q: '', meta: false }, map: { subj: '' }, cal: { m: null, d: null }, taskf: 'pend', cardsf: { subj: '', doc: '' }, quizf: { subj: '', doc: '', n: '10' } };
const allDocs = () => S.subjects.flatMap(s => s.files);
const ACT = {};   // acciones por data-act

/* ---------- Estados de estudio, favoritos, historial, registro ---------- */
const STATES = [['pend', 'Pendiente'], ['curso', 'En curso'], ['repasar', 'Repasar'], ['dom', 'Dominado']];
const stLabel = k => (STATES.find(s => s[0] === k) || STATES[0])[1];
const getSt = f => store.get(K.st, {})[f.path] || 'pend';
function setSt(f, v) {
  const m = store.get(K.st, {});
  if (v === 'pend') delete m[f.path]; else m[f.path] = v;
  store.set(K.st, m);
  if (v === 'dom') log('dom', f.path);
}
const favs = () => { const f = store.get(K.fav, {}); return { docs: f.docs || [], secs: f.secs || [] }; };
const isFavDoc = p => favs().docs.includes(p);
function toggleFavDoc(p) { const f = favs(); const i = f.docs.indexOf(p); if (i >= 0) f.docs.splice(i, 1); else f.docs.unshift(p); store.set(K.fav, f); return i < 0; }
const isFavSec = (p, id) => favs().secs.some(s => s.p === p && s.id === id);
function toggleFavSec(p, id, t) { const f = favs(); const i = f.secs.findIndex(s => s.p === p && s.id === id); if (i >= 0) f.secs.splice(i, 1); else f.secs.unshift({ p, id, t }); store.set(K.fav, f); return i < 0; }
function pushHist(p) { const h = store.get(K.hist, []).filter(x => x.p !== p); h.unshift({ p, t: Date.now() }); store.set(K.hist, h.slice(0, 40)); }
function log(k, p, extra) {
  const a = store.get(K.log, []); a.push(Object.assign({ t: Date.now(), k, p: p || null }, extra || {}));
  store.set(K.log, a.length > 4000 ? a.slice(-4000) : a);
  if (typeof updateStreak === 'function') updateStreak();
}
function progress(docs) {
  const c = { pend: 0, curso: 0, repasar: 0, dom: 0 }; const m = store.get(K.st, {});
  for (const f of docs) c[m[f.path] || 'pend']++;
  const total = docs.length;
  return { total, c, pct: total ? Math.round(c.dom / total * 100) : 0 };
}

/* ---------- Tema claro / oscuro ---------- */
let themePref = store.get('rv-theme', 'auto');
const sysLight = () => { try { return matchMedia('(prefers-color-scheme: light)').matches; } catch { return false; } };
const resolveTheme = () => themePref === 'light' || themePref === 'dark' ? themePref : (sysLight() ? 'light' : 'dark');
function applyTheme() {
  const t = resolveTheme();
  document.documentElement.dataset.theme = t;
  const hd = $('#hl-dark'), hl = $('#hl-light');
  if (hd) hd.media = t === 'dark' ? 'all' : 'not all';
  if (hl) hl.media = t === 'light' ? 'all' : 'not all';
  const b = $('#themeBtn');
  if (b) { b.innerHTML = ico(t === 'dark' ? 'sun' : 'moon'); b.title = t === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'; b.setAttribute('aria-label', b.title); }
}
function setTheme(p) { themePref = p; store.set('rv-theme', p); applyTheme(); rerender(); }
const toggleTheme = () => setTheme(resolveTheme() === 'dark' ? 'light' : 'dark');

/* ---------- Avisos y diálogos ---------- */
function toast(msg, ms = 2600) {
  const box = $('#toasts'); if (!box) return;
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; box.append(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 250); }, ms);
}
function closeOverlay() { $$('.ov').forEach(o => o.remove()); }
function formModal({ title, fields = [], submit = 'Guardar', danger = false, text = '', onSubmit, wide = false }) {
  closeOverlay();
  const ov = document.createElement('div'); ov.className = 'ov';
  const fh = f => {
    const id = 'f_' + f.name, v = f.value ?? '';
    let ctl;
    if (f.type === 'textarea') ctl = `<textarea id="${id}" name="${f.name}" rows="${f.rows || 3}" placeholder="${esc(f.placeholder || '')}">${esc(v)}</textarea>`;
    else if (f.type === 'select') ctl = `<select id="${id}" name="${f.name}">${f.options.map(([val, lab]) => `<option value="${esc(val)}"${val === v ? ' selected' : ''}>${esc(lab)}</option>`).join('')}</select>`;
    else if (f.type === 'checks') ctl = `<div class="checks" id="${id}"></div>`;
    else ctl = `<input id="${id}" name="${f.name}" type="${f.type || 'text'}" value="${esc(v)}" placeholder="${esc(f.placeholder || '')}"${f.required ? ' required' : ''}>`;
    return `<div class="fld"><label for="${id}">${esc(f.label)}</label>${ctl}</div>`;
  };
  ov.innerHTML = `<form class="dlg${wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><h2>${esc(title)}</h2>${text ? `<p class="muted">${text}</p>` : ''}${fields.map(fh).join('')}<div class="dlg-act"><button type="button" class="btn" data-x>Cancelar</button><button class="btn pri${danger ? ' danger' : ''}">${esc(submit)}</button></div></form>`;
  document.body.append(ov);
  const form = $('form', ov);
  const values = () => {
    const o = {};
    for (const f of fields) o[f.name] = f.type === 'checks' ? $$(`#f_${f.name} input:checked`, ov).map(i => i.value) : form.elements[f.name].value;
    return o;
  };
  const fillChecks = () => {
    for (const f of fields) if (f.type === 'checks') {
      const box = $(`#f_${f.name}`, ov);
      const prev = $$('input', box);
      const opts = f.options(values());
      const sel = f.all ? new Set(opts.map(o => o[0])) : prev.length ? new Set(prev.filter(i => i.checked).map(i => i.value)) : new Set(f.value || []);
      box.innerHTML = opts.length ? opts.map(([val, lab]) => `<label class="ck"><input type="checkbox" value="${esc(val)}"${sel.has(val) ? ' checked' : ''}> <span>${esc(lab)}</span></label>`).join('') : '<span class="muted">Sin opciones</span>';
    }
  };
  fillChecks();
  form.addEventListener('change', e => { if (e.target.tagName === 'SELECT') fillChecks(); });
  ov.addEventListener('mousedown', e => { if (e.target === ov) ov.remove(); });
  $('[data-x]', ov).onclick = () => ov.remove();
  form.addEventListener('submit', e => { e.preventDefault(); const r = onSubmit ? onSubmit(values()) : true; if (r !== false) ov.remove(); });
  (($('input:not([type=checkbox]),textarea,select', ov)) || $('.btn.pri', ov)).focus();
}
const confirmModal = (text, onYes, submit = 'Confirmar') => formModal({ title: 'Confirmar', text, submit, danger: true, onSubmit: () => { onYes(); } });

/* ---------- Metadatos (front matter) y bloques especiales ---------- */
function parseFM(text) {
  text = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (!m) return { meta: {}, body: text };
  const meta = {}; let key = null;
  const unq = s => String(s).trim().replace(/^["']|["']$/g, '');
  for (const raw of m[1].split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const li = raw.match(/^\s+-\s+(.*)$/);
    if (li && key) { if (!Array.isArray(meta[key])) meta[key] = []; meta[key].push(unq(li[1])); continue; }
    const kv = raw.match(/^([^\s:][^:]*?)\s*:\s*(.*)$/);
    if (!kv) continue;
    key = norm(kv[1]).replace(/[\s-]+/g, '_');
    const v = kv[2].trim();
    if (v === '') meta[key] = [];
    else if (v.startsWith('[')) meta[key] = v.replace(/^\[|\]$/g, '').split(',').map(x => unq(x)).filter(Boolean);
    else meta[key] = unq(v);
  }
  return { meta, body: text.slice(m[0].length) };
}

const CUSTOM = /^```[ \t]*(formula|formulas|flashcards|tarjetas|quiz|test|autoevaluacion)[ \t]*\n([\s\S]*?)\n```[ \t]*$/gim;
const blkType = k => /^formula/i.test(k) ? 'formula' : /^(flash|tarj)/i.test(k) ? 'cards' : 'quiz';
const MATH_RE = /\$\$([\s\S]+?)\$\$|(?<![\\$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g;
const stripMd = t => t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`~]/g, '').trim();

function prepare(body) {
  const blocks = [], codes = [], math = [];
  let t = body.replace(CUSTOM, (m, kind, raw) => { blocks.push({ type: blkType(kind), raw }); return `\n\nRVBLK${blocks.length - 1}X\n\n`; });
  t = t.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)/g, m => `RVCODE${codes.push(m) - 1}X`);
  const heads = [];
  t.replace(/^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/gm, (m, h, tx, off) => { heads.push({ off, text: stripMd(tx) }); return m; });
  const headAt = off => { let r = ''; for (const h of heads) { if (h.off <= off) r = h.text; else break; } return r; };
  blocks.forEach((b, j) => { b.head = headAt(t.indexOf('RVBLK' + j + 'X')); });
  t = t.replace(MATH_RE, (m, d, i, off) => { math.push({ tex: (d != null ? d : i).trim(), display: d != null, head: headAt(off) }); return `RVMATH${math.length - 1}X`; });
  t = t.replace(/RVCODE(\d+)X/g, (_, i) => codes[i]);
  return { src: t, blocks, math };
}

function parseVar(s) {
  const m = s.match(/^([^:=]+?)\s*[:=]\s*(.*)$/);
  const sym = (m ? m[1] : s).trim().replace(/^\$|\$$/g, ''); let d = m ? m[2].trim() : '', unit = '';
  let u = d.match(/\s*\[([^\]]*)\]\s*$/);
  if (!u) { const p = d.match(/\s*\(([^()\s]{1,10})\)\s*$/); if (p) u = p; }
  if (u) { unit = u[1].trim(); d = d.slice(0, u.index).trim(); }
  return { sym, desc: d, unit };
}
function parseFormula(raw) {
  const o = { vars: [] }; let key = null;
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const m = !/^\s/.test(line) && line.match(/^([^\s:]+)\s*:\s*(.*)$/);
    if (m) {
      key = norm(m[1]); const v = m[2].trim();
      if (key === 'variables' || key === 'vars') { if (v) o.vars.push(parseVar(v)); } else o[key] = v;
      continue;
    }
    if (key === 'variables' || key === 'vars') { const v = line.replace(/^\s*[-*]\s*/, '').trim(); if (v) o.vars.push(parseVar(v)); }
    else if (key) o[key] = (o[key] || '') + (key === 'tex' || key === 'formula' ? '\n' : ' ') + line.trim();
  }
  return { name: o.nombre || o.name || '', tex: (o.tex || o.formula || o.ecuacion || '').trim(), vars: o.vars, hyp: o.hipotesis || o.supuestos || '', note: o.nota || '' };
}
function parseCards(raw) {
  const out = [];
  for (const line of raw.split('\n')) {
    const i = line.indexOf('::');
    if (i > 0) out.push({ q: line.slice(0, i).trim(), a: line.slice(i + 2).trim() });
    else if (/^\s+\S/.test(line) && out.length) out[out.length - 1].a += '\n' + line.trim();
  }
  return out.filter(c => c.q && c.a);
}
function parseQuiz(raw) {
  return raw.split(/\n\s*\n/).map(g => {
    const q = { q: '', opts: [], ok: [], exp: '' }; let mode = 'q';
    for (const line of g.split('\n')) {
      const o = line.match(/^\s*[-*]\s*\[( |x|X)\]\s*(.*)$/);
      const e = line.match(/^\s*(?:explicaci[oó]n|explanation|porque|por qu[eé])\s*:\s*(.*)$/i);
      if (o) { q.opts.push(o[2].trim()); if (o[1].toLowerCase() === 'x') q.ok.push(q.opts.length - 1); mode = 'o'; }
      else if (e) { q.exp = e[1].trim(); mode = 'e'; }
      else if (!line.trim()) continue;
      else if (mode === 'q') q.q += (q.q ? ' ' : '') + line.trim();
      else if (mode === 'e') q.exp += ' ' + line.trim();
    }
    return q;
  }).filter(q => q.q && q.opts.length >= 2 && q.ok.length >= 1);
}

const GREEK_NAMES = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'theta', 'vartheta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'varphi', 'chi', 'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Phi', 'Psi', 'Omega'];
function texVars(tex) {
  let s = tex.replace(/\\(?:text|mathrm|operatorname|mathbf|textbf|mbox)\{[^}]*\}/g, ' ');
  const out = new Set();
  s = s.replace(/\\([A-Za-z]+)/g, (m, c) => { if (GREEK_NAMES.includes(c)) out.add('\\' + c); return ' '; });
  for (const ch of s.replace(/[^A-Za-z]/g, '')) out.add(ch);
  return [...out];
}

const typeOf = f => {
  if (f.meta.tipo) return cap(String(f.meta.tipo));
  const n = norm(f.sub + ' ' + f.name);
  if (/teor/.test(n)) return 'Teoría';
  if (/prac|labor/.test(n)) return 'Práctica';
  if (/ejerc|problem/.test(n)) return 'Ejercicios';
  if (/formul/.test(n)) return 'Formulario';
  return '';
};
const diffOf = v => {
  if (v == null || v === '') return 0;
  const n = parseInt(v, 10); if (!isNaN(n)) return Math.max(1, Math.min(3, n));
  const w = norm(v); return /fac|baj|sencill/.test(w) ? 1 : /med/.test(w) ? 2 : /dif|alt/.test(w) ? 3 : 0;
};
const DIFF = ['', 'Fácil', 'Media', 'Difícil'];

function derive(f) {
  const { meta, body } = parseFM(f.text);
  f.meta = meta; f.body = body; f.derived = true; f.nbody = norm(body);
  if (meta.titulo) f.title = String(meta.titulo);
  f.tags = toList(meta.tags != null ? meta.tags : meta.etiquetas != null ? meta.etiquetas : meta.keywords);
  f.type = typeOf(f); f.diff = diffOf(meta.dificultad);
  f.topic = String(meta.tema || f.sub || '');
  f.order = meta.orden != null && meta.orden !== '' && !isNaN(+meta.orden) ? +meta.orden : null;
  f.P = prepare(body);
  f.cards = []; f.quiz = []; f.forms = [];
  f.P.blocks.forEach((b, j) => {
    if (b.type === 'formula') { b.parsed = parseFormula(b.raw); if (b.parsed.tex) f.forms.push({ kind: 'block', tex: b.parsed.tex, name: b.parsed.name, vars: b.parsed.vars, hyp: b.parsed.hyp, note: b.parsed.note, head: b.head, ref: { b: j } }); }
    else if (b.type === 'cards') { b.parsed = parseCards(b.raw); b.parsed.forEach((c, i) => f.cards.push({ id: 'd:' + hash(f.path + '|' + c.q), q: c.q, a: c.a, subj: f.subj, path: f.path, user: false })); }
    else { b.parsed = parseQuiz(b.raw); b.parsed.forEach(q => f.quiz.push(Object.assign({ path: f.path, subj: f.subj }, q))); }
  });
  f.P.math.forEach((m, i) => { if (m.display) f.forms.push({ kind: 'display', tex: m.tex, name: '', vars: [], hyp: '', head: m.head, ref: { m: i } }); });
  f.words = body.split(/\s+/).filter(Boolean).length;
}

/* ---------- Carga del repositorio ---------- */
async function fetchTree() {
  try {
    const r = await fetch(`https://api.github.com/repos/${CFG.owner}/${CFG.repo}/git/trees/${CFG.branch}?recursive=1`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    return j.tree.filter(x => x.type === 'blob').map(x => x.path);
  } catch (e) {
    // Plan B si GitHub limita las peticiones: índice del CDN jsDelivr
    try {
      const r = await fetch(`https://data.jsdelivr.com/v1/package/gh/${CFG.owner}/${CFG.repo}@${CFG.branch}/flat`);
      if (!r.ok) throw e;
      const j = await r.json();
      return j.files.map(f => f.name.replace(/^\//, ''));
    } catch (e2) {
      // Plan C: índice generado por la acción de GitHub (index.json)
      const r = await fetch(rawUrl('index.json')); if (!r.ok) throw e;
      const j = await r.json(); if (!j || !j.files) throw e;
      return Object.keys(j.files);
    }
  }
}
async function loadTree() {
  const key = 'rv-tree-v1', ttl = 3 * 60e3;
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(key)); } catch {}
  if (cached && Date.now() - cached.t < ttl) return cached.tree;
  try {
    const tree = await fetchTree();
    try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), tree })); } catch {}
    return tree;
  } catch (e) { if (cached) return cached.tree; throw e; }
}

function pickIcon(s, i) {
  if (CFG.iconos[s.key] && ICONS[CFG.iconos[s.key]]) return CFG.iconos[s.key];
  const n = norm(s.name || '');
  const rules = [[/red|comunic|telecom|distrib/, 'network'], [/senal|onda|radio/, 'wave'], [/electr|circuit|potencia/, 'bolt'], [/program|algor|softw|informat|compil/, 'code'], [/fisic|mecan|optica/, 'atom'], [/quim|laborat/, 'flask'], [/mate|calcul|algebra|estad|probab|optimiz/, 'sigma'], [/segur|crip/, 'shield'], [/hardware|arquitect|comput|digital/, 'cpu']];
  for (const [re, ic] of rules) if (re.test(n)) return ic;
  return SUBJECT_ICONS[i % SUBJECT_ICONS.length];
}

function setSubjects(list) {
  S.subjects = list.map((s, i) => ({ ...s, name: CFG.nombres[s.key] || s.name || '', idx: i, color: `var(--sub${i % 7})` }));
  S.subjects.forEach((s, i) => { s.icon = pickIcon(s, i); });
  S.byPath.clear(); S.bySubj.clear();
  for (const s of S.subjects) {
    S.bySubj.set(s.key, s);
    for (const f of s.files) { f.s = s; S.byPath.set(f.path, f); }
  }
}
function build(paths) {
  const map = new Map();
  for (const p of paths) {
    if (!/\.(md|markdown)$/i.test(p)) continue;
    const parts = p.split('/');
    if (parts.length < 2 || parts[0].startsWith('.') || /^readme\.(md|markdown)$/i.test(parts[parts.length - 1])) continue;
    const key = parts[0], name = parts[parts.length - 1];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push({ path: p, subj: key, sub: parts.slice(1, -1).join(' / '), name, title: prettify(name), meta: {}, tags: [], type: '', diff: 0, topic: parts.slice(1, -1).join(' / '), order: null, cards: [], quiz: [], forms: [] });
  }
  const keys = [...new Set([...CFG.orden, ...map.keys()])].filter(k => map.has(k) || CFG.orden.includes(k));
  setSubjects(keys.map(k => ({ key: k, files: (map.get(k) || []).sort(docSort) })));
}
const docSort = (a, b) => cmp(a.sub, b.sub) || ((a.order ?? 1e9) - (b.order ?? 1e9)) || cmp(a.name, b.name);

async function ensureText(f) {
  if (f.text == null) {
    try { const r = await fetch(rawUrl(f.path)); if (r.ok) f.text = await r.text(); else f.err = 'HTTP ' + r.status; }
    catch (e) { f.err = String(e.message || e); }
  }
  if (f.text != null && !f.derived) derive(f);
  return f;
}
async function loadBundle() {
  try {
    const r = await fetch(rawUrl('index.json')); if (!r.ok) return;
    const j = await r.json(); if (!j || !j.files) return;
    for (const f of allDocs()) if (f.text == null && typeof j.files[f.path] === 'string') { f.text = j.files[f.path]; f.fb = true; }
  } catch {}
}
async function startIndex() {
  if (IDX.started) return; IDX.started = true;
  await loadBundle();
  const files = allDocs(); IDX.total = files.length; let i = 0;
  const worker = async () => { while (i < files.length) { await ensureText(files[i++]); IDX.done++; } };
  Promise.all(Array.from({ length: 6 }, worker)).then(finishIndex);
}
function resolveRef(str, f) {
  const key = norm(str).replace(/\.(md|markdown)$/, '').trim();
  const c = S.refs.get(key) || [];
  return c.find(d => d.subj === f.subj && d !== f) || c.find(d => d !== f) || null;
}
function finishIndex() {
  for (const s of S.subjects) {
    s.files.sort(docSort);
    if (!s.name) { const d = s.files.find(x => x.meta && x.meta.asignatura); if (d) s.name = String(d.meta.asignatura); }
  }
  S.subjects.forEach((s, i) => { s.icon = pickIcon(s, i); const d = s.files.find(x => x.meta && x.meta.icono); if (d && ICONS[d.meta.icono]) s.icon = d.meta.icono; });
  S.refs = new Map();
  for (const d of allDocs()) {
    const keys = new Set([d.path, d.path.replace(/\.(md|markdown)$/i, ''), d.name.replace(/\.(md|markdown)$/i, ''), d.title, prettify(d.name)].map(x => norm(x)));
    for (const k of keys) { if (!S.refs.has(k)) S.refs.set(k, []); S.refs.get(k).push(d); }
  }
  for (const d of allDocs()) {
    d.preDocs = toList(d.meta.prerrequisitos != null ? d.meta.prerrequisitos : d.meta.prerequisitos != null ? d.meta.prerequisitos : d.meta.requisitos).map(x => resolveRef(x, d)).filter(Boolean);
    d.relDocs = toList(d.meta.relacionados).map(x => resolveRef(x, d)).filter(Boolean);
  }
  S.docCards = allDocs().flatMap(d => d.cards);
  S.mathIdx = [];
  for (const d of allDocs()) {
    (d.P ? d.P.math : []).forEach((m, i) => S.mathIdx.push({ f: d, tex: m.tex, nt: normTex(m.tex), display: m.display, head: m.head, ref: { m: i } }));
    d.forms.filter(x => x.kind === 'block').forEach(x => S.mathIdx.push({ f: d, tex: x.tex, nt: normTex(x.tex), display: true, head: x.head, ref: x.ref, name: x.name }));
  }
  IDX.ready = true;
  document.dispatchEvent(new Event('rv-indexed'));
}
const allCards = () => (S.docCards || []).concat(store.get(K.uc, []).map(c => ({ id: 'u:' + c.id, q: c.q, a: c.a, subj: c.subj || '', path: c.path || null, user: true, uid: c.id })));
const allQuiz = () => allDocs().flatMap(d => d.quiz || []);

/* ---------- Búsqueda matemática: normalización de expresiones ---------- */
const GREEK_U = { 'α': 'alpha', 'β': 'beta', 'γ': 'gamma', 'δ': 'delta', 'ε': 'epsilon', 'ζ': 'zeta', 'η': 'eta', 'θ': 'theta', 'ι': 'iota', 'κ': 'kappa', 'λ': 'lambda', 'μ': 'mu', 'ν': 'nu', 'ξ': 'xi', 'π': 'pi', 'ρ': 'rho', 'σ': 'sigma', 'τ': 'tau', 'υ': 'upsilon', 'φ': 'phi', 'χ': 'chi', 'ψ': 'psi', 'ω': 'omega', 'Γ': 'Gamma', 'Δ': 'Delta', 'Θ': 'Theta', 'Λ': 'Lambda', 'Ξ': 'Xi', 'Π': 'Pi', 'Σ': 'Sigma', 'Φ': 'Phi', 'Ψ': 'Psi', 'Ω': 'Omega' };
const SYM_U = { '∑': '\\sum', '∫': '\\int', '√': '\\sqrt', '∞': '\\infty', '≤': '\\leq', '≥': '\\geq', '≠': '\\neq', '≈': '\\approx', '±': '\\pm', '×': '\\times', '·': '\\cdot', '→': '\\to', '∂': '\\partial', '∇': '\\nabla', '∈': '\\in', '∀': '\\forall', '∃': '\\exists', '∅': '\\emptyset', '∪': '\\cup', '∩': '\\cap', '⊂': '\\subset', '≡': '\\equiv', '∝': '\\propto', '−': '-', '∏': '\\prod' };
const WORD_U = { integral: '\\int', suma: '\\sum', sumatorio: '\\sum', raiz: '\\sqrt', fraccion: '\\frac', limite: '\\lim', producto: '\\prod', infinito: '\\infty', derivada: '\\partial', gradiente: '\\nabla' };
function normTex(s) {
  s = String(s).replace(/^\s*\$+|\$+\s*$/g, '');
  s = norm(s) === s.toLowerCase() ? s : s;                      // (la normalización de tildes no se aplica a TeX)
  for (const [k, v] of Object.entries(GREEK_U)) s = s.split(k).join('\\' + v + ' ');
  for (const [k, v] of Object.entries(SYM_U)) s = s.split(k).join(v + ' ');
  s = s.replace(/\b(integral|suma|sumatorio|raiz|fraccion|limite|producto|infinito|derivada|gradiente)\b/gi, m => WORD_U[norm(m)] + ' ');
  s = s.replace(/\\(?:left|right|bigl|bigr|Bigl|Bigr|big|Big|displaystyle|quad|qquad)(?![A-Za-z])/g, '').replace(/\\[,;:! ]/g, '');
  s = s.replace(/\\(?:dfrac|tfrac)(?![A-Za-z])/g, '\\frac').replace(/\\le(?![A-Za-z])/g, '\\leq').replace(/\\ge(?![A-Za-z])/g, '\\geq').replace(/\\ne(?![A-Za-z])/g, '\\neq');
  return s.replace(/[{}\s]/g, '');
}
const looksMath = q => /[\\^_=<>≤≥≠∑∫√π∞∂∇±≈∈∀∃→×·∏]|\$|[α-ωΑ-Ω]/.test(q);
