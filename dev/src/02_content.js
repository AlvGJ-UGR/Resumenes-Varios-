/* ============ Contenido Markdown: render, fórmulas, bloques, resaltado ============ */
const kx = (tex, display) => {
  try { if (typeof katex === 'undefined') throw 0; return katex.renderToString(tex, { displayMode: !!display, throwOnError: false }); }
  catch { return `<code>${esc(tex)}</code>`; }
};
const mathHtml = (m, i) => `<span class="mx${m.display ? ' d' : ''}" data-m="${i}">${kx(m.tex, m.display)}</span>`;

function renderInline(s) {
  const math = [];
  const t = String(s).replace(MATH_RE, (m, d, i) => `RVMATH${math.push({ tex: (d != null ? d : i).trim(), display: d != null }) - 1}X`);
  let h;
  try { h = DOMPurify.sanitize(marked.parseInline(t)); } catch { h = esc(t); }
  return h.replace(/RVMATH(\d+)X/g, (_, k) => kx(math[k].tex, math[k].display));
}

function formulaCard(o, j) {
  const vars = o.vars.length ? `<table class="fv"><thead><tr><th>Símbolo</th><th>Significado</th><th>Unidad</th></tr></thead><tbody>${o.vars.map(v => `<tr><td>${kx(v.sym, false)}</td><td>${renderInline(v.desc)}</td><td>${esc(v.unit)}</td></tr>`).join('')}</tbody></table>` : '';
  return `<figure class="fc" data-b="${j}">${o.name ? `<figcaption>${ico('sigma')}<span>${renderInline(o.name)}</span></figcaption>` : ''}<div class="fc-f">${kx(o.tex, true)}</div>${vars}${o.hyp ? `<p class="fc-h"><b>Hipótesis:</b> ${renderInline(o.hyp)}</p>` : ''}${o.note ? `<p class="fc-h">${renderInline(o.note)}</p>` : ''}</figure>`;
}
function cardsBlock(b, j, f) {
  const cs = b.parsed || [];
  return `<div class="cdb" data-b="${j}"><div class="cdb-h"><span>${ico('cards')} Tarjetas de memoria · ${cs.length}</span><a class="btn sm" href="${toolHref('tarjetas', 'doc=' + encodeURIComponent(f.path) + '&go=1')}">Estudiar</a></div>${cs.map(c => `<details class="cd"><summary>${renderInline(c.q)}</summary><div class="cd-a">${renderInline(c.a).replace(/\n/g, '<br>')}</div></details>`).join('')}</div>`;
}
function quizWidget(b, j) {
  const qs = b.parsed || [];
  return `<div class="qz" data-b="${j}" data-n="${qs.length}"><div class="qz-h"><span>${ico('quiz')} Autoevaluación · ${plural(qs.length, 'pregunta', 'preguntas')}</span><span class="qz-s"></span></div>${qs.map((q, i) => `<div class="qq" data-i="${i}" data-ok="${q.ok.join(',')}"><p class="qt">${i + 1}. ${renderInline(q.q)}</p><div class="qos">${q.opts.map((o, k) => `<button type="button" class="qo" data-act="qz-opt" data-k="${k}">${renderInline(o)}</button>`).join('')}</div>${q.exp ? `<div class="qx" hidden>${renderInline(q.exp)}</div>` : ''}</div>`).join('')}</div>`;
}
function blockHtml(b, j, f) {
  if (!b) return '';
  if (b.type === 'formula') return b.parsed && b.parsed.tex ? formulaCard(b.parsed, j) : '';
  if (b.type === 'cards') return cardsBlock(b, j, f);
  return quizWidget(b, j);
}
ACT['qz-opt'] = el => {
  const q = el.closest('.qq'); if (!q || q.dataset.done) return;
  const ok = q.dataset.ok.split(',').map(Number), k = +el.dataset.k;
  $$('.qo', q).forEach((b, i) => { b.disabled = true; if (ok.includes(i)) b.classList.add('ok'); else if (i === k) b.classList.add('bad'); });
  q.dataset.done = '1'; q.dataset.right = ok.includes(k) ? '1' : '0';
  const x = $('.qx', q); if (x) x.hidden = false;
  const z = q.closest('.qz'), qs = $$('.qq', z), done = qs.filter(e => e.dataset.done).length, right = qs.filter(e => e.dataset.right === '1').length;
  $('.qz-s', z).textContent = done === qs.length ? `Resultado: ${right}/${qs.length}` : `${done}/${qs.length}`;
};

