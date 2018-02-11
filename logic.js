
//Player display
    let playerSection = document.getElementById("player");

    let gameEnded = false;

    const index = {
            first:1,
            second:2,
            third:3,
            fourth:4,
            fifth:5,
            sixth:6,
            seventh:7,
            eighth:8,
            ninth:9
        };

        let clickCounter = 0;

        let red = []; //player1
        let green = []; //player2

        let player = 0;

        function selectBox(elem){
            
            const clicked = elem.getAttribute("data-clicked");
            if(!eval(clicked) && !gameEnded){
                clickCounter++;
                
                elem.setAttribute("data-clicked", true);
//            elem.setAttribute("disabled", true); disable the div.
            const id = elem.getAttribute('id');
            const i = index[id];
            
            let image = document.getElementById(`image${i}`);
            image.style.display = "block";
            
                if(clickCounter % 2 != 0){
                    player = 1;
                    red.push(i);
                    //check if any red matched.
                    image.setAttribute("src", sessionStorage.player1Url);
                }else{
                    player = 2;
                    green.push(i);
                    image.setAttribute("src", sessionStorage.player2Url);
                    //check if any green matched.
                }
                
                checkMatching(i);
                console.log(clickCounter);
                
            }
        }

        function checkColumn(i){
            let match = 0;
            let column = [];
            if(i <=3 ){
                column = [i, i+3, i+6];
            }else if( i > 3 && i <= 6){
                column = [i-3, i, i+3];
            }else{
                column = [i - 6, i - 3, i];
            }

            if(player == 1 ){ //check with red
                for(let index of column){
                    if(red.indexOf(index) != -1){
                        match++;
                    }
                }
            }
            else if(player == 2){ //check with green
                for(let index of column){
                    if(green.indexOf(index) != -1){
                        match++;
                    }
                }
            }
            if(match == 3){
                return true;
            }else{
                return false;
            }
        }

        function checkRow(i){
            let match = 0;
            let row = [];
            if(i <= 3){
                row = [1, 2, 3];
            }else if(i <= 6){
                row = [4, 5, 6];
            }else{
                row = [7, 8, 9];
            }

            if(player == 1 ){ //check with red
                for(let index of row){
                    if(red.indexOf(index) != -1){
                        match++;
                    }
                }
            }
            else if(player == 2){ //check with green
                for(let index of row){
                    if(green.indexOf(index) != -1){
                        match++;
                    }
                }
            }
            if(match == 3){
                return true;
            }else{
                return false;
            }
        }

        function checkDiagonal(i){
            let match = 0;
            let diagonal = [];
            if(i % 2 != 0){ //means they are diagonal points
                let diagonal1 = [1,5,9];
                let diagonal2 = [3, 5, 7];
                if(i == 5){
                    //check both diagonal;
                    diagonal = diagonal1;
                }
                else if(diagonal1.indexOf(i) != -1){
                    //check for diagonal 1;
                    diagonal = diagonal1;
                }
                else if(diagonal2.indexOf(i) != -1){
                    //check for diagonal 2;
                    diagonal = diagonal2;
                }

                if(player == 1 ){ //check with red
                    for(let index of diagonal){
                        if(red.indexOf(index) != -1){
                            match++;
                            }
                        }
                    
                    if(i == 5 && match < 3){
                        match = 0;
                        for(let index of diagonal2){
                            if(red.indexOf(index) != -1){
                                match++;
                                }
                            }
                        }
                    }
                else if(player == 2){ //check with green
                    for(let index of diagonal){
                        if(green.indexOf(index) != -1){
                            match++;
                        }
                    }
                    
                    if(i == 5 && match < 3){
                        match = 0;
                        for(let index of diagonal2){
                            if(green.indexOf(index) != -1){
                                match++;
                                }
                            }
                    }
                }
                if(match == 3){
                    return true;
                }else{
                    return false;
                }

                }
        }

        function checkMatching(i){
            let rowMatch = checkRow(i);
            let columnMatch = checkColumn(i);
            let diagonalMatch = checkDiagonal(i);

            if(rowMatch || columnMatch || diagonalMatch){
                //reset data here.
                // display winner.
                gameEnded = true;
                document.getElementById("winner").innerHTML = `Player ${player} wins!!`;
                document.getElementById("playAgain").style.display = "inline-block";
                document.getElementById("goHome").style.display = "inline-block";
                
                let images = document.getElementsByClassName('boxImage');
                let playerUrl = `player${player}Url`;
                for(let image of images){
                    image.style.display = "block";
                    image.setAttribute("src", `${sessionStorage[playerUrl]}`);
                }
            }else if(clickCounter >= 9 && !rowMatch && !columnMatch && !diagonalMatch){
                gameEnded = true;
                document.getElementById("winner").innerHTML = `No one wins!!`;
                
                document.getElementById("playAgain").style.display = "inline-block";
                document.getElementById("goHome").style.display = "inline-block";
            }
        }

        function playAgain(){
            location.reload();
        }

        function goHome(){
            sessionStorage.clear();
            location.href = './home.html';
        }


// Game Page
/*
    Set picture to the image tags from sessionStorage.
*/
function setPictures(){
    let player1 = document.getElementById("player1Image");
    let player2 = document.getElementById("player2Image");
    
    player1.setAttribute("src", sessionStorage.player1Url);
    player2.setAttribute("src", sessionStorage.player2Url);
}




// HOME PAGE RELATED JS

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
    let obj;
    if(this.response && this.readyState == 4){
        obj = JSON.parse(this.response);
        document.getElementById("player2Image").setAttribute("src", obj.data.image_url);
        sessionStorage.player2Url = obj.data.image_url;
    }
    
};

function getRandomGif(elem){
    let xhr = new XMLHttpRequest();
    let id = elem.getAttribute("id");
    
    if(id == 'player1Button'){
        xhr.onreadystatechange = callbackPlayer1;   
    }else{
        xhr.onreadystatechange = callbackPlayer2;
    }
    
    xhr.open("GET", "https://api.giphy.com/v1/gifs/random?api_key=OsU7SYn8AeRvPDzlZCF7i1d8m1ftUczs");
    xhr.send();
}

function startGame() {
    window.location.href = './index.html';
    console.log("Redirecting")
}

