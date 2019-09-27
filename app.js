$(document).ready(function(){

 var topics = ["Michael Scott", "Jim", "Pam", "Dwight Schrute"];

 function renderButtons(){
    $("#button-display").empty();
    
    for (var i=0; i < topics.length; i++){
        var topicButton = $("<button>")
        topicButton.attr("data-character", topics[i])
        topicButton.addClass("character")
        topicButton.text(topics[i])
        $("#button-display").append(topicButton)
    };
    
    
}; 

renderButtons();

    $("#add-character").on("click",function(event){
        event.preventDefault();
        var character = $("#character-input").val().trim();
        topics.push(character);
        $("#character-input").val("");
        renderButtons();     
        

    });



    $("#button-display").on("click", "button", function(){
        var character = $(this).attr("data-character")
        console.log(`you picked ${character}`)
   
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=the-office-${character}&api_key=YreJXSDl2108ymoGLlM1HbEShBBuW1YZ&limit=10`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
                var results = response.data
            for (var i=0; i < results.length; i++) {
                    var characterDiv = $("<div>")
                    characterDiv.attr("id","image-card")
                    var p = $("<p>")
                    let rating = results[i].rating
                    p.text("Rating: " + rating.toUpperCase())
                    characterImage = $("<img>");
                    characterImage.addClass("preview")
                    characterImage.attr("data-animate",results[i].images.fixed_height.url);
                    characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                    characterImage.attr("data-state", "still")
                    characterImage.attr("src", results[i].images.fixed_height_still.url);
                    characterDiv.append(p).append(characterImage);
                    $("#images").prepend(characterDiv)
             };
        }); 
    });
    $("#images").on("click", "img", function(){
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

});