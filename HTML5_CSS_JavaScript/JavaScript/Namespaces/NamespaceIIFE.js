//In addition, if you create a namespace for your application, and your application has many JavaScript files, you might want to have 
//logic to create the namespace object only if it hasn’t been created. In the following example, the code for myApp is modified to create 
//the namespace object if it doesn’t already exist. This code uses the OR operator to create a new object if myApp does not have a value.  
//  var myApp = myApp || {};

//You can use the object techniques already defined in this lesson to make some members of the namespace private and some public
//The difference is that the namespace is a singleton object, so you create a single instance for the namespace. You don’t need to worry about 
//functions defined in the constructor function consuming additional memory for each instance because there is only one instance. Here is an example of 
//the use of an immediately invoked function expression (IIFE) to create the myApp namespace in which Car and Truck are public, but vehicleCount, 
//vehicles, and repair are private.

//EVITA O CONSUMO ADICIONAL DE MEMÓRIA A CADA INSTÂNCIA

//IFFE
//(function(){

//}());

(function(){
    
    //The first line creates the myApp namespace if it doesn’t already exist
    this.myApp = this.myApp || {}; //Singleton

    var ns = this.myApp; // Alias for namespace. Used in place of this.myApp 

    //private
    var vehicleCount = 5;
    var vehicles = new Array();
    var repair = {
        description: 'changed spark plugs',
        cost: 100
    };

    //public 
    ns.Car = function(){}
    ns.Truck = function(){}

}());