var articles = [];

function Article (options) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = options.author;
  this.category = options.category;
  this.author = options.author;
  this.authorUrl = options.authorUrl;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
  // this.toHtml();
  // console.log(options);
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.bullshit-template').clone();
  // SEE http://www.w3schools.com/jquery/jquery_selectors.asp FOR MORE INFO

  $newArticle.find('address').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h1').text(this.title);
  // more stuff to fill in here

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // Include the publication date as a 'title' attribute to show on hover:
  // $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.append('<hr>');
  console.log('woooooo');
  // console.log($newArticle);


  // TODO: This cloned article is no longer a template, so we should remove that class...
  $newArticle.removeClass('bullshit-template');

  return $newArticle;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
  // console.log(articles);
})

var testing = function() {
  $('article.bullshit').attr('id', 'nonsense');
}
testing();

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
