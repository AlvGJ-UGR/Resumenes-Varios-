# Uso: python3 dev/build.py  → regenera ../index.html a partir de dev/src
import os
d = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src') + os.sep
t = open(d + 'template.html', encoding='utf8').read()
css = open(d + 'style.css', encoding='utf8').read()
js = '\n'.join(open(d + f, encoding='utf8').read() for f in ['01_core.js', '02_content.js', '03_views.js', '04_study.js', '05_app.js', '06_extra.js'])
assert '</script' not in js
open(os.path.join(d, '..', '..', 'index.html'), 'w', encoding='utf8').write(t.replace('/*CSS*/', css).replace('/*JS*/', js))
print('index.html generado')
