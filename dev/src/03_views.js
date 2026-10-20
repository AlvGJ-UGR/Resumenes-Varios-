/* ============ Vistas principales ============ */
const TOOLS = [
  { id: 'inicio', label: 'Inicio', short: 'Inicio', icon: 'home' },
  { id: 'biblioteca', label: 'Biblioteca', short: 'Biblioteca', icon: 'library' },
  { id: 'favoritos', label: 'Favoritos', short: 'Favoritos', icon: 'star' },
  { id: 'historial', label: 'Recientes', short: 'Recientes', icon: 'clock' },
  { id: 'tarjetas', label: 'Tarjetas de memoria', short: 'Tarjetas', icon: 'cards', badge: 'cards' },
  { id: 'quiz', label: 'Autoevaluación', short: 'Quiz', icon: 'quiz' },
  { id: 'formulas', label: 'Biblioteca de fórmulas', short: 'Fórmulas', icon: 'sigma' },
  { id: 'mapas', label: 'Mapas conceptuales', short: 'Mapas', icon: 'map' },
  { id: 'examenes', label: 'Planificador de exámenes', short: 'Exámenes', icon: 'target' },
  { id: 'tareas', label: 'Lista de tareas', short: 'Tareas', icon: 'tasks', badge: 'tasks' },
  { id: 'calendario', label: 'Calendario de repasos', short: 'Calendario', icon: 'calendar', badge: 'rev' },
  { id: 'estadisticas', label: 'Estadísticas de estudio', short: 'Estadísticas', icon: 'chart' },
  { id: 'ayuda', label: 'Ayuda y formato de los resúmenes', short: 'Ayuda', icon: 'help' },
  { id: 'ajustes', label: 'Ajustes y copia de seguridad', short: 'Ajustes', icon: 'settings' }
];
const toolUrl = id => id === 'inicio' ? '#/' : toolHref(id);

function V(html, cls = '') {
  const m = $('#main');
  m.innerHTML = `<div class="view${S.noAnim ? ' na' : ''}${cls ? ' ' + cls : ''}">${html}</div>`;
  return m.firstElementChild;
}
const ago = t => { const m = Math.round((Date.now() - t) / 6e4); return m < 1 ? 'ahora' : m < 60 ? `hace ${m} min` : m < 1440 ? `hace ${Math.round(m / 60)} h` : `hace ${Math.round(m / 1440)} d`; };

/* ---------- Piezas reutilizables ---------- */
const subjBadge = f => `<span class="bd sb" style="--c:${f.s.color}">${ico(f.s.icon)}${esc(f.subj)}</span>`;
const typeBadge = f => f.type ? `<span class="bd">${esc(f.type)}</span>` : '';
const diffBadge = f => f.diff ? `<span class="bd df d${f.diff}" title="Dificultad: ${DIFF[f.diff]}">${'●'.repeat(f.diff)}${'○'.repeat(3 - f.diff)} ${DIFF[f.diff]}</span>` : '';
function docRow(f, { sn = '', showSubj = true } = {}) {
  const st = getSt(f);
  return `<div class="dr" style="--c:${f.s.color}"><button class="dot-b" data-act="cycle" data-p="${esc(f.path)}" title="Estado: ${stLabel(st)} (clic para cambiar)" aria-label="Estado: ${stLabel(st)}"><span class="dot ${st}"></span></button><a class="dr-a" href="${href(f.path)}"${sn ? ` data-act="open" data-hl='${esc(JSON.stringify(sn.hl || []))}'` : ''}><span class="dr-t">${esc(f.title)}</span><span class="dr-m">${showSubj ? subjBadge(f) : ''}${typeBadge(f)}${diffBadge(f)}${f.sub && !f.type ? `<span class="bd">${esc(f.sub)}</span>` : ''}${f.tags.slice(0, 3).map(t => `<span class="bd tg">#${esc(t)}</span>`).join('')}</span>${sn ? `<span class="sn">${sn.html}</span>` : ''}</a>${isFavDoc(f.path) ? `<span class="dr-f" title="Favorito">${ico('star', 'fill')}</span>` : ''}</div>`;
}
const segBar = p => `<div class="seg">${['dom', 'repasar', 'curso', 'pend'].map(k => p.c[k] ? `<i class="${k}" style="flex:${p.c[k]}" title="${stLabel(k)}: ${p.c[k]}"></i>` : '').join('') || '<i class="pend" style="flex:1"></i>'}</div>`;
const emptyBox = (icon, t, d = '') => `<div class="empty">${ico(icon)}<b>${t}</b>${d ? `<span>${d}</span>` : ''}</div>`;

