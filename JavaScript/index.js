const squareSize = 40;
const ms = 500;

//getting the canvases properties
const canvas = document.getElementById("gameBoardCanvas");
const ctx = canvas.getContext("2d");

const clickButtons = document.querySelectorAll(".click-button");

const gameBoardColumns = 20;
const gameBoardRows = 10;
const playableGameBoardLength = 18;

let = gameScore = 0;

let gameOver = false;
let isCollision = false;

for (let i = 0; i < clickButtons.length; i++){
    clickButtons[i].addEventListener("click", function(){
        let buttonClickedOn = "Arrow" + this.innerText;
        startGame(buttonClickedOn);
    });
}

document.addEventListener("keydown", function(event){
    startGame(event.key);
});

const myInterval = setInterval(updateGameBoard, ms);  //1000/ms(=20) = 50 fps

alert("Instructions\nEnter: Start game\nLeft Arrow: move left\nRight Arrow: move right\nDown Arrow: Push down\nZ: Rotate");

function updateGameBoard(){
    if(!gameOver){
        colourTetromino();
        if(isCollision){
            clearRow();
            drawUpdatedGameBoard();
            makeNewRandomTetromino();
            isCollision = false;
        }
        else{
            tetrominoesSlowFall();
            drawUpdatedGameBoard();
        }
    }
    else{
        clearInterval(myInterval);
        alert("Game Over");
        gameOver = false;
    }
}

function startGame(key){

    if (key === "Enter"){
        drawSquaredGameBoard();
        makeNewRandomTetromino();
    }

    else if (key==="y"){
        rotateTetromino();
    }

    else if (key==="ArrowLeft"){
        moveTetrominoesLeft();
    }

    else if (key==="ArrowRight"){
        moveTetrominoesRight();
    }

    else if (key==="ArrowDown"){
        updateGameBoard();
    }
    
    else
        console.log("Psst, press 'Enter' to start");
}

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

let gameBoardSquared = [];

function drawSquaredGameBoard() {
    for(let row = 0; row < gameBoardRows; row++){
        gameBoardSquared[row] = [];
        for(let col = 0; col < gameBoardColumns; col++){
            gameBoardSquared[row][col] = new GridBlock("white", row, col);
        }
    }
}

