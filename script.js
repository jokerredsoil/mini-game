const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basketWidth = 100;
const basketHeight = 100;
const basketSpeed = 7;
const objectSize = 20;
let score = 0;

const basket = {
    x: canvas.width / 2 - basketWidth / 2,
    y: canvas.height - basketHeight,
    width: basketWidth,
    height: basketHeight,
    dx: 0
};

let object = createObject();
function createObject() {
    return {
        x: Math.random() * (canvas.width - objectSize),
        y: 0,
        size: objectSize,
        dy: 3
    };
}
function drawBasket() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}
function drawObject() {
    ctx.fillStyle = '#DD9500';
    ctx.fillRect(object.x, object.y, object.size, object.size);
}

// Draw the score
function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function update() {
       basket.x += basket.dx;

    if (basket.x < 0) basket.x = 0;
    if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;

    object.y += object.dy;

    if (object.y + object.size > basket.y && object.x < basket.x + basket.width && object.x + object.size > basket.x) {
        score++;
        object = createObject();
    }

    if (object.y > canvas.height) {
        object = createObject();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawObject();
    drawScore();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        basket.dx = basketSpeed;
    } else if (e.key === 'ArrowLeft') {
        basket.dx = -basketSpeed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        basket.dx = 0;
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
