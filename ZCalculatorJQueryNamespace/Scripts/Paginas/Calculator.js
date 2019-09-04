/// <reference path="../_references.js" />

//IIFE
(function () {

    //create a namespace if doesn't exist
    this.calculatorNamespace = this.calculatorNamespace || {};
    var ns = this.calculatorNamespace;

    //public
    ns.initialize = function () {
        var calculator = new ns.Calculator();
                
        $('button[id^="btn"]').on('click', calculator.numberClick);
        $('#buttonPlus').on('click', calculator.plusClick);
        $('#buttonMinus').on('click', calculator.minusClick);
        $('#buttonClearEntry').on('click', calculator.clearEntry);
        $('#buttonClear').on('click', calculator.clear);

        calculator.clear();
    };

    //This is a great way to create a class, and all future class examples use this pattern. 
    //To create Calculator objects, you use the new keyword with the Calculator variable.
    //The following test creates an instance of Calculator and tests the numberClick, plusClick, minusClick, clearEntry, clear.
    // Start by defining the base class

    // Base Class:
    ns.Calculator = (function () {

        //constructor
        function Calculator() {

        }

        //Methods:
        //The prototype itself is an object containing properties and methods that should be available to all instances of the type you’re working with. However, this prototype 
        //is typically specified externally to the constructor function, so the prototype doesn’t have access to private variables.
        Calculator.prototype.numberClick = function () {
            $('#txtInput').val($('#txtInput').val() == '0' ?
                $(this).text() : $('#txtInput').val() + $(this).text());
        };

        Calculator.prototype.plusClick = function () {
            $('#txtResult').val( Number($('#txtResult').val()) + Number($('#txtInput').val()) );            
            Calculator.prototype.clearEntry();
        };

        Calculator.prototype.minusClick = function () {
            $('#txtResult').val(Number($('#txtResult').val()) - Number($('#txtInput').val()));
            Calculator.prototype.clearEntry();
        };

        Calculator.prototype.clearEntry = function () {
            $('#txtInput').val('0');
        };

        Calculator.prototype.clear = function () {
            $('#txtInput').val('0');
            $('#txtResult').val('0');
        };

        //private
        var notExposedAtAll = function () {//can't be called but inside the main IIFE scope (and subsequent scopes)

        };


        return Calculator;

        //This class is wrapped in an IIFE. The wrapper encapsulates the function and the Calculator prototype. There is no attempt to make the data
        //private. The code works as follows. 
        //■■ When the code is loaded into the browser, the IIFE is immediately invoked. 
        //■■ A nested function called Vehicle is defined in the IIFE. 
        //■■ The Vehicle function’s prototype defines getInfo and startEngine functions that are on every instance of Vehicle. 
        //■■ A reference to the Vehicle function is returned, which is assigned to the Vehicle variable. 
    }());
})();