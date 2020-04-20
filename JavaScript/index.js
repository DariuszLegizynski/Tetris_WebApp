const squareSize = 40;
var ms = 500;

//getting the canvases properties
var canvas = document.getElementById("gameBoardCanvas");
var ctx = canvas.getContext("2d");

var clickButtons = document.querySelectorAll(".click-button");

const gameBoardColumns = 20;
const gameBoardRows = 10;
const playableGameBoardLength = 12;

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
            clearRow();
            drawUpdatedGameBoard();
            makeNewRandomTetromino();
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
        makeNewRandomTetromino();
    }

    else if (key==="ArrowUp")
        rotateTetromino(tetrominoes);

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
var tetrominoI = [];
var tetrominoJ = [];
var tetrominoL = [];
var tetrominoO = [];
var tetrominoS = [];
var tetrominoT = [];
var tetrominoZ = [];
var currTetromino;

//TODO: a table with all tetrominoes [J, L, T, etc] and then pick 1 by random and use it on the game board.

function makeNewRandomTetromino(){
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

    // var tetrominoI = [];

    tetrominoI[0] = [tetro[1], tetro[5], tetro[9], tetro[13]];
    tetrominoI[1] = [tetro[8], tetro[9], tetro[10], tetro[11]];
    tetrominoI[2] = [tetro[2], tetro[6], tetro[10], tetro[14]];
    tetrominoI[3] = [tetro[4], tetro[5], tetro[6], tetro[7]];

    // for(var i of tetrominoI){
    //     i.squareColor == "magenta";
    // }

    // var tetrominoJ = [];

    tetrominoJ[0] = [tetro[1], tetro[5], tetro[8], tetro[9]];
    tetrominoJ[1] = [tetro[6], tetro[4], tetro[5], tetro[10]];
    tetrominoJ[2] = [tetro[1], tetro[2], tetro[5], tetro[9]];
    tetrominoJ[3] = [tetro[0], tetro[4], tetro[5], tetro[6]];

    // var tetrominoL = [];

    tetrominoL[0] = [tetro[0], tetro[1], tetro[5], tetro[9]];
    tetrominoL[1] = [tetro[4], tetro[5], tetro[6], tetro[8]];
    tetrominoL[2] = [tetro[1], tetro[5], tetro[9], tetro[10]];
    tetrominoL[3] = [tetro[2], tetro[4], tetro[5], tetro[6]];

    // for(var i of tetrominoL){
    //     i.squareColor == "orange";
    // }

    // var tetrominoO = [];

    tetrominoO[0] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[1] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[2] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[3] = [tetro[1], tetro[2], tetro[5], tetro[6]];

    // for(var i of tetrominoO){
    //     i.squareColor == "yellow";
    // }

    // var tetrominoS = [];

    tetrominoS[0] = [tetro[0], tetro[4], tetro[5], tetro[9]];
    tetrominoS[1] = [tetro[5], tetro[6], tetro[8], tetro[9]];
    tetrominoS[2] = [tetro[1], tetro[5], tetro[6], tetro[10]];
    tetrominoS[3] = [tetro[1], tetro[2], tetro[4], tetro[5]];

    // for(var i of tetrominoS){
    //     i.squareColor == "green";
    // }

    // var tetrominoT = [];

    tetrominoT[0] = [tetro[1], tetro[4], tetro[5], tetro[9]];
    tetrominoT[1] = [tetro[4], tetro[5], tetro[6], tetro[9]];
    tetrominoT[2] = [tetro[1], tetro[5], tetro[6], tetro[9]];
    tetrominoT[3] = [tetro[1], tetro[4], tetro[5], tetro[6]];

    // for(var i of tetrominoT){
    //     i.squareColor == "purple";
    // }

    // var tetrominoZ = [];

    tetrominoZ[0] = [tetro[1], tetro[4], tetro[5], tetro[8]];
    tetrominoZ[1] = [tetro[4], tetro[5], tetro[9], tetro[10]];
    tetrominoZ[2] = [tetro[2], tetro[5], tetro[6], tetro[9]];
    tetrominoZ[3] = [tetro[0], tetro[1], tetro[5], tetro[6]];

    // for(var i of tetrominoZ){
    //     i.squareColor == "red";
    // }

    var i = Math.floor(Math.random() * tetrominoZ.length);
    var tetrominoesArr = [tetrominoO[i], tetrominoJ[i], tetrominoS[i], tetrominoZ[i], tetrominoT[i], tetrominoL[i], tetrominoI[i]];
    
    var x = Math.floor(Math.random() * tetrominoesArr.length);
    tetrominoes = tetrominoesArr[x];
    return tetrominoes;
}

function rotateTetromino(){
    if(myArr.includes(tetrominoI[0])){
        myArr = tetrominoI[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoI[1])){
        myArr = tetrominoI[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoI[2])){
        myArr = tetrominoI[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoI[3])){
        myArr = tetrominoI[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoJ[0])){
        myArr = tetrominoJ[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoJ[1])){
        myArr = tetrominoJ[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoJ[2])){
        myArr = tetrominoJ[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoJ[3])){
        myArr = tetrominoJ[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoL[0])){
        myArr = tetrominoL[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoL[1])){
        myArr = tetrominoL[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoL[2])){
        myArr = tetrominoL[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoL[3])){
        myArr = tetrominoL[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoS[0])){
        myArr = tetrominoS[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoS[1])){
        myArr = tetrominoS[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoS[2])){
        myArr = tetrominoS[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoS[3])){
        myArr = tetrominoS[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoT[0])){
        myArr = tetrominoT[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoT[1])){
        myArr = tetrominoT[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoT[2])){
        myArr = tetrominoT[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoT[3])){
        myArr = tetrominoT[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoZ[0])){
        myArr = tetrominoZ[1];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoZ[1])){
        myArr = tetrominoZ[2];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoZ[2])){
        myArr = tetrominoZ[3];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    } else if(myArr.includes(tetrominoZ[3])){
        myArr = tetrominoZ[0];
        for(var k of (tetrominoI[1])){
            k.drawBlock();
        }
    }

    // tetrominoJ = [];
    // tetrominoL = [];
    // tetrominoO = [];
    // tetrominoS = [];
    // tetrominoT = [];
    // tetrominoZ = [];
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
    const topBoardBorder = 3;
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
        else if(myArr.some(k => k.y > playableGameBoardLength-1)){
            for(var i of myArr){
                i.drawBlock();
                gameBoardSquared[i.x][i.y] = i;
            }
            return true;
        }
    }
    return false;
}

function clearRow(){
    for(var rows = 0; rows < gameBoardColumns - 1; rows++){
        while(gameBoardSquared.every(k => k[rows].squareColor == "blue")){
            for(var i = 0; i < gameBoardSquared.length; i++){
                gameBoardSquared[i].splice(rows, 1);
            }
            for(var i = 0; i < gameBoardSquared.length; i++){
                gameBoardSquared[i].unshift(new GridBlock("white", i, rows));
            }
        console.log("clearRow(): ");
        console.log(gameBoardSquared);
        }
    }
}