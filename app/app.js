/*
Init app
interact with DOM
interact with localstorage

 */
$(window).on('load', function(){
    var $tr = document.createElement("tr");
      var $table = $('#contacts-table');
      for (var key in localStorage) {
        var parsedPerson = JSON.parse(localStorage[key])
        if (parsedPerson.hasOwnProperty(key)) {
          var $td = document.createElement("td");
          $td.append(document.createTextNode(parsedPerson[key]));
          $tr.append($td);
        }
      }
      $table.append($tr);
});

$(document).ready(function(){
  // this is where we jquery
  //var firstName = 'ourKey'; // going to need to make this dynamic?
  

  var contactConstructor = function(fN, lN,  phone, address, email) {
    var person = { 
      id: localStorage.length + 1,
      firstName: fN,
      lastName: lN,
      phone: phone,
      address: address,
      email: email
    }
    return person;
  };

  //add entry to db and address table
  $('.btn-add').on('click', function(){
       
    var firstName = $('.input-firstName').val();
    var lastName = $('.input-lastName').val();
    var lastName = $('.input-lastName').val();
    var phoneData = $('.input-phone').val();
    var addressData = $('.input-address').val();
    var emailData = $('.input-email').val();

    var personObj = contactConstructor(firstName, lastName, phoneData, addressData, emailData)
    
    localStorage.setItem(localStorage.length + 1,JSON.stringify(personObj));
    
    var tableAdd = function(personObj) {
      var $tr = document.createElement("tr");
      var $table = $('#contacts-table');
      for (var key in personObj) {
        if (personObj.hasOwnProperty(key)) {
          var $td = document.createElement("td");
          $td.append(document.createTextNode(personObj[key]));
          $tr.append($td);
        }
      }
      //   $td = document.createElement("td");
      //   $td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'">Edit</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
      //   $tr.appendChild($td);
      //   $tr.setAttribute("id", "entry-"+ entry.id);
        $table.append($tr);
      }
    //}

    tableAdd(personObj);



    $('.container-form').children('input').val('')
  });


  // update db
  $('.btn-update').on('click', function() {
    var firstName = $('.input-firstName').val();
    var lastName = $('.input-lastName').val();
    var phoneData = $('.input-phone').val();
    var addressData = $('.input-address').val();
    var emailData = $('.input-email').val();

    var inputArr = [firstName, phoneData, addressData, emailData];
    var personInfo = JSON.parse(ID)
    var modifiableFields = Object.keys(personInfo)

    for (var i = 0; i < inputArr.length; i++) {
      if (inputArr[i] !== '') {
        personInfo[modifiableFields[i]] = inputArr[i];
        
      }
    }

    localStorage.setItem(ID, JSON.stringify(personInfo))
   $('.container-form').children('input').val('')
  });

  // delete item
  $('.btn-delete').on('click', function(){
    var firstName = $('.input-firstName').val();
    var lastName = $('.input-lastName').val();
    var phoneData = $('.input-phone').val();
    var addressData = $('.input-address').val();
    var emailData = $('.input-email').val();
    // console.log(e.currentTarget.dataset.keyvalue);
     //var firstName = $('.input-firstName').val();
    localStorage.removeItem(ID);
    //$('.container-data').text('');
    $('.container-form').children('input').val('')
  });

});