//Now that you have a Vehicle parent class with three properties and two methods, you can create child classes for Car and Boat that 
//inherit from Vehicle. Start by writing an IIFE but, this time, pass Vehicle into the IIFE as follows.

//Next, the function for Car can be added inside the IIFE. Inside the function, add any additional properties, such as wheelQuantity, and 
//initialize to four. In the function, call the parent class’s constructor for Car to allocate memory slots for the year, make, and model. 
//To call the parent constructor function, use a call method that exists on the Function object, which accepts a parameter for the this object, 
//and parameters for the parameters on the function being called, as follows

//You might think that you’ve already set up inheritance because the previous example calls the parent class’s constructor, and the year, make,
//and model are created on Car, but getInfo and startEngine were not inherited. 

//The inheritance is accomplished by changing the Car prototype object to be a new Vehicle object. Remember that the prototype is the object 
//that is cloned to create the new object. By default, the prototype is of type Object. After the new Vehicle is assigned to the prototype, 
//the constructor of that Vehicle is changed to be the Car constructor as follows.

var Car = (function (parent){
    Car.prototype = new Vehicle();     
    Car.prototype.constructor = Car;     
    
    function Car(year, make, model){
        parent.call(this, year, make, model);
        this.wheelQuantity = 4 ;
    }
    //Finally, you can add more methods into Car. In this example, the getInfo method is added, which replaces the Vehicle getInfo method. 
    //The new getInfo gets some code reuse by calling the existing getInfo method on the parent Vehicle object’s prototype. However, 
    //you must use the call method and pass the this object as follows.
    Car.prototype.getInfo = function(){
        return 'Vehicle Type: Car ' + parent.prototype.getInfo.call(this);
    };

    return Car;
})(Vehicle);


var Boat = (function (parent) {     
    Boat.prototype = new Vehicle();     
    Boat.prototype.constructor = Boat;     
    
    function Boat(year, make, model) {         
        parent.call(this, year, make, model);         
        this.propellerBladeQuantity = 3;     
    }     
    Boat.prototype.getInfo = function () {         
        return 'Vehicle Type: Boat ' + parent.prototype.getInfo.call(this);     
    };     
    return Boat; 
})(Vehicle);


