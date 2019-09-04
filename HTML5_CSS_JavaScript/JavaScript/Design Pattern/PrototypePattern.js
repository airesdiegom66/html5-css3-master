//The prototype itself is an object containing properties and methods that should be available to all instances of the type you’re working with. However, this prototype 
//is typically specified externally to the constructor function, so the prototype doesn’t have access to private variables.Therefore, you must expose the data for the 
//prototype to work.The following is an example of using the prototype property to create a single getInfo method that is shared across all instances.

//You want to add a method to all instances of Vehicle. How do you do this?  Add the method by using the Vehicle object’s prototype method.

//é como se fosse um construtor
function VehiclePrototypePattern(theYear, theMake, theModel) {
    this.year = theYear;
    this.make = theMake;
    this.model = theModel;
}
//Um espécie de get toString()
VehiclePrototypePattern.prototype.getInfo = function () {
    return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
}

//You’ve learned the primary patterns for creating a JavaScript object, but there can be a compromise in which you can have private data that is readable 
//by creating a method for retrieving the data, also known as a getter, which has no setter, a method for setting the value.This would require you to write 
//a function that is copied for each object, but you should keep the function as small as possible, as shown in the following code example.
//Getter sem Setter
// How can you expose private data as read-only? Add a getter method that retrieves the data but cannot change the data.
function VehicleGetterSemSetter(theYear, theMake, theModel) {

    var year = theYear;
    var make = theMake;
    var model = theModel;

    this.getYear = function () { return year; };
    this.getMake = function () { return make; };
    this.getModel = function () { return model; };
}
VehicleGetterSemSetter.prototype.getInfo = function () {
    return 'Vehicle: ' + this.getYear() + ' ' + this.getMake() + ' ' + this.getModel();
};