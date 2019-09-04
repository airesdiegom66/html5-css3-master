/// <reference path="../../../scripts/jquery-3.2.1.js" />

//■■ dragenter Triggers when the drag enters a drop zone 
//■■ dragover Triggers continuously as the element is dragged over the drop zone 
//■■ dragleave Triggers when the dragged item leaves a drop zone 
//■■ drop Triggers when the dragged item is dropped 

var $draggedItem;

$(document).ready(function () {
    //eventos para draguear
    $('.item').on('dragstart', dragging);
    $('.item').on('dragend', draggingEnded);
    //eventos para dropar
    $('.hole').on('dragenter', preventDefault);
    $('.hole').on('dragover', preventDefault);
    $('.hole').on('drop', dropItem);
});

function dragging(e) {
    $(e.target).addClass('dragging');    
    $draggedItem = $(e.target);//dragueou o quadro, eu armazeno ele numa variável global, pois quando ele for solto eu vou adcioná-lo em outro quadro
}

function draggingEnded(e) {
    $(e.target).removeClass('dragging');
}

//Notice that dragenter and dragover call the same preventDefault function, which prevents the rejection of the dragged items. 
function preventDefault(e) {
    e.preventDefault();
}

function dropItem(e) {
    var hole = $(e.target);

    if (hole.hasClass('hole') && hole.children().length == 0) {
        $draggedItem.detach();
        $draggedItem.appendTo($(e.target));
    }
}
