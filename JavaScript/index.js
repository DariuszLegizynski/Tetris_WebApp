const squareSize = 40;
var ms = 500;

//getting the canvases properties
var canvas = document.getElementById("gameBoardCanvas");
var ctx = canvas.getContext("2d");

var clickButtons = document.querySelectorAll(".click-button");

for (var i = 0; i < clickButtons.length; i++){
    clickButtons[i].addEventListener("click", function(){
        var buttonClickedOn = "Arrow" + this.innerText;
        startGame(buttonClickedOn);
    });
}

document.addEventListener("keydown", function(event){
    startGame(event.key);
});

function startGame(key){

    if (key === "Enter"){
        
        //drawZeroedGameBoard();
        makeNewTestBlock();
        setInterval(updateGameBoard, ms);  //1000/ms(=20) = 50 fps
    }

    else if (key==="ArrowUp")
        //rotate
        return;

    else if (key==="ArrowLeft"){
        drawSquaredGameBoard();
        moveTetrominoesLeft(tetrominoes);
    }

    else if (key==="ArrowRight"){
        drawSquaredGameBoard();
        moveTetrominoesRight(tetrominoes);
    }

    else if (key==="ArrowDown"){
        return;
    }
    
    else
        console.log("Psst, press 'Enter' to start");
}

function updateGameBoard(){

    drawSquaredGameBoard();
    tetrominoesSlowFall(tetrominoes);
}

//Make the game board squared (in the canvas the y is row and the x is column
function drawSquaredGameBoard() {
    var gameBoardSquared = [];
    for(var col = 0; col < 20; col++){
        gameBoardSquared[col] = [];
        for(var row = 0; row < 10; row++){
            gameBoardSquared[col][row] = new BasicBlock("white", row * squareSize, col * squareSize); //behind the "=" sign is to check, if the gameBoard is sliced into squares.
        }
    }
}

//Optional: TODO: a dark game board, where only the tetrominoes and/or the borders of the game board would glow
class BasicBlock{
    constructor(tempSquareColor, tempX, tempY){
        this.squareColor = tempSquareColor;
        this.x = tempX;
        this.y = tempY;
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, squareSize, squareSize);
        ctx.strokeRect(this.x, this.y, squareSize, squareSize);
    }
    updateBlock(){
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, squareSize, squareSize);
        ctx.strokeRect(this.x, this.y, squareSize, squareSize);
    }

}

// function GridBlock (squareColor, x, y){
//     ctx.fillStyle = squareColor;
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 3;
//     ctx.fillRect(x, y, squareSize, squareSize);
//     ctx.strokeRect(x, y, squareSize, squareSize);
// }

// function SimpleBlock (squareColor, x, y){
//     this.squareColor = squareColor;
//     this.x = x;
//     this.y = y;

//     this.updateBlock = function(){
//         ctx.fillStyle = squareColor;
//         ctx.strokeStyle = "black";
//         ctx.lineWidth = 3;
//         ctx.fillRect(this.x, this.y, squareSize, squareSize);
//         ctx.strokeRect(this.x, this.y, squareSize, squareSize);
//     }

//     this.collisionDetection = function(){

//     }
// }

//Declaration of variables, of a [4x4] tetromino array. Excluding the cells, that are never used (like tetro3)
var tetro0, tetro1, tetro2, tetro4, tetro5, tetro6, tetro7, tetro8, tetro9, tetro10, tetro11, tetro13, tetro14;
var tetrominoes = [];

//Tetrominos

//TODO: a table with all tetrominoes [J, L, T, etc] and then pick 1 by random and use it on the game board.

