$(document).ready(function(){

  $('#ImportButton').click(function(){
    $('.json-box').css('display','flex');
  });

  $('.json-box').click(function(e){
    if (e.target.className === 'json-box'){
      $('.json-box').css('display','none');
    }
  });
  
  $('#SubmitButton').click(function(){
    var $text = $('#json_box').val();
    console.log($text);
    var formBuilder = new JsonFormBuilder($text, {
      price_multiplier: $('#price_multiplier').val(),
      price_multiplier_mode: $('#price_multiplier_mode').val(),
      compare_multiplier: $('#compare_multiplier').val(),
      compare_multiplier_mode: $('#compare_multiplier_mode').val(),
    });
    $('.json-box').css('display','none');
  });



});