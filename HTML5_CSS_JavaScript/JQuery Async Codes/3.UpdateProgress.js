function initializeU() {
    runAbcAsync();
}
//function abcAsync() {
//    var deferred = $.Deferred();

//    var firstPromise = timeoutAsync(2000);
//    var secondPromise = timeoutAsync(3000);
//    var thirdPromise = timeoutAsync(1000);
//    var fourthPromise = timeoutAsync(1234);

//    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
//        .then(function () {
//            alert('done!');
//            deferred.resolve();
//        },
//        function () { deferred.reject(); });

//    return deferred.promise();
//}

//The promise object has a progress method that accepts a function called when the notify method is executed.
//The following example is a rewrite of the previous example; the deferred object notifies its subscribers of progress change.
function timeoutAsync(milliseconds) {
    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);

    return deferred.promise();
}

//In this example, the count variable is initialized to zero, and then, upon completion of each asynchronous call,
//the count variable is incremented.The following code calls the abcAsync function and displays the progress.
function runAbcAsync() {
    var promise = abcAsync();
    promise.progress(function (msg) { alert(msg); });

    return promise;
}

//In this example, as the progress is updated, a pop- up is displayed with the numeric value.The asynchronous calls can complete in any order.
//■ The deferred object’s resolve and resolvewith methods indicate successful completion.The deferred object’s reject and rejectwith methods indicate 
//a failed operation.The deferred object’s notify and notifywith methods update the progress.
function abcAsync() {

    var deferred = $.Deferred();
    var count = 0;

    var firstPromise = timeoutAsync(2000);
    var secondPromise = timeoutAsync(3000);
    var thirdPromise = timeoutAsync(1000);
    var fourthPromise = timeoutAsync(1234);

    firstPromise.always(function () {
        deferred.notify(++count);
    });

    secondPromise.always(function () {
        deferred.notify(++count);
    });

    thirdPromise.always(function () {
        deferred.notify(++count);
    });

    fourthPromise.always(function () {
        deferred.notify(++count);
    });

    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
        .then(function () {
            alert('done!');
            deferred.resolve();
        },
        function () { deferred.reject(); });
    
    return deferred.promise();
}
