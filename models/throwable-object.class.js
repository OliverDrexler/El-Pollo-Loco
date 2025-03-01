class ThrowableObject extends MovableObject {

    height = 90;
    width = 90;
    throwInitiated = false;
    hitEndboss = false;

    IMAGES_BOTTLE = [
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Creates an instance of a ThrowableObject.
     * Loads the initial image and sets the initial position.
     * Initiates the throw action if there are enough bottles.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     * @param {MovableObject} character - The character throwing the object.
     */
    constructor(x, y, character) {
        super().loadImage('https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.character = character;
        this.initiateThrow();
    }


    /**
     * This method checks, if the character has bottles to throw 
     * and initiates the throw action
     */
    initiateThrow() {
        if (this.character.amountBottles > 0) {
            this.throwInitiated = true;
            this.throw();
        }
    }


    /**
     * This method initiates the throw action.
     * It sets the initial vertical speed and applies gravity.
     * It moves the object to the right at a fixed interval.
     */
    throw() {
        this.character.amountBottles--;
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
     * This method checks for collisions between the bottle and enemies.
     * If the bottle collides with an enemy or the endboss, it handles 
     * the collision accordingly.
     * @param {Array<Object>} enemies - An array of enemy objects to check for collisions.
     */
    checkBottleCollision(enemies) {
        if (enemies && enemies.length > 0) {
            enemies.forEach((enemy) => {
                if (this.isColliding(enemy) || this.isCollidingTop(enemy)) {
                    this.handleCollision(enemy);
                }
            });
        }
    }


    /**
     * This method handles the collision with an enemy or the endboss.
     * @param {Object} enemy - The enemy object that the bottle collided with.
     */
    handleCollision(enemy) {
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision(enemy);
        } else {
            this.onHitEnemy(enemy);
        }
    }


    /**
     * This method handles the collision with the endboss.
     * It ensures the endboss is only hit once per bottle.
     * @param {Endboss} endboss - The endboss object that the bottle collided with.
     */
    handleEndbossCollision(endboss) {
        if (!this.hitEndboss) {
            this.hitEndboss = true;
            this.onHitEndboss(endboss);
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
        this.playSplashingBottleSound();
        const self = this;
        setTimeout(() => {
            self.removeFromWorld();
        }, 1000);
    }


    /**
     * Removes this throwable object from the world.
     * Checks if the world is defined, and if so, removes this 
     * object from the world's list of throwable objects.
     */
    removeFromWorld() {
        if (this.world) {
            this.world.removeThrowableObject(this);
        }
    }


    /**
     * This method plays the smashing bottle sound.
     */
    playSplashingBottleSound() {
        if (!isMuted) {
            splashing_bottle_sound.currentTime = 0;
            splashing_bottle_sound.play();
        }
    }

}