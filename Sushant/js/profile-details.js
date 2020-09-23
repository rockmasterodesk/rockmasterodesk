$(document).ready(function(){
  window.deviceSize = 'small'; // Responsive Design Mobile First
  var colors = ['0ABB87', '00BCD4', 'FFB822'];
  var doms = $('.single-zip-code .logo');
  var c=0;


  // Colorize the logos
  for(let i=0; i<doms.length; i++){
    let color = '#'+colors[ c++ % colors.length ];
    doms[i].style.backgroundColor = color;
  }

  $('#profilePicture').change(function(e){
    var form = $('#fileForm');
    console.log(form);

    $('.globalOverlay').css('display','flex');

    $.ajax({
      url: form.attr('action'),
      type: form.attr('method'),
      data:  new FormData(form[0]),
      contentType: false,
            cache: false,
      processData:false,
      success: function(data)
        {
          $('.globalOverlay').css('display','none');
          if(data.success=='true') {
            $('.propic-image').attr('src', data.thumbnail_path);
          }
          else {
            alert(data.message);
          }
        },
      error: function(e) 
        {
          console.log(e);
          $('.globalOverlay').css('display','none');
        }          
      });
  });


  $('.opener').click(function(){
    // if (window.deviceSize == 'large'){
    //   return;
    // }
    $this = $(this);
    href = $this.attr('href');
    $('.profile-details-box, .favorite-contacts-box, .zip-listings').hide();
    console.log('.'+href);
    $('.'+href).show();
    $('.'+href).find('.row').show();
    $('.open').removeClass('open');
    $this.addClass('open');
  });

  $('.NameEditButton').click(function(){
    $('.name-display').hide();
    $('.name-edit-display').show();
  });

  $('.NameCancelButton').click(function(){
    hideNameEdit();
  });

  $('.NameSubmitButton').click(function(){
    var formData = new FormData();
    formData.append('name', $('#FullNameField').val());

    $.ajax({
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      cache: false,
      success: function(response){
        console.log(response);
        hideNameEdit();
      },
      error: function(response){
        console.log(response);
        hideNameEdit();
      }
    });
  });

  function hideNameEdit(){
    $('.name-edit-display').hide();
    $('.name-display').show();
  }

  function changeDeviceSize(x){
    if (x.matches){ // This is large screen;
      window.deviceSize = 'large';
      $('.profile-row, .contacts-row, .locations-row').show();
    } else {
      window.deviceSize = 'small';
    }
  }

  var x = window.matchMedia("(min-width: 768px)")
  changeDeviceSize(x);
  x.addListener(changeDeviceSize) // Attach listener function on state changes
});
