function getRoomObject($objOrStr){
	if (typeof $objOrStr == 'object'){ // Already an object, return
		return $objOrStr;
	}

	// Convert it to object
	$objOrStr = $objOrStr.replace(/\'/gi, '\"');
	return JSON.parse($objOrStr);
}

window.MessengerOverlay = function(){
	this.element = $('.messenger-overlay-loading');
	return this;
};
window.MessengerOverlay.prototype.hide = function(){
	this.element.css('display','none');
};
window.MessengerOverlay.prototype.show = function(){
	this.element.css('display','flex');
};

$(document).ready(function(){
	window.deviceSize = 'small'; // Responsive Design Mobile First

	var overlay = new MessengerOverlay();
	overlay.hide();


	// Messages Tab Related
	window.$tabs = new MessageTabs({
		'name' : 'Mumbai - 230532',
		'image': 'images/man_avatar1.jpg',
		'room_id' : 1
	}, {
		onActivateTab: function(tab){
			// console.log('Callback: ' + tab.room_id);
			// $('#MessagesContainer').find('.to_me').each(function(index, element){
			// 		$(element).find('.name a').text(tab.name);
			// });

			$("#click-tooltip").hide(); // Hides the tooltip when "Send Message" button is clicked
			$("#profile-tooltip").hide(); // Hides the tooltip when "Send Message" button is clicked
		}
	});

	for(var i=0; i<4; i++){
		$tabs.addTab({
			'name' : 'Tab ' + i,
			'image': 'images/man_avatar1.jpg',
			'room_id' : 'test-tab-' + i,
			'new_message_count' : Math.ceil(Math.random()*10) % 2 === 0 ? 1 : 0
		});
	}

	$tabs.addScrolledToTopListener(function(tab){
		$tabs.showLoadingIcon();
		setTimeout(function(){
			$tabs.hideLoadingIcon();
			$('#MessagesContainer').prepend("<center>"+ tab.room_id + " onScrollTop event occured" +"</center>");
		}, 500);
	});

	// Clicking the send message button, submit the message
	$(document).on('click', "#SendMessageButton", function(e){
		// Send the message through websocket/json
		// axios.post(URL, MessageData).then(()={});

		var value = $('#SendMessageInput').val();

		console.log(value);

		if (null === value || "" === value){
			return;
		}

		$('#MessagesContainer').append(`
		<div class="single-message flex-custom from_me">
			<div class="name-and-message">
				<div class="name">
					<a popover-profileInfo="{'room_id':'room~100','name':'ASM Asaduzzaman', 'image':'null', 'color' : '000', 'self':true}" href="#">ASM Asaduzzaman</a> - <span>1s</span>
				</div>
				<div class="main-message">
					${value}
				</div>
			</div>
			<div class="sidebar">
				<img src="images/man_avatar1.jpg" alt="Profile Picture">
			</div>
		</div>
		`);

		// Should resize the scrollbar
		$('#MessagesContainer').getNiceScroll().resize();

		setTimeout(function(e){
			$tabs.scrollToBottom();
		}, 200);

		// Now clear the input and cached message
		$tabs.clearCurrentTabInput();
	});

	// Create new room
	$(document).on('click', '#click-tooltip .send-message, #profile-tooltip .send-message', function(e){
		e.preventDefault();

		let $room_string = $(this).attr('data-room');
		// console.log($(this).attr('data-room'));
		let $room = getRoomObject($room_string);

		$tabs.addTab($room);

		// console.log($room);
	});

	// Send Message Dropdown Button
	$(document).on('click', '.send-message-dropdown', function(e){
		e.preventDefault();

		let $room_string = $(this).parent().parent().parent().parent().parent().attr('click-profileInfo');
		// console.log($(this).attr('data-room'));
		let $room = getRoomObject($room_string);

		$tabs.addTab($room);
		// console.log($room);
	});

	// Close current room
	$(document).on('click', '.close-button', function(e){
		e.preventDefault();

		let $index = $(this).data('close');

		$tabs.closeTab($index);

		// console.log($room);
	});

	// Activate a room
	$(document).on('click', '.person-header-tabbed .tab', function(e){
		e.preventDefault();
		let $index = $(this).data('index');

		$close = $(this).find('.close-button');

		// Only activate is "close button" is not clicked
		if(e.target.classList.value == 'fa fa-times' || e.target.classList.value == 'btn close-button'){
			return;
		} else {
			$tabs.activateTab($index);
		}
	});

	$(document).on('click', '#ConversationDetailsOpener, #DetailsOpenerBars', function(){
		console.log('opener clicked');
		$('#ConversationDetails').removeClass('display-none-min-screen');
		$('.black-overlay').show();
	});

	$(document).on('click', '#CloserOverlay', function(e){
		$('#ConversationDetails').addClass('display-none-min-screen');
		$('.black-overlay').hide();
	});

	$(document).on('click', '#CloseDetails', function(e){
		e.preventDefault();
		$("#ConversationDetails").addClass('display-none-min-screen');
		$('.black-overlay').hide();
	});


	// Top Right Search Icon
	$(document).on('click', "#searchIcon", function(){
		$("#searchForm").toggle();
	});

	// Search Button
	$(document).on('click', "#searchButton", function(e){
		e.preventDefault();
		$(this).parent().parent().find('.search-results').toggle();
	});

	// Search Input -> show results div on focus
	$(document).on('focus', "#searchInput", function(){
		$(this).parent().find('.search-results').show();
	});
	
	$(document).mouseup(function(e) {
			var container = $(".search-results");
			var input = $("#searchInput");
			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) 
			{
					container.hide();
			}
	});


	// Profile Tooltip
	window.shouldHidePopup = true;
	window.shouldShowPopup = true; // Take some time to show the popup
	$(document).on('mouseenter', '[popover-profileInfo]', function(e){
			$this = $(this);
			window.shouldShowPopup = true; // It will show the popup

			setTimeout(function(){
					if (!window.shouldShowPopup) // the mouse has left, abort the popup
							return;

					$pid = $this.attr('popover-profileInfo');
					// console.log($pid);
					// Do anything with the user id
					// This is the place where we'll update the person details inside the div
					var $person = getRoomObject($pid);

					var container = $("#profile-tooltip");
					container.find('.header .name').text($person.name);
					container.find('.actions .send-message').attr('data-room', $pid);
					
					if ($person.self){
						container.find('.actions button').each(function(){
							$(this).hide();
						});
						container.find('.actions .myProfile').show();
					} else {
						container.find('.actions button').each(function(){
							$(this).show();
						});
						container.find('.actions .myProfile').hide();
					}


					// Image or No Image
					var $yes_image = container.find('.header .yes-image');
					var $no_image = container.find('.header .no-image');
					if ($person.image != 'null'){
						$yes_image.removeClass('display-none');
						$no_image.addClass('display-none');
						$yes_image.attr('src', $person.image);
					} else{
						$yes_image.addClass('display-none');
						$no_image.removeClass('display-none');
						$no_image.text($person.name.slice(0,1));
						if (undefined != $person.color && null != $person.color){
							$no_image.css('background', '#'+$person.color);
						}
					}

					$tooltip = $('#profile-tooltip');

					// Show the popup
					Popper.createPopper($this[0], $tooltip[0], {
						placement: 'bottom-start',
					});
					
					// $tooltip.html('<p>Loading...</p>');
					$tooltip.show();
			},100);
	});
	$(document).on('mouseleave', '[popover-profileInfo]', function(e){
			// Mouse has left, set show variable to false
			window.shouldShowPopup = false;
			setTimeout(function(){
					// If the popup is visible, hide it
					hidePopupNow();
			}, 100);
	});
	
	$(document).on('mouseenter', '#profile-tooltip', function(e){
			// Mouse is inside the tooltip, don't hide it now
			window.shouldHidePopup = false;
	});
	
	$(document).on('mouseleave', '#profile-tooltip', function(e){
			window.shouldHidePopup = true;
			hidePopupNow();
	});

	function hidePopupNow(){
			if (window.shouldHidePopup)
					$('#profile-tooltip').hide();
	}


	// Click ProfileInfo
	$(document).on('click', '[click-profileInfo]', function(e){
			var $this = $(this);

			if (window.deviceSize !== "large"){ // Only activate for large screen
				return;
			}

			window.shouldShowPopup = true; // It will show the popup

			if ('dropdown-item'===e.target.classList[0] || 'dropdown-menu'===e.target.classList[0]){
				return;
			}

			// Get the User ID
			var $pid = $this.attr('click-profileInfo');
			// console.log($pid);
			// This is the place where we'll update the person details inside the div
			// Do anything with the user information
			var $person = getRoomObject($pid);
			var container = $("#click-tooltip");
			container.find('.header .name').text($person.name);
			container.find('.actions .send-message').attr('data-room', $pid);


			// Image or No Image
			var $yes_image = container.find('.header .yes-image');
			var $no_image = container.find('.header .no-image');
			if ($person.image != 'null'){
				$yes_image.removeClass('display-none');
				$no_image.addClass('display-none');
				$yes_image.attr('src', $person.image);
			} else{
				$yes_image.addClass('display-none');
				$no_image.removeClass('display-none');
				$no_image.text($person.name.slice(0,1));
				if (undefined != $person.color && null != $person.color){
					$no_image.css('background', '#'+$person.color);
				}
			}


			$tooltip = $('#click-tooltip');

			// Show the popup
			Popper.createPopper($this[0], $tooltip[0], {
				placement: window.deviceSize == 'large' ? 'right' : 'bottom-start',
			});
			
			// $tooltip.html('<p>Loading...</p>');
			$tooltip.show();
	});
	$(document).mouseup(function(e) {
		var container = $("#click-tooltip");
		var input = $("[click-profileInfo]");
		// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) 
		{
				container.hide();
		}
	});

	function changeDeviceSize(x){
		if (x.matches){ // This is large screen;
			window.deviceSize = 'large';
		} else {
			window.deviceSize = 'small';
		}
	}

	var x = window.matchMedia("(min-width: 768px)")
	changeDeviceSize(x);
	x.addListener(changeDeviceSize) // Attach listener function on state changes

	
	// Scrolls
	if (window.deviceSize == 'large'){
		$('#Conversations').niceScroll({});
		$('.person-header-tabbed').niceScroll({});
		$('#MessagesContainer').niceScroll({});
	}

	$(document).on('click', '.reply-button', function(e){
		e.preventDefault();
		var ProfilePicture = $(this).parent().parent().parent().find('.sidebar').find('img').attr('src');
		var Name = $(this).parent().parent().find('.name').find('a').text();
		var Message = $(this).parent().parent().find('.main-message').text();

		$('.replying-to').find('.sidebar').find('img').attr('src', ProfilePicture);
		$('.replying-to').find('.name').text(Name);
		$('.replying-to').find('.main-message').text(Message);

		$('.replying-to').css('display','flex');

		// Should resize the scrollbar
		$('#MessagesContainer').getNiceScroll().resize();
	});

	$(document).on('click', '.close-reply-box', function(e){
		e.preventDefault();

		$('.replying-to').find('.sidebar').find('img').attr('src', "");
		$('.replying-to').find('.name').text("");
		$('.replying-to').find('.main-message').text("");

		$('.replying-to').css('display','none');

		// Should resize the scrollbar
		$('#MessagesContainer').getNiceScroll().resize();
	});

	if( window.deviceSize === "small" ) { // Add swipe-right listener only for mobile devices
		$(document).on("swiperight",".single-message",function(e){
		
			// The following snipped is a fix so that- 
			// swiping nested reply doesn't trigger reply mode for parent message.
			if (window.nestedMessageSwiped === true){
				return;
			}

			if (!$(this).hasClass('flex-custom')){
				window.nestedMessageSwiped = true;
				setTimeout(function(){
					window.nestedMessageSwiped = false;
				}, 100);
			}
			// The fix ends here

			// Write your code for triggering reply mode for the swiped message

			// Example code
			var ProfilePicture = $(this).find('.sidebar').find('img').attr('src');
			var Name = $(this).find('.name').find('a').text();
			var Message = $(this).find('.main-message').text();

			$('.replying-to').find('.sidebar').find('img').attr('src', ProfilePicture);
			$('.replying-to').find('.name').text(Name);
			$('.replying-to').find('.main-message').text(Message);
			// Example code ends

			// Must set the reply display to visible
			$('.replying-to').css('display','flex');
		});
	}

	// Image Upload Related Codes
	function DisplayImageBeforeUploading(input) {
		var acceptedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"]
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			// console.log(input.files[0].type);
			if (acceptedTypes.indexOf(input.files[0].type) < 0){
				alert("The file must be an image file (jpeg/png/gif).");
				CancelImageSelection();
				return;
			}

			reader.onload = function (e) {
				$('#ImageUploadPreview').attr('src', e.target.result);
				$('#ImageCaption').val('') // Clear caption input
			}

			reader.readAsDataURL(input.files[0]);
			$('.image-to-upload').show();
		} else {
			CancelImageSelection();
		}
	}

	function CancelImageSelection(){
		$('.image-to-upload').hide(); // Hide the Image Preview
		$('#ImageUploadPreview').attr('src', ''); // Image Preview Source to Empty
		$('#ImageUploadButton').val('') // Clear file input
		$('#ImageCaption').val('') // Clear caption input
	}

	// Display the image on selecting from filesystem
	$('#ImageUploadButton').change(function(){
		DisplayImageBeforeUploading(this);
	});

	// Cancel the image
	$('#CancelUploadButton').on('click', function(){
		CancelImageSelection();
	});


	// Image Display Related Codes
	$(document).on('click','.sensitive-info',function(){
		$this = $(this);
		$this.hide();
		$this.parent().find('.sensitive').removeClass('sensitive');
	});

	$(document).on('click','.image-container',function(e){
		if ($(e.target).hasClass('sensitive-info')){
			return;
		}

		DisplayImageInModal(this);
	});

	function DisplayImageInModal(container){
		var imageSource = $(container).find('img').attr('src');
		var Caption = $(container).parent().find('.caption-container>p');
		console.log(imageSource, Caption);
		$('#ImageDisplayModal').find('.image-container > img').attr('src', imageSource);
		$('#ImageDisplayModal').find('.caption-container > p').text(Caption.text());
		if (Caption.length === 0){
			$('#ImageDisplayModal').find('.caption-container > p').removeClass('has-p');
		} else {
			$('#ImageDisplayModal').find('.caption-container > p').addClass('has-p');
		}

		$('#ImageDisplayModal').modal("show");
	}
});
