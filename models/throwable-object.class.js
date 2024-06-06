class ThrowableObject extends MovableObject {

    height = 90;
    width = 90;

    constructor() {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = 350;
        this.y = 350;
        this.throw(150, 150);
    }


    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speed_y = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}