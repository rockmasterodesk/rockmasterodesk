// This script will be applied to all the pages


// Start: "Speech Bubble" codes
$(function(){
// Helper
var scrollStop = function (callback) {
  if (!callback || typeof callback !== 'function') return;
  var isScrolling;
  window.addEventListener('scroll', function (event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      callback();
    }, 66);
  }, false);
};

// Clicking should open/close the bubble
$('.speech-bubble').click(function(){
  console.log('clicked');
  if ($(this).hasClass('enlarged')){
    $(this).removeClass('enlarged');
    $(this).find('.large-bubble').slideToggle('slow');
  } else {
    $(this).addClass('enlarged');
    $(this).find('.large-bubble').slideToggle('slow');
  }
});

// On Scroll, it will be hidden
$(window).on('scroll', function(){
  if ($('.speech-bubble').hasClass('enlarged')){
    $('.speech-bubble').removeClass('enlarged');
    $('.speech-bubble').find('.large-bubble').slideToggle('slow');
  }
  $('.speech-bubble').hide();
});

// On Scroll, it will be hidden
scrollStop(function(){
  setTimeout(function(){
    $('.speech-bubble').css('display','flex');
  }, 1000);
});
});
// END: Speech Bubble