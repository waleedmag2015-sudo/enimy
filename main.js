let score1 = document.getElementById("score");
let lives1 = document.getElementById("lives");
let score = 0
let lives = 3

let canvas = document.getElementById("gamecanves");
let ctx = canvas.getContext("2d");

let gameover = false
let win = false
canvas.width = 900;
canvas.height = 500;


const player = {
    x: 100,
    y: 250,
    size: 25,
    speed: 4
};

const coin = {
    x: 400,
    y: 250,
    size: 15
};

const enemy1 = {
    x: 700,
    y: 100,
    size: 30,
    dx: 4,
    dy: 5,
};

const enemy2 = {
    x: 500,
    y: 300,
    size: 30,
    dy: 3,
    dx: -3,
}

const enemy3 = {
    x: 350,
    y: 50,
    size: 30,
    dy: 3,
    dx:-4,

}

function drawPlayer() {

    ctx.beginPath();
    ctx.fillStyle = "#00f7ff";
    ctx.shadowColor = "#00f7ff";
    ctx.shadowBlur = 20;

    ctx.arc(
        player.x + player.size / 2,
        player.y + player.size / 2,
        player.size / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function drawcoin() {

    ctx.beginPath();
    ctx.fillStyle = "#ffd700";
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 20;

    ctx.arc(
        coin.x + coin.size / 2,
        coin.y + coin.size / 2,
        coin.size / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();

}
function drawenemy(numb) {

    ctx.beginPath();
    ctx.fillStyle = "#ff0400";
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 20;

    ctx.arc(
       numb.x + numb.size / 2,
       numb.y +numb.size / 2,
       numb.size / 2,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

function draw(num1, color) {
    num1.x += num1.size / 2;
    num1.y -= num1.size / 2;
    num1.size += 4;

    ctx.fill();
}

keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function playermove() {

    if (keys["ArrowUp"])
        player.y -= player.speed;

    if (keys["ArrowDown"])
        player.y += player.speed;

    if (keys["ArrowLeft"])
        player.x -= player.speed;

    if (keys["ArrowRight"])
        player.x += player.speed;

    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}


function moveenemy(){
     const enemies = [enemy1, enemy2, enemy3];
enemies.forEach(enemy => {
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;

    if (enemy.x <= 0 || enemy.x + enemy.size >= canvas.width) {
        enemy.dx *= -1;
    }

    if (enemy.y <= 0 || enemy.y + enemy.size >= canvas.height) {
        enemy.dy *= -1;
    }
});
}




function enemyCollision() {
    const enemies = [enemy1, enemy2, enemy3];

    enemies.forEach(enemy => {
        if (
            player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y
        ) {
            lives--;
            lives1.textContent = lives;
            player.x=100
            player.y=250

            if( lives<= 0){
                gameover=true
            }
        }
    });
}


function coincollect() {
    if (
        player.x < coin.x + coin.size &&
        player.x + player.size > coin.x &&
        player.y < coin.y + coin.size &&
        player.y + player.size >= coin.y
    ) {
        score++;
        score1.textContent = score;

        coin.x = Math.random() * (canvas.width - coin.size);
        coin.y = Math.random() * (canvas.height - coin.size);
        if(score>=10){
          win=true  
        }
    }
}




function animate()
{
if(gameover){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red"
    ctx.font ="100px Arial"
    ctx.textAlign="center"
    ctx.fillText("gameover",canvas.width/2,canvas.height/2)
    return
}

if(win){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green"
    ctx.font ="100px Arial"
    ctx.textAlign="center"
    ctx.fillText("win",canvas.width/2,canvas.height/2)
    return
}




    ctx.clearRect(0, 0, canvas.width, canvas.height);
    coincollect()
    moveenemy ()
    enemyCollision()
    playermove()
    drawPlayer();
    drawcoin();
    drawenemy(enemy1)
    drawenemy(enemy2)
    drawenemy(enemy3)
    requestAnimationFrame(animate);
}

animate();