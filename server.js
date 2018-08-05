const http = require('http');
const fs = require('fs');
const url = require('url')

let fileName = 'index.html';
http.createServer(function (request, response) {
    var r = url.parse(request.url, true);
    var q = r.query
    var c_type = 'text/html'
    var c_encode = 'utf-8'
    console.log('request ', r.pathname);
    console.log('query data', q);
    console.log()

    switch (r.pathname) {
        case '/favicon.ico':
            console.log("ico request")
            fileName = 'favicon.png';
            fs.createReadStream(fileName).pipe(response);
            return;
        case '/':
            fileName = 'index.html';
            break;
        case '/login':
            if(q.name == "admin" && q.pass == "pass")
                fileName = 'mainpage.html';
            else
                fileName = 'accessdenied.html';
            break;
        default:
            fileName = '404.html';
            break;
    }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': c_type
        });
        response.end(content, c_encode);
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');