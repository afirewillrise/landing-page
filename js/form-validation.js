$(document).ready(function() {
  $("#error-name, #error-email, #error-phone, #error-message, #error-submit").hide();
  var nameValid = false, emailValid = false, phoneValid = false, messageValid = false;
  $("#input-name").on('focusout', function() {
    if($("#input-name").val() == '') {
      $("#error-name").hide();
      $("#error-name").text("Please Enter a Name");
      $("#error-name").show();
    } else {
      var regex = /^[a-zA-Z ]{2,30}$/;
      if(!regex.test($("#input-name").val())) {
        $("#error-name").hide();
        $("#error-name").text("Please Enter a Valid Name");
        $("#error-name").show();
      } else {
        $("#error-name").hide();
        nameValid = true;
      }
    }
  });
  $("#input-email").on('focusout', function() {
    if($("#input-email").val() == '') {
      $("#error-email").hide();
      $("#error-email").text("Please Enter an Email Address");
      $("#error-email").show();
    } else {
      var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if(!regex.test($("#input-email").val())) {
        $("#error-email").hide();
        $("#error-email").text("Please Enter a Valid Email Address");
        $("#error-email").show();
      } else {
        $("#error-email").hide();
        emailValid = true;
      }
    }
  });
  $("#input-phone").on('focusout', function() {
    if($("#input-phone").val() == '') {
      $("#error-phone").hide();
      $("#error-phone").text("Please Enter A Phone Number");
      $("#error-phone").show();
    } else {
      var regex = /^\d{10}$/;
      if(!regex.test($("#input-phone").val())) {
        $("#error-phone").hide();
        $("#error-phone").text("Yes! It is optional, but we would like to have a valid phone number if you wish");
        $("#error-phone").show();
      } else {
        $("#error-phone").hide();
        phoneValid = true;
      }
    }
  });
  $("#input-message").on('focusout', function() {
    if($("#input-message").val() == '') {
      $("#error-message").hide();
      $("#error-message").text("Please Enter A Message");
      $("#error-message").show();
    } else {
      $("#error-message").hide();
      messageValid = true;
    }
  });
  $("#contact-form").submit(function(event) {
    event.preventDefault();
    if((nameValid && emailValid && messageValid)) {
      $("#error-submit").hide();
      $.ajax({
        url: "https://formspree.io/willie@allcal.com",
        method: "POST",
        data: {
          name: $("#input-name").val(),
          phone: $("#input-phone").val(),
          email: $("#input-email").val(),
          message: $("#input-message").val(),
        },
        dataType: "json",
        success: function() {
          $("#error-submit").css("color", "#22993c");
          $("#error-submit").text("Your response has been submitted. We will contact you as soon as possible :) ");
          $("#error-submit").show();
          $("#input-name").val("");
          $("#input-phone").val("");
          $("#input-email").val("");
          $("#input-message").val("");
        },
        error: function() {
          $("#error-submit").text("There was a problem with the system while submitting your response. We apologize for any inconvenience this has caused you. Could you please try again?");
          $("#error-submit").show();
        }
      });
    } else {
      $("#error-submit").hide();
      $("#error-submit").text("Please fill up the form before submitting");
      $("#error-submit").show();
    }
  });
});
