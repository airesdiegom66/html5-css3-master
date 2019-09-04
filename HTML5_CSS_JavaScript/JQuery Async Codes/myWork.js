//This example also shows the subscription to btnSend, which retrieves the value from the message and posts the message to the worker. 
//This code subscribes to the onmessage event.In this example, when a message is received from the creator, this code loops through each character,
//converts it to uppercase, and sends the uppercased character back to the creator.You can stop a web worker by calling the worker.terminate()
//method from the creator or calling the close() method inside the worker itself.

self.onmessage = function (e) {
    for (c in e.data) {
        postMessage(e.data[c].toUpperCase());
    }
}
