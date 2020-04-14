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

var myInterval;
myInterval = setInterval(updateGameBoard, ms);  //1000/ms(=20) = 50 fps

function updateGameBoard(){
    tetrominoesSlowFall(tetrominoes);
    drawGameBoard();
}

function startGame(key){

    if (key === "Enter"){
        drawSquaredGameBoard();
        makeNewTestBlock();
    }

    else if (key==="ArrowUp")
        //rotate
        return;

    else if (key==="ArrowLeft"){
        moveTetrominoesLeft(tetrominoes);
    }

    else if (key==="ArrowRight"){
        moveTetrominoesRight(tetrominoes);
    }

    else if (key==="ArrowDown"){
        return;
    }
    
    else
        console.log("Psst, press 'Enter' to start");
}

//Optional: TODO: a dark game board, where only the tetrominoes and/or the borders of the game board would glow
class SimpleBlock{
    constructor(tempSquareColor, boardPosX, boardPosY){
        this.x = boardPosX;
        this.y = boardPosY;
        this.squareColor = tempSquareColor;
    }
}

class GridBlock extends SimpleBlock{
    constructor(tempSquareColor, boardPosX, boardPosY){
        super(tempSquareColor, boardPosX, boardPosY);
        
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
        ctx.strokeRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
    }
}

var gameBoardSquared = [];

//Make the game board squared (in the canvas the y is row and the x is column)
function drawSquaredGameBoard() {
    for(var row = 0; row < 10; row++){
        gameBoardSquared[row] = [];
        for(var col = 0; col < 20; col++){
            gameBoardSquared[row][col] = new GridBlock("white", row, col);
        }
    }
}

class BasicBlock extends SimpleBlock{
    constructor(tempSquareColor, boardPosX, boardPosY){
        super(tempSquareColor, boardPosX, boardPosY);
    }

    drawBlock(){
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
        ctx.strokeRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
    }

    undrawBlock(){
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
        ctx.strokeRect(this.x * squareSize, this.y * squareSize, squareSize, squareSize);
    }

    moveLeft(){
        this.x--;
    }

    moveRight(){
        this.x++;
    }

    slowFall(){
        this.y++;
    }
}

//Tetrominos

//Declaration of variables, of a [4x4] tetromino array. Excluding the cells, that will never be used (like tetro3)
var tetrominoes = [];

//TODO: a table with all tetrominoes [J, L, T, etc] and then pick 1 by random and use it on the game board.

function makeNewTestBlock(){
    var tetro = [];
    tetro[0] = new BasicBlock("blue", 4, 0);
    tetro[1] = new BasicBlock("blue", 5, 0);
    tetro[2] = new BasicBlock("blue", 6, 0);
    tetro[4] = new BasicBlock("blue", 4, 1);
    tetro[5] = new BasicBlock("blue", 5, 1);
    tetro[6] = new BasicBlock("blue", 6, 1);
    tetro[7] = new BasicBlock("blue", 7, 1);
    tetro[8] = new BasicBlock("blue", 4, 2);
    tetro[9] = new BasicBlock("blue", 5, 2);
    tetro[10] = new BasicBlock("blue", 6, 2);
    tetro[11] = new BasicBlock("blue", 7, 2);
    tetro[13] = new BasicBlock("blue", 5, 3);
    tetro[14] = new BasicBlock("blue", 6, 3);

    // var tetrominoJ0 = [        
    //     tetro[1].tempSquareColor = "yellow",
    //     tetro[5].tempSquareColor = "yellow",
    //     tetro[8].tempSquareColor = "yellow",
    //     tetro[9].tempSquareColor = "yellow",
    // ];


    // var tetrominoJ1 = [        
    //     tetro[4].tempSquareColor = "yellow",
    //     tetro[5].tempSquareColor = "yellow",
    //     tetro[6].tempSquareColor = "yellow",
    //     tetro[10].tempSquareColor = "yellow",
    // ];

    var tetrominoJ = [];

    tetrominoJ[0] = [tetro[1], tetro[5], tetro[8], tetro[9]];
    tetrominoJ[1] = [tetro[6], tetro[4], tetro[5], tetro[10]];
    tetrominoJ[2] = [tetro[1], tetro[2], tetro[5], tetro[9]];
    tetrominoJ[3] = [tetro[0], tetro[4], tetro[5], tetro[6]];

    var tetrominoS = [];

    tetrominoS[0] = [tetro[0], tetro[4], tetro[5], tetro[9]];
    tetrominoS[1] = [tetro[5], tetro[6], tetro[8], tetro[9]];
    tetrominoS[2] = [tetro[1], tetro[5], tetro[6], tetro[10]];
    tetrominoS[3] = [tetro[1], tetro[2], tetro[4], tetro[5]];

    var i = Math.floor(Math.random() * 4);
    var tetrominoesArr = [tetrominoJ[i], tetrominoS[i]];

    var x = Math.floor(Math.random() * 2);
    tetrominoes = tetrominoesArr[x];
    return tetrominoes;
}

function moveTetrominoesLeft(myArr){

    if(myArr.some(k => k.x - 1 < 0)){
        for(let i of myArr){
            i.drawBlock();
        }
    }
    else{
        for(var i of myArr){
            i.undrawBlock();
        }
        for(var i of myArr){
            i.moveLeft();
            i.drawBlock();
        }
    }
}

function moveTetrominoesRight(myArr){
    
    if(myArr.some(k => k.x + 1 > 9)){
        for(let i of myArr){
            i.drawBlock();
        }
    }
    else{
        for(var i of myArr){
            i.undrawBlock();
        }
        for(var i of myArr){
            i.moveRight();
            i.drawBlock();
        }
    }
}

function tetrominoesSlowFall(myArr){

    if(myArr.some(k => k.y > 18)){
        for(let i of myArr){
            i.drawBlock();
            gameBoardSquared[i.x][i.y] = i;        
        }
        makeNewTestBlock();
    }
    else{
        for(var i of myArr){
            i.undrawBlock();
        }
        for(var i of myArr){
            i.slowFall();
            i.drawBlock();
        }
    }
}

function drawGameBoard(){
    for(var i in gameBoardSquared){
        i.squareColor = "blue";
    }
}