function include(url) {
    var script = document.createElement('script')
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}

include("player.js")
include("enemy.js")
include("bullet.js")
include("obstacle.js")
include("boss.js")

var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
document.addEventListener("keydown", keyPress)
document.addEventListener("keyup", keyPressed)
canvas.addEventListener("mousemove", checkPosition)
var fadeId = 0


context.font = "30px Arial"

var state_of_screen = 0
var mode_of_move = 0
var Img = new Image()
var z = 0
var current_score = 0
var best_score = 0

Img.src = "Images/player.png"

var enemies = []
var enemy_count = 0
var enemy_kills = 0
var bosshp = -1

var bullets = []
var obstacles = []
var bossObject

function spawnEnemy() {
    enemy_x = 900
    enemy_y = Math.random() * 525
    enemy_dx = Math.random(-45) * -20
    enemy_dy = Math.random(-10) * 10
    var enemy = new Enemy(enemy_x, enemy_y, enemy_dx, enemy_dy)
    enemies.push(enemy)
}

function spawnBoss() {
    bosshp = 60
    boss_x = 900
    boss_y = 450
    boss_dx = -10
    boss_dy = -10
    bossObject = new Boss(boss_x, boss_y, boss_dx, boss_dy)
}

function spawnBullets() {
    var bullet_x = playerObject.x + 75
    var bullet_y = playerObject.y + 75 / 2 - 5 / 2
    var bullet_dx = 15

    var bulletObject = new Bullet(bullet_x, bullet_y, bullet_dx);

    bullets.push(bulletObject)
}

function spawnObstacles(coord_enemy_x, coord_enemy_y) {
    var obstacle_x = coord_enemy_x
    var obstacle_y = coord_enemy_y + 75 / 2
    var obstacle_dx = 10

    var obstacleObject = new Obstacle(obstacle_x, obstacle_y, obstacle_dx);

    obstacles.push(obstacleObject)
}

var kd = 0

var player_param = {x: 100, y: 300, dx: 10, dy: 10}
var playerObject = new Player(player_param.x, player_param.y, player_param.dx, player_param.dy)
var playerHp = 3

var timer = 0
var god_timer = 0

var background = new Image()
background.src = 'Images/forest.png'
game_spped = 0

var enemyView = new Image()
enemyView.src = 'Images/enemy.png'

var controlView = new Image()
var mouse = new Image()
var keyboard = new Image()
var gameover = new Image()
var menu = new Image()
var course = new Image()

controlView.src = 'Images/control.png'
mouse.src = 'Images/mouse.png'
keyboard.src = 'Images/keyboard1.png'
gameover.src = 'Images/gameover.png'
menu.src = 'Images/mainmenu.png'
course.src = 'Images/motobike.png'

var buttonX = [250, 250, 250]
var buttonY = [200, 320, 390]
var buttonW = [549, 577, 403]
var buttonH = [90, 63, 63]

var leftPress = false
var rightPress = false
var upPress = false
var downPress = false
var spacePress = false

const LEFT_KEY = 37
const RIGHT_KEY = 39
const UP_KEY = 38
const DOWN_KEY = 40
const SPACE_KEY = 32

function shot() {
    if (kd <= 0) {
        spawnBullets();
        kd = 20;
    }
}

function keyPress(key) {
    if (key.keyCode == LEFT_KEY && mode_of_move == 1) {
        leftPress = true
    }
    if (key.keyCode == RIGHT_KEY && mode_of_move == 1) {
        rightPress = true
    }
    if (key.keyCode == UP_KEY && mode_of_move == 1) {
        upPress = true
    }
    if (key.keyCode == DOWN_KEY && mode_of_move == 1) {
        downPress = true
    }
    if (key.keyCode == SPACE_KEY && mode_of_move == 1) {
        shot()
        spacePress = true
    }
}


function keyPressed(key) {
    if (key.keyCode == LEFT_KEY && mode_of_move == 1) {
        leftPress = false
    }
    if (key.keyCode == RIGHT_KEY && mode_of_move == 1) {
        rightPress = false
    }
    if (key.keyCode == UP_KEY && mode_of_move == 1) {
        upPress = false
    }
    if (key.keyCode == DOWN_KEY && mode_of_move == 1) {
        downPress = false
    }
    if (key.keyCode == SPACE_KEY && mode_of_move == 1) {
        spacePress = false
    }
}

