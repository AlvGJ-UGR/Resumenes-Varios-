/* ============ Rutas, paleta de comandos, atajos y arranque ============ */
const TOOLVIEWS = { biblioteca: libraryView, favoritos: favView, historial: histView, tarjetas: cardsView, quiz: quizView, formulas: formulasView, mapas: mapsView, examenes: examsView, tareas: tasksView, calendario: calView, estadisticas: statsView, ajustes: settingsView, ayuda: helpView };
const go = h => { if (location.hash === h) route(); else location.hash = h; };
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const isMobile = () => { try { return matchMedia('(max-width:1000px)').matches; } catch { return false; } };

function notFound() { S.view = 'none'; S.cur = null; V(`<div class="empty">${ico('help')}<b>No se encontró esa página.</b><span><a href="#/">Volver al inicio</a></span></div>`); }
function route(opts = {}) {
  const keep = !!opts.keep;
  if (keep && S.view === 'session') { if (SESS) renderSession(); else if (QZ) renderQuiz(); return; }
  S.tok++; S.fresh = !keep; S.posKey = null; spy = null;
  if (!keep) { if (SESS) endSession(); QZ = null; closeOverlay(); document.body.classList.remove('open'); }
  const raw = location.hash.replace(/^#\/?/, ''), qi = raw.indexOf('?');
  let p = '';
  try { p = decodeURIComponent(qi >= 0 ? raw.slice(0, qi) : raw); } catch {}
  const q = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '');
  if (!p) homeView();
  else if (p.startsWith('_/')) { const fn = TOOLVIEWS[p.slice(2)]; if (fn) fn(q); else notFound(); }
  else if (S.byPath.has(p)) docView(S.byPath.get(p), q.get('s'));
  else if (S.bySubj.has(p)) subjectView(S.bySubj.get(p));
  else notFound();
  renderSide(); syncMenuBtn();
  if (S.view !== 'doc' && S.fresh) window.scrollTo(0, 0);
  updateProgress(); afterRoute();
}
function rerender() {
  const y = scrollY;
  if (S.view === 'doc') savePos();
  S.noAnim = true; route({ keep: true }); S.noAnim = false;
  if (S.view !== 'doc') requestAnimationFrame(() => window.scrollTo(0, y));
}

/* ---------- Progreso de lectura, volver arriba, posición ---------- */
const prog = $('#prog'), upBtn = $('#up');
function updateProgress() {
  upBtn.classList.toggle('show', scrollY > 600);
  if (!$('#md')) { prog.style.width = '0'; return; }
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
  if (spy) {
    let cur = null;
    for (const [h, a] of spy) { if (h.getBoundingClientRect().top <= 110) cur = a; else break; }
    for (const [, a] of spy) a.classList.toggle('act', a === cur);
  }
}
function savePos() {
  const cur = S.posKey; if (!cur || !$('#md')) return;
  const max = document.documentElement.scrollHeight - innerHeight, m = store.get(K.pos, {});
  if (max > 0 && scrollY > 200 && scrollY < max * 0.95) m[cur] = Math.round(scrollY); else delete m[cur];
  const keys = Object.keys(m); if (keys.length > 60) delete m[keys[0]];
  store.set(K.pos, m);
}
let posT;
addEventListener('scroll', () => { updateProgress(); clearTimeout(posT); posT = setTimeout(savePos, 300); }, { passive: true });

/* ---------- Índice lateral ---------- */
function syncMenuBtn() {
  const b = $('#menuBtn'); if (!b) return;
  const hidden = isMobile() ? !document.body.classList.contains('open') : document.body.classList.contains('noside');
  b.setAttribute('aria-expanded', String(!hidden)); b.title = hidden ? 'Mostrar índice' : 'Ocultar índice'; b.setAttribute('aria-label', b.title);
}
function toggleSide() {
  if (isMobile()) document.body.classList.toggle('open');
  else { const on = document.body.classList.toggle('noside'); store.set('rv-noside', on ? 1 : 0); }
  syncMenuBtn();
}

