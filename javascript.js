// ==========================
// SNAKE GAME
// ==========================

const snakeCanvas = document.getElementById("snakeCanvas");
const snakeCtx = snakeCanvas.getContext("2d");

const snakeStart = document.getElementById("snakeStart");

const snakeScoreText =
    document.getElementById("snakeScore");

const deathPopup =
    document.getElementById("deathPopup");

const deathVideo =
    document.getElementById("deathVideo");

const closeDeath =
    document.getElementById("closeDeath");

const finalScore =
    document.getElementById("finalScore");


const gridSize = 20;

const tileCount =
    snakeCanvas.width / gridSize;


let snake = [];

let food = {
    x: 0,
    y: 0
};

let direction = "right";

let nextDirection = "right";

let snakeScore = 0;

let snakeRunning = false;

let snakeTimer;


// ==========================
// START GAME
// ==========================

snakeStart.addEventListener("click", function () {

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = "right";
    nextDirection = "right";

    snakeScore = 0;

    snakeScoreText.textContent =
        snakeScore;

    createFood();

    snakeRunning = true;

    clearInterval(snakeTimer);

    snakeTimer = setInterval(
        updateSnake,
        100
    );

    drawSnake();

});


// ==========================
// CREATE FOOD
// ==========================

function createFood() {

    food.x =
        Math.floor(
            Math.random() * tileCount
        );

    food.y =
        Math.floor(
            Math.random() * tileCount
        );


    // Don't spawn food inside snake

    for (let part of snake) {

        if (
            part.x === food.x &&
            part.y === food.y
        ) {

            createFood();

            return;
        }
    }
}


// ==========================
// CONTROLS
// ==========================

document.addEventListener(
    "keydown",
    function (event) {

        if (!snakeRunning) {
            return;
        }

        const key =
            event.key.toLowerCase();


        if (
            key === "w" &&
            direction !== "down"
        ) {

            nextDirection = "up";
        }


        if (
            key === "s" &&
            direction !== "up"
        ) {

            nextDirection = "down";
        }


        if (
            key === "a" &&
            direction !== "right"
        ) {

            nextDirection = "left";
        }


        if (
            key === "d" &&
            direction !== "left"
        ) {

            nextDirection = "right";
        }

    }
);


// ==========================
// UPDATE
// ==========================

function updateSnake() {

    direction = nextDirection;

    let head = {
        x: snake[0].x,
        y: snake[0].y
    };


    if (direction === "up") {
        head.y--;
    }

    if (direction === "down") {
        head.y++;
    }

    if (direction === "left") {
        head.x--;
    }

    if (direction === "right") {
        head.x++;
    }


    // Wall collision

    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {

        gameOver();

        return;
    }


    // Body collision

    for (let part of snake) {

        if (
            head.x === part.x &&
            head.y === part.y
        ) {

            gameOver();

            return;
        }
    }


    snake.unshift(head);


    // Eat food

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        snakeScore++;

        snakeScoreText.textContent =
            snakeScore;

        createFood();

    } else {

        snake.pop();

    }


    drawSnake();
}


// ==========================
// DRAW
// ==========================

function drawSnake() {

    snakeCtx.fillStyle = "#080808";

    snakeCtx.fillRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
    );


    // Food

    snakeCtx.fillStyle = "#ff3333";

    snakeCtx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 1,
        gridSize - 1
    );


    // Snake

    for (
        let i = 0;
        i < snake.length;
        i++
    ) {

        if (i === 0) {

            snakeCtx.fillStyle =
                "#00ff66";

        } else {

            snakeCtx.fillStyle =
                "#00aa44";
        }


        snakeCtx.fillRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize - 1,
            gridSize - 1
        );

    }
}


// ==========================
// GAME OVER
// ==========================

function gameOver() {

    snakeRunning = false;

    clearInterval(snakeTimer);

    finalScore.textContent =
        snakeScore;

    deathPopup.style.display =
        "flex";


    // Restart video

    deathVideo.currentTime = 0;

    deathVideo.play().catch(
        function () {
            // Browser may require
            // the user to press play.
        }
    );
}


// ==========================
// CLOSE VIDEO
// ==========================

closeDeath.addEventListener(
    "click",
    function () {

        deathPopup.style.display =
            "none";

        deathVideo.pause();

    }
);