class Character extends MovableObject {

    height = 300;
    y = 130;
    speed = 6;

    
    world; // Allows access to variables from World, including keyboard
    walking_sound = new Audio('../audio/running_looped.mp3');
    jumping_sound = new Audio('../audio/jump3.mp3');
    isAnimatingDead = false;
    idleTime = 0;
    idleInterval = null;
    sleepAnimationInterval = null;
    previousX = 0;
    previousY = 0;



    /**
     * Creates an instance of Character.
     * Loads the initial image, walking and jumping animations, 
     * applies gravity and starts the animation.
     */
    constructor() {
        super().loadImage(CHARACTER_IMAGES.IMAGES_IDLE[0]); // Calls the function of the parent class (MovableObject)
        this.loadImages(CHARACTER_IMAGES.IMAGES_IDLE);
        this.loadImages(CHARACTER_IMAGES.IMAGES_SLEEP);
        this.loadImages(CHARACTER_IMAGES.IMAGES_WALKING);
        this.loadImages(CHARACTER_IMAGES.IMAGES_JUMPING);
        this.loadImages(CHARACTER_IMAGES.IMAGES_HURT);
        this.loadImages(CHARACTER_IMAGES.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * This method starts the character's movement and animation loops.
     */
    animate() {
        this.checkCharacterDead();
        this.startCharacterMovement();
        this.checkCharacterJumping();
        this.checkCharacterWalking();
        this.checkCharacterHurt();
    }


    /**
    * This method starts the idle animation.
    */
    startIdleAnimation() {
        if (!this.isDead() && !this.idleAnimationInterval) {
            const idleFrameDuration = 2500 / CHARACTER_IMAGES.IMAGES_IDLE.length;
            this.idleAnimationInterval = setInterval(() => {
                this.playAnimation(CHARACTER_IMAGES.IMAGES_IDLE);
            }, idleFrameDuration);
        }
    }

    /**
     * This method stops the idle animation.
     */
    stopIdleAnimation() {
        if (this.idleAnimationInterval) {
            clearInterval(this.idleAnimationInterval);
            this.idleAnimationInterval = null;
        }
    }


    /**
    * This method starts the sleeping animation.
    */
    startSleepingAnimation() {
        if (!this.isDead() && !this.sleepAnimationInterval) {
            const sleepFrameDuration = 1500 / CHARACTER_IMAGES.IMAGES_SLEEP.length;
            this.sleepAnimationInterval = setInterval(() => {
                this.playAnimation(CHARACTER_IMAGES.IMAGES_SLEEP);
            }, sleepFrameDuration);
        }
    }


    /**
     * This method stops the sleeping animation.
     */
    stopSleepingAnimation() {
        if (this.sleepAnimationInterval) {
            clearInterval(this.sleepAnimationInterval);
            this.sleepAnimationInterval = null;
        }
    }


    /**
    * This method checks the character's status at regular intervals and initiates 
    * the death animation if the character is dead.
    */
    checkCharacterDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.animateCharacterDead();
            }
        }, 100);
    }


    /**
    * This method starts the character's movement at a regular interval.
    */
    startCharacterMovement() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);
    }


    /**
    * This method checks if the character is jumping at regular intervals and initiates 
    * the jumping animation if the character is above ground.
    */
    checkCharacterJumping() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.animateCharacterJumping();
            }
        }, 160);
    }


    /**
    * This method checks if the character is walking at regular intervals and initiates 
    * the walking animation if the character is on the ground.
    */
    checkCharacterWalking() {
        setInterval(() => {
            if (!this.isAboveGround()) {
                this.animateCharacterWalking();
            }
        }, 80);
    }


    /**
    * This method checks if the character is hurt at regular intervals and initiates 
    * the injury animation if the character is hurt.
    */
    checkCharacterHurt() {
        setInterval(() => {
            if (this.isHurt()) {
                this.animateCharacterHurt();
            }
        }, 100);
    }


    /**
     * This method plays the walking sound.
     */
    playWalkingSound() {
        if (this.walking_sound.paused) {
            this.walking_sound.currentTime = 0;
            this.walking_sound.play();
        }
    }


    /**
     * This method pauses the walking sound.
     */
    pauseWalkingSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }


    /**
     * This method plays the jumping sound.
     */
    playJumpingSound() {
        this.jumping_sound.currentTime = 0;
        this.jumping_sound.play();
    }


    /**
     * This method handles the walking sound based on the character's walking state.
     * @param {boolean} isWalking - Whether the character is walking.
     */
    handleWalkingSound(isWalking) {
        if (isWalking && !this.isAboveGround()) {
            this.playWalkingSound();
        } else {
            this.pauseWalkingSound();
        }
    }


    /**
     * This method moves the character based on keyboard input.
     * It updates the character's position and handles the walking sound
     * and starts/stops the idle/sleep animation.
     */
    moveCharacter() {
        let isWalking = false; 
        this.previousX = this.x;
        this.previousY = this.y;
        if (this.shouldWalkRight()) {
            isWalking = this.characterWalkRight();
        }
        if (this.shouldWalkLeft()) { // this.x > 0 prevents character from walking further left when canvas ends
            isWalking = this.characterWalkLeft();
        }
        if (this.shouldJump()) {
            this.characterJump();
        }
        this.updateCameraPosition();
        this.handleWalkingSound(isWalking);

        if (!this.isDead() && !this.isHurt() && this.x === this.previousX && this.y === this.previousY) {
            this.idleTime += 1;
            if (this.idleTime >= 330) { 
                this.stopIdleAnimation();
                this.startSleepingAnimation();
            } else {
                this.startIdleAnimation();
            }
        } else {
            this.idleTime = 0;
            this.stopIdleAnimation();
            this.stopSleepingAnimation();
        }
    }


    /**
     * This method updates the camera position based on the characters position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100; // Positioning of character 100px further right
    }


    /**
    * This method determines if the character should walk right based on keyboard input.
    * @returns {boolean} - Returns true if the character should walk right, otherwise false.
    */
    shouldWalkRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
    * This method moves the character to the right.
    * @returns {boolean} - Returns true indicating the character is walking.
    */
    characterWalkRight() {
        this.moveRight();
        this.otherDirection = false;
        return true;
    }


    /**
    * This method determines if the character should walk left based on keyboard input.
    * @returns {boolean} - Returns true if the character should walk left, otherwise false.
    */
    shouldWalkLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
    * This method moves the character to the left.
    * @returns {boolean} - Returns true indicating the character is walking.
    */
    characterWalkLeft() {
        this.moveLeft();
        this.otherDirection = true;
        return true;
    }


    /**
    * This method determines if the character should jump based on keyboard input.
    * @returns {boolean} - Returns true if the character should jump, otherwise false.
    */
    shouldJump() {
        return this.world.keyboard.UP && !this.isAboveGround(); // keyboard up & is NOT above ground
    }


    /**
     * This method makes the character jump and plays the jumping sound.
     */
    characterJump() {
        this.jump();
        this.playJumpingSound();
        this.currentImage = 0;
    }


    /**
     * This method plays the character's walking animation.
     */
    animateCharacterWalking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_WALKING);
        }
    }


    /**
     * This method plays the character's jumping animation.
     */
    animateCharacterJumping() {
        if (this.isAboveGround()) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_JUMPING);
        }
    }


    /**
     * This method plays the character's injury animation.
     */
    animateCharacterHurt() {
        if (this.isHurt()) {
            this.playAnimation(CHARACTER_IMAGES.IMAGES_HURT);
        }
    }


    /**
     * This method plays the character's death animation once and then stops.
     */
    animateCharacterDead() {
        if (!this.isAnimatingDead) {
            this.isAnimatingDead = true;
            let i = 0;
            const interval = setInterval(() => {
                if (i < CHARACTER_IMAGES.IMAGES_DEAD.length) {
                    let path = CHARACTER_IMAGES.IMAGES_DEAD[i];
                    this.img = this.imageCache[path];
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 200);
        }
    }


}