function initializeP() {
    abcAsync();
}

function timeoutAsync(milliseconds) {

    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);

    return deferred.promise();
}

//The previous examples exhibited chained operations by which each operation waits for the previous operation to complete before starting.For example,
//the previous example took 7.234 seconds to complete.Sometimes this is necessary, but you might want to run the operations simultaneously.
//If you execute each operation in parallel, how can you know that all four operations completed? You can use the $.when() method to indicate completion of 
//multiple asynchronous operations.The $.when() method is non- blocking, so it’s usually used with a deferred object.In the following example, the previous 
//example is rewritten to run all four operations in parallel. Not shown here is that the then() method also accepts a third function parameter to be executed when the progress changes.
function abcAsync() {
    var deferred = $.Deferred();

    var firstPromise = timeoutAsync(2000);
    var secondPromise = timeoutAsync(3000);
    var thirdPromise = timeoutAsync(1000);
    var fourthPromise = timeoutAsync(1234);

    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
        .then(function () { alert('done!'); deferred.resolve(); },
        function () { deferred.reject(); });

    return deferred.promise();
}

////Sem programação paralela
//function abcAsync3() {
//    //In this example, the fourthPromise object is correctly returned so the caller can know when all code is completed. 
//    var firstPromise = timeoutAsync(2000);
//    var secondPromise = firstPromise.pipe(function () { return timeoutAsync(3000); });
//    var thirdPromise = secondPromise.pipe(function () { return timeoutAsync(1000); });
//    var fourthPromise = thirdPromise.pipe(function () { return timeoutAsync(1234); });

//    fourthPromise.done(function () { firstPromise.done(function () { alert('done!') }); });

//    return fourthPromise;
//}
