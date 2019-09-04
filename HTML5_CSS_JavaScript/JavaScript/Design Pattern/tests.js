test("ObjectLiteral Pattern", function () {
    expect(2);

    var expected = 'Vehicle: 2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);

    var expected = 'Vehicle: 2010 BMW Z4';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);

});

test("Factory Pattern", function () {
    expect(2);

    car1 = getVehicle(2000, 'Ford', 'Fusion');
    car2 = getVehicle(2010, 'BMW', 'Z4');

    var expected = 'Vehicle: 2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);

    var expected = 'Vehicle: 2010 BMW Z4';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);
});

//Two instances of the Vehicle class are being created, which means that two Vehicle objects are being constructed.Each instance has its own data and its own copy 
//of the getInfo method.The getInfo method is public but has access to the private data.A method that is public but has access to private data is called a privileged method. 
test("Create Class (Simulate)", function () {
    expect(3);

    //The Vehicle function is known as a constructor function. The new keyword created an object and executed the constructor function to initialize the object 
    //by creating the year, make, and model private variables and the public getInfo variable.Each instance has these four variables, and memory is allocated for 
    //them.That’s what you want for the data, but is that what you want for the getInfo variable that references a function? The answer is that it depends on 
    //what you are trying to accomplish with your code.

    var car1 = new Vehicle(2000, 'Ford', 'Fusion');
    var car2 = new Vehicle(2010, 'BMW', 'Z4');

    var expected = 'Vehicle: 2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual: ' + actual);

    var expected = 'Vehicle: 2010 BMW Z4';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + ' Actual: ' + actual);

    //Notice that the first assertion passed, which proves that there are separate object instances, each having its own data.The second assertion failed.The failure 
    //message states that the year is undefined, which proves that the year is not directly accessible from the test, which is in the global namespace.Instead, year, in 
    //addition to make and model, is encapsulated in the object. 
    expected = 2000;
    actual = year;
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);

});

//The test result is shown in Figure 6- 4. The first assertion succeeded, which proves that the function was successfully replaced on the first Vehicle object.The second assertion 
//failed, which proves that the second Vehicle object’s getInfo function was not replaced.Is that what 
//you expected? Is that what you wanted? You can see that in some scenarios, this behavior is desirable, but in other scenarios, you might have wanted to replace the function 
//across all objects.To do this, you use the prototype pattern.
test("Create Class (Simulate) - Function Replacement Test", function () {
    expect(2);

    var car1 = new Vehicle(2000, 'Ford', 'Fusion');
    var car2 = new Vehicle(2010, 'BMW', 'Z4');

    car1.getInfo = function () { return 'This is a Car'; };

    var expected = 'This is a Car';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);

    var expected = 'This is a Car';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);
});

test("Prototype Pattern", function () {
    expect(2);

    var car1 = new VehiclePrototypePattern(2000, 'Ford', 'Fusion');
    var car2 = new VehiclePrototypePattern(2010, 'BMW', 'Z4');
    var expected = 'Vehicle: 2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);

    var expected = 'Vehicle: 2010 BMW Z4';
    var actual = car2.getInfo();
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);
});


//Now that you have a functioning class, change the prototype to see whether it can be changed across all instances.
test("Prototype Pattern Replace Function", function () {
    expect(2);

    var car1 = new VehiclePrototypePattern(2000, 'Ford', 'Fusion');
    var car2 = new VehiclePrototypePattern(2010, 'BMW', 'Z4');
    
    //aqui seta valor
    //car1.year = 2222;

    VehiclePrototypePattern.prototype.getInfo = function () { return 'Car: ' + this.year + ' ' + this.make + ' ' + this.model; }
    
    var expected = 'Car: 2000 Ford Fusion';
    var actual = car1.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);
    
    var expected = 'Car: 2010 BMW Z4';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);
});


test("Prototype Pattern Getters Sem Setters", function () {
    expect(4);

    var car1 = new VehicleGetterSemSetter(2000, 'Ford', 'Fusion');
    var car2 = new VehicleGetterSemSetter(2010, 'BMW', 'Z4');
    
    //aqui NÃO seta valor
    //car1.year = 2222;

    var expected = 'Vehicle: 2000 Ford Fusion';
    var actual = car1.getInfo();
    
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);

    var expected = 'Vehicle: 2010 BMW Z4';
    var actual = car2.getInfo();

    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);
        
    VehicleGetterSemSetter.prototype.getInfo = function () { return 'Car Year: ' + this.getYear() + ' Make: ' + this.getMake() + ' Model: ' + this.getModel(); };

    var expected = 'Car Year: 2000 Make: Ford Model: Fusion';
    var actual = car1.getInfo();
    equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual);

    var expected = 'Car Year: 2010 Make: BMW Model: Z4';
    var actual = car2.getInfo(); equal(actual, expected, 'Expected value: ' + expected + '  Actual value: ' + actual); 
});