canvas.addEventListener('click', function (event) {
    if (mouseX > buttonX[1] && mouseX < buttonX[1] + buttonW[1] && mouseY > buttonY[1] && mouseY < buttonY[1] + buttonH[1] && state_of_screen == 0) {
        state_of_screen = 1
        mode_of_move = 1
    } else if (mouseX > buttonX[2] && mouseX < buttonX[2] + buttonW[2] && mouseY > buttonY[2] && mouseY < buttonY[2] + buttonH[2] && state_of_screen == 0) {
        state_of_screen = 1
        mode_of_move = 2
        document.getElementById('game').style.cursor = "none"
    } else if (mouseX > 300 && mouseX < 300 + 373 && mouseY > 420 && mouseY < 420 + 63 && state_of_screen == 2) {
        state_of_screen = 0
        mode_of_move = 0
    }
})

function playerMove() {
    if (mode_of_move == 1) {
        if (leftPress && playerObject.x - playerObject.dx >= 0) {
            playerObject.x -= playerObject.dx
        }
        if (rightPress && playerObject.x + playerObject.dx <= 825) {
            playerObject.x += playerObject.dx
        }
        if (upPress && playerObject.y - playerObject.dy >= 0) {
            playerObject.y -= playerObject.dy
        }
        if (downPress && playerObject.y + playerObject.dy <= 525) {
            playerObject.y += playerObject.dy
        }
    }
    if (mode_of_move == 2) {
        playerObject.x = mouseX - 75 / 2
        playerObject.y = mouseY - 75 / 2
    }
}

function enemyMove() {
    if (god_timer > 0) {
        god_timer--
    }
    timer++
    if (timer % 20 == 0 && enemy_count < 30 && enemy_kills <= 60 && god_timer == 0) {
        spawnEnemy()
        enemy_count++
    }

    for (i in enemies) {
        if (timer % 30 == 0) {
            spawnObstacles(enemies[i].x, enemies[i].y)
        }
        enemies[i].move()
        if (enemies[i].x <= 0) {
            enemies[i].x = 900
            enemies[i].y = Math.random() * 525
        }
        if (enemies[i].y >= 525 || enemies[i].y < 0) enemies[i].dy = -enemies[i].dy

        if (enemies[i].y + 75 > playerObject.y + 75 / 2 && enemies[i].y < playerObject.y + 75 - 75 / 2 && enemies[i].x + 75 > playerObject.x + 75 / 2 + 3 && enemies[i].x < playerObject.x + 75 - (75 / 2 + 3)) {
            god_timer = 180
            playerHp--
            current_score -= 50
            enemies.forEach((enemy, i) => {
                delete enemies[i]
                enemy_count--
            })
            obstacles.forEach((obstacle, i) => {
                delete obstacles[i]
            })
            enemies = enemies.filter(item => item !== undefined)
            obstacles = obstacles.filter(item => item !== undefined)
            if (mode_of_move == 1) {
                playerObject.x = 100
                playerObject.y = 300
            }
        }
    }
    game_spped += 4
}

function bossMove() {
    if (timer % 25 == 0 && god_timer == 0) {
        spawnObstacles(bossObject.x, bossObject.y)
        spawnObstacles(bossObject.x + 50, bossObject.y + 50)
        spawnObstacles(bossObject.x - 50, bossObject.y - 50)
        spawnObstacles(bossObject.x + 100, bossObject.y + 100)
        spawnObstacles(bossObject.x - 100, bossObject.y - 100)

    }
    bossObject.move()
    if (bossObject.x <= 500 || bossObject.x > 900) bossObject.dx = -bossObject.dx
    if (bossObject.x >= 525 || bossObject.x < 0) bossObject.dy = -bossObject.dy
    if (bossObject.y + 200 > playerObject.y + 75 / 2 && bossObject.y < playerObject.y + 75 - 75 / 2 && bossObject.x + 200 > playerObject.x + 75 / 2 + 3 && bossObject.x < playerObject.x + 75 - (75 / 2 + 3)) {
        god_timer = 180
        playerHp--
        current_score -= 50
        obstacles.forEach((obstacle, i) => {
            delete obstacles[i]
        })
        obstacles = obstacles.filter(item => item !== undefined)
        if (mode_of_move == 1) {
            playerObject.x = 100
            playerObject.y = 300
        }
    }
}

