// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < 20; i++) {
    // Display the apropos information on the page
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    var $article = $("<p>")
    .addClass("card")
    .attr("data-id",data[i]._id)
    
    var $body = $("<div>").addClass("card-body")
    var $header = $("<h5>").addClass("card-header").text(data[i].title)
    var $title = $("<h6>").addClass("card-title").text(data[i].link)

    var $button = $("<a href>")
    .addClass("btn btn-primary")
    .attr("id", "saveFavorite")
    .attr("data-id",data[i]._id)
    .text("Favorite")

    
    
    $body.append($title)
    $body.append($button)

    $article.append($header)
    $article.append($body)
  $('#articles').append($article)
  $('#articles').append('<br>')
  }
});

$.getJSON("/api/favorites", function(data) {
  // For each one
  for (var i = 0; i < 20; i++) {
    // Display the apropos information on the page
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    var $article = $("<p>")
    .addClass("card")
    .attr("data-id",data[i]._id)
    
    var $body = $("<div>").addClass("card-body")
    var $header = $("<h5>").addClass("card-header").text(data[i].title)
    var $title = $("<h6>").addClass("card-title").text(data[i].link)

    var $button = $("<a href>")
    .addClass("btn btn-secondary")
    .attr("id", "favorite" + data[i]._id)
    .text("Add Note")

    
    
    $body.append($title)
    $body.append($button)

    $article.append($header)
    $article.append($body)
  $('#favoriteArticles').append($article)
  $('#favoriteArticles').append('<br>')
  }
});


/*
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>*/

// Whenever someone clicks a p tag
/*
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});*/


$(document).on("click", "#saveFavorite", function() {
  
  console.log("lol")

  

  var thisId = $(this).attr("data-id");
  
  
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      favorite: true
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section

    });
    return false
});

// When you click the savenote button
/*
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});*/
