// Simple HTTP Server for local development
// Run with: node server.js
// Then visit: http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Interceptar API de compromisos
    if (req.url.startsWith('/api/compromisos')) {
        const dbPath = path.join(__dirname, 'js/data/compromisos_db.json');

        const readDb = () => {
            if (!fs.existsSync(dbPath)) return [];
            try {
                return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            } catch (e) {
                return [];
            }
        };

        const writeDb = (data) => {
            const dir = path.dirname(dbPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
        };

        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'GET') {
            const list = readDb();
            res.writeHead(200);
            res.end(JSON.stringify({ status: 'local', data: list }));
            return;
        }

        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { nombre, compromiso, fecha } = JSON.parse(body);
                    if (!nombre || !compromiso) {
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: 'Nombre y compromiso requeridos' }));
                        return;
                    }
                    const list = readDb();
                    list.unshift({ nombre, compromiso, fecha });
                    writeDb(list);
                    res.writeHead(201);
                    res.end(JSON.stringify({ success: true }));
                } catch (e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                }
            });
            return;
        }

        if (req.method === 'DELETE') {
            const urlObj = new URL(req.url, `http://${req.headers.host}`);
            const index = urlObj.searchParams.get('index');
            if (index === null) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Index is required' }));
                return;
            }
            const idx = parseInt(index);
            const list = readDb();
            if (isNaN(idx) || idx < 0 || idx >= list.length) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Index out of range' }));
                return;
            }
            list.splice(idx, 1);
            writeDb(list);
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
            return;
        }

        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    // Default to index.html
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Get file extension
    const ext = path.extname(filePath);

    // MIME types
    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // Read and serve file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Error en servidor', 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Plurality App servicio en: http://localhost:' + PORT);
    console.log('Presiona Ctrl+C para detener el servidor');
});
