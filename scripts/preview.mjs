import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('PORT debe ser un puerto válido entre 1024 y 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname === '/grips-web') { response.writeHead(302, { Location: '/grips-web/' }); response.end(); return; }
    if (pathname.startsWith('/grips-web/')) pathname = pathname.slice('/grips-web'.length);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const filename = path.resolve(root, '.' + pathname);
    if (!filename.startsWith(root) || !(await stat(filename)).isFile()) throw new Error('Not found');
    const data = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Página no encontrada.');
  }
});
server.on('error', error => { console.error(`No se pudo iniciar la vista previa: ${error.code || error.message}`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`GRIPS web · Local: http://localhost:${port}/ · Subruta Pages: http://localhost:${port}/grips-web/`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
