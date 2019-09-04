 //Inheritance is useful when you can define the relationship between two objects as an “is a” relationship. For example, an apple is a fruit, an employee is 
//a person, and a piano is an instrument. 


//This is a great way to create a class, and all future class examples use this pattern. 
//To create Vehicle objects, you use the new keyword with the Vehicle variable. 
//The following test creates an instance of Vehicle and tests the getInfo and startEngine methods.
// Start by defining the base class
// Base Class:
var Vehicle = (function(){
    
    function Vehicle(year, make, model){
        this.year = year;
        this.make = make;
        this.model = model;
    }
    Vehicle.prototype.getInfo = function(){
        return this.year + ' ' + this.make + ' ' + this.model;
    };
    Vehicle.prototype.startEngine = function(){
        return 'Vroom';
    };

    return Vehicle;
})();

//This class is wrapped in an IIFE. The wrapper encapsulates the function and the Vehicle prototype. There is no attempt to make the data 
//private. The code works as follows. 
//■■ When the code is loaded into the browser, the IIFE is immediately invoked. 
//■■ A nested function called Vehicle is defined in the IIFE. 
//■■ The Vehicle function’s prototype defines getInfo and startEngine functions that are on every instance of Vehicle. 
//■■ A reference to the Vehicle function is returned, which is assigned to the Vehicle variable. 
