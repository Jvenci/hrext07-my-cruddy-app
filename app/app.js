/*
Init app
interact with DOM
interact with localstorage

 */

//'use strict';

$(window).on('load', function() {
  var $table = $('#contacts-table');
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      var personObj = JSON.parse(localStorage[key])
      var $tr = document.createElement("tr");
      for (var prop in personObj) {
        var $td = document.createElement("td");
        $td.setAttribute("class", prop);
        if (prop === 'action') {
          $td.innerHTML = '<button class="action-btn" id="btn-edit-' + personObj.id + '">Edit</button> | <button class="action-btn" id="btn-delete-' + personObj.id + '">Remove</button>';
          $tr.appendChild($td);
          $tr.setAttribute("id", "entry-" + personObj.id);
        } else {
          $td.append(document.createTextNode(personObj[prop]));
          $tr.append($td);
        }
      }
      $table.append($tr);
    }
  }
});



$(document).ready(function() {

  var $table = $('#contacts-table');

  var contactConstructor = function(fN, lN, phone, address, email) {
    var person = {
      id: localStorage.length + 1,
      firstName: fN,
      lastName: lN,
      phone: phone,
      address: address,
      email: email,
      action: null
    }
    return person;
  };
      
  $('.btn-add').on('click', function() {

    var firstName = $('.input-firstName').val();
    var lastName = $('.input-lastName').val();
    var phoneData = $('.input-phone').val();
    var addressData = $('.input-address').val();
    var emailData = $('.input-email').val();

    var personObj = contactConstructor(firstName, lastName, phoneData, addressData, emailData)

    localStorage.setItem(localStorage.length + 1, JSON.stringify(personObj));

    var tableAdd = function(personObj) {
      var $tr = document.createElement("tr");
      for (var key in personObj) {
        var $td = document.createElement("td");
        $td.setAttribute("class", key);
        if (key === 'action') {
          $td.innerHTML = '<button class="action-btn" id="btn-edit-' + personObj.id + '">Edit</button> | <button class="action-btn" id="btn-delete-' + personObj.id + '">Remove</button>';
          $tr.appendChild($td);
          $tr.setAttribute("id", "entry-" + personObj.id);
        } else {
          $td.append(document.createTextNode(personObj[key]));
          $tr.append($td);
        }
      }
      $table.append($tr);
    }
    tableAdd(personObj);
    window.location.reload();
    $('.container-form').children('input').val('')
  });

  $('.action-btn').on('click', function() {
    var action = this.id.split('-')[1];
    var id = this.id.split('-')[2];
    if (action === 'delete') {
      localStorage.removeItem(Number(id))
      window.location.reload();
    } else if (action === 'edit') {
      $('#entry-' + id + ' .action').prepend('<button class="action-btn" id="btn-edit-submit-' + id + '">Submit</button> | ')
      $('#entry-' + id + ' .firstName').html('<input type="text" id="edit-input-firstName-' + id + '">');
      $('#entry-' + id + ' .lastName').html('<input type="text" id="edit-input-lastName-' + id + '">');
      $('#entry-' + id + ' .phone').html('<input type="text" id="edit-input-phone-' + id + '">');
      $('#entry-' + id + ' .address').html('<input type="text" id="edit-input-address-' + id + '">');
      $('#entry-' + id + ' .email').html('<input type="text" id="edit-input-email-' + id + '">');
      
      var firstName, lastName, phone, address, email; 
      
      var personObj = JSON.parse(localStorage[id]);

      firstName = personObj['firstName'];
      lastName = personObj['lastName'];
      phone = personObj['phone'];
      address = personObj['address'];
      email = personObj['email'];

      $('#edit-input-firstName-' + id).attr('placeholder', firstName);
      $('#edit-input-lastName-' + id).attr('placeholder', lastName);
      $('#edit-input-phone-' + id).attr('placeholder', phone);
      $('#edit-input-address-' + id).attr('placeholder', address);
      $('#edit-input-email-' + id).attr('placeholder', email);
      
      $('#btn-edit-submit-' + id).on('click', function () {          
        var firstName = $('#edit-input-firstName-' + id).val();
        var lastName = $('#edit-input-lastName-' + id).val();
        var phoneData = $('#edit-input-phone-' + id).val();
        var addressData = $('#edit-input-address-' + id).val();
        var emailData = $('#edit-input-email-' + id).val();

        var personObj = JSON.parse(localStorage[id]);

        if (firstName !== personObj['firstName'] && firstName !== '') {
          personObj['firstName'] = firstName;
        }
        if (lastName !== personObj['lastName'] && lastName !== '') {
          personObj['lastName'] = lastName;
        }
        if (phoneData !== personObj['phone'] && phoneData !== '') {
          personObj['phone'] = phoneData;
          console.log(true)
        }
        if (addressData !== personObj['address'] && addressData !== '') {
          personObj['address'] = addressData;
        }
        if (emailData !== personObj['email'] && emailData !== '') {
          personObj['email'] = emailData;
        }

        localStorage.setItem(id, JSON.stringify(personObj));
        console.log(personObj)

        window.location.reload();

       });
    }
  });

});