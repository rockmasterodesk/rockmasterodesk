let $ = window.jQuery;

$(document).ready(function(){
        
    // Top Right Search Icon
    $(document).on('click', "#notificationsOpener", function(){
      $this = $(this);
      $this.parent().find('.notifications').toggle();

      // Disable body scrolling when notifications are open on mobile devices
      if (!window.matchMedia("(min-width: 768px)").matches){
        $('html').css('overflow','hidden');
      }
    });

    $(document).mouseup(function(e) {
        var container = $(".notifications");
        var input = $("#notificationsOpener");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) 
        {
            container.hide();
            // Enable body scrolling when notifications are closed on mobile devices
            if (!window.matchMedia("(min-width: 768px)").matches){
              $('html').css('overflow','auto');
            }
        }
    });
});		