function renderDoc(f) {
  const P = f.P;
  let html;
  try { html = DOMPurify.sanitize(marked.parse(P.src, { gfm: true })); } catch (e) { html = `<pre>${esc(P.src)}</pre>`; }
  html = html.replace(/<p>\s*RVBLK(\d+)X\s*<\/p>/g, (_, j) => blockHtml(P.blocks[j], +j, f)).replace(/RVBLK(\d+)X/g, (_, j) => blockHtml(P.blocks[j], +j, f));
  return html.replace(/RVMATH(\d+)X/g, (_, i) => P.math[i] ? mathHtml(P.math[i], +i) : '');
}

/* ---------- Mermaid (carga perezosa, colores de la paleta) ---------- */
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
let mermaidP = null;
function loadMermaid() {
  mermaidP = mermaidP || new Promise((res, rej) => {
    if (window.mermaid) return res(window.mermaid);
    const sc = document.createElement('script');
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js';
    sc.onload = () => window.mermaid ? res(window.mermaid) : rej(new Error('mermaid')); sc.onerror = () => { mermaidP = null; rej(new Error('mermaid')); };
    document.head.append(sc);
  });
  return mermaidP;
}
async function runMermaid(nodes) {
  const m = await loadMermaid();
  m.initialize({
    startOnLoad: false, securityLevel: 'strict', theme: 'base', fontFamily: cssv('--font').replace(/"/g, ''),
    themeVariables: { background: cssv('--s1'), primaryColor: cssv('--s2'), primaryTextColor: cssv('--tx'), primaryBorderColor: cssv('--blue'), lineColor: cssv('--tx2'), secondaryColor: cssv('--s3'), tertiaryColor: cssv('--s1'), textColor: cssv('--tx'), mainBkg: cssv('--s2'), nodeBorder: cssv('--blue'), clusterBkg: cssv('--s1'), edgeLabelBackground: cssv('--s1') }
  });
  await m.run({ nodes });
}

/* ---------- Post-proceso del documento ---------- */
function fixContent(md, f) {
  const base = 'https://h/' + encPath(f.path);
  const CALL = { note: 'Nota', tip: 'Consejo', important: 'Importante', warning: 'Aviso', caution: 'Precaución' };
  md.querySelectorAll('blockquote').forEach(bq => {
    const p = bq.firstElementChild;
    if (!p || p.tagName !== 'P') return;
    const m = p.innerHTML.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<br\s*\/?>)?\s*/i);
    if (!m) return;
    const k = m[1].toLowerCase();
    p.innerHTML = p.innerHTML.slice(m[0].length);
    if (!p.textContent.trim() && !p.children.length) p.remove();
    bq.classList.add('callout', k);
    const t = document.createElement('div'); t.className = 'ct'; t.textContent = CALL[k]; bq.prepend(t);
  });
  const mm = [];
  md.querySelectorAll('pre > code.language-mermaid').forEach(code => {
    const box = document.createElement('div'); box.className = 'mm';
    const d = document.createElement('div'); d.className = 'mermaid'; d.textContent = code.textContent;
    box.append(d); code.parentElement.replaceWith(box); mm.push(d);
  });
  if (mm.length) runMermaid(mm).catch(() => {});
  md.querySelectorAll('img').forEach(img => {
    const s = img.getAttribute('src') || '';
    if (!/^(https?:|data:)/i.test(s)) { try { const u = new URL(s, base); img.src = rawUrl(decodeURIComponent(u.pathname.slice(1))); } catch {} }
    img.loading = 'lazy';
  });
  md.querySelectorAll('a[href]').forEach(a => {
    const h = a.getAttribute('href');
    if (h.startsWith('#')) {
      a.addEventListener('click', e => { e.preventDefault(); const t = document.getElementById(decodeURIComponent(h.slice(1))); if (t) t.scrollIntoView(); });
    } else if (/^(https?:|mailto:)/i.test(h)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else {
      try {
        const u = new URL(h, base), p = decodeURIComponent(u.pathname.slice(1));
        if (S.byPath.has(p)) a.href = href(p); else { a.href = ghUrl(p); a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      } catch {}
    }
  });
  md.querySelectorAll('table:not(.fv)').forEach(t => { if (t.parentElement.classList.contains('tw')) return; const w = document.createElement('div'); w.className = 'tw'; t.replaceWith(w); w.append(t); });
  if (window.hljs) md.querySelectorAll('pre code').forEach(el => { try { hljs.highlightElement(el); } catch {} });
  md.querySelectorAll('pre').forEach(pre => {
    const w = document.createElement('div'); w.className = 'pw'; pre.replaceWith(w); w.append(pre);
    const b = document.createElement('button'); b.className = 'cp'; b.type = 'button'; b.textContent = 'Copiar';
    b.onclick = async () => {
      try { await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, '')); b.textContent = '¡Copiado!'; } catch { b.textContent = 'Error'; }
      setTimeout(() => b.textContent = 'Copiar', 1400);
    };
    w.append(b);
  });
}