/* ---------- Paleta de comandos (Ctrl+K) ---------- */
let palSel = 0, palItems = [];
const palOpen = () => !!$('.pal');
function paletteData() {
  const it = [];
  TOOLS.forEach(t => it.push({ k: 'Ir a', icon: t.icon, label: t.label, keys: t.short, run: () => go(toolUrl(t.id)) }));
  it.push({ k: 'Acción', icon: 'timer', label: 'Pomodoro: abrir temporizador', keys: 'pomodoro temporizador estudio', run: () => togglePomo(true) });
  it.push({ k: 'Acción', icon: 'eye', label: 'Modo enfoque (lectura)', keys: 'enfoque lectura concentracion', run: () => { if (S.view === 'doc') toggleFocus(); else toast('Abre un resumen para usar el modo enfoque'); } });
  it.push({ k: 'Acción', icon: 'pdf', label: 'Exportar resúmenes a PDF', keys: 'pdf imprimir exportar', run: () => pdfModal('') });
  it.push({ k: 'Acción', icon: 'cloud', label: 'Sincronizar datos ahora', keys: 'sincronizar nube gist', run: () => syncNow(true) });
  S.subjects.forEach(s => it.push({ k: 'Asignatura', icon: s.icon, label: s.key + (s.name ? ' · ' + s.name : ''), keys: s.key + ' ' + s.name, color: s.color, run: () => go('#/' + encodeURIComponent(s.key)) }));
  allDocs().forEach(f => it.push({ k: f.subj, icon: 'book', label: f.title, keys: [f.subj, f.type, f.tags.join(' '), f.sub].join(' '), color: f.s.color, dot: getSt(f), doc: f, run: () => go(href(f.path)) }));
  [['Cambiar tema claro / oscuro', 'sun', toggleTheme], ['Mostrar u ocultar el índice', 'panel', toggleSide], ['Nueva tarea', 'plus', () => { go(toolUrl('tareas')); setTimeout(() => { const i = $('#tq input'); if (i) i.focus(); }, 150); }], ['Nuevo examen', 'target', () => examForm(null)], ['Nueva tarjeta de memoria', 'cards', () => cardForm(null)], ['Estudiar tarjetas pendientes', 'play', () => go(toolUrl('tarjetas', 'go=1'))], ['Exportar copia de seguridad', 'download', () => ACT.export()]].forEach(([l, i, r]) => it.push({ k: 'Acción', icon: i, label: l, keys: l, run: r, action: true }));
  return it;
}
function palScore(item, nq) {
  const L = norm(item.label), hay = norm(item.keys + ' ' + item.label);
  if (L === nq) return 100; if (L.startsWith(nq)) return 80; if (L.includes(nq)) return 60; if (hay.includes(nq)) return 40;
  const ts = nq.split(/\s+/).filter(Boolean); if (ts.length > 1 && ts.every(t => hay.includes(t))) return 30;
  if (nq.length >= 2) { let i = 0; for (const ch of L) if (ch === nq[i]) i++; if (i === nq.length) return 10; }
  return 0;
}
function palFilter(q) {
  q = q.trim();
  const all = paletteData();
  if (!q) {
    const rec = store.get(K.hist, []).map(h => S.byPath.get(h.p)).filter(Boolean).slice(0, 5).map(f => all.find(i => i.doc === f)).filter(Boolean);
    return [...rec.map(i => ({ ...i, k: 'Reciente' })), ...all.filter(i => i.k === 'Ir a'), ...all.filter(i => i.action)];
  }
  let out;
  if (q[0] === '>') { const n = norm(q.slice(1).trim()); out = all.filter(i => i.action && (!n || palScore(i, n))); }
  else if (q[0] === '#') { const n = norm(q.slice(1)); out = all.filter(i => i.doc && i.doc.tags.some(t => norm(t).includes(n))); }
  else { const n = norm(q); out = all.map(i => [i, palScore(i, n)]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).map(x => x[0]); }
  const extra = [{ k: 'Buscar', icon: 'search', label: `Buscar «${q}» en el contenido`, run: () => { $('#q').value = q; runSearch(); } }];
  if (looksMath(q)) extra.unshift({ k: 'Buscar', icon: 'sigma', label: `Buscar fórmula «${q}»`, run: () => { $('#q').value = 'f:' + q; runSearch(); } });
  return [...out.slice(0, 40), ...extra];
}
function palRender() {
  const ul = $('#pall'); if (!ul) return;
  ul.innerHTML = palItems.length ? palItems.map((i, n) => `<li role="option" class="pi${n === palSel ? ' on' : ''}" data-i="${n}"${i.color ? ` style="--c:${i.color}"` : ''}><span class="pi-i">${ico(i.icon)}</span><span class="pi-l">${esc(i.label)}</span>${i.dot ? `<span class="dot ${i.dot}"></span>` : ''}<small>${esc(i.k)}</small></li>`).join('') : '<li class="pi none">Sin resultados</li>';
  const on = $('.pi.on', ul); if (on) on.scrollIntoView({ block: 'nearest' });
}
function openPalette() {
  closeOverlay();
  const ov = document.createElement('div'); ov.className = 'ov pal';
  ov.innerHTML = `<div class="palc" role="dialog" aria-modal="true" aria-label="Paleta de comandos"><div class="pal-i">${ico('search')}<input id="pali" placeholder="Busca un resumen, una herramienta o una acción…  (> acciones · # etiquetas)" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div><ul id="pall" role="listbox"></ul><div class="pal-f"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>Esc</kbd> cerrar</span></div></div>`;
  document.body.append(ov);
  const inp = $('#pali'); palSel = 0; palItems = palFilter(''); palRender(); inp.focus();
  const run = n => { const it = palItems[n]; if (!it) return; ov.remove(); it.run(); };
  inp.addEventListener('input', () => { palItems = palFilter(inp.value); palSel = 0; palRender(); });
  inp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); palSel = Math.min(palItems.length - 1, palSel + 1); palRender(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); palSel = Math.max(0, palSel - 1); palRender(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(palSel); }
  });
  $('#pall').addEventListener('click', e => { const li = e.target.closest('.pi[data-i]'); if (li) run(+li.dataset.i); });
  ov.addEventListener('mousedown', e => { if (e.target === ov) ov.remove(); });
}
const togglePalette = () => { if (palOpen()) $('.pal').remove(); else openPalette(); };

