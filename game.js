var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var background = new Image();
background.src = 'Images/forest.png';


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