function makeNewTestBlock(){
    tetro0 = new BasicBlock("blue", 160, 0);
    tetro1 = new BasicBlock("blue", 200, 0);
    tetro2 = new BasicBlock("blue", 240, 0);
    tetro4 = new BasicBlock("blue", 160, 40);
    tetro5 = new BasicBlock("blue", 200, 40);
    tetro6 = new BasicBlock("blue", 240, 40);
    tetro7 = new BasicBlock("blue", 280, 40);
    tetro8 = new BasicBlock("blue", 160, 80);
    tetro9 = new BasicBlock("blue", 200, 80);
    tetro10 = new BasicBlock("blue", 240, 80);
    tetro11 = new BasicBlock("blue", 280, 80);
    tetro13 = new BasicBlock("blue", 200, 120);
    tetro14 = new BasicBlock("blue", 240, 120);

    var tetrominoJ0 = [tetro1, tetro5, tetro8, tetro9];
    var tetrominoJ1 = [tetro4, tetro5, tetro6, tetro10];
    var tetrominoJ2 = [tetro1, tetro2, tetro5, tetro9];
    var tetrominoJ3 = [tetro0, tetro4, tetro5, tetro6];

    var tetrominoJ = [tetrominoJ0, tetrominoJ1, tetrominoJ2, tetrominoJ3];

    var tetrominoS0 = [tetro0, tetro4, tetro5, tetro9];
    var tetrominoS1 = [tetro5, tetro6, tetro8, tetro9];
    var tetrominoS2 = [tetro1, tetro5, tetro6, tetro10];
    var tetrominoS3 = [tetro1, tetro2, tetro4, tetro5];

    var tetrominoS = [tetrominoS0, tetrominoS1, tetrominoS2, tetrominoS3];
    
    var i = Math.floor(Math.random() * 4);
    var tetrominoesArr = [tetrominoJ[i], tetrominoS[i]];

    var x = Math.floor(Math.random() * 2);
    tetrominoes = tetrominoesArr[x];
    return tetrominoes;
}

