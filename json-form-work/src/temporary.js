$(document).ready(function(){

  $('#ImportButton').click(function(){
    $('textarea#json_box').val("");

    $('.json-box #SubmitButton').css('display','block');
    $('.json-box .input-group').css('display','flex');
    $('.json-box').css('display','flex');
  });

  $('#ExportButton').click(function(){
    $('textarea#json_box').val(window.formBuilder.generateExportData());


    $('.json-box #SubmitButton').css('display','none');
    $('.json-box .input-group').css('display','none');
    $('.json-box').css('display','flex');
  });

  $('.json-box').click(function(e){
    if (e.target.className === 'json-box'){
      $('.json-box').css('display','none');
    }
  });
  
  $('#SubmitButton').click(function(){
    var $text = $('#json_box').val();

    window.formBuilder = new JsonFormBuilder($text, {
      price_multiplier: $('#price_multiplier').val(),
      price_multiplier_mode: $('#price_multiplier_mode').val(),
      compare_multiplier: $('#compare_multiplier').val(),
      compare_multiplier_mode: $('#compare_multiplier_mode').val(),
      changeShippingFunction: function(callback){
        callback(2.33, "China", "FedEx");
      }
    });

    $('.json-box').css('display','none');
  });



});