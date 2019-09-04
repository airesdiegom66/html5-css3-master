//JavaScript doesn’t have a namespace keyword, but you can implement the equivalent of a namespace by using techniques that are similar to those used to create objects.
//All the members of myApp are globally accessible

var myApp = {};

myApp.vehicleCount = 5;
myApp.vehicles = new Array();

myApp.Car = function(){};
myApp.Truck = function(){};

myApp.repair = {
    description: 'change spark plugs',
    cost:100
};
