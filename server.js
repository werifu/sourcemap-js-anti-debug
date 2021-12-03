const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('demo.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length,
                // 'Content-Security-Policy': "default-src 'self'"
            });
            res.write(data);
            res.end();
        });
        return;
    }
    if (req.url.startsWith('/report?')) {
        let data = req.url.split('/report?data=');
        if (data.length > 1) {
            data = data[1];
            res.statusCode = 200;
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'httpOnly': 'false',
                'Set-Cookie': [
                    'code=alert("QAQ DONT WATCH ME!")',
                    'devOpen=true',
                ],
            })
            res.end('Hello World');
            return;
        }
    }
    res.statusCode = 404;
    res.end('Not found');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});