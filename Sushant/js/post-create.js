$(document).ready(function(){
	$('#post_content').autoResize();

	// Programmmatically click the hidden file input by clicking the link
  $('#AddImageButton').click(function(){
    $('#attached_images').click();
	});

	// Displays image directly from user's filesystem before uploading that to server.
	function DisplayImageBeforeUploading(input) {
		var acceptedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"]
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			// console.log(input.files[0].type);
			if (acceptedTypes.indexOf(input.files[0].type) < 0){
				alert("The file must be an image file (jpeg/png/gif/webp).");
				return;
			}

			reader.onload = function (e) {
				// We use background image rather than "img" to cover the area
				$('.single-image .the-image').css({
          'background-image' : `url(${e.target.result})`
				});
				$('#post_content').hide();
			}

      reader.readAsDataURL(input.files[0]);
      
      // console.log('adding-class');
			$('.attached-images').addClass('has-images');
		}
  }

	// Clear the form when user removes image from post
  function CancelImageSelection(){
		$('.attached-images').removeClass('has-images'); // Hide the Image Preview
		$('.single-image .the-image').css({ // Image Preview Source to Empty
      'background-image' : `none`
    });
		$('#attached_images').val('') // Clear file input
		$('#post_content').show();
	}
  
  // Display the image on selecting from filesystem
	$('#attached_images').change(function(){
		DisplayImageBeforeUploading(this);
  });

  // Cancel the image
	$('#CancelUploadButton').on('click', function(){
		CancelImageSelection();
	});

	// Post title field autocomplete UI
	var channels = [
		{ value: 'Channel 1'},
		{ value: 'Andrew'},
		{ value: 'Baker'},
		{ value: 'New Jersey'},
		{ value: 'Poor'},
		{ value: 'Rich'},
		{ value: 'Guardian'},
		{ value: 'Viva'},
		{ value: 'Online'},
		{ value: 'Virus'},
		{ value: 'Monday'},
		{ value: 'Moon'},
	];

	$('#title').autocomplete({
			lookup: channels,
			delimiter: "[",
			onSelect: function (suggestion) {
					console.log("selected:", suggestion);
			}
	});
});