// Serveur local minimal : sert la page + l'image et persiste le tableau dans board.json
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA = path.join(ROOT, 'board.json');
const BACKUP = path.join(ROOT, 'board.backup.json');
const PORT = Number(process.env.PORT) || 4321;

const STATIC = {
  '/index.html': 'text/html; charset=utf-8',
  '/dessin.jpg': 'image/jpeg',
  '/characters.json': 'application/json; charset=utf-8',
};
const EMPTY = JSON.stringify({ version: 1, persons: [], links: [], notes: [] }, null, 2);

// Copie de sécurité au démarrage, au cas où
if (fs.existsSync(DATA)) fs.copyFileSync(DATA, BACKUP);

function writeBoard(req, res) {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks).toString('utf8');
    try {
      JSON.parse(body);
    } catch {
      res.writeHead(400);
      return res.end('JSON invalide');
    }
    const tmp = DATA + '.tmp';
    fs.writeFile(tmp, body, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end(String(err));
      }
      fs.rename(tmp, DATA, (err2) => {
        res.writeHead(err2 ? 500 : 204);
        res.end();
      });
    });
  });
}

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');

    if (pathname === '/api/board') {
      if (req.method === 'GET') {
        return fs.readFile(DATA, (err, buf) => {
          res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
          res.end(err ? EMPTY : buf);
        });
      }
      if (req.method === 'PUT' || req.method === 'POST') return writeBoard(req, res);
      res.writeHead(405);
      return res.end();
    }

    const file = pathname === '/' ? '/index.html' : pathname;
    const type = STATIC[file];
    if (!type) {
      res.writeHead(404);
      return res.end('Not found');
    }
    fs.readFile(path.join(ROOT, file), (err, buf) => {
      if (err) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
      res.end(buf);
    });
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log(`Tableau d'enquête : http://localhost:${PORT}`);
    console.log(`Données : ${DATA}`);
  });
