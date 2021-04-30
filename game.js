var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var background = new Image();
background.src = 'Images/forest.png';

background.onload = function(){
    context.drawImage(background, 0, 0, 600, 600)
}