function moveTetrominoesLeft(myArr){

    if(!(myArr.includes(tetro0) || myArr.includes(tetro4) || myArr.includes(tetro8))){
        if(!(myArr.includes(tetro1) || myArr.includes(tetro5) || myArr.includes(tetro9) || myArr.includes(tetro13))){
            
            if(myArr.includes(tetro2)){
                tetro2.x -= squareSize;
                if(tetro2.x <= 0)
                    tetro2.x = 0;
                tetro2.updateBlock();
            }
        
            if(myArr.includes(tetro6)){
                tetro6.x -= squareSize;
                if(tetro6.x <= 0)
                    tetro6.x = 0;
                tetro6.updateBlock();
            }
        
            if(myArr.includes(tetro10)){
                tetro10.x -= squareSize;
                if(tetro10.x <= 0)
                    tetro10.x = 0;
                tetro10.updateBlock();
            }
        
            if(myArr.includes(tetro14)){
                tetro14.x -= squareSize;
                if(tetro14.x <= 0)
                    tetro14.x = 0;
                tetro14.updateBlock();
            }
        
            if(myArr.includes(tetro7)){
                tetro7.x -= squareSize;
                if(tetro7.x <= squareSize)
                    tetro7.x = squareSize;
                tetro7.updateBlock();
            }
        
            if(myArr.includes(tetro11)){
                tetro11.x -= squareSize;
                if(tetro11.x <= squareSize)
                    tetro11.x = squareSize;
                tetro11.updateBlock();
            }
        }
        else{
            if(myArr.includes(tetro1)){
                tetro1.x -= squareSize;
                if(tetro1.x <= 0)
                    tetro1.x = 0;
                tetro1.updateBlock();
            }
        
            if(myArr.includes(tetro5)){
                tetro5.x -= squareSize;
                if(tetro5.x <= 0)
                    tetro5.x = 0;
                tetro5.updateBlock();
            }
        
            if(myArr.includes(tetro9)){
                tetro9.x -= squareSize;
                if(tetro9.x <= 0)
                    tetro9.x = 0;
                tetro9.updateBlock();
            }
        
            if(myArr.includes(tetro13)){
                tetro13.x -= squareSize;
                if(tetro13.x <= 0)
                    tetro13.x = 0;
                tetro13.updateBlock();
            }
            
            if(myArr.includes(tetro2)){
                tetro2.x -= squareSize;
                if(tetro2.x <= squareSize)
                    tetro2.x = squareSize;
                tetro2.updateBlock();
            }
        
            if(myArr.includes(tetro6)){
                tetro6.x -= squareSize;
                if(tetro6.x <= squareSize)
                    tetro6.x = squareSize;
                tetro6.updateBlock();
            }
        
            if(myArr.includes(tetro10)){
                tetro10.x -= squareSize;
                if(tetro10.x <= squareSize)
                    tetro10.x = squareSize;
                tetro10.updateBlock();
            }
        
            if(myArr.includes(tetro14)){
                tetro14.x -= squareSize;
                if(tetro14.x <= squareSize)
                    tetro14.x = squareSize;
                tetro14.updateBlock();
            }
        
            if(myArr.includes(tetro7)){
                tetro7.x -= squareSize;
                if(tetro7.x <= squareSize*2)
                    tetro7.x = squareSize*2;
                tetro7.updateBlock();
            }
        
            if(myArr.includes(tetro11)){
                tetro11.x -= squareSize;
                if(tetro11.x <= squareSize*2)
                    tetro11.x = squareSize*2;
                tetro11.updateBlock();
            }
        }
    }
    else{
        if(myArr.includes(tetro0)){
            tetro0.x -= squareSize;
            if(tetro0.x <= 0)
                tetro0.x = 0;
            tetro0.updateBlock();
        }
    
        if(myArr.includes(tetro4)){
            tetro4.x -= squareSize;
            if(tetro4.x <= 0)
                tetro4.x = 0;
            tetro4.updateBlock();
        }
    
        if(myArr.includes(tetro8)){
            tetro8.x -= squareSize;
            if(tetro8.x <= 0)
                tetro8.x = 0;
            tetro8.updateBlock();
        }
    
        if(myArr.includes(tetro1)){
            tetro1.x -= squareSize;
            if(tetro1.x <= squareSize)
                tetro1.x = squareSize;
            tetro1.updateBlock();
        }
    
        if(myArr.includes(tetro5)){
            tetro5.x -= squareSize;
            if(tetro5.x <= squareSize)
                tetro5.x = squareSize;
            tetro5.updateBlock();
        }
    
        if(myArr.includes(tetro9)){
            tetro9.x -= squareSize;
            if(tetro9.x <= squareSize)
                tetro9.x = squareSize;
            tetro9.updateBlock();
        }
    
        if(myArr.includes(tetro13)){
            tetro13.x -= squareSize;
            if(tetro13.x <= squareSize)
                tetro13.x = squareSize;
            tetro13.updateBlock();
        }
        
        if(myArr.includes(tetro2)){
            tetro2.x -= squareSize;
            if(tetro2.x <= squareSize*2)
                tetro2.x = squareSize*2;
            tetro2.updateBlock();
        }
    
        if(myArr.includes(tetro6)){
            tetro6.x -= squareSize;
            if(tetro6.x <= squareSize*2)
                tetro6.x = squareSize*2;
            tetro6.updateBlock();
        }
    
        if(myArr.includes(tetro10)){
            tetro10.x -= squareSize;
            if(tetro10.x <= squareSize*2)
                tetro10.x = squareSize*2;
            tetro10.updateBlock();
        }
    
        if(myArr.includes(tetro14)){
            tetro14.x -= squareSize;
            if(tetro14.x <= squareSize*2)
                tetro14.x = squareSize*2;
            tetro14.updateBlock();
        }
    
        if(myArr.includes(tetro7)){
            tetro7.x -= squareSize;
            if(tetro7.x <= squareSize*3)
                tetro7.x = squareSize*3;
            tetro7.updateBlock();
        }
    
        if(myArr.includes(tetro11)){
            tetro11.x -= squareSize;
            if(tetro11.x <= squareSize*3)
                tetro11.x = squareSize*3;
            tetro11.updateBlock();
        }
    }
}

