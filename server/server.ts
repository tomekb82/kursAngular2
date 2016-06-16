var http = require('http');


var server = http.createServer((request, response)=> {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World!\n');
});

var port = 8000;

server.listen(port);
console.log('Listening on http://localhost:' + port);