ACT.cycle = el => {
  const f = S.byPath.get(el.dataset.p); if (!f) return;
  const order = STATES.map(s => s[0]), n = order[(order.indexOf(getSt(f)) + 1) % order.length];
  setSt(f, n); toast(`${f.title}: ${stLabel(n)}`);
  rerender();
};
ACT.tag = el => { const q = $('#q'); q.value = `tag:${el.dataset.t.includes(' ') ? '"' + el.dataset.t + '"' : el.dataset.t}`; runSearch(); };
ACT.open = el => {
  try {
    if (el.dataset.hl) { const t = JSON.parse(el.dataset.hl); if (t.length) sessionStorage.setItem('rv-hl', JSON.stringify(t)); }
    if (el.dataset.jump) sessionStorage.setItem('rv-jump', el.dataset.jump);
  } catch {}
};

/* ---------- Barra lateral ---------- */
function badgeFor(t) {
  try {
    if (t.badge === 'cards') return IDX.ready ? dueCards().length : 0;
    if (t.badge === 'tasks') return openTasks().length;
    if (t.badge === 'rev') return dueReviews().length;
  } catch {}
  return 0;
}
function docsList(s) {
  const m = new Map(); for (const f of s.files) { if (!m.has(f.sub)) m.set(f.sub, []); m.get(f.sub).push(f); }
  let h = '';
  for (const [sub, fs] of m) {
    if (sub) h += `<div class="grp">${esc(sub)}</div>`;
    h += fs.map(f => `<a class="sl${S.cur === f ? ' on' : ''}" href="${href(f.path)}" data-path="${esc(f.path)}"><span class="dot ${getSt(f)}"></span><span>${esc(f.title)}</span></a>`).join('');
  }
  return h;
}
function renderSide() {
  const side = $('#side'); if (!side) return;
  const open = new Set($$('details[open]', side).map(d => d.dataset.s)), sc = side.scrollTop;
  const tools = TOOLS.map(t => {
    const b = badgeFor(t), on = S.view === 'tool:' + t.id || (t.id === 'inicio' && S.view === 'home');
    return `<a class="ni${on ? ' on' : ''}" href="${toolUrl(t.id)}" title="${esc(t.label)}">${ico(t.icon)}<span>${t.short}</span>${b ? `<em>${b}</em>` : ''}</a>`;
  }).join('');
  const subs = S.subjects.map(s => {
    const p = progress(s.files);
    const isOpen = open.has(s.key) || (S.cur && S.cur.subj === s.key) || S.view === 'subject:' + s.key;
    return `<details class="sj" data-s="${esc(s.key)}" style="--c:${s.color}"${isOpen ? ' open' : ''}><summary><span class="sj-ic">${ico(s.icon)}</span><b>${esc(s.key)}</b><span class="sj-n">${esc(s.name)}</span><em>${p.pct}%</em></summary><div class="sj-bar"><i style="width:${p.pct}%"></i></div><div class="sjl">${docsList(s)}<a class="sj-all" href="#/${encodeURIComponent(s.key)}">Ver asignatura ${ico('chev')}</a></div></details>`;
  }).join('');
  side.innerHTML = `<div class="tg2">${tools}</div><div class="sidehead">Asignaturas</div>${subs || '<p class="muted pad">Sin asignaturas</p>'}`;
  side.scrollTop = sc;
  const on = $('a.sl.on', side);
  if (on) { const top = on.offsetTop; if (top < side.scrollTop + 60 || top > side.scrollTop + side.clientHeight - 80) side.scrollTop = Math.max(0, top - side.clientHeight / 3); }
}

