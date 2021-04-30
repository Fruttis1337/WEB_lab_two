class Obstacle{
    constructor(x, y, dx) {
        this.x = x;
        this.y = y;
        this.dx =dx;
    }
    draw(){
        var obstacle = new Image();
        obstacle.src = 'Images/obstacle.png'
        context.drawImage(obstacle, this.x, this.y, 13, 13);
    }
    move(){
        this.x -= this.dx;
    }
    went_abroad(){
        return this.x < 0;
    }
}