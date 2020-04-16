const squareSize = 40;
var ms = 500;

//getting the canvases properties
var canvas = document.getElementById("gameBoardCanvas");
var ctx = canvas.getContext("2d");

var clickButtons = document.querySelectorAll(".click-button");

const gameBoardColumns = 20;
const gameBoardRows = 10;
const playableGameBoardLength = 8;

var gameOver = false;

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
    if(!gameOver){
        if(collisionDetection(tetrominoes)){
            drawUpdatedGameBoard();
            clearRow();
            makeNewTestBlock();
        }
        else{
            tetrominoesSlowFall(tetrominoes);
            drawUpdatedGameBoard();
        }
    }
    else{
        clearInterval(myInterval);
    }

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
    for(var row = 0; row < gameBoardRows; row++){
        gameBoardSquared[row] = [];
        for(var col = 0; col < gameBoardColumns; col++){
            gameBoardSquared[row][col] = new GridBlock("white", row, col);
        }
    }
}

// var clearRow = (myArr, n) => myArr.map(x => for(x[n] of gameBoardSquared));

function drawUpdatedGameBoard(){

    for(var m of gameBoardSquared){
        for(var n of m){
            if(n.squareColor !== "white"){
                n.drawBlock();
            }
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

    var tetrominoO = [];

    tetrominoO[0] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[1] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[2] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[3] = [tetro[1], tetro[2], tetro[5], tetro[6]];

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
    var tetrominoesArr = [tetrominoO[i]];//,tetrominoJ[i], tetrominoS[i]];

    var x = Math.floor(Math.random() * tetrominoesArr.length);
    tetrominoes = tetrominoesArr[x];
    return tetrominoes;
}

function moveTetrominoesLeft(myArr){

    if(myArr.some(k => k.x - 1 < 0) || myArr.some(k => k.squareColor == gameBoardSquared[k.x-1][k.y].squareColor)){
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
    
    if(myArr.some(k => k.x + 1 > gameBoardSquared.length-1) || myArr.some(k => k.squareColor == gameBoardSquared[k.x+1][k.y].squareColor)){
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

    for(let i of myArr){
        i.undrawBlock();
    }
    for(let i of myArr){
        i.slowFall();
        i.drawBlock();
    }
}

function collisionDetection(myArr){
    const topBoardBorder = 4;
    for(var i of myArr){
        if(myArr.some(k => k.squareColor == gameBoardSquared[k.x][k.y].squareColor) && myArr.some(k => k.y < topBoardBorder)){
            console.log("Game Over");
            gameOver = true;
        }
        if(myArr.some(k => k.squareColor == gameBoardSquared[k.x][k.y+1].squareColor)){
            for(var i of myArr){
                i.drawBlock();
                gameBoardSquared[i.x][i.y] = i;
            }
            return true;
        }
        else if(myArr.some(k => k.y > playableGameBoardLength)){
            for(var i of myArr){
                i.drawBlock();
                gameBoardSquared[i.x][i.y] = i;
            }
        }
    }
    return false;
}

function clearRow(){

    for(var rows = 0; rows < gameBoardSquared.length; rows++){ 
        if(gameBoardSquared.every(k => k[rows].squareColor == "blue")){
            console.log("ERFEACADSC");
            gameBoardSquared[rows].splice(rows, 1);
            console.log(gameBoardSquared);
        }
    }
    
    // for(var rows = 0; rows < gameBoardSquared.length; rows++){
    //     console.log(gameBoardSquared[rows]);
    // for(var cols = 0; cols < gameBoardSquared[rows].length; cols++){

    //     }
    // }



    // var checkForClearRows = gameBoardSquared[0].map((col, i) => gameBoardSquared.map(row => row[i]));
    // for(var i of checkForClearRows){
    //     var isFilled = false;
    //     if(i.every(k => k.squareColor !== "white")){
    //         // gameBoardSquared[i.x] = i;
    //         gameBoardSquared.splice(i, 1);
    //         console.table(gameBoardSquared);
    //     }
    // }
    // var checkForClearRows = gameBoardSquared[0].map((col, i) => gameBoardSquared.map(row => row[i]));
    // for(var i of checkForClearRows){
    //     var isFilled = false;
    //     if(i.every(k => k.squareColor !== "white")){
    //         isFilled = true;
    //     }
    //     if(isFilled){
    //         console.log("here");
    //         for(c of gameBoardSquared){
    //             for(v of c){
    //                 v.
    //             }
    //         }
            // for(var rows = i.y; rows > 1; rows--){
            //     for(var cols = 0; cols < 20; cols++){
            //         gameBoardSquared[rows][cols] = gameBoardSquared[rows - 1][cols];
            //     }
            // }
    // }
    // for(var i of clearRow){
    //     var isFilled = false;
    //     if(i.every(k => k.squareColor !== "white")){
    //         isFilled = true;
    //     }
    //     if(isFilled){
    //         gameBoardSquared = gameBoardSquared[0].map((col, i) => gameBoardSquared.map(row => row[i]));
    //         gameBoardSquared.splice(i, 1);
    //         gameBoardSquared.unshift([new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col), new GridBlock("white", row, col)]);
    //         console.log("KAZAAAAAAAAHMMMMMMMMMMMM");
    //         console.log(gameBoardSquared);
    //     }
    // }

    // var clearRow = gameBoardSquared[0].map((col, i) => gameBoardSquared.map(row => row[i]));

    // for(var i of clearRow){
    //     var isFilled = false;
    //     console.log(i);
    //     if(i.every(k => k.squareColor !== "white")){
    //         isFilled = true;
    //     }
    //     if(isFilled){
    //         clearRow.splice(i, 1);
    //         console.log("KAZAAAAAAAAHMMMMMMMMMMMM");
    //         gameBoardSquared = clearRow;
    //     }
    // }
}