function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script)
}

include("player.js")
include("enemy.js")
include("bullet.js")
include("obstacle.js")
include("boss.js")

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyRealeassed);
canvas.addEventListener("mousemove", checkPos);
var fadeId = 0;

context.font = "30px Arial";

var state_of_screen = 0;
var mode_of_move = 0;
var Img = [];
var z = 0;
var current_score = 0;
var best_score = 0;

for (var i = 0; i < 15; i++) {
    Img[i] = new Image();
    Img[i].src = "playerImage" + i + ".gif";
}

var enemys = [];
var enemy_count = 0;
var enemy_kills = 0;
var bosshp = -1;

var bullets = [];
var obstacle = [];
var boss;

function spawnEnemy() {
    enemy_x = 700;
    enemy_y = Math.random() * 525;
    enemy_dx = Math.random(-45) * -20;
    enemy_dy = Math.random(-10) * 10;
    var enemy = new Enemy(enemy_x, enemy_y, enemy_dx, enemy_dy);
    enemys.push(enemy);
}

function spawnBoss() {
    bosshp = 80;
    boss_x = 700;
    boss_y = 250;
    boss_dx = -10;
    boss_dy = -10;
    boss = new Boss(boss_x, boss_y, boss_dx, boss_dy);
}

function shot() {
    var bullet_x = player.x + 75;
    var bullet_y = player.y + 75 / 2 - 5 / 2;
    var bullet_dx = 15;

    var bullet = new Bullet(bullet_x, bullet_y, bullet_dx);

    bullets.push(bullet);
}

function spawnObstacles(coord_enemy_x, coord_enemy_y) {
    var obstacle_x = coord_enemy_x;
    var obstacle_y = coord_enemy_y + 75 / 2;
    var obstacle_dx = 10;

    var obstacle = new Obstacle(obstacle_x, obstacle_y, obstacle_dx);

    obstacle.push(bullet);
}

var kd = 0;

var player_param = {x: 100, y: 300, dx: 10, dy: 10};
var player = new Player(player_param.x, player_param.y, player_param.dx, player_param.dy);
var playerHp = 3;

var timer = 0;
var battle_timer = 0;
var god_timer = 0;

var background = new Image();
background.src = 'Images/forest.png';
game_spped = 0;



background.onload = function () {
    game();
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}

function update() {
}

function render() {
    context.drawImage(background, 0, 0, 700, 400);
}

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();