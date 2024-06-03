class Character extends MovableObject {

    height = 300;
    y = 130; 
    speed = 6;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ]
    world; // Allows access to variables from World, including keyboard
    walking_sound = new Audio('../audio/running_looped.mp3');
    jumping_sound = new Audio('../audio/jump3.mp3');


    /**
     * Creates an instance of Character.
     * Loads the initial image, walking and jumping animations, 
     * applies gravity and starts the animation.
     */
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png'); // Calls the function of the parent class (MovableObject)
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
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
     * This method moves the character based on keyboard input.
     * It updates the character's position and handles the walking sound.
     */
    moveCharacter() {
        let isWalking = false;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            isWalking = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) { // this.x > 0 prevents character from walking further left when canvas ends
            this.moveLeft();
            this.otherDirection = true;
            isWalking = true;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) { // keyboard up & is NOT above ground
            this.jump();
            this.playJumpingSound();
        }
        this.world.camera_x = -this.x + 100; // Positioning of character 100px further right
        this.handleWalkingSound(isWalking);
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
         * This method starts the character's movement and animation loops.
         * It dynamically adjusts the animation speed based on whether 
         * the character is in the air.
         */
        animate() {
            setInterval(() => {
                this.moveCharacter();
            }, 1000 / 60);

            setInterval(() => {
                if (this.isAboveGround()) {
                    this.animateCharacterJumping();
                } else {
                    this.animateCharacterWalking();
                }
            }, this.isAboveGround() ? 142 : 80);
        }



    }