var http = require('http'); 
var url = require('url'); 

http.createServer(function (request, response) {   
    var url_parts = url.parse(request.url, true);   
    response.writeHead(200, {'Content-Type': 'text/plain'});   
    response.end('Hello ' + url_parts.query.name + '!\n');  //este .name poderia ser qualquer coisa na querystring 
    
    console.log('Handled request from ' + url_parts.query.name); 

}).listen(8080, 'localhost'); 

console.log('Server running at http://localhost:8080/');
