$(function(){
  var $_REQUEST = window.location.href.split('?');
  var $_GET = $_REQUEST[1] !== undefined ? $_REQUEST[1].split('#')[0].split('=') : null;
  var $_PAGE = null !== $_GET && undefined !== $_GET[0] && $_GET[0] === 'page' ? $_PAGE = $_GET[1] : null;

  // Understanding if a particular page is requested through "?page=page" query string
  if ($_PAGE === "comments" || $_PAGE === "upvotes" || $_PAGE === "chats" || $_PAGE === "posts"){
    showPage($_PAGE);
  } else {
    showPage('posts');
  }

  // Click the nav bar
  $('.pagination-nav > a').on('click', function(e){
    e.preventDefault();
    var to_page = $(this).attr('id').substr(7);

    window.history.pushState({page:to_page},null,"Activity.html?page="+to_page);
    showPage(to_page);
  });

  // Browser history Back/Forward event listener
  window.onpopstate = function(event) {
    if (event.state !== null){
      showPage(event.state.page);
    }
  }

  // Show More and Show Less on "messages" page
  $(document).on('click', '.activity-chats .message .read-more', function(e){
    e.preventDefault();

    $(this).parent().hide();
    $(this).parent().parent().find('.full').show();
  });

  $(document).on('click', '.activity-chats .message .read-less', function(e){
    e.preventDefault();

    $(this).parent().hide();
    $(this).parent().parent().find('.excerpt').show();
  });
});



// This function takes care of the Pagination from one page to another.
// If you don't want to load all the HTML content for all 4 pages (posts, comments, upvotes, chats)-
// you can use this function to load contents dynamically when a page is visited.
// I strongly recommend using a Cache/localStorage system so you don't have to download same page twice
function showPage(page){
  $('.activity-posts').hide();
  $('.activity-comments').hide();
  $('.activity-upvotes').hide();
  $('.activity-chats').hide();

  // Set the dropdown
  $('.pagination-nav > a.active').removeClass('active');
  $('.pagination-nav > #button_' + page).addClass('active');

  // Download contents dynamically for selected "page" here
  // $.get('/activities/posts');

  $('.activity-' + page).show();
}