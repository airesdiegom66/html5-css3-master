
//1. The first line of code states that the http module needs to be loaded. The http module is a core built-in, low-level module that is 
//highly optimized for performance. 
var http = require('http'); 

//2.The next line uses the http module to create a server object. The createServer function accepts a single parameter that is an anonymous 
//function and has request object and response object parameters. 
//Inside the function, you include all the code to run your website or, better yet, to make calls to other functions that handle your website. 
http.createServer(function (request, response) {
    
    //This example does nothing with the request object, but it uses the response object to write an HTTP header in which 200 means success, 
    //and the content type tells the browser that the content is plain text. 
    response.writeHead(200, {'Content-Type': 'text/plain'});   

    //The next line ends the response with the Hello World message and, finally, a message is sent to the console window, stating that a request was handled.
    response.end('Hello World from Node.js!\n');       
    
    console.log('Handled request');
 }).listen(8080, 'localhost'); 
    
 console.log('Server running at http://localhost:8090/');


// When the createServer function is executed, a server object is returned. 
// The server object calls the listen function, in which port 8080 is specified as the port to listen on, 
// and the IP address is set to localhost, which is 127.0.0.1. As long as you have an operating network adapter 
// installed on your computer, this web server should start listening for incoming web requests. The last statement uses
// the console object to write a message to the screen to let you know that the server is waiting for requests. 
// After you save this file, run the following from the command prompt to start running your web server.

