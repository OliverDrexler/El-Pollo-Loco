class Character extends MovableObject {

    height = 300;
    y = 130;
    speed = 6;

    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        /*'../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',*/
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        /*'../img/2_character_pepe/3_jump/J-39.png'*/
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];

    world; // Allows access to variables from World, including keyboard
    isIdle = false;
    walking_sound = new Audio('../audio/running_looped.mp3');
    jumping_sound = new Audio('../audio/jump3.mp3');
    isAnimatingDead = false;
    


    /**
     * Creates an instance of Character.
     * Loads the initial image, walking and jumping animations, 
     * applies gravity and starts the animation.
     */
    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png'); // Calls the function of the parent class (MovableObject)
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
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
     * It updates the character's position and handles the walking sound.
     */
    moveCharacter() {
        let isWalking = false;
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
    * This method plays the character's idle time animation if no movement keys are pressed.
    */
    animateCharacterIdleTime() {
        

    }


    /**
     * This method plays the character's sleeping animation.
     */
    animateCharacterSleeping() {

    }


    /**
     * This method plays the character's walking animation.
     */
    animateCharacterWalking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * This method plays the character's jumping animation.
     */
    animateCharacterJumping() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }


    /**
     * This method plays the character's injury animation.
     */
    animateCharacterHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
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
                if (i < this.IMAGES_DEAD.length) {
                    let path = this.IMAGES_DEAD[i];
                    this.img = this.imageCache[path];
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 200);
        }
    }


}