var topics = ["Spider Man", "Iron Man", "Captain America", "Black Widow", "Black Panther", "Thor", "Ant-man","the Hulk","Hawkeye","Captain Marvel"]

// Display Buttons
function showButtons() {
    $("#buttons-area").empty();

    topics.forEach(function (val, i) {
        var topic = topics[i];
        topicNoSpace = topic.split(" ").join("+");
        console.log(topicNoSpace);
        var newButton = $("<button>");
        newButton.addClass("topic-btn btn btn-medium btn-transparent-white margin-10px-right margin-10px-bottom");
        newButton.attr("data-name", topicNoSpace);
        newButton.text(topic);
        $("#buttons-area").append(newButton);

        
    })};

      // Display Gifs when button click
  function displayGifs() {
             
    var searchTopic = $(this).attr("data-name");
    var apiURL = "http://www.omdbapi.com/?t=avengers+characters"+ searchTopic +"Avengers Character";

    $.ajax({
        url: apiURL,
        method:"GET"
    }).then(function(response) {
        $("#gifs-area").empty();

        var gifDiv = $("<div class='new-gif'>");
        var gif = response.data.length;

        for(var i = 0; i < gif; i++){
            var newRow = $("<div>");
            var individualDiv = $("<div class='single float-left padding-10px-left padding-10px-top'>");
            var rating = $("<p>").text("RATED: "+grabRating);
            var grabRating = response.data[i].rating;
            
            
            var grabStill = response.data[i].images.fixed_height_still.url;
            var grabAnimate = response.data[i].images.fixed_height.url;
            var imageElmt = $("<img>");
            imageElmt.addClass("gifImg");
            imageElmt.attr("src", grabStill);
            imageElmt.attr("data-status","still");
            imageElmt.attr("data-still", grabStill);
            imageElmt.attr("data-animate", grabAnimate);
            
            individualDiv.prepend(imageElmt);
            newRow.prepend(rating);
            individualDiv.prepend(newRow);
            gifDiv.append(individualDiv);

            $("#gifs-area").append(gifDiv);
        }
    })
}

function animateGif() {
    if( $(this).attr("data-status") === "still" ){
        $(this).attr("data-status", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }else {
        $(this).attr("data-status", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
}


$(document).on("click",".topic-btn",displayGifs);

$(document).on("click",".gifImg",animateGif);


$("#add-giphy").on("click", function(){
    event.preventDefault();
    var giphyNew = $("#gif-input-area").val().trim();
    $("#gif-input-area").val("");
    topics.push(giphyNew);
    showButtons();
})

showButtons();


});
