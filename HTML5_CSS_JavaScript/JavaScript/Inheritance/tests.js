//This is a great way to create a class, and all future class examples use this pattern. 
//To create Vehicle objects, you use the new keyword with the Vehicle variable. 
//The following test creates an instance of Vehicle and tests the getInfo and startEngine methods.
test("Vehicle Inheritance", function() {
    expect(2);

    var car1 = new Vehicle(2000, 'Ford', 'Fusion');    

    var expected = '2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected: ' + expected + ' Actual: '  + actual);

    var expected = 'Vroom';
    var actual = car1.startEngine();

    equal(actual, expected, 'Expected: ' + expected + ' Actual: ' + actual);
});


test('Car Inheritance Test', function () {     
    expect(6);     
    
    var c = new Car(2012, 'Toyota', 'Rav4');     
    
    var actual = c.year;     
    var expected = 2012;     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = c.make;     
    var expected = 'Toyota';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = c.model;     
    var expected = 'Rav4';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = c.wheelQuantity;     
    var expected = 4;     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = c.getInfo();     
    var expected = 'Vehicle Type: Car 2012 Toyota Rav4';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual); 
     
    var actual = c.startEngine();     
    var expected = 'Vroom';     equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual); 
}); 
 
test('Boat Inheritance Test', function () {     
    expect(6);     
    var b = new Boat(1994, 'Sea Ray', 'Signature 200');     
    
    var actual = b.year;     
    var expected = 1994;     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = b.make;     
    var expected = 'Sea Ray';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = b.model;     
    var expected = 'Signature 200';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = b.propellerBladeQuantity;     
    var expected = 3;     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = b.getInfo();     
    var expected = 'Vehicle Type: Boat 1994 Sea Ray Signature 200';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);     
    
    var actual = b.startEngine();     
    var expected = 'Vroom';     
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual); 
});