module('Testes da Calculadora', { setup: function () { initialize(); } });

//test('Testar o click do botão 5', 1, function () {
// ou
//test('Testar o click do botão 5', 1, function () {
//    expect(1); 
//    var btn = document.getElementById('btn5');
//    QUnit.triggerEvent(btn, "click");
//    var result = txtInput.value; //txtInput é uma variável não declarada aqui
//    var expected = '5';

//    equal(result, expected, 'Expected value: ' + expected + ' Actual value: ' + result);

//}); 

test("Teste de todos os botões", function () {
    var buttonQuantity = 10;
    expect(buttonQuantity * 2); //número de testes dois 'equal' e não botões, logo : equal * botões

    for (var i = 0; i < buttonQuantity; i++) {
        var btn = document.getElementById('btn' + i);
        QUnit.triggerEvent(btn, 'click');
        var result = txtInput.value[txtInput.value.length - 1];
        var expected = String(i);

        equal(result, expected, 'Expected value: ' + expected + ' Actual value: ' + result);

        var expectedLength = i < 2 ? 1 : i;

        equal(txtInput.value.length, expectedLength, 'Expected string length: ' + expectedLength + ' Actual value: ' + txtInput.value.length);
    }
});


test("Teste de Soma", function () {
    expect(1);
    txtInput.value = '10';
    txtResult.value = '20';

    var btnPlus = document.getElementById('btnPlus');
    QUnit.triggerEvent(btnPlus, 'click');
    var expected = '30';

    equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
});


test("Teste de Subtração", function () {
    expect(1);
    txtInput.value = '10';
    txtResult.value = '20';

    var btnMinus = document.getElementById('btnMinus');
    QUnit.triggerEvent(btnMinus, 'click');
    var expected = '10';

    equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual: ' + txtResult.value);
    
});