/* ---------- Eventos globales ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const fn = ACT[el.dataset.act]; if (fn) fn(el, e);
});
document.addEventListener('input', e => {
  if (S.view === 'tool:biblioteca') onLibInput(e);
  else if (S.view === 'tool:formulas') onFormInput(e);
  else if (S.view === 'tool:tarjetas' || S.view === 'tool:quiz') onScopeInput(e);
  else if (S.view === 'tool:mapas') onMapInput(e);
  if (e.target.dataset && e.target.dataset.actInput === 'fs') { setFs(+e.target.value); const v = $('#fsv'); if (v) v.textContent = fs + 'px'; }
});
document.addEventListener('submit', onTaskSubmit);
document.addEventListener('change', onImport);
addEventListener('hashchange', () => { $('#q').value = ''; route(); });
addEventListener('resize', syncMenuBtn);
document.addEventListener('rv-indexed', () => {
  renderSide();
  if (S.view === 'doc') { fillRelated(); return; }
  if (S.view === 'session' || (typing() && S.view !== 'search')) return;
  const q = $('#q').value.trim();
  if (S.view === 'search' && q) searchView(q); else rerender();
});
try { matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { if (themePref === 'auto') { applyTheme(); rerender(); } }); } catch {}

document.addEventListener('keydown', e => {
  const k = e.key;
  if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === 'k') { e.preventDefault(); togglePalette(); return; }
  if (k === 'Escape') {
    if (palOpen()) $('.pal').remove(); else if ($('.ov')) closeOverlay();
    else if (document.activeElement === $('#q')) { $('#q').value = ''; $('#q').blur(); route(); }
    return;
  }
  if ($('.ov') || typing() || e.ctrlKey || e.metaKey || e.altKey) return;
  const btn = document.activeElement && document.activeElement.tagName === 'BUTTON';
  if (k === '/') { e.preventDefault(); $('#q').focus(); return; }
  if (k.toLowerCase() === 'b') { toggleSide(); return; }
  if (S.view === 'session') {
    if (SESS) {
      if ((k === ' ' || k === 'Enter') && !btn) { e.preventDefault(); if (!SESS.show) ACT['sess-show'](); }
      else if (/^[1-4]$/.test(k) && SESS.show) ACT.rate({ dataset: { r: String(+k - 1) } });
    } else if (QZ) {
      if (k === 'Enter' && QZ.answered && !btn) ACT['quiz-next']();
      else if (/^[1-9]$/.test(k) && !QZ.answered) { const o = $$('.qo')[+k - 1]; if (o) o.click(); }
    }
    return;
  }
  if (S.view === 'doc' && !e.shiftKey && (k === 'ArrowLeft' || k === 'ArrowRight')) {
    const a = $(k === 'ArrowRight' ? '.pn a.nx' : '.pn a:not(.nx)');
    if (a) { e.preventDefault(); location.hash = a.getAttribute('href'); }
  }
});

/* ---------- Arranque ---------- */
async function boot() {
  $('#sprite').innerHTML = Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('');
  applyTheme();
  document.documentElement.style.setProperty('--fs', fs + 'px');
  extraInit();
  if (store.get('rv-noside', 0) === 1) document.body.classList.add('noside');
  $('#siteTitle').textContent = CFG.titulo; $('#ghTop').href = REPO; document.title = CFG.titulo;
  $('#menuBtn').onclick = toggleSide; $('#scrim').onclick = () => { document.body.classList.remove('open'); syncMenuBtn(); };
  $('#themeBtn').onclick = toggleTheme; $('#cmdBtn').onclick = openPalette; upBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  $('#q').addEventListener('input', debounce(runSearch, 150));
  V('<div class="loading">Cargando resúmenes…</div>');
  try { build(await loadTree()); } catch (e) { S.offline = true; setSubjects(CFG.orden.map(k => ({ key: k, files: [] }))); }
  renderSide(); route();
  if (!S.offline) startIndex();
}
document.addEventListener('DOMContentLoaded', boot);
