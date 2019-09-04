/// <reference path="../jquery-3.2.1.js" />

//WebSocket protocol communications typically use TCP port number 80, so environments that block non- standard Internet connections by using a 
//firewall will still pass WebSocket packets.In the following example, a webpage is created that calls the WebSocket.org echo server, which will 
//return the message passed to it. 

//Whereas an HTTP URL begins with http:// or https:// for secure HTTP, the WebSocket URL begins with ws:// or wss:// for secure WebSocket protocol. 
//In the browser code, you create a WebSocket object and configure the onopen, onmessage, onerror, and onclose events.Call the send method to send a message,
//and the onmessage event triggers if there is a response.The default.js file contains the following.

var wsUri = 'ws://echo.websocket.org/';
var webSocket;
var timerId = 0;

//Creating the WebSocket object automatically initiates communications to the URI to attempt to open the connection asynchronously.
//The connect function also subscribes to the onopen, onclose, onmessage, and onerror events.
//It’s important to subscribe to these events immediately because the connection might open quickly, and you want to ensure that you are 
//subscribed to the onopen event as soon as possible so you don’t miss the event.
function connect() {
    webSocket = new WebSocket(wsUri);
    webSocket.onopen = function (evt) { onOpen(evt) };
    webSocket.onclose = function (evt) { onClose(evt) };
    webSocket.onmessage = function (evt) { onMessage(evt) };
    webSocket.onerror = function (evt) { onError(evt) };
}

function onOpen(evt) {
    writeOutput("CONNECTED");
    keepAlive(); 
}

function onClose(evt) {
    writeOutput("DISCONNECTED");
}

function onMessage(evt) {
    writeOutput('RESPONSE: ' + evt.data);
}

function onError(evt) {
    writeOutput('ERROR: ' + evt.data);
}

function doSend() {

    //The readyState property will be set to one of the numeric values, but you can use the constants as shown in the doSend function that tests for webSocket.OPEN. 

    if (webSocket.readyState != webSocket.OPEN) {
        writeOutput("NOT OPEN: " + $('#txtMessage').val());

        return;
    }
    writeOutput("SENT: " + $('#txtMessage').val());
    webSocket.send($('#txtMessage').val()); //send: A method that sends data to the server.
}

//One of the problems you might encounter is that the server might time out your connection after a period of inactivity.
//You might also have firewalls between your browser and the server that can time out your connection.In many cases, an error is triggered without an associated message.
//You can identify timeout errors by not triggering any activity for up to 20 minutes.
//You might see that you consistently get timeouts after only 30 seconds.Although it’s relatively new, the W3C draft for WebSocket does not address timeouts.
//One way of dealing with timeouts is to send an empty message to the server periodically
function keepAlive() {
    var timeout = 15000; //A keepAlive function has been added that sends an empty message every 15 seconds. 

    if (webSocket.readyState == webSocket.OPEN) {
        webSocket.send('');
        //writeOutput("SENT: teste");
    }
    timerId = setTimeout(keepAlive, timeout);
}

function cancelKeepAlive() {
    if (timerId) {        
        clearTimeout(timerId);
    }
}

function writeOutput(message) {
    var output = $("#divOutput");
    output.html(output.html() + '<br />' + message);
}

function checkSupported() {
    if (window.WebSocket) {
        writeOutput('WebSockets supported!');
        return true;
    }
    else {
        writeOutput('WebSockets NOT supported');
        $('#btnSend').attr('disabled', 'disabled');
        return false;
    }
}

$(document).ready(function () {
    if (checkSupported()) {
        connect();
        $('#btnSend').click(doSend);
    }
});
//The doSend function sends a message to the server.Before sending the message, this function checks the readyState property of the WebSocket object.
//The readyState property contains one of the following values.

//■■ CONNECTING = 0 Connection is not yet open.
//■■ OPEN = 1 Connection is open and ready to communicate.
//■■ CLOSING = 2 Connection is in the process of closing.
//■■ CLOSED = 3 Connection is closed or couldn’t be opened. 