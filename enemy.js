class Enemy {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        var enemy = new Image();
        enemy.src = 'Images/enemy.png';
        context.drawImage(enemy, this.x, this.y, 80, 80);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}