/* ---------- Portada ---------- */
function homeView() {
  S.view = 'home'; S.cur = null; document.title = CFG.titulo;
  const docs = allDocs(), pr = progress(docs);
  const hist = store.get(K.hist, []).map(h => S.byPath.get(h.p)).filter(Boolean);
  const fv = favs().docs.map(p => S.byPath.get(p)).filter(Boolean);
  const last = hist[0], ex = nextExam(), dr = dueReviews().length, dc = IDX.ready ? dueCards().length : 0, tk = openTasks().length;
  const kp = (href, icon, small, b, i = '', c = '') => `<a class="kp" href="${href}"${c ? ` style="--c:${c}"` : ''}><span class="kp-i">${ico(icon)}</span><span class="kp-t"><small>${small}</small><b>${b}</b>${i ? `<i>${i}</i>` : ''}</span></a>`;
  const panels = [
    last ? kp(href(last.path), 'play', 'Continuar', esc(last.title), esc(last.subj), last.s.color) : kp(toolUrl('biblioteca'), 'library', 'Empezar', 'Explora la biblioteca'),
    ex ? kp(toolUrl('examenes'), 'target', 'Próximo examen', esc(ex.name), `${relDay(ex.date)} · ${fmtDate(ex.date)}`) : kp(toolUrl('examenes'), 'target', 'Exámenes', 'Planifica el primero'),
    kp(toolUrl('calendario'), 'calendar', 'Repasos pendientes', plural(dr, 'repaso', 'repasos'), dr ? 'hasta hoy' : 'al día'),
    kp(toolUrl('tarjetas'), 'cards', 'Tarjetas', IDX.ready ? plural(dc, 'pendiente', 'pendientes') : 'Indexando…', 'repetición espaciada'),
    kp(toolUrl('tareas'), 'tasks', 'Tareas', plural(tk, 'por hacer', 'por hacer')),
    kp(toolUrl('estadisticas'), 'flame', 'Objetivo semanal', weekSessions() + '/' + getGoal(), 'racha ' + calcStreak() + (calcStreak() === 1 ? ' día' : ' días'))
  ].join('');
  const cards = S.subjects.map(s => {
    const p = progress(s.files);
    const link = S.offline ? folderUrl(s.key) : '#/' + encodeURIComponent(s.key), ext = S.offline ? ' target="_blank" rel="noopener"' : '';
    return `<a class="sc" href="${link}"${ext} style="--c:${s.color}"><div class="sc-top"><span class="sc-ic">${ico(s.icon)}</span><span class="sc-code">${esc(s.key)}</span><span class="sc-pct">${p.pct}%</span></div><div class="sc-name">${esc(s.name) || '&nbsp;'}</div><div class="sc-meta">${S.offline ? 'Abrir carpeta en GitHub ↗' : `${plural(p.total, 'tema', 'temas')} · ${p.c.dom} dominados`}</div>${segBar(p)}</a>`;
  }).join('');
  const list = (arr, empty) => arr.length ? arr.slice(0, 6).map(f => docRow(f)).join('') : `<p class="muted pad">${empty}</p>`;
  V(`<section class="hero"><h1>${esc(CFG.titulo)}</h1><p>${S.offline ? 'No se ha podido leer el índice desde GitHub; usa los enlaces a las carpetas.' : `${plural(pr.total, 'tema', 'temas')} en ${plural(S.subjects.length, 'asignatura', 'asignaturas')} · <b>${pr.pct}%</b> dominado`}</p></section>
    <div class="kps">${panels}</div>
    <div class="sec-h"><h2>Asignaturas</h2><a href="${toolUrl('biblioteca')}">Ver todo ${ico('chev')}</a></div>
    <div class="cards">${cards}</div>
    <div class="two"><section class="pnl"><div class="sec-h"><h2>${ico('clock')} Recientes</h2><a href="${toolUrl('historial')}">Ver más</a></div>${list(hist, 'Aún no has abierto ningún resumen.')}</section>
    <section class="pnl"><div class="sec-h"><h2>${ico('star')} Favoritos</h2><a href="${toolUrl('favoritos')}">Ver más</a></div>${list(fv, 'Marca un resumen con ★ para verlo aquí.')}</section></div>
    <footer class="foot">Contenido sincronizado con <a href="${REPO}" target="_blank" rel="noopener">el repositorio de GitHub</a> · <a href="#/" data-act="refresh-list">Actualizar lista</a> · <a href="${toolUrl('ayuda')}">Cómo escribir los resúmenes</a></footer>`);
}
ACT['refresh-list'] = (el, e) => { e.preventDefault(); store.del('rv-tree-v1'); location.reload(); };

/* ---------- Asignatura ---------- */
function subjectView(s) {
  S.view = 'subject:' + s.key; S.cur = null; document.title = `${s.key} · ${CFG.titulo}`;
  const p = progress(s.files), m = new Map();
  for (const f of s.files) { if (!m.has(f.sub)) m.set(f.sub, []); m.get(f.sub).push(f); }
  const groups = [...m].map(([sub, fs]) => `${sub ? `<h3 class="lh">${esc(sub)}</h3>` : ''}<div class="dl">${fs.map(f => docRow(f, { showSubj: false })).join('')}</div>`).join('');
  const nCards = (S.docCards || []).filter(c => c.subj === s.key).length;
  V(`<nav class="crumbs"><a href="#/">Inicio</a> / ${esc(s.key)}</nav>
    <header class="shd" style="--c:${s.color}"><span class="sc-ic big">${ico(s.icon)}</span><div><h1 class="ph">${esc(s.key)}${s.name ? ` <small>${esc(s.name)}</small>` : ''}</h1><p class="sub">${plural(p.total, 'tema', 'temas')} · <b>${p.pct}%</b> dominado · <a href="${folderUrl(s.key)}" target="_blank" rel="noopener">carpeta en GitHub ↗</a></p></div></header>
    ${segBar(p)}<div class="legend">${STATES.map(([k, l]) => `<span><span class="dot ${k}"></span>${l} ${p.c[k]}</span>`).join('')}</div>
    <div class="dh-act"><button class="btn" data-act="pdf" data-s="${esc(s.key)}">${ico('pdf')} Exportar PDF</button><a class="btn" href="${toolUrl('biblioteca')}" data-act="lib-subj" data-s="${esc(s.key)}">${ico('filter')} Filtrar</a><a class="btn" href="${toolUrl('tarjetas', 'subj=' + encodeURIComponent(s.key))}">${ico('cards')} Tarjetas${nCards ? ' (' + nCards + ')' : ''}</a><a class="btn" href="${toolUrl('quiz', 'subj=' + encodeURIComponent(s.key))}">${ico('quiz')} Autoevaluar</a><a class="btn" href="${toolUrl('formulas', 'subj=' + encodeURIComponent(s.key))}">${ico('sigma')} Fórmulas</a><a class="btn" href="${toolUrl('mapas', 'subj=' + encodeURIComponent(s.key))}">${ico('map')} Mapa</a></div>
    ${groups || emptyBox('book', 'Esta carpeta aún no tiene resúmenes en Markdown.')}`);
}
ACT['lib-subj'] = el => { UI.lib = { q: '', subj: el.dataset.s, tipo: '', dif: '', est: '', tag: '', tema: '', fav: false }; };

