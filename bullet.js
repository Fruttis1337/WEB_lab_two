class Bullet {
    constructor(x, y, dx) {
        this.x = x;
        this.y = y;
        this.dx = dx;
    }

    draw() {
        var bullet = new Image();
        bullet.src = 'Images/bullet.png'
        context.drawImage(bullet, this.x, this.y, 13, 13);
    }

    move() {
        this.x += this.dx;
    }

    went_abroad() {
        return this.x > 700;
    }

    hit_item_or_enemy(object) {
        return (this.x + 13 >= object.x && this.x <= object.x + 75) && (this.y + 13 >= object.y && this.y <= object.y + 75);
    }

    colide() {
        var self = this;
        var collided = false;
        enemy.forEach(function (enemy, i) {
            if (self.hit_item_or_enemy(enemy)) {
                delete enemys[i];
                enemy_count--;
                enemy_kills++;
                collided = true;
                current_score += 25;
            }
        });
        enemys = enemys.filter(item => item !== undefined);
    }
}