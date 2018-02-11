function callbackPlayer1(){
//    console.log(xhr.response);
    let obj;
    if(this.response && this.readyState == 4){
        obj = JSON.parse(this.response);
        document.getElementById("player1Image").setAttribute("src", obj.data.image_url);
        sessionStorage.player1Url = obj.data.image_url;
    }
    
};

function callbackPlayer2(){
//    console.log(xhr.response);
    let obj = undefined;
    if(this.response && this.readyState == 4){
        obj = JSON.parse(this.response);
        document.getElementById("player2Image").setAttribute("src", obj.data.image_url);
        sessionStorage.player2Url = obj.data.image_url;
    }
    
};

function getRandomGifForHome(id){
    let xhr = new XMLHttpRequest();
    
    if(id == 'player1'){
        xhr.onreadystatechange = callbackPlayer1;   
    }else{
        xhr.onreadystatechange = callbackPlayer2;
    }
    
    xhr.open("GET", "https://api.giphy.com/v1/gifs/random?api_key=OsU7SYn8AeRvPDzlZCF7i1d8m1ftUczs");
    xhr.send();
}

getRandomGifForHome("player1");
getRandomGifForHome("player2");
