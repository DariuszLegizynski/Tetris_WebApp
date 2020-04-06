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
        
        makeNewTestBlock();
        toggleGameInterval();
        setInterval(updateGameBoard, ms);
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
    //testCollisionDetection(tetrominoes, myObstacles);
}

var myInterval;

function toggleGameInterval(){

    myInterval = setInterval(updateGameBoard, ms);  //1000/ms(=20) = 50 fps
}

//Optional: TODO: a dark game board, where only the tetrominoes and/or the borders of the game board would glow
class SimpleBlock{
    constructor(posX, posY){
        this.x = posX;
        this.y = posY;
    }
}

class GridBlock extends SimpleBlock{
    constructor(tempSquareColor, posX, posY){
        super(posX, posY);
        this.squareColor = tempSquareColor;
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, squareSize, squareSize);
        ctx.strokeRect(this.x, this.y, squareSize, squareSize);
    }
}

//Make the game board squared (in the canvas the y is row and the x is column
function drawSquaredGameBoard() {
    var gameBoardSquared = [];
    for(var row = 0; row < 10; row++){
        gameBoardSquared[row] = [];
        for(var col = 0; col < 20; col++){
            gameBoardSquared[row][col] = new GridBlock("white", row * squareSize, col * squareSize);
        }
    }
}

class BasicBlock extends SimpleBlock{
    constructor(tempSquareColor, posX, posY, collidedWithObstacle){
        super(posX, posY);
        this.squareColor = tempSquareColor;
        this.collidedWithObstacle = collidedWithObstacle;
    }

    updateBlock(){
        ctx.fillStyle = this.squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, squareSize, squareSize);
        ctx.strokeRect(this.x, this.y, squareSize, squareSize);
    }

    moveLeft(){
        this.x -= squareSize;
    }

    moveRight(){
        this.x += squareSize;
    }

    slowFall(){
        this.y += squareSize;
    }
}

//Tetrominos

//Declaration of variables, of a [4x4] tetromino array. Excluding the cells, that will never be used (like tetro3)
var tetrominoes = [];

//TODO: a table with all tetrominoes [J, L, T, etc] and then pick 1 by random and use it on the game board.

function makeNewTestBlock(){
    var tetro = [];
    tetro[0] = new BasicBlock("blue", 160, 0);
    tetro[1] = new BasicBlock("blue", 200, 0);
    tetro[2] = new BasicBlock("blue", 240, 0);
    tetro[4] = new BasicBlock("blue", 160, 40);
    tetro[5] = new BasicBlock("blue", 200, 40);
    tetro[6] = new BasicBlock("blue", 240, 40);
    tetro[7] = new BasicBlock("blue", 280, 40);
    tetro[8] = new BasicBlock("blue", 160, 80);
    tetro[9] = new BasicBlock("blue", 200, 80);
    tetro[10] = new BasicBlock("blue", 240, 80);
    tetro[11] = new BasicBlock("blue", 280, 80);
    tetro[13] = new BasicBlock("blue", 200, 120);
    tetro[14] = new BasicBlock("blue", 240, 120);

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
    tetrominoes.reverse();              //to start drawing the tetromino from the bottom line
    return tetrominoes;
}

function moveTetrominoesLeft(myArr){

    if(myArr.some(k => k.x - squareSize < 0)){
        for(let i of myArr){
            i.updateBlock();
        }
    }
    else{
        for(let i of myArr){
            i.moveLeft();
            i.updateBlock();
        }
    }
}

function moveTetrominoesRight(myArr){
    
    if(myArr.some(k => k.x + squareSize > squareSize * 9)){
        for(let i of myArr){
            i.updateBlock();
        }
    }
    else{
        for(let i of myArr){
            i.moveRight();
            i.updateBlock();
        }
    }
}

function tetrominoesSlowFall(myArr){

    if(myArr.some(k => k.y > squareSize * 18)){
        for(let i of myArr){
            i.updateBlock();
        }
    }
    else{
        for(let i of myArr){
            i.slowFall();
            i.updateBlock();
        }
    }
}

function testCollisionDetection(firstArray, secondArray){
    
}