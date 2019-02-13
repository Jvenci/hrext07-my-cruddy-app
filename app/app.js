/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var nameData = 'ourKey'; // going to need to make this dynamic?
  

  var contactConstructor = function(name, phone, address, email) {
    var person = { 
      name: name,
      phone: phone,
      address: address,
      email: email
    }
    return JSON.stringify(person);
  };

  $('.btn-add').on('click', function(e){
    console.log(e);
    var nameData = $('.input-name').val();
    var phoneData = $('.input-phone').val();
    var addressData = $('.input-address').val();
    var emailData = $('.input-email').val();
    // write to db
    localStorage.setItem(nameData, contactConstructor(nameData, phoneData, addressData, emailData));
    // read from db
    //var displayText = nameData + ' | ' + localStorage.getItem(nameData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="nameData">phoneData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    $('.container-data').append('<div class="display-data-item" data-keyValue="'+ nameData +'">'+nameData+ ' ' +phoneData+ ' ' +addressData+ ' ' +emailData+'</div>');
    $('.input-name').val('');
    $('.input-phone').val('');
    $('.input-address').val('');
    $('.input-email').val('');
  });


  // update db
    $('.btn-update').on('click', function(e) {
      var nameData = $('.input-name').val();
      var phoneData = $('.input-phone').val();
      var addressData = $('.input-address').val();
      var emailData = $('.input-email').val();

      var inputArr = [nameData, phoneData, addressData, emailData];
      var personInfo = JSON.parse(localStorage.getItem(nameData))
      var properties = Object.keys(personInfo)

      for (var i = 0; i < inputArr.length; i++) {
        if (inputArr[i] !== '') {
          personInfo[properties[i]] = inputArr[i];
          
        }
      }

      localStorage.setItem(nameData, JSON.stringify(personInfo))
    })

  // delete item
  $('.btn-delete').on('click', function(e){
    // console.log(e.currentTarget.dataset.keyvalue);
     //var nameData = $('.input-name').val();
    localStorage.removeItem(nameData);
    $('.container-data').text('');
    $('.input-name').val('');
    $('.input-phone').val('');
    $('.input-address').val('');
    $('.input-email').val('');
  });
  // delete all?
  // $('.btn-clear').click(function(){
  //   localStorage.clear();
  //   $('.container-data').text('');
  // });

});