var topics = ['Cats'];
const buttonDiv = $('#buttonCol');
const gifDiv = $('#gifCol');

for(i in topics){
    buttonMaker(topics[i]);
}

$('.btn').click(function(){
    var clickedTopic = this.value;
    callGifs(clickedTopic);
});

function buttonMaker(topic){
    var newBut = $(`<button class="btn btn-primary" value="${topic}">${topic} Gifs</button>`);
    buttonDiv.append(newBut);
}

function callGifs(topic){
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
    var newUrl = data.images.original.url;
    var newRate = data.rating;
    //formats each gif from data
    var newGifDiv = $('<div>',{class:"gifDiv"});    
    var newGif = $(`<img class='gif' src='${newUrl}'/>`);
    var ratingTag = $(`<p class="rating">Rating: ${newRate}</p>`);
    newGifDiv.append(newGif);
    newGifDiv.append(ratingTag);
    //returns Gif
    return newGifDiv
}