function moveTetrominoesRight(myArr){
    
    if(!(myArr.includes(tetro7) || myArr.includes(tetro11))){
        if(!(myArr.includes(tetro2) || myArr.includes(tetro6) || myArr.includes(tetro10) || myArr.includes(tetro14))){
            if(myArr.includes(tetro1)){
                tetro1.x += squareSize;
                if(tetro1.x >= squareSize * 9)
                    tetro1.x = squareSize * 9;
                tetro1.updateBlock();
            }
        
            if(myArr.includes(tetro5)){
                tetro5.x += squareSize;
                if(tetro5.x >= squareSize * 9)
                    tetro5.x = squareSize * 9;
                tetro5.updateBlock();
            }
        
            if(myArr.includes(tetro9)){
                tetro9.x += squareSize;
                if(tetro9.x >= squareSize * 9)
                    tetro9.x = squareSize * 9;
                tetro9.updateBlock();
            }
        
            if(myArr.includes(tetro13)){
                tetro13.x += squareSize;
                if(tetro13.x >= squareSize * 9)
                    tetro13.x = squareSize * 9;
                tetro13.updateBlock();
            }
            
            if(myArr.includes(tetro0)){
                tetro0.x += squareSize;
                if(tetro0.x >= squareSize * 8)
                    tetro0.x = squareSize * 8;
                tetro0.updateBlock();
            }
        
            if(myArr.includes(tetro4)){
                tetro4.x += squareSize;
                if(tetro4.x >= squareSize * 8)
                    tetro4.x = squareSize * 8;
                tetro4.updateBlock();
            }
        
            if(myArr.includes(tetro8)){
                tetro8.x += squareSize;
                if(tetro8.x >= squareSize * 8)
                    tetro8.x = squareSize * 8;
                tetro8.updateBlock();
            }
        }
        else{
            if(myArr.includes(tetro2)){
                tetro2.x += squareSize;
                if(tetro2.x >= squareSize * 9)
                    tetro2.x = squareSize * 9;
                tetro2.updateBlock();
            }
        
            if(myArr.includes(tetro6)){
                tetro6.x += squareSize;
                if(tetro6.x >= squareSize * 9)
                    tetro6.x = squareSize * 9;
                tetro6.updateBlock();
            }
        
            if(myArr.includes(tetro10)){
                tetro10.x += squareSize;
                if(tetro10.x >= squareSize * 9)
                    tetro10.x = squareSize * 9;
                tetro10.updateBlock();
            }
        
            if(myArr.includes(tetro14)){
                tetro14.x += squareSize;
                if(tetro14.x >= squareSize * 9)
                    tetro14.x = squareSize * 9;
                tetro14.updateBlock();
            }
        
            if(myArr.includes(tetro1)){
                tetro1.x += squareSize;
                if(tetro1.x >= squareSize * 8)
                    tetro1.x = squareSize * 8;
                tetro1.updateBlock();
            }
        
            if(myArr.includes(tetro5)){
                tetro5.x += squareSize;
                if(tetro5.x >= squareSize * 8)
                    tetro5.x = squareSize * 8;
                tetro5.updateBlock();
            }
        
            if(myArr.includes(tetro9)){
                tetro9.x += squareSize;
                if(tetro9.x >= squareSize * 8)
                    tetro9.x = squareSize * 8;
                tetro9.updateBlock();
            }
        
            if(myArr.includes(tetro13)){
                tetro13.x += squareSize;
                if(tetro13.x >= squareSize * 8)
                    tetro13.x = squareSize * 8;
                tetro13.updateBlock();
            }
            
            if(myArr.includes(tetro0)){
                tetro0.x += squareSize;
                if(tetro0.x >= squareSize * 7)
                    tetro0.x = squareSize * 7;
                tetro0.updateBlock();
            }
        
            if(myArr.includes(tetro4)){
                tetro4.x += squareSize;
                if(tetro4.x >= squareSize * 7)
                    tetro4.x = squareSize * 7;
                tetro4.updateBlock();
            }
        
            if(myArr.includes(tetro8)){
                tetro8.x += squareSize;
                if(tetro8.x >= squareSize * 7)
                    tetro8.x = squareSize * 7;
                tetro8.updateBlock();
            }
        }
    }
    else{
        if(myArr.includes(tetro7)){
            tetro7.x += squareSize;
            if(tetro7.x >= squareSize * 9)
                tetro7.x = squareSize * 9;
            tetro7.updateBlock();
        }
    
        if(myArr.includes(tetro11)){
            tetro11.x += squareSize;
            if(tetro11.x >= squareSize * 9)
                tetro11.x = squareSize * 9;
            tetro11.updateBlock();
        }
    
        if(myArr.includes(tetro2)){
            tetro2.x += squareSize;
            if(tetro2.x >= squareSize * 8)
                tetro2.x = squareSize * 8;
            tetro2.updateBlock();
        }
    
        if(myArr.includes(tetro6)){
            tetro6.x += squareSize;
            if(tetro6.x >= squareSize * 8)
                tetro6.x = squareSize * 8;
            tetro6.updateBlock();
        }
    
        if(myArr.includes(tetro10)){
            tetro10.x += squareSize;
            if(tetro10.x >= squareSize * 8)
                tetro10.x = squareSize * 8;
            tetro10.updateBlock();
        }
    
        if(myArr.includes(tetro14)){
            tetro14.x += squareSize;
            if(tetro14.x >= squareSize * 8)
                tetro14.x = squareSize * 8;
            tetro14.updateBlock();
        }
    
        if(myArr.includes(tetro1)){
            tetro1.x += squareSize;
            if(tetro1.x >= squareSize * 7)
                tetro1.x = squareSize * 7;
            tetro1.updateBlock();
        }
    
        if(myArr.includes(tetro5)){
            tetro5.x += squareSize;
            if(tetro5.x >= squareSize * 7)
                tetro5.x = squareSize * 7;
            tetro5.updateBlock();
        }
    
        if(myArr.includes(tetro9)){
            tetro9.x += squareSize;
            if(tetro9.x >= squareSize * 7)
                tetro9.x = squareSize * 7;
            tetro9.updateBlock();
        }
    
        if(myArr.includes(tetro13)){
            tetro13.x += squareSize;
            if(tetro13.x >= squareSize * 7)
                tetro13.x = squareSize * 7;
            tetro13.updateBlock();
        }
        
        if(myArr.includes(tetro0)){
            tetro0.x += squareSize;
            if(tetro0.x >= squareSize * 6)
                tetro0.x = squareSize * 6;
            tetro0.updateBlock();
        }
    
        if(myArr.includes(tetro4)){
            tetro4.x += squareSize;
            if(tetro4.x >= squareSize * 6)
                tetro4.x = squareSize * 6;
            tetro4.updateBlock();
        }
    
        if(myArr.includes(tetro8)){
            tetro8.x += squareSize;
            if(tetro8.x >= squareSize * 6)
                tetro8.x = squareSize * 6;
            tetro8.updateBlock();
        }
    }
}

