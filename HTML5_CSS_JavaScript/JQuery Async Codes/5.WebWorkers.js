/// <reference path="../../scripts/jquery-3.2.1.js" />

//Another way to perform asynchronous operations is to use web workers.Web workers are useful for execution of a script file in a background task.
//The worker can send messages to the spawning task by posting messages to an event handler specified by the creator.Messages can be any object that can be serialized.
//The worker thread doesn’t block the user interface thread, so the UI remains fast and fluid.

//Web workers’ state is isolated from the webpage.When messages are posted to and from the web worker, the message object is serialized.
//This creates a copy of the message, so the web worker and the creator never reference the same object.Web workers also lack synchronization locks,
//critical sections, semaphores, or mutexes.They don’t have access to the document object model (DOM), so if you need to access the DOM,
//the web worker must post a message back to the creator, and the creator must process the message and access the DOM as needed. 

//This HTML page has a reference to jQuery and a default.js file.The default.js file has code to create a new web worker by calling the Worker()
//constructor and passing the URI of a script to execute.You can receive notifications from the web worker by setting the onmessage and the onerror properties to 
//an event handler function, as shown in the following example.

var worker = new Worker('myWork.js');

worker.onmessage = function (e) {
    $('#result').append(e.data + '<br />');
}
worker.onerror = function (e) {
    $('#result').append('Error: ' + e.data + '<br />');
}

$('document').ready(function () {
    $('#btnSend').on('click', function () {
        worker.postMessage($('#message').val());
    });
});
