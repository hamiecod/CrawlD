// Game constants and variables
let snakeVelocity = {x: 0, y: 0};
const foodSound = new Audio('/assets/audio/food.mp3');
const gameOverSound = new Audio('/assets/audio/gameover.mp3');
const moveSound = new Audio('/assets/audio/move.mp3');
const gameSound = new Audio('/assets/audio/music.mp3');
let score = 0;
let speed = 7;
let lastPaintTime = 0;

let snakeArr = [
    {x: 2, y:15}
]
let foodLocation = {x:13, y:15}
// foodLoation is not an array unlike snake arr because food is only one on the map

// Game functions
// the first parameter of hte requestAnimationFrame will be the timestamp
function main(timestamp){
    window.requestAnimationFrame(main);
    // ((ctime - lastPaintTime)/1000) = FPS
    // 1/speed is the required FPS
    if((timestamp - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = timestamp;
    gameEngine();
}

function isCollide(snake){
    // if you bump into yourself
    for (let index = 1; index < snakeArr.length; index++) {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    gameSound.play();

    // This function has some parts
    // Part 1: Updating the snake array
    // unlike maths, javascript's axis origin is on top left
    if(isCollide(snakeArr)){
        gameSound.pause();
        gameOverSound.play();
        snakeVelocity = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [
            {x: 2, y:15}
        ]
        gameSound.play();
        score=0;
    }

    // if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === foodLocation.y && snakeArr[0].x === foodLocation.x){
        foodSound.play();
        // .unshift adds a value to the beginning of the array without shif
        snakeArr.unshift({x: (snakeArr[0].x + snakeVelocity.x), y: (snakeArr[0].y + snakeVelocity.y)});
        let randMin= 2;
        let randMax= 16;
        // we will not be generating the number on the extreme positions to make the game a little lenient
        foodLocation = {x: (Math.round(randMin + (randMax-randMin)* Math.random())), y: (Math.round(randMin + (randMax-randMin)* Math.random()))};
        // generates the food at a random place in between randMin and randMax
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        // creates a new obj

    }
    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;
    

    // Part 2: Display the snake array & food
    let board = document.querySelector('.board');
    board.innerHTML = "";
    // reseting the board
    
    // display the snake
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        // multiple rows are placed on the y axis
        snakeElement.style.gridColumnStart = e.x;
        // multiple columns are placed on the x axis

        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodLocation.y;
    // multiple rows are placed on the y axis
    // y depicts the row number
    foodElement.style.gridColumnStart = foodLocation.x;
    // x determines the column number
    // multiple columns are placed on the x axis
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic starts here
window.requestAnimationFrame(main);

// game controls
document.addEventListener('keydown', e =>{
    snakeVelocity = {x:0, y:1}; // start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
        case "w":
            // if arrow up or w
            console.log("Up");
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case "ArrowDown":
        case "s":
            // if arrow down or s
            console.log("Down");
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case "ArrowRight":
        case "d":
            // if arrow right or d
            console.log("Right");
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;

        case "ArrowLeft":
        case "a":
            // if arrow left or a
            console.log("Left");
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
    
        default:
            snakeVelocity.x = 0;
            snakeVelocity.y = 0;
            break;
    }
});