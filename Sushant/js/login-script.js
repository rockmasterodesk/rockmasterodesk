$(document).ready(function(){

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


  
  $RegisterLink = '#RegisterLink';
  $LoginLink = '#LoginLink';
  $GuestLink = '#GuestLink';
  $ForgotLink = '#ForgotLink';

  $Register_form = '.register-form';
  $Login_form = '.login-form';
  $Guest_form = '.guest-form';
  $Forgot_form = '.forgot-form';

  // Hide others, Show Register Form
  $(document).on('click', $RegisterLink, function(e){
    // e.preventDefault();
    $($Login_form).hide();
    $($Guest_form).hide();
    $($Forgot_form).hide();
    $($Register_form).show();
  });

  // Hide others, Show Login Form
  $(document).on('click', $LoginLink, function(e){
    // e.preventDefault();
    $($Register_form).hide();
    $($Guest_form).hide();
    $($Forgot_form).hide();
    $($Login_form).show();
  });
  
  // Hide others, Show Guest Form
  $(document).on('click', $GuestLink, function(e){
    // e.preventDefault();
    $($Register_form).hide();
    $($Login_form).hide();
    $($Forgot_form).hide();
    $($Guest_form).show();
  });


  // Hide others, Show Guest Form
  $(document).on('click', $ForgotLink, function(e){
    // e.preventDefault();
    $($Register_form).hide();
    $($Login_form).hide();
    $($Guest_form).hide();
    $($Forgot_form).show();
  });
});
