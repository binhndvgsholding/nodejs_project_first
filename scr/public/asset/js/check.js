$(document).ready(function() {
    
    if ($("textarea[name=messagesUser]").val() !==  '') {
      $(".send-mess-user").prop("disabled", true);
    } else {
      $(".send-mess-user").prop("disabled", false);
    }
  });
  