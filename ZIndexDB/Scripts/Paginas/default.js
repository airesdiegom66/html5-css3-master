/// <reference path="../jquery-3.2.1.js" />

//The names of the IndexedDB variables with which you’ll need to work vary across different browsers.
//Handle those differences by adding the following to the top of the .js file.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;


$(document).ready(function () {
    contactsNamespace.initialize();
});

//iife - create namespace if they not already exist
(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;
    //add a database instance that’s accessible to all methods in the namespace 
    var db;
    
    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);

        //Create the contacts object store and open the database connection.        
        //The first step in working with IndexedDB is to create and open a database        
        //One important property of the parameter object is the keypath. Its purpose is to specify which property on the value object should be used as the key.
        //This key is then used as the primary index for stored instances.If the property specified by the keypath does not exist on the value object, 
        //you must use a key generator such as autoIncrement, which creates autoincrementing numeric keys 
        //Instead of just relying on an item’s index within the total resultset, allow IndexedDB to create an auto-incremented key.
        var request = indexedDB.open('Chapter16', 1);

        //delete que funciona no Chrome
        //indexedDB.deleteDatabase('Chapter16',3);

        request.onupgradeneeded = function (response) {
            var options = { keypath: 'id', autoIncrement: true };            
            response.currentTarget.result.createObjectStore('contacts', options);
            //response.currentTarget.result.deleteObjectStore("contacts", options);
        };

        //This method returns an IDBRequest object and begins an asynchronous process of opening a connection
        //The IDBRequest object includes an onsuccess event that can be subscribed to, which provides notification when the connection is ready for use.
        //It also includes an onerror event that can notify your application if an error occurs during an attempt to connect. 
        request.onsuccess = function (response) {
            db = request.result;
            ns.display();
        };
    };
    
    function bindToGrid(results) {
        var html = '';

        for (var i = 0; i < results.length; i++) {
            var key = results[i].key;
            var contact = results[i].contact;
            html += '<tr><td>' + contact.email + '</td>';
            html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key=' + key + '>Edit</a></td></tr>';
        }

        html = html || '<tr><td colspan="3">No records available</td></tr>';
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }

    //Use the index to find the corresponding item in the contacts array and then store the index and contact object within the currentRecord field. 
    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));

        //Use the object store’s get method to find the selected record by its key
        var trans = db.transaction('contacts', 'readonly');
        var store = trans.objectStore("contacts");
        var request = store.get(key); 
        
        request.onsuccess = function (response) {
            $('#currentAction').html('Edit Contact');
            currentRecord = { key: key, contact: response.target.result }
            displayCurrentRecord();
        };
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
                
        var trans = db.transaction('contacts', 'readonly');

        //The other approach to finding records is by using cursors
        //Loading the list of contacts requires the use of a cursor to iterate through and build an array of results.        
        var request = trans.objectStore('contacts').openCursor();
        var results = [];

        request.onsuccess = function (response) {

            //If no records are found, the onsuccess event will still fire, but the result will be undefined (or null).
            //If records are found, the cursor’s value property will contain the current record. 
            var cursor = response.target.result;

            if (!cursor) {
                //alert('No records found.'); 
                bindToGrid(results);
                return;
            }

            //DEPOIS DO BIND, EU RETIRO O ITEM DO ARRAY
            results.push({ key: cursor.key, contact: cursor.value });
            //To continue iterating, invoke the cursor’s continue method, which will trigger the onsuccess event handler again
            // When it reaches the end of the collection, the onsuccess event will have a null cursor.
            cursor.continue();
        };
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
                
        //When your object stores are in place, you must use the IDBTransaction object to add or remove objects. 
        //Specifies the object stores with which the transaction will work. If only one object store is needed, the parameter can be a single string. 
        //If multiple object stores are needed, pass an array of strings.
        var trans = db.transaction('contacts', 'readwrite'); //Optional when possible values are readonly and readwrite. If not specified, the transaction will be defaulted to readonly. If left in readonly mode, multiple transactions can be run concurrently
        var contacts = trans.objectStore("contacts");
        //If updating an existing record, use the put method.If adding a new record, use the add method. 
        var request = currentRecord.key != null ? contacts.put(contact, currentRecord.key) : contacts.add(contact);

        request.onsuccess = function (response) {
            ns.display();
        };
    };
})();

