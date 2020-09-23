$(document).ready(function(){
  
  // Top Right Search Icon
  $(document).on('click', "#searchIcon", function(){
    $("#searchForm").toggle();
  });

  var colors = ['0ABB87', '00BCD4', 'FFB822'];
  var doms = $('.single-zip-code .logo');
  var c=0;


  // Colorize the logos
  for(i=0; i<doms.length; i++){
    var color = '#'+colors[ c++ % colors.length ];
    doms[i].style.backgroundColor = color;
  }

  // Search Button
	$(document).on('click', "#searchButton", function(e){
		e.preventDefault();
		$(this).parent().parent().parent().find('.search-results').toggle();
	});

	// Search Input -> show results div on focus
	$(document).on('focus', "#searchInput", function(){
		$(this).parent().parent().find('.search-results').show();
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

});