function obstacleMove() {
    for (i in obstacles) {
        obstacles[i].move()
        if (obstacles[i].went_abroad()) {
            delete obstacles[i]
            current_score++
        } else if (obstacles[i].y + 13 > playerObject.y + 75 / 2 && obstacles[i].y < playerObject.y + 75 - 75 / 2 && obstacles[i].x + 20 > playerObject.x + 75 / 2 + 3 && obstacles[i].x < playerObject.x + 75 - 75 / 2 + 3) {
            god_timer = 180
            playerHp--
            current_score -= 50
            enemies.forEach((enemy, i) => {
                delete enemies[i]
                enemy_count--
            })
            obstacles.forEach((obstacle, i) => {
                delete obstacles[i]
            })
        }
    }
    enemies = enemies.filter(item => item !== undefined)
    obstacles = obstacles.filter(item => item !== undefined)
}

function bulletsMove() {
    if (kd > 0) {
        kd--
    }
    for (i in bullets) {
        bullets[i].move()
        if (bullets[i].went_abroad() || bullets[i].colide()) {
            delete bullets[i]
        } else if (bosshp > -1 && bullets[i].x + 15 >= bossObject.x && bullets[i].x <= bossObject.x + 200 && bullets[i].y + 15 >= bossObject.y && bullets[i].y <= bossObject.y + 75) {
            delete bullets[i]
            current_score += 10
            bosshp--
        }
    }
    bullets = bullets.filter(item => item !== undefined)
}

background.onload = function () {
    context.drawImage(background, game_spped, 0, 600, 399, 0, 0, 900, 600)
    game()
}

function checkPosition(mouseEvent) {
    mouseX = mouseEvent.pageX - this.offsetLeft
    mouseY = mouseEvent.pageY - this.offsetTop
}


function game() {
    update()
    render()
    requestAnimFrame(game)
}

function update() {
    if (state_of_screen == 0) {
        current_score = 0
    }
    if (state_of_screen == 1) {
        if (mode_of_move == 2) {
            shot()
        }
        if (enemy_kills > 60 && bosshp == -1) {
            spawnBoss()
            enemies.forEach((enemy, i) => {
                delete enemies[i]
            })
            enemies = enemies.filter(item => item !== undefined)
        }
        if (bosshp > -1) {
            bossMove()
        }
        playerMove()
        enemyMove()
        bulletsMove()
        obstacleMove()
    }
    if (playerHp == 0 || bosshp == 0) {
        state_of_screen = 2
        document.getElementById('game').style.cursor = "default"
    }
    if (state_of_screen == 2) {
        if (current_score > best_score) {
            best_score = current_score
        }
        playerHp = 3
        enemy_kills = 0
        bosshp = -1
    }
}

function render() {
    context.clearRect(0, 0, 900, 600)
    context.drawImage(background, game_spped, 0, 600, 399, 0, 0, 900, 600)
    if (game_spped >= 600) {
        game_spped = 1
    }
    if (state_of_screen == 0) {
        context.drawImage(controlView, buttonX[0], buttonY[0])
        context.drawImage(keyboard, buttonX[1], buttonY[1])
        context.drawImage(mouse, buttonX[2], buttonX[2])
        context.fillText("Best score :" + best_score, 50, 50)
    }
    if (state_of_screen == 1) {
        for (i in enemies) enemies[i].draw()
        for (i in bullets) bullets[i].draw()
        for (i in obstacles) obstacles[i].draw()
        z++
        if (z >= 75) {
            z = 0
        }
        playerObject.draw(Math.floor(z / 5))
        context.fillText("score :" + current_score, 50, 50)
        if (bosshp > -1) {
            bossObject.draw()
        }
    }
    if (state_of_screen == 2) {
        context.drawImage(gameover, 300, 200)
        context.fillText("Your score :" + current_score, 300, 350)
        context.fillText("Best score :" + best_score, 300, 400)
        context.drawImage(menu, 300, 420)
    }
}

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimatoinFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();