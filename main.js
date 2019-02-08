var topics = ['Cat', 'Puppy', 'Pirates'];
const buttonDiv = $('#buttonCol');
const gifDiv = $('#gifCol');

for(i in topics){
    buttonMaker(topics[i]);
}

$('#newBtn').click(function(event){
    event.preventDefault();
    var newTopic = $('#newText').val();
    if(newTopic !== ""){
        topics.push(newTopic);
        buttonMaker(newTopic);
        $('#newText').val("");
        // console.log(newTopic)
    }
});

function buttonMaker(topic){
    var newBut = $(`<button class="btn btn-primary gifBtn" value="${topic}">${topic} Gifs</button>`);
    buttonDiv.append(newBut);
    
    $(newBut).click(function(){
        var clickedTopic = this.value;
        callGifs(clickedTopic);
    });
}

function callGifs(topic){
    gifDiv.empty();
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=d7FmVkZG7IXQrVtXEuV2nK7gIF7rvw7Z&limit=4&q=${topic}`;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var gifArr = response.data;
        for(x in gifArr){
            gifDiv.append(createGif(gifArr[x]))
        }
    });    
}

function createGif(data){
    console.log(data)
    var newUrl = data.images.downsized_still.url;
    var animateImage = data.images.downsized_medium.url;
    var newRate = data.rating;
    //formats each gif from data
    var newGifDiv = $('<div>',{class:"gifDiv"});    
    var newGif = $(`<img class='gif' src='${newUrl}' state="still" otherLink="${animateImage}"/>`);
    var ratingTag = $(`<p class="rating">Rating: ${newRate}</p>`);
    newGifDiv.append(newGif);
    newGifDiv.append(ratingTag);
    newGif.click(playGif);
    //returns Gif
    return newGifDiv
}

function playGif(){
    var state = $(this).attr("state");
    if(state === "still"){
        var stillLink = $(this).attr("src");
        var animateLink = $(this).attr("otherLink");
        $(this).attr("src", `${animateLink}`);
        $(this).attr("state", "animate");
        $(this).attr("otherLink", `${stillLink}`);
    } else {
        var animateLink = $(this).attr("src");
        var stillLink = $(this).attr("otherLink");
        $(this).attr("src", `${stillLink}`);
        $(this).attr("state", "still");
        $(this).attr("otherLink", `${animateLink}`);
    }
}