//In the previous examples, you used the require function to load modules, which provide code reuse when adding functionality to Node.js.
//You can create your own module by wrapping your code in a function and exporting it so it can be called from other code.
var http = require('http');
var url = require('url');

function start() {
    http.createServer(function (request, response) {
        var url_parts = url.parse(request.url, true);

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello ' + url_parts.query.name + '!\n');
        console.log('Handled request from ' + url_parts.query.name);


    }).listen(8080, 'localhost');

    console.log('Server running at http://localhost:8080/'); 
}

exports.start = start;

//In this example, the existing code has been wrapped with a start function. 
//At the bottom of the file, the start function is assigned to a start property on the exports object.
//The code is saved, and the module is created. 