// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      // DONE: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from `this` article element, and then use that bit of
      //       text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      //       YAY, DOM manipulation!
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      // DONE: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      // hiding out all articles and fading in just the ones that match the author's name
      $('article').hide();
      var $value = $(this).val();
      $('article[data-author-name="' + $value + '"]').fadeIn();
    } else {
      // showing all articles except template one
      $('article').show();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  // Articles are filtered by category and the author filter is reset
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      // hiding out all articles and fading in just the ones that match the author's name
      $('article').hide();
      var $value = $(this).val();
      $('article[data-category="' + $value + '"]').fadeIn();
    } else {
      // showing all articles except template one
      $('article').show();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  // hide articles on clicking about, hide author info on clicking home
  $('.main-nav').on('click', 'li', function (){
    var $dataTab = $(this).attr('data-content');
    $('.tab-content').hide();
    $('section#' + $dataTab).show();
  });
  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.
  $('#articles').on('click', '.read-on', function(e) {
    e.preventDefault();
    $(this).prev().children().show();
    $(this).hide();
  });
  // remove around half the article, but on clicking the read on link, show the rest of the article

};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$();
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
