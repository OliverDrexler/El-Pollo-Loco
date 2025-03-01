class Character extends MovableObject {

    height = 300;
    y = 130;
    offsetYTop = 110;
    offsetX = 20;
    speed = 6;
    world; // Allows access to variables from World, including keyboard
    isPlayingHurtingSound = false;
    isAnimatingDead = false;
    idleTime = 0;
    idleInterval = null;
    sleepAnimationInterval = null;
    previousX = 0;
    previousY = 0;
    amountBottles = 0;


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
     * the injury animation and hurting sound, if the character is hurt.
     */
    checkCharacterHurt() {
        setInterval(() => {
            if (this.isHurt()) {
                this.animateCharacterHurt();
                this.playHurtSound();
            }
        }, 100);
    }


    /**
     * This method plays the character's death animation once and then stops.
     */
    animateCharacterDead() {
        if (!this.isAnimatingDead) {
            this.handleDeathAnimation();
        }
    }


    /**
     * This method handles the death animation sequence.
     */
    handleDeathAnimation() {
        this.isAnimatingDead = true;
        let i = 0;
        const interval = setInterval(() => {
            this.updateDeathFrame(interval, i);
            i++;
        }, 200);
    }

    
    /**
     * This method updates the frame for the death animation.
     * @param {number} interval - The interval ID for clearing.
     * @param {number} frameIndex - The current frame index.
     */
    updateDeathFrame(interval, frameIndex) {
        if (frameIndex < CHARACTER_IMAGES.IMAGES_DEAD.length) {
            let path = CHARACTER_IMAGES.IMAGES_DEAD[frameIndex];
            this.img = this.imageCache[path];
        } else {
            clearInterval(interval);
        }
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
     * This method plays the hurt sound.
     */
    playHurtSound() {
        if (!isMuted && !this.isPlayingHurtSound) {
            hurt_sound.currentTime = 0;
            hurt_sound.play();
            this.isPlayingHurtSound = true;
            hurt_sound.onended = () => {
                this.isPlayingHurtSound = false;
            };
        }
    }


    /**
     * This method moves the character based on keyboard input.
     * It updates the character's position and handles the walking sound
     * and starts/stops the idle/sleep animation.
     */
    moveCharacter() {
        let isWalking = false;
        this.savePreviousPosition();
        isWalking = this.processMovement();
        if (this.shouldJump()) {
            this.characterJump();
        }
        this.updateCameraPosition();
        this.handleWalkingSound(isWalking);
        this.handleIdleAndSleepAnimation();
    }


    /**
     * This method saves the previous position of the character.
     */
    savePreviousPosition() {
        this.previousX = this.x;
        this.previousY = this.y;
    }


    /**
     * This method processes the characters movement to the left or right.
     * @returns {boolean} - Returns true if the character is walking.
     */
    processMovement() {
        let isWalking = false;
        if (this.shouldWalkRight()) {
            isWalking = this.characterWalkRight();
        }
        if (this.shouldWalkLeft()) { // this.x > 0 prevents character from walking further left when canvas ends
            isWalking = this.characterWalkLeft();
        }
        return isWalking;
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
     * This method plays the walking sound.
     */
    playWalkingSound() {
        if (!isMuted && walking_sound.paused) {
            walking_sound.currentTime = 0;
            walking_sound.play();
        }
    }


    /**
     * This method pauses the walking sound.
     */
    pauseWalkingSound() {
        if (!walking_sound.paused) {
            walking_sound.pause();
            walking_sound.currentTime = 0;
        }
    }


    /**
     * This method plays the jumping sound.
     */
    playJumpingSound() {
        if (!isMuted) {
            jumping_sound.currentTime = 0;
            jumping_sound.play();
        }
    }


    /**
     * This method handles the logic for starting and stopping the idle and sleep animations.
     * It checks if the character is idle and increments the idle time.
     * If the idle time exceeds a certain threshold, it starts the sleep animation.
     * Otherwise, it starts the idle animation.
     */
    handleIdleAndSleepAnimation() {
        if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && this.x === this.previousX && this.y === this.previousY) {
            this.idleTime += 1;
            if (this.idleTime >= 500) {
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
     * This method stops the idle animation.
     */
    stopIdleAnimation() {
        if (this.idleAnimationInterval) {
            clearInterval(this.idleAnimationInterval);
            this.idleAnimationInterval = null;
        }
    }


    /**
     * This method starts the sleeping animation and initiates the sleeping sound.
     */
    startSleepingAnimation() {
        if (!this.isDead() && !this.sleepAnimationInterval) {
            const sleepFrameDuration = 1500 / CHARACTER_IMAGES.IMAGES_SLEEP.length;
            this.currentImage = 0;
            this.sleepAnimationInterval = setInterval(() => {
                this.playAnimation(CHARACTER_IMAGES.IMAGES_SLEEP);
            }, sleepFrameDuration);
            this.playSleepingSound();
        }
    }


    /**
     * This method starts the idle animation.
     */
    startIdleAnimation() {
        if (!this.isDead() && !this.idleAnimationInterval) {
            const idleFrameDuration = 2500 / CHARACTER_IMAGES.IMAGES_IDLE.length;
            this.currentImage = 0;
            this.idleAnimationInterval = setInterval(() => {
                this.playAnimation(CHARACTER_IMAGES.IMAGES_IDLE);
            }, idleFrameDuration);
        }
    }


    /**
     * This method stops the sleeping animation and the sleeping sound.
     */
    stopSleepingAnimation() {
        if (this.sleepAnimationInterval) {
            clearInterval(this.sleepAnimationInterval);
            this.sleepAnimationInterval = null;
            this.pauseSleepingSound();
        }
    }


    /**
     * This method plays the sleeping sound of the character.
     */
    playSleepingSound() {
        if (!isMuted) {
            snoring_sound.currentTime = 0;
            snoring_sound.loop = true;
            snoring_sound.play();
        }
    }


    /**
     * This method stops the sleeping sound of the character.
     */
    pauseSleepingSound() {
        snoring_sound.pause();
        snoring_sound.currentTime = 0;
    }

}