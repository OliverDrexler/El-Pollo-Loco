class ThrowableObject extends MovableObject {

    height = 90;
    width = 90;

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
    * Creates an instance of a ThrowableObject.
    * Loads the initial image and sets the initial position.
    * Initiates the throw action.
    * @param {number} x - The initial x position of the object.
    * @param {number} y - The initial y position of the object.
    */
    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }


    /**
    * This method initiates the throw action.
    * It sets the initial vertical speed and applies gravity.
    * It moves the object to the right at a fixed interval.
    */
    throw() {
        this.speed_y = 28;
        this.applyGravity();
        setInterval(() => {
            this.animateBottle();
        }, 80);
        setInterval(() => {
            this.x += 8;
        }, 25);
    }


    /**
    * This method plays the bottle animation.
    */
    animateBottle() {
        this.playAnimation(this.IMAGES_BOTTLE);
    }


    animateBottleSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
    }


    /**
    * This method checks for collisions with enemies or the ground.
    */
    checkCollision(enemies, endboss) {
        enemies.forEach((enemy) => {
            if (this.isColliding(enemy) && this.isCollidingTop(enemy)) {
                this.onHitEnemy(enemy);
            }
        });
        if (this.isColliding(endboss)) {
            this.onHitEndboss(endboss);
        }
        if (this.isCollidingBottom()) {
            this.onHitGround();
        }
    }


    /**
    * This method handles the collision with an enemy.
    * @param {MovableObject} enemy - The enemy that was hit.
    */
    onHitEnemy(enemy) {
        enemy.die();
        this.destroy();
    }

    /**
    * This method handles the collision with the endboss.
    * @param {MovableObject} endboss - The endboss that was hit.
    */
    onHitEndboss(endboss) {
        endboss.takeDamage();
        this.destroy();
    }

    /**
    * This method handles the collision with the ground.
    */
    onHitGround() {
        this.destroy();
    }

    /**
    * This method destroys the throwable object.
    */
    destroy() {
        // Logic to remove the object from the game
        //clearInterval(this.animateInterval);
        //clearInterval(this.moveInterval);
        //this.world.removeThrowableObject(this);
        this.animateBottleSplash();
    }
}