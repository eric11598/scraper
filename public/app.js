// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < 20; i++) {

    var $article = $("<p>")
    .addClass("card")
    .attr("data-id",data[i]._id)
    
    var $body = $("<div>").addClass("card-body")
    var $header = $("<h5>").addClass("card-header").text(data[i].title)
    var $title = $("<h4>").addClass("card-title").text(data[i].summary)
    var $summary = $("<h6>").addClass("card-text").text(data[i].link)


    var $button = $("<a href>").addClass("btn btn-primary")
    .attr("id", "saveFavorite")
    .attr("data-id",data[i]._id)
    .text("Favorite")

    //console.log(i+" "+data[i].favorite)
    if(data[i].favorite)
    {
      $button.addClass('disabled')
      $button.text('Favorited')
    }

    else {
      $button.removeClass('disabled')
      $button.text('Favorite')
    }
    
    
    $body.append($title)
    $body.append($summary)
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

    var $article = $("<p>")
    .addClass("card")
    .attr("data-id",data[i]._id)
    
    var $body = $("<div>").addClass("card-body")
    var $header = $("<h5>").addClass("card-header").text(data[i].title)
    var $title = $("<h4>").addClass("card-title").text(data[i].summary)
    var $summary = $("<h6>").addClass("card-text").text(data[i].link)

    var $button = $("<a href>")
    .addClass("btn btn-secondary")
    .attr("id", "addNote")
    .attr("data-id",data[i]._id)
    .text("Notes")

    var $remove = $("<a href>")
    .addClass("btn btn-danger")
    .attr("id", "removeFavorite")
    .attr("data-id",data[i]._id)
    .text("Remove")

    
    
    $body.append($title)
    $body.append($summary)
    $body.append($button)
    $body.append($remove)

    $article.append($header)
    $article.append($body)
    //$article.append($summary)
  $('#favoriteArticles').append($article)
  $('#favoriteArticles').append('<br>')
  }
});

$(document).on("click", "#scrape", function() {

  $.ajax({
    method: "GET",
    url: "/scrape/",
  })
    // With that done
    .then(function(data) {
      location.reload();

      console.log(data);
      // Empty the notes section
    });
});

$(document).on("click", "#removeFavorite", function() {
  
  var thisId = $(this).attr("data-id");
   
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      favorite: false
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section

    });
});



$(document).on("click", "#saveFavorite", function() {
  
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
});

// When you click the savenote button

$(document).on("click", "#addNote", function() {

  $('#notesModal').modal('toggle')
  $("#saveNote").removeAttr("data-id")
  
  $('#notes-body').empty()

  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
  
      // The title of the article
      $("#notes-title").text(data.title);
      // An input to enter a new title

      $("#saveNote").attr("data-id",thisId)
      // If there's a note in the article
      if (data.note) {
    
        for(i = 0; i<data.note.length; i++)
        {
          var $note = $("<p>").addClass("card")
          var $body = $("<div>").addClass("card-body").text(data.note[i].body)

          var $button = $("<a href>")
          .addClass("btn btn-secondary")
          .attr("id", "removeNote")
          .attr("data-id",data.note[i]._id)
          .text("X")

          $body.append($button)

          $note.append($body)
          $("#notes-body").append($note); 
        }
      }

    });

    return false

});

$(document).on("click", "#removeNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/notes/" + thisId,
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });

});



$(document).on("click", "#saveNote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#newNote").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#newNote").val("");
  $('#notesModal').modal('toggle')



});
