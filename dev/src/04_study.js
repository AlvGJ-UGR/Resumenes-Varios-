/* ============ Herramientas de estudio ============ */
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const getTasks = () => store.get(K.tasks, []);
const openTasks = () => getTasks().filter(t => !t.done);
const getExams = () => store.get(K.exams, []);
const nextExam = () => getExams().filter(e => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date))[0] || null;
const getRevs = () => store.get(K.rev, []);
const dueReviews = () => getRevs().filter(r => !r.done && r.date <= today() && S.byPath.has(r.path));
const srsMap = () => store.get(K.srs, {});
const isDue = (c, m) => { const s = (m || srsMap())[c.id]; return !s || s.due <= today(); };
const dueCards = list => { const m = srsMap(); return (list || allCards()).filter(c => isDue(c, m)); };
const subjOptions = (all = 'Todas') => [['', all], ...S.subjects.map(s => [s.key, s.key + (s.name ? ' · ' + s.name : '')])];
const optHtml = (opts, val) => opts.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(val) ? ' selected' : ''}>${esc(l)}</option>`).join('');
const needIdx = (id, title) => { S.view = 'tool:' + id; S.cur = null; document.title = `${title} · ${CFG.titulo}`; if (IDX.ready) return false; V(`<h1 class="ph">${title}</h1><div class="loading">Indexando los resúmenes…</div>`); startIndex(); return true; };
const DOWN = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const fmtLong = s => { const d = pd(s); return `${DOWN[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`; };

/* ---------- Planificador de exámenes ---------- */
function examsView() {
  S.view = 'tool:examenes'; S.cur = null; document.title = `Exámenes · ${CFG.titulo}`;
  const ex = getExams().sort((a, b) => a.date.localeCompare(b.date)), t = today();
  const card = e => {
    const docs = (e.docs || []).map(p => S.byPath.get(p)).filter(Boolean), pr = progress(docs), s = S.bySubj.get(e.subj), n = diffDays(e.date, t), d = pd(e.date);
    return `<article class="ex${n < 0 ? ' past' : ''}" style="--c:${s ? s.color : 'var(--blue)'}"><div class="ex-h"><div class="ex-d"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()].slice(0, 3)}</span></div><div class="ex-t"><h3>${esc(e.name)}</h3><p>${s ? `<span class="bd sb">${ico(s.icon)}${esc(s.key)}</span>` : ''}<span class="rel${n >= 0 && n <= 7 ? ' soon' : ''}">${relDay(e.date)}</span> · ${fmtDate(e.date)}</p></div><div class="ex-a">${n > 0 && docs.length ? `<button class="btn sm" data-act="ex-plan" data-id="${e.id}">${ico('plan')} Plan</button>` : ''}<button class="ib sm" data-act="ex-edit" data-id="${e.id}" title="Editar" aria-label="Editar">${ico('edit')}</button><button class="ib sm" data-act="ex-del" data-id="${e.id}" title="Eliminar" aria-label="Eliminar">${ico('trash')}</button></div></div>
      ${docs.length ? `${segBar(pr)}<p class="muted">${pr.pct}% dominado · ${plural(docs.length, 'tema', 'temas')}</p><div class="chips">${docs.map(d => `<a class="chip" href="${href(d.path)}"><span class="dot ${getSt(d)}"></span>${esc(d.title)}</a>`).join('')}</div>` : '<p class="muted">Sin temas asignados.</p>'}${e.notes ? `<p class="note">${esc(e.notes)}</p>` : ''}</article>`;
  };
  const up = ex.filter(e => e.date >= t), past = ex.filter(e => e.date < t).reverse();
  V(`<div class="ph-row"><div><h1 class="ph">${ico('target')} Exámenes</h1><p class="sub">Registra la fecha, la asignatura y los temas de cada examen; verás cuánto llevas dominado.</p></div><button class="btn pri" data-act="ex-new">${ico('plus')} Nuevo examen</button></div>
    ${up.length ? `<div class="exs">${up.map(card).join('')}</div>` : emptyBox('target', 'No hay exámenes próximos.', 'Pulsa «Nuevo examen» para planificar el primero.')}
    ${past.length ? `<h3 class="lh">Pasados</h3><div class="exs">${past.map(card).join('')}</div>` : ''}`);
}
function examForm(e) {
  formModal({
    title: e ? 'Editar examen' : 'Nuevo examen', wide: true, submit: e ? 'Guardar' : 'Crear examen',
    fields: [
      { name: 'name', label: 'Nombre', required: true, value: e ? e.name : '', placeholder: 'Ej.: Parcial 1' },
      { name: 'date', label: 'Fecha', type: 'date', required: true, value: e ? e.date : '' },
      { name: 'subj', label: 'Asignatura', type: 'select', value: e ? e.subj : (S.subjects[0] || {}).key || '', options: subjOptions('').slice(1) },
      { name: 'docs', label: 'Temas incluidos', type: 'checks', value: e ? e.docs : [], options: v => ((S.bySubj.get(v.subj) || {}).files || []).map(f => [f.path, f.title]) },
      { name: 'notes', label: 'Notas', type: 'textarea', value: e ? e.notes : '', placeholder: 'Aula, material permitido…' }
    ],
    onSubmit: v => {
      if (!v.name.trim() || !v.date) return false;
      const all = getExams();
      if (e) { const x = all.find(y => y.id === e.id); Object.assign(x, { name: v.name.trim(), date: v.date, subj: v.subj, docs: v.docs, notes: v.notes.trim() }); }
      else all.push({ id: uid(), name: v.name.trim(), date: v.date, subj: v.subj, docs: v.docs, notes: v.notes.trim() });
      store.set(K.exams, all); toast('Examen guardado'); rerender(); renderSide();
    }
  });
}
ACT['ex-new'] = () => examForm(null);
ACT['ex-edit'] = el => examForm(getExams().find(e => e.id === el.dataset.id));
ACT['ex-del'] = el => confirmModal('¿Eliminar este examen?', () => { store.set(K.exams, getExams().filter(e => e.id !== el.dataset.id)); rerender(); }, 'Eliminar');

/* ---------- Lista de tareas ---------- */
function tasksView() {
  S.view = 'tool:tareas'; S.cur = null; document.title = `Tareas · ${CFG.titulo}`;
  const f = UI.taskf, t = today();
  let list = getTasks();
  if (f === 'pend') list = list.filter(x => !x.done); else if (f === 'done') list = list.filter(x => x.done);
  list.sort((a, b) => (a.done - b.done) || ((a.due || '9999').localeCompare(b.due || '9999')) || (b.t - a.t));
  const row = x => {
    const s = S.bySubj.get(x.subj), d = x.path && S.byPath.get(x.path), over = x.due && !x.done && x.due < t;
    return `<div class="tk${x.done ? ' done' : ''}"><button class="ck-b" data-act="task-toggle" data-id="${x.id}" aria-label="${x.done ? 'Marcar como pendiente' : 'Marcar como hecha'}" aria-pressed="${!!x.done}">${x.done ? ico('check') : ''}</button><div class="tk-t"><span>${esc(x.text)}</span><div class="tk-m">${s ? `<span class="bd sb" style="--c:${s.color}">${ico(s.icon)}${esc(s.key)}</span>` : ''}${d ? `<a class="bd" href="${href(d.path)}">${esc(d.title)}</a>` : ''}${x.due ? `<span class="bd${over ? ' bad' : ''}">${ico('calendar')} ${fmtDate(x.due)}${over ? ' · vencida' : ''}</span>` : ''}</div></div><button class="ib sm" data-act="task-del" data-id="${x.id}" title="Eliminar" aria-label="Eliminar">${ico('trash')}</button></div>`;
  };
  const n = openTasks().length;
  V(`<h1 class="ph">${ico('tasks')} Tareas</h1><p class="sub">Ejercicios y temas pendientes. ${plural(n, 'tarea pendiente', 'tareas pendientes')}.</p>
    <form class="pnl tform" id="tq"><input class="inp grow" name="text" placeholder="Nueva tarea… (Enter para añadir)" autocomplete="off" required><select class="inp" name="subj" aria-label="Asignatura">${optHtml(subjOptions('Sin asignatura'), '')}</select><input class="inp" type="date" name="due" aria-label="Fecha límite"><button class="btn pri">${ico('plus')} Añadir</button></form>
    <div class="tabs" role="tablist">${[['pend', 'Pendientes'], ['done', 'Hechas'], ['all', 'Todas']].map(([k, l]) => `<button role="tab" class="${f === k ? 'on' : ''}" data-act="taskf" data-f="${k}" aria-selected="${f === k}">${l}</button>`).join('')}</div>
    ${list.length ? `<div class="tks">${list.map(row).join('')}</div>` : emptyBox('tasks', f === 'done' ? 'Aún no has completado ninguna tarea.' : 'No hay tareas aquí.', 'Añade ejercicios o temas pendientes con el formulario.')}`);
}
function onTaskSubmit(e) {
  if (e.target.id !== 'tq') return; e.preventDefault();
  const fd = new FormData(e.target), text = String(fd.get('text') || '').trim(); if (!text) return;
  const a = getTasks(); a.unshift({ id: uid(), text, subj: fd.get('subj') || '', path: '', due: fd.get('due') || '', done: false, t: Date.now() });
  store.set(K.tasks, a); rerender(); renderSide(); setTimeout(() => { const i = $('#tq input[name=text]'); if (i) i.focus(); }, 30);
}
ACT['task-toggle'] = el => { const a = getTasks(), x = a.find(t => t.id === el.dataset.id); if (x) x.done = !x.done; store.set(K.tasks, a); rerender(); renderSide(); };
ACT['task-del'] = el => { store.set(K.tasks, getTasks().filter(t => t.id !== el.dataset.id)); rerender(); renderSide(); };
ACT.taskf = el => { UI.taskf = el.dataset.f; rerender(); };

/* ---------- Calendario de repasos ---------- */
function eventsByDate() {
  const m = new Map(), add = (d, e) => { if (!d) return; if (!m.has(d)) m.set(d, []); m.get(d).push(e); };
  getExams().forEach(e => add(e.date, { t: 'ex', id: e.id, label: e.name, subj: e.subj }));
  getRevs().forEach(r => { const f = S.byPath.get(r.path); if (f) add(r.date, { t: 'rev', id: r.id, label: f.title, subj: f.subj, path: r.path, done: r.done }); });
  getTasks().forEach(k => add(k.due, { t: 'task', id: k.id, label: k.text, subj: k.subj, done: k.done }));
  return m;
}
function calView() {
  S.view = 'tool:calendario'; S.cur = null; document.title = `Calendario · ${CFG.titulo}`;
  const C = UI.cal, now = new Date(), t = today();
  if (!C.m) C.m = ymd(new Date(now.getFullYear(), now.getMonth(), 1));
  const first = pd(C.m), y = first.getFullYear(), mo = first.getMonth(), ev = eventsByDate();
  const off = (first.getDay() + 6) % 7, nd = new Date(y, mo + 1, 0).getDate();
  if (!C.d || C.d.slice(0, 7) !== C.m.slice(0, 7)) C.d = (t.slice(0, 7) === C.m.slice(0, 7)) ? t : C.m;
  let cells = '';
  for (let i = 0; i < off; i++) cells += '<span class="dy out"></span>';
  for (let d = 1; d <= nd; d++) {
    const ds = `${y}-${pad(mo + 1)}-${pad(d)}`, es = ev.get(ds) || [];
    cells += `<button class="dy${ds === t ? ' today' : ''}${ds === C.d ? ' sel' : ''}" data-act="cal-day" data-d="${ds}" aria-label="${fmtLong(ds)}${es.length ? ', ' + es.length + ' eventos' : ''}"><span class="n">${d}</span><span class="evs">${es.slice(0, 4).map(e => `<i class="${e.t}${e.done ? ' done' : ''}"></i>`).join('')}</span></button>`;
  }
  const sel = ev.get(C.d) || [];
  const evRow = e => {
    const s = S.bySubj.get(e.subj);
    const lab = e.t === 'rev' ? `<a href="${href(e.path)}">${esc(e.label)}</a>` : e.t === 'ex' ? `<a href="${toolUrl('examenes')}">${esc(e.label)}</a>` : esc(e.label);
    const act = e.t === 'rev' ? `<button class="ib sm" data-act="rev-done" data-id="${e.id}" title="${e.done ? 'Marcar pendiente' : 'Marcar como repasado'}" aria-label="Marcar como repasado">${ico('check')}</button><button class="ib sm" data-act="rev-del" data-id="${e.id}" title="Quitar" aria-label="Quitar">${ico('x')}</button>` : e.t === 'task' ? `<button class="ib sm" data-act="task-toggle" data-id="${e.id}" title="Marcar hecha" aria-label="Marcar hecha">${ico('check')}</button>` : '';
    return `<div class="evr ${e.t}${e.done ? ' done' : ''}"><i class="${e.t}"></i><span class="evr-k">${e.t === 'ex' ? 'Examen' : e.t === 'rev' ? 'Repaso' : 'Tarea'}</span><span class="evr-t">${lab}</span>${s ? `<span class="bd sb" style="--c:${s.color}">${esc(s.key)}</span>` : ''}${act}</div>`;
  };
  const pend = getRevs().filter(r => !r.done && S.byPath.has(r.path)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 12);
  V(`<div class="ph-row"><div><h1 class="ph">${ico('calendar')} Calendario de repasos</h1><p class="sub">Programa cuándo volver a estudiar cada tema. Los exámenes y las tareas con fecha también aparecen.</p></div><button class="btn pri" data-act="rev-add" data-d="${C.d}">${ico('plus')} Programar repaso</button></div>
    <div class="calw"><section class="pnl cal"><div class="cal-h"><button class="ib" data-act="cal-prev" aria-label="Mes anterior">${ico('chev', 'flip')}</button><h2>${cap(MONTHS[mo])} ${y}</h2><button class="ib" data-act="cal-next" aria-label="Mes siguiente">${ico('chev')}</button><button class="btn sm" data-act="cal-today">Hoy</button></div>
      <div class="cal-g">${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => `<b>${d}</b>`).join('')}${cells}</div>
      <div class="legend"><span><i class="ex"></i>Examen</span><span><i class="rev"></i>Repaso</span><span><i class="task"></i>Tarea</span></div></section>
    <aside class="cal-s"><section class="pnl"><h3 class="lh nm">${cap(fmtLong(C.d))}</h3>${sel.length ? sel.map(evRow).join('') : '<p class="muted">Nada programado este día.</p>'}</section>
    <section class="pnl"><h3 class="lh nm">Repasos pendientes</h3>${pend.length ? pend.map(r => { const f = S.byPath.get(r.path); return `<div class="evr rev"><i class="rev"></i><span class="evr-t"><a href="${href(f.path)}">${esc(f.title)}</a></span><span class="rel${r.date < t ? ' soon' : ''}">${relDay(r.date)}</span></div>`; }).join('') : '<p class="muted">No hay repasos pendientes.</p>'}</section></aside></div>`);
}
const calMove = n => { const d = pd(UI.cal.m); d.setMonth(d.getMonth() + n); UI.cal.m = ymd(new Date(d.getFullYear(), d.getMonth(), 1)); UI.cal.d = null; rerender(); };
ACT['cal-prev'] = () => calMove(-1);
ACT['cal-next'] = () => calMove(1);
ACT['cal-today'] = () => { UI.cal.m = null; UI.cal.d = null; rerender(); };
ACT['cal-day'] = el => { UI.cal.d = el.dataset.d; rerender(); };
ACT['rev-done'] = el => { const r = getRevs(), x = r.find(y => y.id === el.dataset.id); if (x) { x.done = !x.done; if (x.done) log('review', x.path); } store.set(K.rev, r); rerender(); renderSide(); };
ACT['rev-del'] = el => { store.set(K.rev, getRevs().filter(y => y.id !== el.dataset.id)); rerender(); renderSide(); };
ACT['rev-add'] = el => {
  formModal({
    title: 'Programar repaso',
    fields: [{ name: 'path', label: 'Tema', type: 'select', value: S.curDoc ? S.curDoc.path : '', options: allDocs().map(f => [f.path, `${f.subj} · ${f.title}`]) }, { name: 'date', label: 'Fecha', type: 'date', value: el.dataset.d || addDays(today(), 3), required: true }],
    submit: 'Programar',
    onSubmit: v => { if (!v.path || !v.date) return false; const r = getRevs(); r.push({ id: uid(), path: v.path, date: v.date, done: false }); store.set(K.rev, r); toast(`Repaso programado para el ${fmtDate(v.date)}`); rerender(); renderSide(); }
  });
};

/* ---------- Tarjetas de memoria (repetición espaciada) ---------- */
let SESS = null;
function cardPool() { const F = UI.cardsf; return allCards().filter(c => (!F.subj || c.subj === F.subj) && (!F.doc || c.path === F.doc)); }
function schedule(c, r) {
  const m = srsMap(), st = m[c.id] || { ef: 2.5, iv: 0, reps: 0 };
  if (r === 0) { st.reps = 0; st.iv = 0; st.ef = Math.max(1.3, st.ef - 0.2); st.due = today(); }
  else {
    if (r === 1) { st.iv = Math.max(1, Math.round((st.iv || 1) * 1.2)); st.ef = Math.max(1.3, st.ef - 0.15); }
    else if (r === 2) st.iv = st.reps === 0 ? 1 : st.reps === 1 ? 3 : Math.round(st.iv * st.ef);
    else { st.iv = st.reps === 0 ? 3 : Math.max(st.iv + 1, Math.round(st.iv * st.ef * 1.3)); st.ef += 0.15; }
    st.reps++; st.due = addDays(today(), st.iv);
  }
  st.last = today(); m[c.id] = st; store.set(K.srs, m);
}
function cardsView(q) {
  if (needIdx('tarjetas', 'Tarjetas')) return;
  const F = UI.cardsf;
  if (S.fresh) { F.subj = (q && q.get('subj')) || ''; F.doc = (q && q.get('doc')) || ''; }
  if (S.fresh && q && q.get('go') === '1') { const l = shuffle(dueCards(cardPool())); if (l.length) { startSession(l.slice(0, 40)); return; } toast('No hay tarjetas pendientes en este tema'); }
  const pool = cardPool(), due = dueCards(pool), m = srsMap(), t = today();
  const docsWith = allDocs().filter(d => d.cards.length && (!F.subj || d.subj === F.subj));
  const row = c => {
    const s = m[c.id], d = c.path && S.byPath.get(c.path), sub = S.bySubj.get(c.subj);
    const st = !s ? '<span class="bd">Nueva</span>' : s.due <= t ? '<span class="bd bad">Pendiente</span>' : `<span class="bd">En ${diffDays(s.due, t)} d</span>`;
    return `<div class="dr cr" style="--c:${sub ? sub.color : 'var(--blue)'}"><a class="dr-a"${d ? ` href="${href(d.path)}"` : ''}><span class="dr-t">${renderInline(c.q)}</span><span class="dr-m">${sub ? `<span class="bd sb">${ico(sub.icon)}${esc(sub.key)}</span>` : ''}${st}${d ? `<span class="bd">${esc(d.title)}</span>` : '<span class="bd">Mía</span>'}</span></a>${c.user ? `<button class="ib sm" data-act="card-edit" data-id="${c.uid}" title="Editar" aria-label="Editar">${ico('edit')}</button><button class="ib sm" data-act="card-del" data-id="${c.uid}" title="Eliminar" aria-label="Eliminar">${ico('trash')}</button>` : ''}</div>`;
  };
  V(`<div class="ph-row"><div><h1 class="ph">${ico('cards')} Tarjetas de memoria</h1><p class="sub">Repetición espaciada: cada tarjeta vuelve cuando toca repasarla. Las creas aquí o con bloques <code>flashcards</code> en tus resúmenes.</p></div><button class="btn" data-act="card-new">${ico('plus')} Nueva tarjeta</button></div>
    <div class="pnl libf"><label class="sel"><span>Asignatura</span><select data-k="subj" data-scope="cards">${optHtml(subjOptions(), F.subj)}</select></label><label class="sel"><span>Resumen</span><select data-k="doc" data-scope="cards">${optHtml([['', 'Todos'], ...docsWith.map(d => [d.path, d.title])], F.doc)}</select></label></div>
    <div class="kps three"><div class="kp static"><span class="kp-t"><small>Total</small><b>${pool.length}</b></span></div><div class="kp static"><span class="kp-t"><small>Pendientes hoy</small><b>${due.length}</b></span></div><div class="kp static"><span class="kp-t"><small>Dominadas (≥21 d)</small><b>${pool.filter(c => (m[c.id] || {}).iv >= 21).length}</b></span></div></div>
    <div class="dh-act"><button class="btn pri" data-act="cards-start" ${due.length ? '' : 'disabled'}>${ico('play')} Estudiar ahora (${due.length})</button><button class="btn" data-act="cards-start" data-all="1" ${pool.length ? '' : 'disabled'}>${ico('repeat')} Repasar todas (${pool.length})</button></div>
    ${pool.length ? `<div class="dl">${pool.map(row).join('')}</div>` : emptyBox('cards', 'Aún no hay tarjetas.', 'Crea una con «Nueva tarjeta» o añade un bloque <code>flashcards</code> a un resumen (mira la Ayuda).')}`);
}
function cardForm(c, pre) {
  formModal({
    title: c ? 'Editar tarjeta' : 'Nueva tarjeta', wide: true,
    fields: [
      { name: 'q', label: 'Pregunta', type: 'textarea', rows: 2, required: true, value: c ? c.q : (pre && pre.q) || '', placeholder: 'Admite Markdown y fórmulas $x^2$' },
      { name: 'a', label: 'Respuesta', type: 'textarea', rows: 3, required: true, value: c ? c.a : (pre && pre.a) || '' },
      { name: 'subj', label: 'Asignatura', type: 'select', value: c ? c.subj : (pre && pre.subj) || UI.cardsf.subj, options: subjOptions('Sin asignatura') },
      { name: 'path', label: 'Resumen relacionado', type: 'select', value: c ? c.path || '' : (pre && pre.path) || UI.cardsf.doc, options: [['', 'Ninguno'], ...allDocs().map(f => [f.path, `${f.subj} · ${f.title}`])] }
    ],
    onSubmit: v => {
      if (!v.q.trim() || !v.a.trim()) return false;
      const a = store.get(K.uc, []);
      if (c) Object.assign(a.find(x => x.id === c.uid), { q: v.q.trim(), a: v.a.trim(), subj: v.subj, path: v.path });
      else a.push({ id: uid(), q: v.q.trim(), a: v.a.trim(), subj: v.subj, path: v.path });
      store.set(K.uc, a); toast('Tarjeta guardada'); rerender(); renderSide();
    }
  });
}
ACT['card-new'] = () => cardForm(null);
ACT['card-edit'] = el => cardForm(allCards().find(c => c.uid === el.dataset.id));
ACT['card-del'] = el => confirmModal('¿Eliminar esta tarjeta?', () => { store.set(K.uc, store.get(K.uc, []).filter(c => c.id !== el.dataset.id)); rerender(); renderSide(); }, 'Eliminar');
ACT['cards-start'] = el => {
  const pool = cardPool(), list = el.dataset.all === '1' ? pool : dueCards(pool);
  if (!list.length) return toast('No hay tarjetas para estudiar');
  startSession(shuffle(list).slice(0, 40));
};
function startSession(cards) { SESS = { q: [...cards], total: cards.length, done: 0, show: false, r: [0, 0, 0, 0], t0: Date.now() }; S.view = 'session'; S.cur = null; renderSession(); renderSide(); }
function endSession() { if (SESS && SESS.done > 0) log('cards', null, { n: SESS.done }); SESS = null; }
function renderSession() {
  const s = SESS; if (!s) return;
  const c = s.q[0]; if (!c) return finishSession();
  const d = c.path && S.byPath.get(c.path), pct = Math.round(s.done / s.total * 100);
  V(`<div class="sess"><div class="sess-h"><button class="btn sm" data-act="sess-end">${ico('x')} Salir</button><div class="pbar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div><span>${s.done}/${s.total}</span></div>
    <div class="flash-c"><div class="fq">${renderInline(c.q)}</div>${s.show ? `<hr><div class="fa">${renderInline(c.a).replace(/\n/g, '<br>')}</div>` : ''}${d ? `<a class="src" href="${href(d.path)}">${esc(d.title)}</a>` : ''}</div>
    ${s.show ? `<div class="rate">${['Otra vez', 'Difícil', 'Bien', 'Fácil'].map((l, i) => `<button data-act="rate" data-r="${i}" class="r${i}">${l}<small>${i + 1}</small></button>`).join('')}</div>` : `<div class="rate one"><button class="btn pri lg" data-act="sess-show">Mostrar respuesta <small>Espacio</small></button></div>`}</div>`, 'sessv');
}
function finishSession() {
  const s = SESS, n = s.done, good = s.r[2] + s.r[3], tot = s.r.reduce((a, b) => a + b, 0);
  log('cards', null, { n }); SESS = null; S.view = 'tool:tarjetas';
  V(`<div class="sess done"><div class="trophy">${ico('check')}</div><h1 class="ph">¡Sesión completada!</h1><p class="sub">${plural(n, 'tarjeta repasada', 'tarjetas repasadas')} en ${Math.max(1, Math.round((Date.now() - s.t0) / 6e4))} min · ${tot ? Math.round(good / tot * 100) : 0}% acertadas a la primera</p>
    <div class="kps three"><div class="kp static"><span class="kp-t"><small>Otra vez</small><b>${s.r[0]}</b></span></div><div class="kp static"><span class="kp-t"><small>Difícil</small><b>${s.r[1]}</b></span></div><div class="kp static"><span class="kp-t"><small>Bien / Fácil</small><b>${good}</b></span></div></div>
    <div class="dh-act c"><a class="btn pri" href="${toolUrl('tarjetas')}">Volver a tarjetas</a><a class="btn" href="${toolUrl('estadisticas')}">Ver estadísticas</a></div></div>`);
  renderSide();
}
ACT['sess-show'] = () => { if (!SESS) return; SESS.show = true; S.noAnim = true; renderSession(); S.noAnim = false; };
ACT.rate = el => {
  const s = SESS; if (!s || !s.show) return;
  const r = +el.dataset.r, c = s.q.shift(); schedule(c, r); s.r[r]++;
  if (r === 0) s.q.splice(Math.min(3, s.q.length), 0, c); else s.done++;
  s.show = false; S.noAnim = true; renderSession(); S.noAnim = false;
};
ACT['sess-end'] = () => { endSession(); location.hash = '#/_/tarjetas'; if (S.view === 'session') { S.view = 'tool:tarjetas'; route(); } };

/* ---------- Autoevaluación ---------- */
let QZ = null;
function quizPool(F) {
  const out = [], docs = allDocs().filter(d => (!F.subj || d.subj === F.subj) && (!F.doc || d.path === F.doc));
  for (const d of docs) for (const q of d.quiz) out.push({ q: q.q, opts: q.opts, ok: q.ok, exp: q.exp, path: d.path, subj: d.subj });
  const cards = allCards(), mine = cards.filter(c => (!F.subj || c.subj === F.subj) && (!F.doc || c.path === F.doc));
  for (const c of mine) {
    const same = [...new Set(cards.filter(x => x.id !== c.id && x.subj === c.subj && x.a !== c.a).map(x => x.a))];
    const dis = shuffle(same).slice(0, 3);
    if (dis.length < 3) for (const a of shuffle([...new Set(cards.filter(x => x.id !== c.id && x.a !== c.a).map(x => x.a))])) { if (dis.length >= 3) break; if (!dis.includes(a)) dis.push(a); }
    if (dis.length < 2) continue;
    const opts = shuffle([c.a, ...dis]); out.push({ q: c.q, opts, ok: [opts.indexOf(c.a)], exp: '', path: c.path, subj: c.subj, fromCard: true });
  }
  return out;
}
function quizView(q) {
  if (needIdx('quiz', 'Autoevaluación')) return;
  const F = UI.quizf;
  if (S.fresh) { F.subj = (q && q.get('subj')) || ''; F.doc = (q && q.get('doc')) || ''; }
  const pool = quizPool(F), hist = store.get(K.log, []).filter(e => e.k === 'quiz').slice(-8).reverse();
  const docsWith = allDocs().filter(d => (d.quiz.length || d.cards.length) && (!F.subj || d.subj === F.subj));
  V(`<h1 class="ph">${ico('quiz')} Autoevaluación</h1><p class="sub">Cuestionarios con corrección automática. Se generan con los bloques <code>quiz</code> de tus resúmenes y con tus tarjetas de memoria.</p>
    <div class="pnl libf"><label class="sel"><span>Asignatura</span><select data-k="subj" data-scope="quiz">${optHtml(subjOptions(), F.subj)}</select></label><label class="sel"><span>Resumen</span><select data-k="doc" data-scope="quiz">${optHtml([['', 'Todos'], ...docsWith.map(d => [d.path, d.title])], F.doc)}</select></label><label class="sel"><span>Preguntas</span><select data-k="n" data-scope="quiz">${optHtml([['5', '5'], ['10', '10'], ['20', '20'], ['999', 'Todas']], F.n)}</select></label></div>
    <div class="dh-act"><button class="btn pri" data-act="quiz-start" ${pool.length ? '' : 'disabled'}>${ico('play')} Empezar (${Math.min(pool.length, +F.n)} de ${pool.length} disponibles)</button></div>
    ${pool.length ? '' : emptyBox('quiz', 'No hay preguntas disponibles.', 'Añade un bloque <code>quiz</code> a un resumen o crea tarjetas (mira la Ayuda).')}
    ${hist.length ? `<h3 class="lh">Últimos resultados</h3><div class="dl">${hist.map(e => `<div class="dr"><span class="dot-b static"><span class="dot ${e.ok / e.n >= 0.7 ? 'dom' : e.ok / e.n >= 0.5 ? 'repasar' : 'pend'}"></span></span><span class="dr-a"><span class="dr-t">${e.ok}/${e.n} · ${Math.round(e.ok / e.n * 100)}%</span><span class="dr-m"><span class="bd">${ago(e.t)}</span></span></span></div>`).join('')}</div>` : ''}`);
}
ACT['quiz-start'] = () => {
  const F = UI.quizf, pool = shuffle(quizPool(F)).slice(0, +F.n);
  if (!pool.length) return toast('No hay preguntas disponibles');
  QZ = { qs: pool, i: 0, ok: 0, wrong: [], answered: false }; S.view = 'session'; S.cur = null; renderQuiz(); renderSide();
};
function renderQuiz() {
  const z = QZ; if (!z) return;
  if (z.i >= z.qs.length) return finishQuiz();
  const q = z.qs[z.i], pct = Math.round(z.i / z.qs.length * 100);
  V(`<div class="sess"><div class="sess-h"><button class="btn sm" data-act="quiz-end">${ico('x')} Salir</button><div class="pbar"><i style="width:${pct}%"></i></div><span>${z.i + 1}/${z.qs.length}</span></div>
    <div class="flash-c left"><div class="fq">${renderInline(q.q)}</div><div class="qos">${q.opts.map((o, k) => `<button class="qo" data-act="quiz-opt" data-k="${k}">${renderInline(o)}</button>`).join('')}</div><div class="qx" hidden></div></div>
    <div class="rate one"><button class="btn pri lg" data-act="quiz-next" hidden>${z.i + 1 >= z.qs.length ? 'Ver resultado' : 'Siguiente'}</button></div></div>`, 'sessv');
}
ACT['quiz-opt'] = el => {
  const z = QZ; if (!z || z.answered) return; z.answered = true;
  const q = z.qs[z.i], k = +el.dataset.k, right = q.ok.includes(k);
  $$('.qo').forEach((b, i) => { b.disabled = true; if (q.ok.includes(i)) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
  if (right) z.ok++; else z.wrong.push(q);
  const x = $('.qx'); const txt = q.exp || (q.fromCard ? 'Respuesta: ' + q.opts[q.ok[0]] : '');
  if (txt) { x.innerHTML = renderInline(txt); x.hidden = false; }
  $('[data-act=quiz-next]').hidden = false; $('[data-act=quiz-next]').focus();
};
ACT['quiz-next'] = () => { const z = QZ; if (!z) return; z.i++; z.answered = false; S.noAnim = true; renderQuiz(); S.noAnim = false; };
ACT['quiz-end'] = () => { QZ = null; location.hash = '#/_/quiz'; if (S.view === 'session') { S.view = 'tool:quiz'; route(); } };
function finishQuiz() {
  const z = QZ, n = z.qs.length, pct = Math.round(z.ok / n * 100);
  log('quiz', null, { n, ok: z.ok }); QZ = null; S.view = 'tool:quiz';
  V(`<div class="sess done"><div class="trophy ${pct >= 70 ? '' : 'mid'}">${ico(pct >= 70 ? 'check' : 'repeat')}</div><h1 class="ph">${z.ok}/${n} · ${pct}%</h1><p class="sub">${pct >= 90 ? '¡Excelente!' : pct >= 70 ? 'Muy bien.' : pct >= 50 ? 'Vas por buen camino, repasa los fallos.' : 'Conviene repasar estos temas.'}</p>
    ${z.wrong.length ? `<h3 class="lh">Para repasar (${z.wrong.length})</h3><div class="dl left">${z.wrong.map(q => { const d = q.path && S.byPath.get(q.path); return `<div class="dr wr"><span class="dr-a"><span class="dr-t">${renderInline(q.q)}</span><span class="dr-m"><span class="bd ok">${renderInline(q.opts[q.ok[0]])}</span>${d ? `<a class="bd" href="${href(d.path)}">${esc(d.title)}</a>` : ''}</span></span></div>`; }).join('')}</div>` : ''}
    <div class="dh-act c"><button class="btn pri" data-act="quiz-start">Repetir</button><a class="btn" href="${toolUrl('quiz')}">Volver</a></div></div>`);
  renderSide();
}
function onScopeInput(e) {
  const k = e.target.dataset && e.target.dataset.k, sc = e.target.dataset && e.target.dataset.scope; if (!k || !sc) return;
  const F = sc === 'cards' ? UI.cardsf : UI.quizf; F[k] = e.target.value;
  if (k === 'subj') F.doc = '';
  rerender();
}

/* ---------- Biblioteca de fórmulas ---------- */
function formulasView(q) {
  if (needIdx('formulas', 'Fórmulas')) return;
  const F = UI.form;
  if (S.fresh) F.subj = (q && q.get('subj')) || '';
  V(`<h1 class="ph">${ico('sigma')} Biblioteca de fórmulas</h1><p class="sub">Catálogo de ecuaciones de todos tus resúmenes. Las fichas completas (con variables, unidades e hipótesis) salen de los bloques <code>formula</code>.</p>
    <div class="pnl libf formf"><label class="sel grow"><span>Buscar (nombre, apartado o expresión)</span><input type="search" class="inp" data-k="q" placeholder="Ej.: energía, \\int, x^2" value="${esc(F.q)}"></label><label class="sel"><span>Asignatura</span><select data-k="subj">${optHtml(subjOptions(), F.subj)}</select></label><label class="ck"><input type="checkbox" data-k="meta"${F.meta ? ' checked' : ''}> <span>Solo fichas completas</span></label></div>
    <div id="fl"></div>`);
  formList();
}
let formLim = 40;
function formList() {
  const F = UI.form, box = $('#fl'); if (!box) return;
  const nq = norm(F.q), tq = F.q ? normTex(F.q) : '';
  let list = allDocs().flatMap(d => d.forms.map(x => ({ ...x, f: d }))).filter(x => (!F.subj || x.f.subj === F.subj) && (!F.meta || x.kind === 'block'));
  if (F.q) list = list.filter(x => norm(`${x.name} ${x.head} ${x.f.title} ${x.vars.map(v => v.desc).join(' ')}`).includes(nq) || (tq.length > 1 && normTex(x.tex).includes(tq)));
  const shown = list.slice(0, formLim);
  box.innerHTML = `<p class="count">${plural(list.length, 'fórmula', 'fórmulas')}</p>` + (shown.length ? `<div class="fgrid">${shown.map(x => {
    const vars = x.vars.length ? `<table class="fv"><thead><tr><th>Símbolo</th><th>Significado</th><th>Unidad</th></tr></thead><tbody>${x.vars.map(v => `<tr><td>${kx(v.sym, false)}</td><td>${renderInline(v.desc)}</td><td>${esc(v.unit)}</td></tr>`).join('')}</tbody></table>` : `<p class="fv-a"><small>Variables detectadas</small> ${texVars(x.tex).map(v => `<span class="vchip">${kx(v, false)}</span>`).join('')}</p>`;
    return `<article class="fcard" style="--c:${x.f.s.color}"><header><h3>${esc(x.name || x.head || x.f.title)}</h3><span class="bd sb">${ico(x.f.s.icon)}${esc(x.f.subj)}</span></header><div class="fc-f">${kx(x.tex, true)}</div>${vars}${x.hyp ? `<p class="fc-h"><b>Hipótesis:</b> ${renderInline(x.hyp)}</p>` : ''}<footer><a href="${href(x.f.path)}" data-act="open" data-jump='${esc(JSON.stringify(x.ref))}'>${esc(x.f.title)} ${ico('chev')}</a>${x.kind === 'block' ? '<span class="bd ok">Ficha completa</span>' : ''}</footer></article>`;
  }).join('')}</div>${list.length > shown.length ? `<p class="center"><button class="btn" data-act="form-more">Mostrar más (${list.length - shown.length})</button></p>` : ''}` : emptyBox('sigma', 'No hay fórmulas que coincidan.', 'Escribe ecuaciones con $$…$$ en tus resúmenes o usa bloques <code>formula</code>.'));
}
ACT['form-more'] = () => { formLim += 40; formList(); };
function onFormInput(e) {
  const k = e.target.dataset && e.target.dataset.k; if (!k || !e.target.closest('.formf')) return;
  UI.form[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; formLim = 40; formList();
}

/* ---------- Mapas conceptuales (Mermaid) ---------- */
function mapSource(s) {
  const files = s.files, id = new Map(files.map((f, i) => [f, 'N' + i]));
  const lab = f => (f.title.replace(/["\[\]()<>{}|#&;`]/g, ' ').replace(/\s+/g, ' ').trim() || f.name);
  const lines = ['flowchart LR'], seen = new Set(); let edges = 0;
  files.forEach(f => lines.push(`  ${id.get(f)}["${lab(f)}"]:::${getSt(f)}`));
  const edge = (a, b, k) => { const key = a + k + b; if (seen.has(key)) return; seen.add(key); lines.push(`  ${a} ${k} ${b}`); edges++; };
  files.forEach(f => (f.preDocs || []).forEach(p => { if (id.has(p)) edge(id.get(p), id.get(f), '-->'); }));
  files.forEach(f => (f.relDocs || []).forEach(r => { if (id.has(r) && !seen.has(id.get(r) + '-.-' + id.get(f))) edge(id.get(f), id.get(r), '-.-'); }));
  let auto = false;
  if (!edges) { auto = true; const by = new Map(); files.forEach(f => { if (!by.has(f.sub)) by.set(f.sub, []); by.get(f.sub).push(f); }); by.forEach(fs => { for (let i = 1; i < fs.length; i++) edge(id.get(fs[i - 1]), id.get(fs[i]), '-->'); }); }
  const col = { pend: '--stp', curso: '--stc', repasar: '--str', dom: '--std' };
  for (const k in col) lines.push(`  classDef ${k} fill:${cssv('--s2')},stroke:${cssv(col[k])},stroke-width:2px,color:${cssv('--tx')}`);
  return { src: lines.join('\n'), auto, id };
}
async function mapsView(q) {
  if (needIdx('mapas', 'Mapas conceptuales')) return;
  const M = UI.map;
  if (S.fresh && q && q.get('subj')) M.subj = q.get('subj');
  if (!M.subj || !S.bySubj.has(M.subj)) M.subj = (S.subjects[0] || {}).key || '';
  const s = S.bySubj.get(M.subj);
  if (!s || s.files.length < 1) { V(`<h1 class="ph">${ico('map')} Mapas conceptuales</h1>${emptyBox('map', 'No hay resúmenes para dibujar un mapa.')}`); return; }
  const tok = S.tok, ms = mapSource(s);
  V(`<div class="ph-row"><div><h1 class="ph">${ico('map')} Mapas conceptuales</h1><p class="sub">Temas de la asignatura y cómo se relacionan: flechas continuas = prerrequisitos; discontinuas = relacionados. Haz clic en un tema para abrirlo.</p></div></div>
    <div class="pnl libf"><label class="sel"><span>Asignatura</span><select data-k="subj" data-scope="map">${optHtml(subjOptions('').slice(1), M.subj)}</select></label><div class="legend inl">${STATES.map(([k, l]) => `<span><span class="dot ${k}"></span>${l}</span>`).join('')}</div></div>
    ${ms.auto ? `<p class="hint">${ico('help')} Estos resúmenes aún no declaran relaciones, así que se muestra el orden de los temas. Añade <code>prerrequisitos:</code> o <code>relacionados:</code> al inicio de cada resumen para dibujar el mapa real (mira la Ayuda).</p>` : ''}
    <div class="mm map"><div class="mermaid" id="mapd">${esc(ms.src)}</div></div>`);
  try {
    await runMermaid([$('#mapd')]);
    if (tok !== S.tok) return;
    const byId = new Map([...ms.id].map(([f, k]) => [k, f]));
    $$('#mapd g.node').forEach(g => { const m = g.id.match(/flowchart-(N\d+)-/), f = m && byId.get(m[1]); if (f) { g.style.cursor = 'pointer'; g.addEventListener('click', () => { location.hash = href(f.path); }); } });
  } catch { const d = $('#mapd'); if (d) d.insertAdjacentHTML('beforebegin', '<p class="err">No se pudo cargar la librería de diagramas (Mermaid). Se muestra el código del mapa.</p>'); }
}
function onMapInput(e) { if (e.target.dataset && e.target.dataset.scope === 'map') { UI.map.subj = e.target.value; rerender(); } }

