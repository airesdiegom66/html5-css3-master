//Object literals create an object from nothing, so these objects contain precisely what you assign to them and nothing more.
//The getInfo property doesn’t contain data; it references an anonymous function instead, so getInfo is a method.
// If the 'this' keyword were omitted (this.year, this.make ...), the code would look in the global namespace for year, make, and model.
//An object literal is a way to encapsulate related behaviors
var car1 = {
    year: 2000,
    make: 'Ford',
    model: 'Fusion',
    getInfo: function () {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};

var car2 = {
    year: 2010,
    make: 'BMW',
    model: 'Z4',
    getInfo: function () {
        return 'Vehicle: ' + this.year + ' ' + this.make + ' ' + this.model;
    }
};