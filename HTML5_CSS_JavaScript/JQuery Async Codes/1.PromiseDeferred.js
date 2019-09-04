function initialize() {
    //abcAsync();
    //abcAsync2();
    abcAsync3();
}

//In this code example, the function name ends with Async as a convention to help the developer understand that an asynchronous 
//call is being made in this function. A deferred object is created by using the $.Deferred method and assigned to the deferred variable. 
function timeoutAsync(milliseconds) {

    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);

    return deferred.promise();
}

//In this example, you see the “always!” message before the “done!” or “failed!” message because the always subscription is before the others.
//If the always subscription is the last subscription, it will execute last.

function abcAsync() {
    var promise = timeoutAsync(2000);
    promise.always(function () { alert('always!') });
    promise.done(function () { alert('done!') });
    promise.fail(function () { alert('failed!') });

    return promise;
}

//It’s useful to know that you can subscribe to the promise object even after it’s been resolved.
//This immediately executes the function you pass to the done method.Consider the following example in which two promise objects are used to chain actions together,
//and the completion of secondPromise adds a function to firstPromise, which has already completed.
//Existing subscriptions are not re- executed because the subscriber functions are guaranteed to execute only once.

//Jeito errado de fazer: Leia abaixo
//function abcAsync2() {
//    var firstPromise = timeoutAsync(2000);

//    firstPromise.done(function () {
//        var secondPromise = timeoutAsync(3000);
//        secondPromise.done(function () {
//            firstPromise.done(function () { alert('done!') });
//        });
//    });

//    return firstPromise;
//}

//There is a problem with the previous code example in that abcAsync2 is returning the firstPromise object.
//That is a problem because the abcAsync object should return a promise object that indicates the completion of all code within the function. 
//In this case, when firstPromise is complete, code is still executing that’s represented by the secondPromise object.
//It would be conceptually correct to try to return the secondPromise object, but the secondPromise object isn’t even created for 2 seconds. 
//When you need to chain three, four, or more operations, you can get caught up in nesting several levels and creating unmanageable code.

//If the first asynchronous call fails, the failure is automatically passed to the piped promise object in the chain.You don’t require extra code to deal with this.
//You can subscribe to the fail of the fourthPromise object, and you will automatically be notified if any asynchronous call in the chain failed.

//To solve the problem, implement chaining by using the pipe function on the promise object
function abcAsync3() {
    //In this example, the fourthPromise object is correctly returned so the caller can know when all code is completed. 
    var firstPromise = timeoutAsync(2000);
    var secondPromise = firstPromise.pipe(function () { return timeoutAsync(3000); });
    var thirdPromise = secondPromise.pipe(function () { return timeoutAsync(1000); });
    var fourthPromise = thirdPromise.pipe(function () { return timeoutAsync(1234); });

    fourthPromise.done(function () { firstPromise.done(function () { alert('done!') }); });

    return fourthPromise;
}


