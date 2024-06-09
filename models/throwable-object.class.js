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
    * @param {MovableObject} character - The character throwing the object.
    */
    constructor(x, y, character) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.character = character;
        this.throw();
    }


    /**
    * This method initiates the throw action.
    * It sets the initial vertical speed and applies gravity.
    * It moves the object to the right at a fixed interval.
    */
    throw() {
        if (this.character.amountBottles > 0) {
            this.character.amountBottles --;
            this.speed_y = 28;
            this.applyGravity();
            this.animateBottleInterval = setInterval(() => {
                this.animateBottle();
            }, 80);
            this.moveBottleInterval = setInterval(() => {
                this.x += 8;
            }, 25);
            this.collisionCheckInterval = setInterval(() => {
                this.checkGroundCollision();
            }, 1000 / 25);
            console.log('amountBottles:', this.character.amountBottles)
       } else {
            console.log('no more bottles to throw');
        }

    }


    /**
    * This method plays the bottle animation.
    */
    animateBottle() {
        this.playAnimation(this.IMAGES_BOTTLE);
    }


    /**
    * This method plays the bottle splash animation.
    */
    animateBottleSplash() {
        this.currentImage = 0;
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 166);
    }


    /**
    * This method checks for collisions with the ground.
    */
    checkGroundCollision() {
        if (this.isCollidingWithGround()) {
            this.onHitGround();
        }
    }


    /**
    * This method checks for collisions with enemies.
    */
    checkBottleCollision(enemies, endboss) {
        if (enemies && enemies.length > 0) {
            enemies.forEach((enemy) => {
                if (this.isColliding(enemy) && this.isCollidingTop(enemy)) {
                    this.onHitEnemy(enemy);
                }
            });
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
    * Sets the world reference for this throwable object.
    * @param {World} world - The world instance to which this object belongs.
    */
    setWorld(world) {
        this.world = world;
        this.groundLevel = world.groundLevel;
    }


    /**
    * This method destroys the throwable object.
    * It stops the bottle animation and plays the splash animation.
    */
    destroy() {
        clearInterval(this.animateBottleInterval);
        clearInterval(this.gravityInterval);
        clearInterval(this.moveBottleInterval);
        clearInterval(this.collisionCheckInterval);
        this.animateBottleSplash();
        const self = this;
        setTimeout(() => {
            self.removeFromWorld();
        }, 1000);
    }


    /**
    * Removes this throwable object from the world.
    * Checks if the world is defined, and if so, removes this object from the world's list of throwable objects.
    */
    removeFromWorld() {
        if (this.world) {
            this.world.removeThrowableObject(this);
        }
    }


}