const headText = h => { const c = h.cloneNode(true); c.querySelectorAll('.katex-mathml,.hstar').forEach(x => x.remove()); return c.textContent.replace(/\s+/g, ' ').trim(); };
const slugify = t => norm(t).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';
let spy = null;
function setupHeadings(md, f) {
  const used = new Set(), hs = [...md.querySelectorAll('h1,h2,h3,h4')];
  hs.forEach(h => {
    const id = slugify(headText(h)); let n = id, k = 1; while (used.has(n)) n = id + '-' + (++k);
    used.add(n); h.id = n; h.dataset.t = headText(h);
  });
  hs.filter(h => /^H[234]$/.test(h.tagName)).forEach(h => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'hstar' + (isFavSec(f.path, h.id) ? ' on' : '');
    b.dataset.act = 'fav-sec'; b.dataset.id = h.id; b.title = 'Guardar sección en favoritos'; b.setAttribute('aria-label', 'Guardar sección en favoritos');
    b.innerHTML = ico('star'); h.append(b);
  });
  const items = hs.filter(h => /^H[23]$/.test(h.tagName)), toc = $('#toc');
  if (!toc) return;
  if (items.length < 3) { toc.remove(); return; }
  toc.innerHTML = '<b>En esta página</b>' + items.map(h => `<a class="${h.tagName === 'H3' ? 'l3' : ''}" href="#${h.id}">${esc(h.dataset.t)}</a>`).join('');
  const links = $$('a', toc);
  links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = document.getElementById(a.getAttribute('href').slice(1)); if (t) t.scrollIntoView(); }));
  spy = items.map((h, i) => [h, links[i]]);
}
ACT['fav-sec'] = el => {
  const f = S.curDoc; if (!f) return;
  const on = toggleFavSec(f.path, el.dataset.id, el.closest('h1,h2,h3,h4').dataset.t);
  el.classList.toggle('on', on); toast(on ? 'Sección guardada en favoritos' : 'Sección quitada de favoritos');
};

/* ---------- Resaltado de coincidencias ---------- */
function highlight(root, terms) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('.katex,.mermaid,script,style,button') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  const marks = [];
  for (const n of nodes) {
    const t = n.nodeValue, nt = norm(t);
    if (nt.length !== t.length) continue;
    const ranges = [];
    for (const w of terms) { let k = nt.indexOf(w); while (k >= 0) { ranges.push([k, k + w.length]); k = nt.indexOf(w, k + w.length); } }
    if (!ranges.length) continue;
    ranges.sort((a, b) => a[0] - b[0]);
    const frag = document.createDocumentFragment(); let last = 0;
    for (const [a, b] of ranges) {
      if (a < last) continue;
      frag.append(t.slice(last, a));
      const m = document.createElement('mark'); m.className = 'hl'; m.textContent = t.slice(a, b); frag.append(m); marks.push(m); last = b;
    }
    frag.append(t.slice(last)); n.replaceWith(frag);
  }
  return marks;
}
function hlBar(md, marks) {
  const bar = $('.actions'); if (!bar || !marks.length) return;
  let cur = 0;
  const box = document.createElement('span'); box.className = 'hlbar';
  box.innerHTML = `<button class="btn sm" data-d="-1" title="Coincidencia anterior" aria-label="Coincidencia anterior">${ico('up')}</button><span class="hl-n"></span><button class="btn sm" data-d="1" title="Coincidencia siguiente" aria-label="Coincidencia siguiente">${ico('down')}</button><button class="btn sm" data-d="0">Quitar resaltado</button>`;
  const go = i => {
    cur = (i + marks.length) % marks.length;
    marks.forEach((m, k) => m.classList.toggle('cur', k === cur));
    marks[cur].scrollIntoView({ block: 'center', behavior: 'instant' });
    $('.hl-n', box).textContent = `${cur + 1}/${marks.length}`;
  };
  box.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = +b.dataset.d;
    if (d === 0) { md.querySelectorAll('mark.hl').forEach(m => m.replaceWith(m.textContent)); md.normalize(); box.remove(); } else go(cur + d);
  });
  bar.insertBefore(box, bar.querySelector('.meta'));
  go(0);
}
function jumpTo(md, ref) {
  const el = ref.m != null ? md.querySelector(`.mx[data-m="${ref.m}"]`) : md.querySelector(`.fc[data-b="${ref.b}"]`);
  if (!el) return false;
  el.scrollIntoView({ block: 'center', behavior: 'instant' }); el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 2400);
  return true;
}
