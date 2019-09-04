/// <reference path="../jquery-3.2.1.js" />

$(document).ready(function () {
    contactsNamespace.initialize();
});

//iife - create namespace if they not already exist
(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
        ns.display(); 
    };

    //add a retrieveFromStorage method that pulls the contact list from localStorage
    function retrieveFromStorage() {
        //recuperar o objeto armazenado
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }
    
    function bindToGrid(results) {
        var html = "";

        for (var i = 0; i < results.length; i++) {
            var contact = results[i];
            html += '<tr><td>' + contact.email + '<td>';
            html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
        }

        html = html || '<tr><td colspan="3">No records available</td></tr>';
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }

    //Use the index to find the corresponding item in the contacts array and then store the index and contact object within the currentRecord field. 
    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var results = retrieveFromStorage();
        $('#currentAction').html('Edit Contact');
        currentRecord = { key: key, contact: results[key] };
        displayCurrentRecord();
    };

    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#firstName').val(contact.firstName);
        $('#lastName').val(contact.lastName);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber); 
    }

    ns.display = function () {
        $('#currentAction').html('Add Contact');
        currentRecord = { key: null, contact: {} }; 
        displayCurrentRecord();
        var results = retrieveFromStorage();
        bindToGrid(results);
    };

    //Add the public save method. In this method, create a contact variable and assign the contact property of currentRecord
    //Add logic to the end of the save method that either adds the contact to the array if it’s a new contact or updates the contact if it already exists. 
    //Convert the object to a JSON string and store it in localStorage
    ns.save = function () {

        var contact = currentRecord.contact;
        contact.firstName = $('#firstName').val();
        contact.lastName = $('#lastName').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();

        var results = retrieveFromStorage();

        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }

        //armazenando o objeto
        localStorage.setItem('contacts', JSON.stringify(results));
        ns.display();
    };
})();

