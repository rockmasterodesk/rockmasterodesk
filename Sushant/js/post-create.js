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
				// $('#post_content').hide();
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
		// $('#post_content').show();
	}

	// Add the tag form
	function AddTag(tag){
		if (tag !== undefined && tag !== null && tag !== ''){
			var MaxChannels = parseInt($('#TitleInput').attr('max-channels'));
			if ($(document).find('.tags').children().length >= MaxChannels){
				return;
			}


			// Check if the tag already exists
			var found = $('.hidden-tags-inputs > input[value="'+tag+'"]');
			if (0 !== found.length){
				// Don't have to add it again
			} else {
				// Add this visible tags list
				var div_tag = $('#title').parent().find('.tags');
				div_tag.css('display','flex !important');
				div_tag.append('<div class="tag" value="'+tag+'"><div class="text">'+tag+'</div><i class="fas fa-times-circle ml-1"></i></div>')

				// Add this to hidden input list
				$('.hidden-tags-inputs').append('<input type="hidden" name="channels[]" value="'+tag+'" />');
			}

			// Remove tag from title
			var title_text = $('#title').val();
			var title_text_arr = title_text.split(' ');
			var tag_location_with_bracket = title_text_arr.indexOf('['+tag.split(' ')[0]);
			var tag_location_without_bracket = title_text_arr.indexOf(tag.split(' ')[0]);
			if (tag_location_with_bracket >= 0){
				title_text_arr.splice(tag_location_with_bracket, tag.split(' ').length);
				var new_title_text = title_text_arr.join(' ');
				$(document).find('#title').val(new_title_text+' ');
			}
			else if (tag_location_without_bracket >= 0){
				title_text_arr.splice(tag_location_without_bracket, tag.split(' ').length);
				var new_title_text = title_text_arr.join(' ');
				$(document).find('#title').val(new_title_text+' ');
			}

			if ($(document).find('#title').val() === ' '){
				$(document).find('#title').val('');
			}

		}
	}

	function RemoveTag(button){
		// console.log($(button));
		var div_tag = $(button).parent();
		// console.log('close');
		// console.log($('.hidden-tags-inputs > input[value='+div_tag.attr("value")+']'));
		$('.hidden-tags-inputs > input[value="'+div_tag.attr("value")+'"]').remove();
		div_tag.remove();
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

	$('#title').focus(function(){
		$(this).parent().addClass('focused');
	})
	$('#title').blur(function(){
		$(this).parent().removeClass('focused');
	})

	$('#title').autocomplete({
			lookup: channels,
			delimiter: "[",
			triggerSelectOnValidInput: false,
			onSelect: function (suggestion) {
					AddTag(suggestion.value);
			}
	});

	$(document).on('click', '.post-title .fa-times-circle', function(e){
		RemoveTag(this);
	});
});