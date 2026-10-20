// Genera index.json con el texto de todos los resúmenes (una sola descarga para la web).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
const ROOT = process.cwd(), SKIP = new Set(['.git', '.github', 'node_modules', 'tools', 'dev']);
const files = {};
(function walk(d) {
  for (const n of readdirSync(d).sort()) {
    if (SKIP.has(n) || n.startsWith('.')) continue;
    const p = join(d, n), st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(md|markdown)$/i.test(n) && !/^readme\./i.test(n)) {
      const rel = relative(ROOT, p).split(sep).join('/');
      if (rel.includes('/')) files[rel] = readFileSync(p, 'utf8');
    }
  }
})(ROOT);
const out = JSON.stringify({ app: 'resumenes', generated: new Date().toISOString(), files });
writeFileSync('index.json', out);
console.log(`index.json: ${Object.keys(files).length} resúmenes, ${(out.length / 1024).toFixed(0)} KB`);
