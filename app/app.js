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
    console.log(id)
    if (action === 'delete') {
      localStorage.removeItem(Number(id))
      window.location.reload();
    }
  });

});