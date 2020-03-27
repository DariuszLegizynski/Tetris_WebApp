var canvas = document.getElementById("gameBoardCanvas");
var ctx = canvas.getContext("2d");
const squareSize = 40;
var ms = 500;

var clickButtons = document.querySelectorAll(".click-button");

for (var i = 0; i < clickButtons.length; i++){
    clickButtons[i].addEventListener("click", function(){
        moveTetrominoesLeft(tetrominoes);
        // moveTetrominoesRight(tetrominoes);
    });
}

document.addEventListener("keydown", function(event){
    startGame(event.key);
});

function startGame(key){

    if (key === "Enter"){
        
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

var gameBoardSquared = [];

//Make the game board squared
function drawSquaredGameBoard() {
    for(var col = 0; col < 10; col++){
        gameBoardSquared[col] = [];
        for(var row = 0; row < 20; row++){
            gameBoardSquared[col][row] = new SimpleBlock("white", col * 40, row * 40); //behind the "=" sign is to check, if the gameBoard is sliced into squares.
        }
    }
}

//Optional: TODO: a dark game board, where only the tetrominoes and/or the borders of the game board would glow

function SimpleBlock (squareColor, x, y){
    this.squareColor = squareColor;
    this.x = x;
    this.y = y;
    ctx.fillStyle = squareColor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.fillRect(this.x, this.y, squareSize, squareSize);
    ctx.strokeRect(this.x, this.y, squareSize, squareSize);

    this.updateBlock = function(){
        ctx.fillStyle = squareColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, squareSize, squareSize);
        ctx.strokeRect(this.x, this.y, squareSize, squareSize);
    }
}

//Declaration of variables, of a [4x4] tetromino array. Excluding the cells, that are never used (like tetro3)
var tetro0, tetro1, tetro2, tetro4, tetro5, tetro6, tetro7, tetro8, tetro9, tetro10, tetro11, tetro13, tetro14;
var tetrominoes;

function makeNewTestBlock(){
    tetro0 = new SimpleBlock("blue", 160, 0);
    tetro1 = new SimpleBlock("blue", 200, 0);
    tetro2 = new SimpleBlock("blue", 240, 0);
    tetro4 = new SimpleBlock("blue", 160, 40);
    tetro5 = new SimpleBlock("blue", 200, 40);
    tetro6 = new SimpleBlock("blue", 240, 40);
    tetro7 = new SimpleBlock("blue", 280, 40);
    tetro8 = new SimpleBlock("blue", 160, 80);
    tetro9 = new SimpleBlock("blue", 200, 80);
    tetro10 = new SimpleBlock("blue", 240, 80);
    tetro11 = new SimpleBlock("blue", 280, 80);
    tetro13 = new SimpleBlock("blue", 200, 120);
    tetro14 = new SimpleBlock("blue", 240, 120);

    var i = Math.floor(Math.random() * 4);

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

    var tetrominoesArr = [tetrominoJ[i], tetrominoS[i]];
    var x = Math.floor(Math.random() * 2);
    tetrominoes = tetrominoesArr[x];
    return tetrominoes;
}

function moveTetrominoesLeft(myArr){
    if(myArr.includes(tetro0)){
        tetro0.x -= squareSize;
        tetro0.updateBlock();
    }

    if(myArr.includes(tetro1)){
        tetro1.x -= squareSize;
        tetro1.updateBlock();
    }
    
    if(myArr.includes(tetro2)){
        tetro2.x -= squareSize;
        tetro2.updateBlock();
    }
    
    if(myArr.includes(tetro4)){
        tetro4.x -= squareSize;
        tetro4.updateBlock();
    }

    if(myArr.includes(tetro5)){
        tetro5.x -= squareSize;
        tetro5.updateBlock();
    }

    if(myArr.includes(tetro6)){
        tetro6.x -= squareSize;
        tetro6.updateBlock();
    }

    if(myArr.includes(tetro7)){
        tetro7.x -= squareSize;
        tetro7.updateBlock();
    }

    if(myArr.includes(tetro8)){
        tetro8.x -= squareSize;
        tetro8.updateBlock();
    }

    if(myArr.includes(tetro9)){
        tetro9.x -= squareSize;
        tetro9.updateBlock();
    }

    if(myArr.includes(tetro10)){
        tetro10.x -= squareSize;
        tetro10.updateBlock();
    }

    if(myArr.includes(tetro11)){
        tetro11.x -= squareSize;
        tetro11.updateBlock();
    }

    if(myArr.includes(tetro13)){
        tetro13.x -= squareSize;
        tetro13.updateBlock();
    }

    if(myArr.includes(tetro14)){
        tetro14.x -= squareSize;
        tetro14.updateBlock();
    }
}

function moveTetrominoesRight(myArr){
    if(myArr.includes(tetro0)){
        tetro0.x += squareSize;
        tetro0.updateBlock();
    }

    if(myArr.includes(tetro1)){
        tetro1.x += squareSize;
        tetro1.updateBlock();
    }
    
    if(myArr.includes(tetro2)){
        tetro2.x += squareSize;
        tetro2.updateBlock();
    }
    
    if(myArr.includes(tetro4)){
        tetro4.x += squareSize;
        tetro4.updateBlock();
    }

    if(myArr.includes(tetro5)){
        tetro5.x += squareSize;
        tetro5.updateBlock();
    }

    if(myArr.includes(tetro6)){
        tetro6.x += squareSize;
        tetro6.updateBlock();
    }

    if(myArr.includes(tetro7)){
        tetro7.x += squareSize;
        tetro7.updateBlock();
    }

    if(myArr.includes(tetro8)){
        tetro8.x += squareSize;
        tetro8.updateBlock();
    }

    if(myArr.includes(tetro9)){
        tetro9.x += squareSize;
        tetro9.updateBlock();
    }

    if(myArr.includes(tetro10)){
        tetro10.x += squareSize;
        tetro10.updateBlock();
    }

    if(myArr.includes(tetro11)){
        tetro11.x += squareSize;
        tetro11.updateBlock();
    }

    if(myArr.includes(tetro13)){
        tetro13.x += squareSize;
        tetro13.updateBlock();
    }

    if(myArr.includes(tetro14)){
        tetro14.x += squareSize;
        tetro14.updateBlock();
    }
}

function tetrominoesSlowFall(myArr){
    if(myArr.includes(tetro0)){
        tetro0.y += squareSize;
        tetro0.updateBlock();
    }

    if(myArr.includes(tetro1)){
        tetro1.y += squareSize;
        tetro1.updateBlock();
    }
    
    if(myArr.includes(tetro2)){
        tetro2.y += squareSize;
        tetro2.updateBlock();
    }
    
    if(myArr.includes(tetro4)){
        tetro4.y += squareSize;
        tetro4.updateBlock();
    }

    if(myArr.includes(tetro5)){
        tetro5.y += squareSize;
        tetro5.updateBlock();
    }

    if(myArr.includes(tetro6)){
        tetro6.y += squareSize;
        tetro6.updateBlock();
    }

    if(myArr.includes(tetro7)){
        tetro7.y += squareSize;
        tetro7.updateBlock();
    }

    if(myArr.includes(tetro8)){
        tetro8.y += squareSize;
        tetro8.updateBlock();
    }

    if(myArr.includes(tetro9)){
        tetro9.y += squareSize;
        tetro9.updateBlock();
    }

    if(myArr.includes(tetro10)){
        tetro10.y += squareSize;
        tetro10.updateBlock();
    }

    if(myArr.includes(tetro11)){
        tetro11.y += squareSize;
        tetro11.updateBlock();
    }

    if(myArr.includes(tetro13)){
        tetro13.y += squareSize;
        tetro13.updateBlock();
    }

    if(myArr.includes(tetro14)){
        tetro14.y += squareSize;
        tetro14.updateBlock();
    }
}

//Tetrominos

//TODO: a table with all tetrominoes [J, L, T, etc] and then pick 1 by random and use it on the game board.