/* ---------- Biblioteca con filtros ---------- */
function libraryView() {
  S.view = 'tool:biblioteca'; S.cur = null; document.title = `Biblioteca · ${CFG.titulo}`;
  const L = UI.lib, docs = allDocs();
  const tipos = [...new Set(docs.map(d => d.type).filter(Boolean))].sort(cmp);
  const tags = [...new Set(docs.flatMap(d => d.tags))].sort(cmp);
  const temas = [...new Set(docs.filter(d => !L.subj || d.subj === L.subj).map(d => d.topic).filter(Boolean))].sort(cmp);
  const sel = (k, label, opts) => `<label class="sel"><span>${label}</span><select data-k="${k}">${opts.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(L[k]) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>`;
  V(`<h1 class="ph">${ico('library')} Biblioteca</h1><p class="sub">Todos los resúmenes, filtrables por asignatura, tema, dificultad, tipo de contenido y estado de estudio.${IDX.ready ? '' : ' <i>Cargando metadatos…</i>'}</p>
    <div class="pnl libf"><label class="sel grow"><span>Buscar</span><input type="search" class="inp" data-k="q" placeholder="Filtrar por título…" value="${esc(L.q)}"></label>
    ${sel('subj', 'Asignatura', [['', 'Todas'], ...S.subjects.map(s => [s.key, s.key + (s.name ? ' · ' + s.name : '')])])}
    ${sel('tema', 'Tema', [['', 'Todos'], ...temas.map(t => [t, t])])}
    ${sel('tipo', 'Tipo', [['', 'Todos'], ...tipos.map(t => [t, t])])}
    ${sel('dif', 'Dificultad', [['', 'Cualquiera'], ['1', 'Fácil'], ['2', 'Media'], ['3', 'Difícil']])}
    ${sel('est', 'Estado', [['', 'Cualquiera'], ...STATES])}
    ${sel('tag', 'Etiqueta', [['', 'Todas'], ...tags.map(t => [t, '#' + t])])}
    <label class="ck"><input type="checkbox" data-k="fav"${L.fav ? ' checked' : ''}> <span>Solo favoritos</span></label><button class="btn sm" data-act="lib-reset">Limpiar</button></div>
    <div id="liblist"></div>`);
  libList();
}
function libList() {
  const L = UI.lib, q = norm(L.q), box = $('#liblist'); if (!box) return;
  const fv = new Set(favs().docs), res = allDocs().filter(f =>
    (!L.subj || f.subj === L.subj) && (!L.tema || f.topic === L.tema) && (!L.tipo || f.type === L.tipo) && (!L.dif || f.diff === +L.dif) &&
    (!L.est || getSt(f) === L.est) && (!L.tag || f.tags.includes(L.tag)) && (!L.fav || fv.has(f.path)) && (!q || norm(f.title).includes(q)));
  box.innerHTML = `<p class="count">${plural(res.length, 'resultado', 'resultados')}</p>` + (res.length ? `<div class="dl">${res.map(f => docRow(f)).join('')}</div>` : emptyBox('filter', 'Ningún resumen coincide con los filtros.', 'Prueba a limpiar alguno de ellos.'));
}
ACT['lib-reset'] = () => { UI.lib = { q: '', subj: '', tipo: '', dif: '', est: '', tag: '', tema: '', fav: false }; S.noAnim = true; libraryView(); S.noAnim = false; };
function onLibInput(e) {
  const k = e.target.dataset && e.target.dataset.k; if (!k || !e.target.closest('.libf')) return;
  UI.lib[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  if (k === 'subj') { UI.lib.tema = ''; S.noAnim = true; libraryView(); S.noAnim = false; } else libList();
}

/* ---------- Favoritos y recientes ---------- */
function favView() {
  S.view = 'tool:favoritos'; S.cur = null; document.title = `Favoritos · ${CFG.titulo}`;
  const f = favs(), docs = f.docs.map(p => S.byPath.get(p)).filter(Boolean);
  const secs = f.secs.map(x => ({ ...x, d: S.byPath.get(x.p) })).filter(x => x.d);
  V(`<h1 class="ph">${ico('star')} Favoritos</h1><p class="sub">Resúmenes y secciones concretas que has guardado con ★.</p>
    <h3 class="lh">Resúmenes (${docs.length})</h3>${docs.length ? `<div class="dl">${docs.map(d => docRow(d)).join('')}</div>` : emptyBox('star', 'Aún no hay resúmenes favoritos.', 'Pulsa «Favorito» en cualquier resumen.')}
    <h3 class="lh">Secciones (${secs.length})</h3>${secs.length ? `<div class="dl">${secs.map(x => `<div class="dr" style="--c:${x.d.s.color}"><span class="dot-b static">${ico('star', 'fill')}</span><a class="dr-a" href="${href(x.p)}?s=${encodeURIComponent(x.id)}"><span class="dr-t">${esc(x.t)}</span><span class="dr-m">${subjBadge(x.d)}<span class="bd">${esc(x.d.title)}</span></span></a><button class="ib sm" data-act="unfav-sec" data-p="${esc(x.p)}" data-id="${esc(x.id)}" title="Quitar" aria-label="Quitar">${ico('x')}</button></div>`).join('')}</div>` : emptyBox('tag', 'Aún no hay secciones guardadas.', 'Pasa el ratón sobre un título y pulsa ★.')}`);
}
ACT['unfav-sec'] = el => { toggleFavSec(el.dataset.p, el.dataset.id); rerender(); };
function histView() {
  S.view = 'tool:historial'; S.cur = null; document.title = `Recientes · ${CFG.titulo}`;
  const h = store.get(K.hist, []).map(x => ({ ...x, f: S.byPath.get(x.p) })).filter(x => x.f);
  V(`<h1 class="ph">${ico('clock')} Recientes</h1><p class="sub">Los últimos resúmenes que has consultado.</p>
    ${h.length ? `<div class="dl">${h.map(x => docRow(x.f, { sn: { html: ago(x.t) } })).join('')}</div><p><button class="btn sm" data-act="hist-clear">${ico('trash')} Borrar historial</button></p>` : emptyBox('clock', 'Aún no has abierto ningún resumen.')}`);
}
ACT['hist-clear'] = () => confirmModal('¿Borrar el historial de resúmenes consultados?', () => { store.set(K.hist, []); rerender(); }, 'Borrar');

/* ---------- Resumen (documento) ---------- */
function relatedDocs(f) {
  const m = new Map();
  (f.relDocs || []).forEach(d => m.set(d.path, { d, w: 20, why: 'Indicado por el autor' }));
  for (const d of allDocs()) {
    if (d === f || m.has(d.path)) continue;
    if ((d.relDocs || []).includes(f)) { m.set(d.path, { d, w: 15, why: 'Enlaza con este tema' }); continue; }
    const shared = d.tags.filter(t => f.tags.some(u => norm(u) === norm(t)));
    if (shared.length) m.set(d.path, { d, w: shared.length * 3 + (d.subj === f.subj ? 1 : 0), why: shared.map(t => '#' + t).join(' ') });
  }
  return [...m.values()].sort((a, b) => b.w - a.w).slice(0, 6);
}
function fillRelated() {
  const f = S.curDoc, box = $('#rel'); if (!f || !box || !IDX.ready) return;
  const chip = (d, why = '') => `<a class="rl" href="${href(d.path)}" style="--c:${d.s.color}"><span class="dot ${getSt(d)}"></span><span class="rl-t">${esc(d.title)}</span><i>${esc(d.subj)}${why ? ' · ' + esc(why) : ''}</i></a>`;
  const pre = f.preDocs || [], nexts = allDocs().filter(d => (d.preDocs || []).includes(f)), rel = relatedDocs(f);
  const sec = (t, icon, arr) => arr.length ? `<div class="rsec"><h3>${ico(icon)} ${t}</h3><div class="rls">${arr.join('')}</div></div>` : '';
  box.innerHTML = sec('Antes de este tema', 'repeat', pre.map(d => chip(d))) + sec('Después', 'chev', nexts.map(d => chip(d))) + sec('Relacionados', 'link', rel.map(r => chip(r.d, r.why)));
}

function docToolbar(f, mins) {
  return `<div class="actions"><a class="btn" href="${ghUrl(f.path)}" target="_blank" rel="noopener">${ico('ext')} GitHub</a><a class="btn" href="${rawUrl(f.path)}" target="_blank" rel="noopener">${ico('code')} .md</a><button class="btn" data-act="copy-link">${ico('link')} Copiar enlace</button><button class="btn" data-act="focus">${ico('eye')} Modo enfoque</button><button class="btn" data-act="print">${ico('print')} Imprimir / PDF</button><button class="btn" data-act="fs-" title="Texto más pequeño" aria-label="Texto más pequeño">A−</button><button class="btn" data-act="fs+" title="Texto más grande" aria-label="Texto más grande">A+</button><span class="meta">${mins} min de lectura</span></div>`;
}
async function docView(f, sec) {
  const tok = S.tok;
  S.view = 'doc'; S.cur = f; S.curDoc = null; S.posKey = null; spy = null;
  document.title = `${f.title} · ${CFG.titulo}`;
  V(`<div class="loading">Cargando «${esc(f.title)}»…</div>`);
  window.scrollTo(0, 0);
  await ensureText(f);
  if (tok !== S.tok) return;
  if (f.text == null) { V(`<div class="err">No se pudo cargar el resumen (${esc(f.err || 'error')}). <a href="${ghUrl(f.path)}" target="_blank" rel="noopener">Ábrelo en GitHub ↗</a></div>`); renderSide(); return; }
  document.title = `${f.title} · ${CFG.titulo}`;
  const list = f.s.files, i = list.indexOf(f), prev = list[i - 1], next = list[i + 1], mins = Math.max(1, Math.round(f.words / 200)), st = getSt(f);
  const nCards = f.cards.length, nQuiz = f.quiz.length;
  V(`<div class="page" style="--c:${f.s.color}"><article>
    <nav class="crumbs"><a href="#/">Inicio</a> / <a href="#/${encodeURIComponent(f.subj)}">${esc(f.subj)}</a>${f.sub ? ' / ' + esc(f.sub) : ''}</nav>
    <header class="dh"><div class="dh-b">${subjBadge(f)}${typeBadge(f)}${diffBadge(f)}</div><h1 class="dh-t">${esc(f.title)}</h1>${f.tags.length ? `<div class="dh-g">${f.tags.map(t => `<button class="bd tg" data-act="tag" data-t="${esc(t)}">#${esc(t)}</button>`).join('')}</div>` : ''}</header>
    <div class="stseg" role="group" aria-label="Estado de estudio">${STATES.map(([k, l]) => `<button data-act="state" data-st="${k}" class="${k}${k === st ? ' on' : ''}" aria-pressed="${k === st}"><span class="dot ${k}"></span>${l}</button>`).join('')}</div>
    <div class="dh-act"><button class="btn" data-act="fav-doc" aria-pressed="${isFavDoc(f.path)}">${ico('star', isFavDoc(f.path) ? 'fill' : '')}<span>Favorito</span></button><button class="btn" data-act="reviewed">${ico('check')} Repasado hoy</button><button class="btn" data-act="sched">${ico('calendar')} Programar repaso</button><button class="btn" data-act="doc-task">${ico('tasks')} Tarea</button>${nCards ? `<a class="btn" href="${toolUrl('tarjetas', 'doc=' + encodeURIComponent(f.path) + '&go=1')}">${ico('cards')} Tarjetas (${nCards})</a>` : ''}${nCards || nQuiz ? `<a class="btn" href="${toolUrl('quiz', 'doc=' + encodeURIComponent(f.path))}">${ico('quiz')} Autoevaluar</a>` : ''}</div>
    ${docToolbar(f, mins)}
    <div class="md" id="md"></div>
    <section id="rel"></section>
    <nav class="pn">${prev ? `<a href="${href(prev.path)}"><small>← Anterior</small><span>${esc(prev.title)}</span></a>` : '<span></span>'}${next ? `<a class="nx" href="${href(next.path)}"><small>Siguiente →</small><span>${esc(next.title)}</span></a>` : ''}</nav>
  </article><aside class="toc" id="toc"></aside></div>`, 'docv');
  const md = $('#md'); md.innerHTML = renderDoc(f);
  fixContent(md, f); setupHeadings(md, f); afterDoc(f);
  S.curDoc = f; renderSide(); fillRelated();
  pushHist(f.path);
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  if (!store.get(K.log, []).some(e => e.k === 'read' && e.p === f.path && e.t >= t0.getTime())) log('read', f.path);
  let hl = null, jump = null;
  try { hl = JSON.parse(sessionStorage.getItem('rv-hl')); jump = JSON.parse(sessionStorage.getItem('rv-jump')); sessionStorage.removeItem('rv-hl'); sessionStorage.removeItem('rv-jump'); } catch {}
  const marks = hl && hl.length ? highlight(md, hl) : [];
  if (jump && jumpTo(md, jump)) { /* saltó a la fórmula */ }
  else if (marks.length) hlBar(md, marks);
  else if (sec && document.getElementById(sec)) document.getElementById(sec).scrollIntoView({ behavior: 'instant' });
  else { let y = 0; try { y = store.get(K.pos, {})[f.path] || 0; } catch {} if (y > 0) scrollTo({ top: y, behavior: 'instant' }); }
  S.posKey = f.path;
  updateProgress();
}
ACT.state = el => {
  const f = S.curDoc; if (!f) return;
  setSt(f, el.dataset.st);
  $$('.stseg button').forEach(b => { const on = b.dataset.st === el.dataset.st; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  renderSide(); toast(`Estado: ${stLabel(el.dataset.st)}`);
};
ACT['fav-doc'] = el => {
  const f = S.curDoc; if (!f) return;
  const on = toggleFavDoc(f.path);
  el.setAttribute('aria-pressed', on); el.innerHTML = ico('star', on ? 'fill' : '') + '<span>Favorito</span>'; toast(on ? 'Añadido a favoritos' : 'Quitado de favoritos');
};
ACT.reviewed = () => {
  const f = S.curDoc; if (!f) return;
  const r = store.get(K.rev, []); let n = 0;
  r.forEach(x => { if (x.path === f.path && !x.done && x.date <= today()) { x.done = true; n++; } });
  store.set(K.rev, r); log('review', f.path); renderSide(); toast(n ? 'Repaso registrado y marcado como hecho' : 'Repaso registrado');
};
ACT.sched = () => {
  const f = S.curDoc; if (!f) return;
  formModal({
    title: 'Programar repaso', text: esc(f.title),
    fields: [{ name: 'rel', label: 'Cuándo', type: 'select', value: '3', options: [['1', 'Mañana'], ['3', 'En 3 días'], ['7', 'En una semana'], ['14', 'En dos semanas'], ['30', 'En un mes']] }, { name: 'date', label: 'o una fecha concreta', type: 'date' }],
    submit: 'Programar',
    onSubmit: v => { const date = v.date || addDays(today(), +v.rel); const r = store.get(K.rev, []); r.push({ id: uid(), path: f.path, date, done: false }); store.set(K.rev, r); renderSide(); toast(`Repaso programado para el ${fmtDate(date)}`); }
  });
};
ACT['doc-task'] = () => {
  const f = S.curDoc; if (!f) return;
  formModal({
    title: 'Nueva tarea', text: esc(f.title),
    fields: [{ name: 'text', label: 'Tarea', required: true, placeholder: 'Ej.: Hacer los ejercicios 3 y 4' }, { name: 'due', label: 'Fecha límite (opcional)', type: 'date' }],
    onSubmit: v => { if (!v.text.trim()) return false; const t = store.get(K.tasks, []); t.unshift({ id: uid(), text: v.text.trim(), subj: f.subj, path: f.path, due: v.due || '', done: false, t: Date.now() }); store.set(K.tasks, t); renderSide(); toast('Tarea añadida'); }
  });
};
ACT['copy-link'] = async el => { try { await navigator.clipboard.writeText(location.href); toast('Enlace copiado'); } catch { toast('No se pudo copiar'); } };
ACT.print = () => window.print();
let fs = 17;
try { fs = Math.min(24, Math.max(13, parseInt(store.get('rv-fs', 17), 10) || 17)); if (fs === 16) fs = 17; } catch {}
function setFs(n) { fs = Math.min(24, Math.max(13, n)); document.documentElement.style.setProperty('--fs', fs + 'px'); store.set('rv-fs', fs); }
ACT['fs-'] = () => setFs(fs - 1);
ACT['fs+'] = () => setFs(fs + 1);

/* ---------- Búsqueda avanzada ---------- */
function parseQuery(q) {
  const F = { subj: [], tag: [], tipo: [], dif: [], estado: [], fav: false };
  const mm = q.match(/^\s*(?:f|formula|fórmula|math|mat)\s*:\s*([\s\S]*)$/i);
  if (mm) return { F, terms: [], math: mm[1].trim(), only: true };
  const terms = [], re = /(?:^|\s)(?:(asignatura|subj|a|tag|etiqueta|t|tipo|dif|dificultad|estado|e|fav|favoritos?):("[^"]*"|\S*)|#(\S+)|"([^"]+)"|(\S+))/gi;
  let m;
  while ((m = re.exec(q))) {
    if (m[1]) {
      const key = m[1].toLowerCase(), val = norm(m[2].replace(/^"|"$/g, ''));
      if (/^(asignatura|subj|a)$/.test(key)) F.subj.push(val);
      else if (/^(tag|etiqueta|t)$/.test(key)) F.tag.push(val);
      else if (key === 'tipo') F.tipo.push(val);
      else if (/^dif/.test(key)) F.dif.push(diffOf(val));
      else if (/^(estado|e)$/.test(key)) F.estado.push(val);
      else F.fav = !/^(no|0|false)$/.test(val);
    } else if (m[3]) F.tag.push(norm(m[3]));
    else terms.push(norm(m[4] || m[5]));
  }
  return { F, terms: terms.filter(Boolean), math: looksMath(q) ? q : null, only: false };
}
function docPass(f, F) {
  if (F.subj.length && !F.subj.some(v => norm(f.subj) === v || norm(f.s.name).includes(v))) return false;
  if (F.tag.length && !F.tag.every(v => f.tags.some(t => norm(t).includes(v)))) return false;
  if (F.tipo.length && !F.tipo.some(v => norm(f.type).includes(v))) return false;
  if (F.dif.length && !F.dif.includes(f.diff)) return false;
  if (F.estado.length) { const s = getSt(f); if (!F.estado.some(v => norm(stLabel(s)).startsWith(v) || s.startsWith(v))) return false; }
  if (F.fav && !isFavDoc(f.path)) return false;
  return true;
}
function snippet(f, terms) {
  const nt = f.nbody, t = f.body;
  if (!nt || nt.length !== t.length) return '';
  let pos = -1;
  for (const w of terms) { const k = nt.indexOf(w); if (k >= 0 && (pos < 0 || k < pos)) pos = k; }
  if (pos < 0) return '';
  const a = Math.max(0, pos - 50), b = Math.min(t.length, pos + 130), o = t.slice(a, b), n = nt.slice(a, b), marks = [];
  for (const w of terms) { let k = n.indexOf(w); while (k >= 0) { marks.push([k, k + w.length]); k = n.indexOf(w, k + w.length); } }
  marks.sort((x, y) => x[0] - y[0]);
  let out = '', last = 0;
  for (const [x, y] of marks) { if (x < last) continue; out += esc(o.slice(last, x)) + '<mark>' + esc(o.slice(x, y)) + '</mark>'; last = y; }
  out += esc(o.slice(last));
  return (a > 0 ? '… ' : '') + out.replace(/\s+/g, ' ').replace(/(^| )#+ /g, '$1') + (b < t.length ? ' …' : '');
}
function mathSearch(q) {
  const nq = normTex(q); if (nq.length < 2) return [];
  const res = (S.mathIdx || []).filter(x => x.nt.includes(nq));
  res.sort((a, b) => (a.nt === nq ? 0 : 1) - (b.nt === nq ? 0 : 1) || a.nt.length - b.nt.length);
  const seen = new Set();
  return res.filter(x => { const k = x.f.path + '|' + x.nt; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 40);
}
let searchSeq = 0;
function searchView(text) {
  S.view = 'search'; S.cur = null;
  const P = parseQuery(text), hasF = P.F.subj.length || P.F.tag.length || P.F.tipo.length || P.F.dif.length || P.F.estado.length || P.F.fav;
  const docs = allDocs().filter(f => docPass(f, P.F));
  const byTitle = [], byText = [], hlTerms = P.terms.filter(t => t.length > 1);
  if (!P.only) for (const f of docs) {
    if (!P.terms.length) { if (hasF) byTitle.push(f); continue; }
    const hay = norm(`${f.subj} ${f.s.name} ${f.sub} ${f.type} ${f.tags.join(' ')} ${f.title} ${f.name}`);
    if (P.terms.every(t => hay.includes(t))) byTitle.push(f);
    else if (f.nbody && P.terms.every(t => f.nbody.includes(t))) byText.push(f);
  }
  const maths = P.math && IDX.ready ? mathSearch(P.math) : [];
  const pending = !IDX.ready, total = byTitle.length + byText.length + maths.length;
  document.title = `Buscar · ${CFG.titulo}`;
  V(`<h1 class="ph">${ico('search')} Resultados</h1><p class="sub">${plural(total, 'resultado', 'resultados')} para «${esc(text)}»${pending ? ' · indexando el contenido…' : ''}</p>
    <p class="hint">Filtros: <code>asignatura:SD</code> <code>tag:consenso</code> <code>tipo:teoria</code> <code>dif:2</code> <code>estado:repasar</code> <code>fav:</code> · Fórmulas: <code>f:x^2+y^2</code>, <code>∑</code>, <code>\\int</code></p>
    ${byTitle.length ? `<h3 class="lh">Resúmenes</h3><div class="dl">${byTitle.map(f => docRow(f, { sn: { html: '', hl: hlTerms } })).join('').replace(/<span class="sn"><\/span>/g, '')}</div>` : ''}
    ${maths.length ? `<h3 class="lh">Fórmulas</h3><div class="dl">${maths.map(x => `<div class="dr fr" style="--c:${x.f.s.color}"><a class="dr-a" href="${href(x.f.path)}" data-act="open" data-jump='${esc(JSON.stringify(x.ref))}'><span class="fr-f">${kx(x.tex, true)}</span><span class="dr-m">${subjBadge(x.f)}<span class="bd">${esc(x.f.title)}</span>${x.name ? `<span class="bd">${esc(x.name)}</span>` : x.head ? `<span class="bd">${esc(x.head)}</span>` : ''}</span></a></div>`).join('')}</div>` : ''}
    ${byText.length ? `<h3 class="lh">Dentro del texto</h3><div class="dl">${byText.map(f => docRow(f, { sn: { html: snippet(f, P.terms), hl: hlTerms } })).join('')}</div>` : ''}
    ${total || pending ? '' : emptyBox('search', 'Sin coincidencias.', 'Prueba con otra palabra o quita algún filtro.')}`);
}
function runSearch() {
  const v = $('#q').value.trim(), seq = ++searchSeq;
  if (!v) { route(); return; }
  searchView(v);
  if (!IDX.ready) { startIndex(); }
  void seq;
}
