import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const syntax = spawnSync(process.execPath, ['--check', path.join(root, 'assets/js/site.js')], { encoding: 'utf8' });
assert.equal(syntax.status, 0, syntax.stderr);
async function files(directory) { const entries = await readdir(directory, { withFileTypes: true }); return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat(); }
const all = await files(root);
let links = 0;
for (const filename of all) {
  assert.match(path.extname(filename) || path.basename(filename), /^(\.html|\.css|\.js|\.svg|\.png|\.nojekyll)$/i, `Archivo inesperado en el directorio público: ${path.relative(root, filename)}`);
  if (path.extname(filename) === '.png') continue;
  const source = await readFile(filename, 'utf8');
  assert(!/localhost|127\.0\.0\.1|@example\.|Bearer\s|jdbc:|com\.graimsisp|tenantId|password\s*[:=]|api[_-]?secret|BEGIN PRIVATE KEY/i.test(source), `Referencia no pública en ${path.relative(root, filename)}`);
  assert(!/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i.test(source), 'No publicar identificadores operativos.');
  if (!filename.endsWith('.html')) continue;
  assert.match(source, /<html lang="es"/); assert.match(source, /name="viewport"/); assert.match(source, /<title>[^<]+<\/title>/);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]); assert.equal(new Set(ids).size, ids.length, `IDs duplicados en ${filename}`);
  assert(!/<form\b/i.test(source), 'El sitio público inicial no recoge datos mediante formularios.');
  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('mailto:')) { assert(value.startsWith('mailto:grimisti95@gmail.com'), 'Correo no autorizado.'); continue; }
    assert(!/^(https?:|\/\/|\/)/i.test(value), `Usar recursos propios y rutas relativas para Pages: ${value}`);
    const [relative, hash] = value.split('#');
    const target = relative ? path.resolve(path.dirname(filename), relative) : filename;
    assert(target.startsWith(root), 'Referencia fuera del directorio público.');
    assert((await stat(target)).isFile(), `Recurso no encontrado: ${value}`);
    if (hash) { const targetSource = target === filename ? source : await readFile(target, 'utf8'); assert(targetSource.includes(`id="${hash}"`), `Ancla no encontrada: ${value}`); }
    links++;
  }
  assert(source.includes('grimisti95@gmail.com'), 'El contacto debe estar visible también sin JavaScript.');
}
const home = await readFile(path.join(root, 'index.html'), 'utf8');
assert.equal([...home.matchAll(/data-status="implemented"/g)].length, 6);
assert.equal([...home.matchAll(/data-status="development"/g)].length, 3);
const privacy = await readFile(path.join(root, 'privacidad.html'), 'utf8');
assert(privacy.includes('Aviso de privacidad.') && privacy.includes('grimisti95@gmail.com'), 'Debe existir un aviso de privacidad con contacto.');
console.log(`PASS · ${all.length} archivos públicos, ${links} referencias locales, JavaScript válido, 6 áreas implementadas y 3 en desarrollo.`);
console.log('PASS · Sin recursos remotos, formularios, datos operativos ni credenciales detectados en el contenido público.');
if (process.argv.includes('--publish')) {
  const markers = [ /Documento provisional\./i, /Versión provisional/i, /pendientes? de confirmación/i, /debe completarse/i, /deberá definir/i ];
  const pending = markers.filter(marker => marker.test(privacy));
  if (pending.length) {
    console.error('PUBLICACIÓN BLOQUEADA: el aviso de privacidad conserva información provisional o pendiente. Completa los datos reales del responsable, domicilio, solicitudes y conservación antes del push.');
    process.exitCode = 1;
  } else console.log('PASS · No se detectaron los marcadores legales provisionales conocidos. Requiere revisión del titular antes de publicar.');
}
