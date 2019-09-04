function initializeC() {


}
function timeoutAsync(milliseconds) {
    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);

    return deferred.promise();
}

//Sometimes, you need to make an asynchronous call conditionally.
//In the case of chained operations in which a middle operation is conditionally executed, you need a way to splice in (or out) the operation.
//Consider the following example, in which the third asynchronous operation is conditionally executed.
//In this example, the includeThird variable is passed into the abcAsync function and is used to determine whether the third asynchronous 
//function should be called.If includeThird is false, the thirdPromise variable still needs to be assigned a promise to chain the fourth asynchronous call,
//so secondPromise is assigned directly to the thirdPromise variable.This maintains the chain of operations
function abcAsync(includeThird) {

    var firstPromise = timeoutAsync(2000);

    var secondPromise = firstPromise.pipe(function () {
        return timeoutAsync(3000);
    });

    var thirdPromise = includeThird ? secondPromise.pipe(function () {
        return timeoutAsync(1000);
    }) : secondPromise;

    var fourthPromise = thirdPromise.pipe(function () {
        return timeoutAsync(1234);
    });

    fourthPromise.done(function () {
        firstPromise.done(function () { alert('done!') });

    }); return fourthPromise;
}


//When making parallel asynchronous calls, conditionally calling the third operation is done differently, as shown in the following example.
//In this example, if includeThird is true, the third asynchronous call is executed and assigned to the thirdPromise variable.
//If includeThird is false, $.when() is assigned to the thirdPromise variable.Remember that $.when() is used at the bottom of the function to 
//indicate that all asynchronous operations have completed, which creates a new promise that is passed to the then() method.
//If you call $.when() with no parameters, a new promise object is created with its status set to resolved.
function abcAsyncParallell(includeThird) {
    var deferred = $.Deferred();
    var firstPromise = timeoutAsync(2000);
    var secondPromise = timeoutAsync(3000);
    var thirdPromise = includeThird ? timeoutAsync(1000) : $.when(); //$.when() is used at the bottom of the function to indicate that all asynchronous operations have completed, which creates a new promise that is passed to the then() method
    var fourthPromise = timeoutAsync(1234);

    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
        .then(function () {
            alert('done!');
            deferred.resolve();
        },
        function () {
            deferred.reject();
        });

    return deferred.promise();
}
//Use the $.when() method to monitor the completion of many parallel asynchronous calls.Use the $.when() method with no parameters to create a resolved promise object. 