function tetrominoesSlowFall(myArr){
    
    if(!(myArr.includes(tetro13) || myArr.includes(tetro14))){
        if(!(myArr.includes(tetro8) || myArr.includes(tetro9) || myArr.includes(tetro10) || myArr.includes(tetro11))){
            
            if(myArr.includes(tetro4)){
                tetro4.y += squareSize;
                if(tetro4.y > squareSize * 19)
                    tetro4.y = squareSize * 19;
                tetro4.updateBlock();
            }
        
            if(myArr.includes(tetro5)){
                tetro5.y += squareSize;
                if(tetro5.y > squareSize * 19)
                    tetro5.y = squareSize * 19;
                tetro5.updateBlock();
            }
        
            if(myArr.includes(tetro6)){
                tetro6.y += squareSize;
                if(tetro6.y > squareSize * 19)
                    tetro6.y = squareSize * 19;
                tetro6.updateBlock();
            }
        
            if(myArr.includes(tetro7)){
                tetro7.y += squareSize;
                if(tetro7.y > squareSize * 19)
                    tetro7.y = squareSize * 19;
                tetro7.updateBlock();
            }
        
            if(myArr.includes(tetro0)){
                tetro0.y += squareSize;
                if(tetro0.y > squareSize * 18)
                    tetro0.y = squareSize * 18;
                tetro0.updateBlock();
            }
        
            if(myArr.includes(tetro1)){
                tetro1.y += squareSize;
                if(tetro1.y > squareSize * 18)
                    tetro1.y = squareSize * 18;
                tetro1.updateBlock();
            }
            
            if(myArr.includes(tetro2)){
                tetro2.y += squareSize;
                if(tetro2.y > squareSize * 18)
                    tetro2.y = squareSize * 18;
                tetro2.updateBlock();
            }
        }
        else{
            if(myArr.includes(tetro8)){
                tetro8.y += squareSize;
                if(tetro8.y > squareSize * 19)
                    tetro8.y = squareSize * 19;
                tetro8.updateBlock();
            }
        
            if(myArr.includes(tetro9)){
                tetro9.y += squareSize;
                if(tetro9.y > squareSize * 19)
                    tetro9.y = squareSize * 19;
                tetro9.updateBlock();
            }
        
            if(myArr.includes(tetro10)){
                tetro10.y += squareSize;
                if(tetro10.y > squareSize * 19)
                    tetro10.y = squareSize * 19;
                tetro10.updateBlock();
            }
        
            if(myArr.includes(tetro11)){
                tetro11.y += squareSize;
                if(tetro11.y > squareSize * 19)
                    tetro11.y = squareSize * 19;
                tetro11.updateBlock();
            }
        
            if(myArr.includes(tetro4)){
                tetro4.y += squareSize;
                if(tetro4.y > squareSize * 18)
                    tetro4.y = squareSize * 18;
                tetro4.updateBlock();
            }
        
            if(myArr.includes(tetro5)){
                tetro5.y += squareSize;
                if(tetro5.y > squareSize * 18)
                    tetro5.y = squareSize * 18;
                tetro5.updateBlock();
            }
        
            if(myArr.includes(tetro6)){
                tetro6.y += squareSize;
                if(tetro6.y > squareSize * 18)
                    tetro6.y = squareSize * 18;
                tetro6.updateBlock();
            }
        
            if(myArr.includes(tetro7)){
                tetro7.y += squareSize;
                if(tetro7.y > squareSize * 18)
                    tetro7.y = squareSize * 18;
                tetro7.updateBlock();
            }
        
            if(myArr.includes(tetro0)){
                tetro0.y += squareSize;
                if(tetro0.y > squareSize * 17)
                    tetro0.y = squareSize * 17;
                tetro0.updateBlock();
            }
        
            if(myArr.includes(tetro1)){
                tetro1.y += squareSize;
                if(tetro1.y > squareSize * 17)
                    tetro1.y = squareSize * 17;
                tetro1.updateBlock();
            }
            
            if(myArr.includes(tetro2)){
                tetro2.y += squareSize;
                if(tetro2.y > squareSize * 17)
                    tetro2.y = squareSize * 17;
                tetro2.updateBlock();
            }
        }
    }
    else{
        if(myArr.includes(tetro13)){
            tetro13.y += squareSize;
            if(tetro13.y > squareSize * 19)
                tetro13.y = squareSize * 19;
            tetro13.updateBlock();
        }
    
        if(myArr.includes(tetro14)){
            tetro14.y += squareSize;
            if(tetro14.y > squareSize * 19)
                tetro14.y = squareSize * 19;
            tetro14.updateBlock();
        }
    
        if(myArr.includes(tetro8)){
            tetro8.y += squareSize;
            if(tetro8.y > squareSize * 18)
                tetro8.y = squareSize * 18;
            tetro8.updateBlock();
        }
    
        if(myArr.includes(tetro9)){
            tetro9.y += squareSize;
            if(tetro9.y > squareSize * 18)
                tetro9.y = squareSize * 18;
            tetro9.updateBlock();
        }
    
        if(myArr.includes(tetro10)){
            tetro10.y += squareSize;
            if(tetro10.y > squareSize * 18)
                tetro10.y = squareSize * 18;
            tetro10.updateBlock();
        }
    
        if(myArr.includes(tetro11)){
            tetro11.y += squareSize;
            if(tetro11.y > squareSize * 18)
                tetro11.y = squareSize * 18;
            tetro11.updateBlock();
        }
    
        if(myArr.includes(tetro4)){
            tetro4.y += squareSize;
            if(tetro4.y > squareSize * 17)
                tetro4.y = squareSize * 17;
            tetro4.updateBlock();
        }
    
        if(myArr.includes(tetro5)){
            tetro5.y += squareSize;
            if(tetro5.y > squareSize * 17)
                tetro5.y = squareSize * 17;
            tetro5.updateBlock();
        }
    
        if(myArr.includes(tetro6)){
            tetro6.y += squareSize;
            if(tetro6.y > squareSize * 17)
                tetro6.y = squareSize * 17;
            tetro6.updateBlock();
        }
    
        if(myArr.includes(tetro7)){
            tetro7.y += squareSize;
            if(tetro7.y > squareSize * 17)
                tetro7.y = squareSize * 17;
            tetro7.updateBlock();
        }
    
        if(myArr.includes(tetro0)){
            tetro0.y += squareSize;
            if(tetro0.y > squareSize * 16)
                tetro0.y = squareSize * 16;
            tetro0.updateBlock();
        }
    
        if(myArr.includes(tetro1)){
            tetro1.y += squareSize;
            if(tetro1.y > squareSize * 16)
                tetro1.y = squareSize * 16;
            tetro1.updateBlock();
        }
        
        if(myArr.includes(tetro2)){
            tetro2.y += squareSize;
            if(tetro2.y > squareSize * 16)
                tetro2.y = squareSize * 16;
            tetro2.updateBlock();
        }
    }
}

function collisionDetection() {
    
}