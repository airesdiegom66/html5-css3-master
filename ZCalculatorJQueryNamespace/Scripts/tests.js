/// <reference path="_references.js" />

module('Calculator Test Suite', {
    setup: function () {
        calculatorNamespace.initialize();
    }
});

test("Initialize Test", function () {
    expect(2);
    var expected = '0';

    equal($('#txtInput').val(), expected, 'Expected value: ' + expected + '  Actual value: ' + $('#txtInput').val());
    equal($('#txtResult').val(), expected, 'Expected value: ' + expected + '  Actual value: ' + $('#txtResult').val());
});

test("Button Click Test", function () {
    var buttonQuantity = 10;
    expect(buttonQuantity * 2);

    for (var i = 0; i < buttonQuantity; i++) {

        //QUnit.triggerEvent(btn, 'click');
        $('#btn' + i).triggerHandler('click');
        var result = $('#txtInput').val()[$('#txtInput').val().length - 1];
        var expected = String(i);

        equal(result, expected, 'Expected value: ' + expected + '  Actual value: ' + result);

        var expectedLength = i < 2 ? 1 : i;

        equal($('#txtInput').val().length, expectedLength, 'Expected string length: ' + expectedLength + '  Actual value: ' + $('#txtInput').val().length);
    }
});

test("Add test", function () {
    expect(1);

    $('#txtInput').val('30');
    $('#txtResult').val('20');

    //QUnit.triggerEvent(btn, 'click');
    $('#buttonPlus').triggerHandler('click');

    var actual = $('#txtResult').val();
    var expected = '50';

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);
});

test("Minus test", function () {
    expect(1);

    $('#txtInput').val('20');
    $('#txtResult').val('30');

    //QUnit.triggerEvent(btn, 'click');
    $('#buttonMinus').triggerHandler('click');

    var actual = $('#txtResult').val();
    var expected = '10';

    equal(actual, expected, 'Expected value: ' + expected + ' Actual value: ' + actual);

});

test("Clear Entry Test", function () {
    expect(1);

    $('#txtInput').val('10');
    //QUnit.triggerEvent(btn, 'click');
    $('#buttonClearEntry').triggerHandler('click');

    var expected = '0';

    equal($('#txtInput').val(), expected, 'Expected value: ' + expected + '  Actual value: ' + $('#txtInput').val());
});

test("Clear Test", function () {
    expect(2);

    $('#txtInput').val('10');
    $('#txtResult').val('20');
    $('#buttonClear').triggerHandler('click');

    var expected = '0';

    equal($('#txtInput').val(), expected, 'Expected value: ' + expected + '  Actual value: ' + $('#txtInput').val());
    equal($('#txtResult').val(), expected, 'Expected value: ' + expected + '  Actual value: ' + $('#txtResult').val());

});
