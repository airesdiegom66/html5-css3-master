// Object has a prototype object that is cloned when you use the new keyword to create a new Object instance.
//After the object is created, you can dynamically add properties to it that hold the data and reference functions.

//The encapsulation of the code to create an object is commonly referred to as using the factory pattern.Can you create multiple instances of vehicle?
//You can create multiple instances of Object and add properties dynamically to each instance, but the actual type is Object, not vehicle. 

function getVehicle(theYear, theMake, theModel) {
    //This might be all you need when you are gathering some data to put into an object structure and pass to some other code or service.Although the getVehicle function 
    //encapsulates the object creation, the properties are all public.This can be desirable in some scenarios, but if you want the data to be private, this approach won’t
    //work.Like when using the literal object syntax, you might encounter the problem that every vehicle’s type is Object, and you might want to create a Vehicle class to
    //have a named Vehicle type.

    //fábrica de objetos
    var vehicle = new Object();

    vehicle.year = theYear;
    vehicle.make = theMake;
    vehicle.model = theModel;
    vehicle.getInfo = function () { return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model; };

    return vehicle;
}