/* ---------- Estadísticas ---------- */
const mondayOf = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
function statsView() {
  S.view = 'tool:estadisticas'; S.cur = null; document.title = `Estadísticas · ${CFG.titulo}`;
  const lg = store.get(K.log, []), now = new Date(), t0 = mondayOf(now), weeks = [];
  for (let i = 7; i >= 0; i--) { const d = new Date(t0); d.setDate(d.getDate() - i * 7); weeks.push({ d, read: 0, review: 0, cards: 0, quiz: 0, pomo: 0 }); }
  for (const e of lg) { const m = mondayOf(new Date(e.t)).getTime(), w = weeks.find(x => x.d.getTime() === m); if (w && (e.k in w)) w[e.k]++; }
  const sessions = lg.filter(e => e.k === 'cards' || e.k === 'quiz' || e.k === 'review' || e.k === 'pomo').length;
  const wkNow = weeks[weeks.length - 1], sWeek = wkNow.review + wkNow.cards + wkNow.quiz + wkNow.pomo;
  const d30 = Date.now() - 30 * 864e5, rev30 = new Set(lg.filter(e => e.k === 'review' && e.t >= d30 && e.p).map(e => e.p)).size;
  const days = new Set(lg.map(e => ymd(new Date(e.t)))); let streak = 0, cur = today(); if (!days.has(cur)) cur = addDays(cur, -1);
  while (days.has(cur)) { streak++; cur = addDays(cur, -1); }
  const docs = allDocs(), pr = progress(docs), cards = IDX.ready ? allCards() : [], m = srsMap(), mature = cards.filter(c => (m[c.id] || {}).iv >= 21).length;
  const max = Math.max(4, ...weeks.map(w => w.read + w.review + w.cards + w.quiz + w.pomo)), W = 640, H = 220, L = 34, B = 28, bw = 46, gap = (W - L - 8 * bw) / 8;
  const colors = { read: 'var(--blue)', review: 'var(--vio)', cards: 'var(--ok)', quiz: 'var(--warn)', pomo: 'var(--bad)' }, names = { read: 'Lecturas', review: 'Repasos', cards: 'Tarjetas', quiz: 'Autoevaluaciones', pomo: 'Pomodoros' };
  let svg = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Actividad semanal de las últimas 8 semanas">`;
  for (let i = 0; i <= 4; i++) { const y = 10 + (H - B - 10) * (1 - i / 4); svg += `<line x1="${L}" x2="${W}" y1="${y}" y2="${y}" class="gl"/><text x="${L - 6}" y="${y + 4}" text-anchor="end" class="gt">${Math.round(max * i / 4)}</text>`; }
  weeks.forEach((w, i) => {
    let y = H - B; const x = L + gap / 2 + i * (bw + gap);
    for (const k of ['read', 'review', 'cards', 'quiz', 'pomo']) { const h = (H - B - 10) * w[k] / max; if (h > 0) { y -= h; svg += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" style="fill:${colors[k]}"><title>${names[k]}: ${w[k]}</title></rect>`; } }
    svg += `<text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle" class="gt">${w.d.getDate()} ${MONTHS[w.d.getMonth()].slice(0, 3)}</text>`;
  });
  svg += '</svg>';
  const desc = e => { const f = e.p && S.byPath.get(e.p); return e.k === 'read' ? `Lectura: ${f ? f.title : e.p}` : e.k === 'review' ? `Repaso: ${f ? f.title : 'tema'}` : e.k === 'dom' ? `Dominado: ${f ? f.title : 'tema'}` : e.k === 'cards' ? `Sesión de tarjetas (${e.n})` : e.k === 'pomo' ? `Pomodoro (${e.m} min)` : `Autoevaluación ${e.ok}/${e.n}`; };
  const rec = lg.slice(-8).reverse();
  const kpi = (b, s, i = '') => `<div class="kp static"><span class="kp-t"><small>${s}</small><b>${b}</b>${i ? `<i>${i}</i>` : ''}</span></div>`;
  V(`<h1 class="ph">${ico('chart')} Estadísticas de estudio</h1><p class="sub">Tu actividad se guarda solo en este navegador.</p>
    <div class="kps">${kpi(sessions, 'Sesiones completadas', `${sWeek} esta semana`)}${kpi(rev30, 'Temas repasados', 'últimos 30 días')}${kpi(streak, 'Racha de estudio', streak === 1 ? 'día' : 'días seguidos')}${kpi(`${pr.c.dom}/${pr.total}`, 'Temas dominados', `${pr.pct}%`)}${kpi(IDX.ready ? mature : '…', 'Tarjetas dominadas', IDX.ready ? `de ${cards.length}` : '')}</div>
    ${goalPanel()}
    <section class="pnl"><div class="sec-h"><h2>Evolución semanal</h2><div class="legend inl">${Object.keys(colors).map(k => `<span><i class="sq" style="background:${colors[k]}"></i>${names[k]}</span>`).join('')}</div></div>${svg}</section>
    <div class="two"><section class="pnl"><div class="sec-h"><h2>Progreso por asignatura</h2></div>${S.subjects.map(s => { const p = progress(s.files); return `<a class="pg" href="#/${encodeURIComponent(s.key)}" style="--c:${s.color}"><span class="pg-k">${ico(s.icon)}${esc(s.key)}</span>${segBar(p)}<b>${p.pct}%</b></a>`; }).join('') || '<p class="muted">Sin asignaturas.</p>'}</section>
    <section class="pnl"><div class="sec-h"><h2>Actividad reciente</h2></div>${rec.length ? rec.map(e => `<div class="evr"><i class="${e.k === 'quiz' ? 'task' : e.k === 'cards' ? 'ex' : 'rev'}"></i><span class="evr-t">${esc(desc(e))}</span><span class="rel">${ago(e.t)}</span></div>`).join('') : '<p class="muted">Todavía no hay actividad registrada. Lee un resumen, repasa tarjetas o haz una autoevaluación.</p>'}</section></div>`);
}

/* ---------- Ajustes y copia de seguridad ---------- */
function settingsView() {
  S.view = 'tool:ajustes'; S.cur = null; document.title = `Ajustes · ${CFG.titulo}`;
  const n = store.keys().length;
  V(`<h1 class="ph">${ico('settings')} Ajustes</h1><p class="sub">Todo lo que guardas (estados, favoritos, exámenes, tareas, tarjetas, estadísticas) vive en este navegador. Haz copias de seguridad para no perderlo.</p>
    <section class="pnl"><h3 class="lh nm">Apariencia</h3><div class="seg3" role="group" aria-label="Tema">${[['auto', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => `<button data-act="theme" data-t="${k}" class="${themePref === k ? 'on' : ''}">${l}</button>`).join('')}</div>
      <div class="fld"><label for="fsr">Tamaño del texto: <b id="fsv">${fs}px</b></label><input id="fsr" type="range" min="13" max="24" value="${fs}" data-act-input="fs"></div></section>
    ${syncPanel()}${widthPanel()}
    <section class="pnl"><h3 class="lh nm">Copia de seguridad</h3><p class="muted">${plural(n, 'bloque de datos guardado', 'bloques de datos guardados')} en este navegador.</p><div class="dh-act"><button class="btn" data-act="export">${ico('download')} Exportar copia</button><label class="btn" tabindex="0">${ico('upload')} Importar copia<input type="file" accept="application/json,.json" id="imp" hidden></label><button class="btn danger" data-act="reset">${ico('trash')} Borrar todos mis datos</button></div></section>
    <section class="pnl"><h3 class="lh nm">Atajos de teclado</h3><dl class="keys">${[['Ctrl + K', 'Paleta de comandos'], ['/', 'Buscar'], ['B', 'Mostrar u ocultar el índice'], ['F', 'Modo enfoque (lectura)'], ['P', 'Pomodoro'], ['← →', 'Resumen anterior / siguiente'], ['Espacio · 1-4', 'Tarjetas: mostrar respuesta · valorar'], ['Esc', 'Cerrar paneles']].map(([k, v]) => `<div><dt><kbd>${k}</kbd></dt><dd>${v}</dd></div>`).join('')}</dl></section>`);
}
ACT.theme = el => setTheme(el.dataset.t);
ACT.export = () => {
  const data = {}; store.keys().forEach(k => { data[k] = store.get(k, null); });
  const blob = new Blob([JSON.stringify({ app: 'resumenes', v: 1, date: new Date().toISOString(), data }, null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `resumenes-copia-${today()}.json`; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast('Copia exportada');
};
ACT.reset = () => confirmModal('Se borrarán estados, favoritos, exámenes, tareas, tarjetas y estadísticas de este navegador. No se puede deshacer.', () => { store.keys().forEach(k => store.del(k)); location.hash = '#/'; location.reload(); }, 'Borrar todo');
function onImport(e) {
  if (e.target.id !== 'imp' || !e.target.files[0]) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const j = JSON.parse(rd.result); if (!j || !j.data) throw 0;
      confirmModal(`Se importarán ${Object.keys(j.data).length} bloques de datos y se sobrescribirán los actuales.`, () => { for (const k in j.data) if (k.startsWith('rv-') && k !== 'rv-tree-v1') store.set(k, j.data[k]); location.reload(); }, 'Importar');
    } catch { toast('El archivo no es una copia válida'); }
  };
  rd.readAsText(e.target.files[0]);
}

/* ---------- Ayuda ---------- */
function helpView() {
  S.view = 'tool:ayuda'; S.cur = null; document.title = `Ayuda · ${CFG.titulo}`;
  const F = '`'.repeat(3);
  const code = t => `<pre class="hp"><code>${esc(t)}</code></pre>`;
  V(`<h1 class="ph">${ico('help')} Ayuda: cómo escribir los resúmenes</h1><p class="sub">La página funciona con Markdown normal. Si añades estos extras, se activan más herramientas. Todo es opcional.</p>
    <section class="pnl help"><h3 class="lh nm">1 · Metadatos al principio del archivo</h3><p>Sirven para los filtros, el buscador por etiquetas, los relacionados y los mapas conceptuales.</p>
    ${code('---\ntitulo: Algoritmos de consenso\ntags: [consenso, paxos, tolerancia a fallos]\ndificultad: 2\ntipo: Teoría\ntema: Coordinación\norden: 3\nprerrequisitos: [Relojes lógicos, Comunicación por mensajes]\nrelacionados: [Replicación]\nasignatura: Sistemas Distribuidos\n---')}
    <p class="muted"><b>dificultad</b>: 1 fácil · 2 media · 3 difícil. <b>prerrequisitos</b> y <b>relacionados</b> aceptan el título o el nombre del archivo de otro resumen de la misma asignatura. <b>tipo</b> se deduce de la carpeta (Teoria, Practica…) si no lo pones.</p></section>
    <section class="pnl help"><h3 class="lh nm">2 · Fórmulas</h3><p>Inline con <code>$E=mc^2$</code> y en bloque con <code>$$…$$</code>. Para una ficha completa:</p>
    ${code(F + 'formula\nnombre: Ley de Ohm\ntex: V = I \\cdot R\nvariables:\n  V: tensión [V]\n  I: intensidad [A]\n  R: resistencia [Ω]\nhipotesis: circuito lineal y a temperatura constante\n' + F)}</section>
    <section class="pnl help"><h3 class="lh nm">3 · Tarjetas de memoria</h3><p>Una por línea, con <code>::</code> entre pregunta y respuesta:</p>
    ${code(F + 'flashcards\n¿Qué garantiza Paxos? :: Acuerdo entre nodos aunque fallen algunos.\n¿Derivada de $x^2$? :: $2x$\n' + F)}</section>
    <section class="pnl help"><h3 class="lh nm">4 · Autoevaluación</h3><p>Preguntas separadas por una línea en blanco; marca la correcta con <code>[x]</code>:</p>
    ${code(F + 'quiz\n¿Cuántos nodos tolera fallar Paxos con 5 nodos?\n- [ ] 1\n- [x] 2\n- [ ] 3\nExplicación: necesita mayoría, es decir 3 de 5.\n\n¿Otra pregunta?\n- [x] Sí\n- [ ] No\n' + F)}</section>
    <section class="pnl help"><h3 class="lh nm">5 · Avisos y diagramas</h3>${code('> [!NOTE]\n> Una nota destacada. También [!TIP], [!IMPORTANT], [!WARNING] y [!CAUTION].\n\n' + F + 'mermaid\ngraph TD; A-->B; B-->C;\n' + F)}</section>
    <section class="pnl help"><h3 class="lh nm">6 · Buscador</h3><p>Escribe palabras sueltas o combina filtros:</p>
    ${code('paxos asignatura:SD tag:consenso\ntipo:teoria dif:2 estado:repasar\nfav:\nf:x^2+y^2     (busca fórmulas)\n∑  \\int  \\frac{a}{b}')}
    <p class="muted">La búsqueda de fórmulas entiende símbolos Unicode (∑ ∫ π ≤…) y palabras como «integral» o «raíz». Al abrir un resultado, la página te lleva a la coincidencia.</p></section>`);
}
