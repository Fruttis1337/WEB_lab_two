class Bullet {
    constructor(x, y, dx) {
        this.x = x;
        this.y = y;
        this.dx = dx;
    }

    draw() {
        var bullet = new Image();
        bullet.src = 'Images/bullet.png'
        context.drawImage(bullet, this.x, this.y, 15, 15);
    }

    move() {
        this.x += this.dx;
    }

    went_abroad() {
        return this.x > 900;
    }

    hit_item_or_enemy(object) {
        return (this.x + 15 >= object.x && this.x <= object.x + 80) && (this.y + 15 >= object.y && this.y <= object.y + 80);
    }

    hitEnimy(enemy){
        return this.hit_item_or_enemy(enemy)
    }

    colide() {
        var self = this;
        var collided = false;
        enemies.forEach((enemy, i) => {
            if (self.hitEnimy(enemy)) {
                delete enemies[i];
                enemy_count--;
                enemy_kills++;
                collided = true;
                current_score += 25;
                console.log("shoot enemy")
            }
        })
        enemies = enemies.filter(item => item !== undefined);
    }
}