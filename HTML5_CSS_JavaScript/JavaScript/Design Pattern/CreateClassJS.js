//Creating a class There is no class keyword in JavaScript, but you can simulate a class by starting with a function, which is actually the constructor function of the object.
function Vehicle(theYear, theMake, theModel) {

    //Se você não usar o var, as variávesi serão globais. Caso este método seja chamada mais de uma vez, ele vai assumir sempre o valor da primeira instância (é estranho, mas é isso).
    var year = theYear;
    var make = theMake;
    var model = theModel;

    //To implement encapsulation, use the var keyword for the year, make, and model.This will make these variables private to the function. Notice that the var keyword is 
    //not used with getInfo because the getInfo variable needs to be public to be called from outside the object, but you don’t want the getInfo variable to be global.
    //Assign getInfo to the current object by using the this keyword.The result is a class that encapsulates the data and exposes getInfo to retrieve the data in a
    //controlled way as follows.    
    this.getInfo = function () { return 'Vehicle: ' + year + ' ' + make + ' ' + model; };
}


