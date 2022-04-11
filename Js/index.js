
//Game constance and variables
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('../music/food.wav')
const overSound = new Audio('../music/over.wav')
const turnSound = new Audio('../music/turn.wav')
const backSound = new Audio('../music/background.mp3')
let speed = 6;
let lastPaintTime = 0;
let snakeArray = [
    { x: 10, y: 15 }
]
food = { x: 6, y: 8 }
let score = 0;


//Game functions
function main(cTime) {
    window.requestAnimationFrame(main);
    //console.log(cTime);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(snake) {
    //if bump into your self
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    //if bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameEngine() {
    //Updating the snake array
    if (isCollide(snakeArray)) {
        overSound.play();
        backSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over... Press any key to start again");
        snakeArray = [{ x: 10, y: 15 }]
        score = 0;
    }

    //if eaten the food, increament the score and re generate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play()
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = 'High Score: ' + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {

        snakeArray[i + 1] = { ...snakeArray[i] }

    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //Display the snake
    panel.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        panel.appendChild(snakeElement);
    })

    // Display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    panel.appendChild(foodElement);
}


//Main logic
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = 'High Score: ' + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start game

    turnSound.play();
    backSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})