function drawUpdatedGameBoard(){

    for(let m of gameBoardSquared){
        for(let n of m){
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
let tetrominoes = [];
let tetrominoI = [];
let tetrominoJ = [];
let tetrominoL = [];
let tetrominoO = [];
let tetrominoS = [];
let tetrominoT = [];
let tetrominoZ = [];
let tetro = [];


function makeNewRandomTetromino(){

    tetro[0] = new BasicBlock("gold", 4, 0);
    tetro[1] = new BasicBlock("gold", 5, 0);
    tetro[2] = new BasicBlock("gold", 6, 0);
    tetro[3] = new BasicBlock("gold", 7, 0);    //can be excluded
    tetro[4] = new BasicBlock("gold", 4, 1);
    tetro[5] = new BasicBlock("gold", 5, 1);
    tetro[6] = new BasicBlock("gold", 6, 1);
    tetro[7] = new BasicBlock("gold", 7, 1);
    tetro[8] = new BasicBlock("gold", 4, 2);
    tetro[9] = new BasicBlock("gold", 5, 2);
    tetro[10] = new BasicBlock("gold", 6, 2);
    tetro[11] = new BasicBlock("gold", 7, 2);
    tetro[12] = new BasicBlock("gold", 8, 2);   //can be excluded
    tetro[13] = new BasicBlock("gold", 5, 3);
    tetro[14] = new BasicBlock("gold", 6, 3);

    tetrominoI[0] = [tetro[1], tetro[5], tetro[9], tetro[13]];
    tetrominoI[1] = [tetro[8], tetro[9], tetro[10], tetro[11]];
    tetrominoI[2] = [tetro[2], tetro[6], tetro[10], tetro[14]];
    tetrominoI[3] = [tetro[4], tetro[5], tetro[6], tetro[7]];

    tetrominoJ[0] = [tetro[1], tetro[5], tetro[8], tetro[9]];
    tetrominoJ[1] = [tetro[6], tetro[4], tetro[5], tetro[10]];
    tetrominoJ[2] = [tetro[1], tetro[2], tetro[5], tetro[9]];
    tetrominoJ[3] = [tetro[0], tetro[4], tetro[5], tetro[6]];

    tetrominoL[0] = [tetro[0], tetro[1], tetro[5], tetro[9]];
    tetrominoL[1] = [tetro[4], tetro[5], tetro[6], tetro[8]];
    tetrominoL[2] = [tetro[1], tetro[5], tetro[9], tetro[10]];
    tetrominoL[3] = [tetro[2], tetro[4], tetro[5], tetro[6]];

    tetrominoO[0] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[1] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[2] = [tetro[1], tetro[2], tetro[5], tetro[6]];
    tetrominoO[3] = [tetro[1], tetro[2], tetro[5], tetro[6]];

    tetrominoS[0] = [tetro[0], tetro[4], tetro[5], tetro[9]];
    tetrominoS[1] = [tetro[5], tetro[6], tetro[8], tetro[9]];
    tetrominoS[2] = [tetro[1], tetro[5], tetro[6], tetro[10]];
    tetrominoS[3] = [tetro[1], tetro[2], tetro[4], tetro[5]];

    tetrominoT[0] = [tetro[1], tetro[4], tetro[5], tetro[9]];
    tetrominoT[1] = [tetro[4], tetro[5], tetro[6], tetro[9]];
    tetrominoT[2] = [tetro[1], tetro[5], tetro[6], tetro[9]];
    tetrominoT[3] = [tetro[1], tetro[4], tetro[5], tetro[6]];

    tetrominoZ[0] = [tetro[1], tetro[4], tetro[5], tetro[8]];
    tetrominoZ[1] = [tetro[4], tetro[5], tetro[9], tetro[10]];
    tetrominoZ[2] = [tetro[2], tetro[5], tetro[6], tetro[9]];
    tetrominoZ[3] = [tetro[0], tetro[1], tetro[5], tetro[6]];

    let i = Math.floor(Math.random() * tetrominoZ.length);
    let tetrominoesArr = [tetrominoO[i], tetrominoJ[i], tetrominoS[i], tetrominoZ[i], tetrominoT[i], tetrominoL[i], tetrominoI[i]];

    let x = Math.floor(Math.random() * tetrominoesArr.length);
    tetrominoes = tetrominoesArr[x];
}

function colourTetromino(){
    for(let i = 0; i < tetrominoes.length; i++){
        if(tetrominoes == tetrominoI[i]){
            for(let i of tetrominoI){
                for (let j of i){
                    j.squareColor = "magenta";
                }
            }
        }
    
        else if(tetrominoes == tetrominoJ[i]){
            for(let i of tetrominoJ){
                for (let j of i){
                    j.squareColor = "blue";
                }
            }
        }
    
        else if(tetrominoes == tetrominoL[i]){
            for(let i of tetrominoL){
                for (let j of i){
                    j.squareColor = "orange";
                }
            }
        }
    
        else if(tetrominoes == tetrominoO[i]){
            for(let i of tetrominoO){
                for (let j of i){
                    j.squareColor = "yellow";
                }
            }
        }
    
        else if(tetrominoes == tetrominoS[i]){
            for(let i of tetrominoS){
                for (let j of i){
                    j.squareColor = "green";
                }
            }
        }
    
        else if(tetrominoes == tetrominoT[i]){
            for(let i of tetrominoT){
                for (let j of i){
                    j.squareColor = "purple";
                }
            }
        }
    
        else if(tetrominoes == tetrominoZ[i]){
            for(let i of tetrominoZ){
                for (let j of i){
                    j.squareColor = "red";
                }
            }
        }
    } 
}

function rotateTetromino(){

    for(let i of tetrominoes){
        i.undrawBlock();
    }
    if(tetrominoes == tetrominoI[0]){
        tetrominoes = tetrominoI[1];
    } else if(tetrominoes == tetrominoI[1]){
        tetrominoes = tetrominoI[2];
    } else if(tetrominoes == tetrominoI[2]){
        tetrominoes = tetrominoI[3];
    } else if(tetrominoes == tetrominoI[3]){
        tetrominoes = tetrominoI[0];
    } else if(tetrominoes == tetrominoJ[0]){
        tetrominoes = tetrominoJ[1];
    } else if(tetrominoes == tetrominoJ[1]){
        tetrominoes = tetrominoJ[2];
    } else if(tetrominoes == tetrominoJ[2]){
        tetrominoes = tetrominoJ[3];
    } else if(tetrominoes == tetrominoJ[3]){
        tetrominoes = tetrominoJ[0];
    } else if(tetrominoes == tetrominoL[0]){
        tetrominoes = tetrominoL[1];
    } else if(tetrominoes == tetrominoL[1]){
        tetrominoes = tetrominoL[2];
    } else if(tetrominoes == tetrominoL[2]){
        tetrominoes = tetrominoL[3];
    } else if(tetrominoes == tetrominoL[3]){
        tetrominoes = tetrominoL[0];
    } else if(tetrominoes == tetrominoO[0]){
        tetrominoes = tetrominoO[1];
    } else if(tetrominoes == tetrominoO[1]){
        tetrominoes = tetrominoO[2];
    } else if(tetrominoes == tetrominoO[2]){
        tetrominoes = tetrominoO[3];
    } else if(tetrominoes == tetrominoO[3]){
        tetrominoes = tetrominoO[0];
    } else if(tetrominoes == tetrominoS[0]){
        tetrominoes = tetrominoS[1];
    } else if(tetrominoes == tetrominoS[1]){
        tetrominoes = tetrominoS[2];
    } else if(tetrominoes == tetrominoS[2]){
        tetrominoes = tetrominoS[3];
    } else if(tetrominoes == tetrominoS[3]){
        tetrominoes = tetrominoS[0];
    } else if(tetrominoes == tetrominoT[0]){
        tetrominoes = tetrominoT[1];
    } else if(tetrominoes == tetrominoT[1]){
        tetrominoes = tetrominoT[2];
    } else if(tetrominoes == tetrominoT[2]){
        tetrominoes = tetrominoT[3];
    } else if(tetrominoes == tetrominoT[3]){
        tetrominoes = tetrominoT[0];
    } else if(tetrominoes == tetrominoZ[0]){
        tetrominoes = tetrominoZ[1];
    } else if(tetrominoes == tetrominoZ[1]){
        tetrominoes = tetrominoZ[2];
    } else if(tetrominoes == tetrominoZ[2]){
        tetrominoes = tetrominoZ[3];
    } else if(tetrominoes == tetrominoZ[3]){
        tetrominoes = tetrominoZ[0];
    }
    for(let i of tetrominoes){
        i.drawBlock();
    }
}

function moveTetrominoesLeft(){
    if(tetrominoes.some(k => k.x - 1 < 0) || tetrominoes.some(k => k.squareColor !== "white" && gameBoardSquared[k.x-1][k.y].squareColor !== "white")){
        for(let i of tetrominoes){
            i.drawBlock();
        }
    }
    else{
        for(let i of tetro){
            i.undrawBlock();
            i.moveLeft();
        }
        for(let i of tetrominoes){
            i.drawBlock();
        }
    }
}

function moveTetrominoesRight(){
    if(tetrominoes.some(k => k.x + 1 > gameBoardSquared.length-1) || tetrominoes.some(k => k.squareColor !== "white" && gameBoardSquared[k.x+1][k.y].squareColor !== "white")){
        for(let i of tetrominoes){
            i.drawBlock();
        }
    }
    else{
        for(let i of tetro){
            i.undrawBlock();
            i.moveRight();
        }
        for(let i of tetrominoes){
            i.drawBlock();
        }
    }
}

function tetrominoesSlowFall(){
    const topBoardBorder = 3;
    for(let i of tetrominoes){
        if(tetrominoes.some(k => k.squareColor !== "white" && gameBoardSquared[k.x][k.y].squareColor !== "white" && tetrominoes.some(k => k.y < topBoardBorder))){
            console.log("Game Over");
            gameOver = true;
        }
    }
    if(tetrominoes.some(k => k.y > playableGameBoardLength-1)){
        for(let i of tetrominoes){
            i.drawBlock();
            gameBoardSquared[i.x][i.y] = i;
        }
        isCollision = true;
    }
    else if(tetrominoes.some(k => k.squareColor !== "white" && gameBoardSquared[k.x][k.y+1].squareColor !== "white")){
        for(let i of tetrominoes){
            i.drawBlock();
            gameBoardSquared[i.x][i.y] = i;
        }
        isCollision =  true;
    }
    for(let i of tetro){
        i.undrawBlock();
        i.slowFall();
    }
    for(let i of tetrominoes){
        i.drawBlock();
    }
}

function clearRow(){
    for(let rows = 0; rows < gameBoardColumns - 1; rows++){
        while(gameBoardSquared.every(k => k[rows].squareColor !== "white")){
            for(let i = 0; i < gameBoardSquared.length; i++){
                gameBoardSquared[i].splice(rows, 1);

            }
            for(let i = 0; i < gameBoardSquared.length; i++){
                gameBoardSquared[i].unshift(new GridBlock("white", i, rows));
            }
        gameScore += 100;
        const gameScoreElement = document.getElementById("score");
        gameScoreElement.innerHTML = "SCORE: " + gameScore;
        console.log("clearRow(): ");
        console.log(gameBoardSquared);
        }
    }
}