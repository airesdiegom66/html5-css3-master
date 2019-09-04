/// <reference path="../jquery-3.2.1.js" />

var squareCount = 16
var emptySquare;

$(document).ready(function () {
    //jQuery.event.props.push('dataTransfer');    
    jQuery.event.addProp('dataTransfer');
    createBoard();
    addTiles();

    //eventos de drag
    $('#gameBoard').on('dragstart', dragStarted);
    $('#gameBoard').on('dragend', dragEnded);
    //eventos de drop
    $('#gameBoard').on('dragenter', preventDefault);
    $('#gameBoard').on('dragover', preventDefault);
    $('#gameBoard').on('drop', drop);
});
0
function dragStarted(e) {
    var $tile = $(e.target);
    $tile.addClass('dragged');

    var sourceLocation = $tile.parent().data('squarediego');
    e.dataTransfer.setData('text', sourceLocation.toString());
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnded(e) {
    $(e.target).removeClass('dragged');9
}

function preventDefault(e) {
    e.preventDefault();
}

function createBoard() {
    for (var i = 0; i < squareCount; i++) {
        var $square = $('<div id="square' + i + '" data-squarediego="' + i + '"  class="square"></div>');
        $square.appendTo($('#gameBoard'));
    }
}

function addTiles() {
    emptySquare = squareCount - 1;

    for (var i = 0; i < emptySquare; i++) {
        var $square = $('#square' + i);
        var $tile = $('<div draggable="true" id="tile' + i + '" class="tile">' + (i + 1) + '</div>');
        $tile.appendTo($square);
    }
}

function drop(e) {
    var $square = $(e.target);

    if ($square.hasClass('square')) {
        var destinationLocation = $square.data('squarediego');

        if (emptySquare != destinationLocation)
            return;

        var sourceLocation = Number(e.dataTransfer.getData('text'));
        moveTile(sourceLocation);
    }
}

function moveTile(sourceLocation) {
    var distance = sourceLocation - emptySquare;

    if (distance < 0)
        distance = -(distance);

    //if (distance == 1 || distance == 4) {
        swapTileAndEmptySquare(sourceLocation);
    //}
}

function swapTileAndEmptySquare(sourceLocation) {
    var $draggedItem = $('#square' + sourceLocation).children();
    $draggedItem.detach();

    var $target = $('#square' + emptySquare);
    $draggedItem.appendTo($target);

    emptySquare = sourceLocation;
}

