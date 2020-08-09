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
    var formBuilder = new JsonFormBuilder($text);
    $('.json-box').css('display','none');
  });



});