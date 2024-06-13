class Endboss extends MovableObject {

    height = 420;
    width = 280;
    y = 30;
    offsetYTop = 110;
    offsetX = 40;

    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    onCollisionCourse = true;
    animationPhase = 0;
    currentImageIndex = 0;
    currentImages = this.IMAGES_ALERT;
    speed = 5;
    isCharacterNearby = false;
    endboss_theme = new Audio ('../audio/ingame_music_endboss.mp3');
    hurt_sound = new Audio('../audio/endboss_hurt.mp3');
    isDead = false;
    energy = 100;
    isHurt = false;


    /**
     * Creates an instance of BossEnemy.
     * Loads the initial image and the walking animation images 
     * and sets the initial position.
     */
    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4600;
    }


    /**
     * This method starts checking the characters position.
     * If the character is close enough, it starts the animation.
     */
    checkCharacterPosition() {
        const checkInterval = setInterval(() => {
            if (this.world && this.world.character && this.world.character.x >= 4020) {
                this.isCharacterNearby = true;
                this.animate();
                clearInterval(checkInterval);
            }
        }, 100);
    }


    /**
     * This method starts the animation for the boss enemy.
     * It ensures the animation interval is not set more than once.
     * It also plays the enboss theme. 
     */
    animate() {
        if (!this.animationInterval) {
            this.animationInterval = setInterval(() => {
                this.playAnimationEndboss();
            }, 130);
        }
        this.moveEndboss();
        this.playEndbossTheme();
    }


    /**
     * This method plays the endboss theme.
     */
    playEndbossTheme() {
        pauseIngameMusic();
        this.endboss_theme.currentTime = 0;
        this.endboss_theme.play();
    }


    /**
     * This method stops the endboss theme.
     */
    stopEndbossTheme() {
        this.endboss_theme.pause();
        this.endboss_theme.currentTime = 0;
    }


    /**
     * This method handles the animation logic, including switching between
     * alert and walking animations once each set of images has been fully displayed.
     * If the endboss is hurt it plays the hurt animation first.
     */
    playAnimationEndboss() {
        if (this.isHurt) {
            this.playHurtAnimation();
        } else {
            this.playRegularAnimation();
        }
    }


    /**
    * This method plays the hurt animation.
    * If the hurt animation completes, it resets to the previous animation.
    */
    playHurtAnimation() {
        if (this.currentImageIndex < this.IMAGES_HURT.length) {
            this.img = this.imageCache[this.IMAGES_HURT[this.currentImageIndex]];
            this.currentImageIndex++;
        } else {
            this.isHurt = false;
            this.currentImageIndex = 0;
            this.currentImages = this.previousImages;
        }
    }


    /**
    * This method plays the regular animation (alert, walking, or attack).
    * It switches the animation set if the current animation set completes.
    */
    playRegularAnimation() {
        if (this.currentImageIndex >= this.currentImages.length) {
            this.switchAnimation();
        }
        this.img = this.imageCache[this.currentImages[this.currentImageIndex]];
        this.currentImageIndex++;
    }


    /**
     * This method switches the animation between alert, walking and attack.
     * The attack animation is played twice before switching to the next animation.
     */
    switchAnimation() {
        this.resetImageIndex();
        this.updateAnimationPhase();
        this.setAnimationImages();
    }


    /**
     * This method resets the current image index to 0.
     */
    resetImageIndex() {
        this.currentImageIndex = 0;
    }


    /**
     * This method updates the animation phase counter.
     */
    updateAnimationPhase() {
        this.animationPhase++;
    }


    /**
     * This method sets the current animation images based on the animation phase.
     */
    setAnimationImages() {
        if (this.isAlertPhase()) {
            this.currentImages = this.IMAGES_ALERT;
        } else if (this.isWalkingPhase()) {
            this.currentImages = this.IMAGES_WALKING;
        } else if (this.isAttackPhase()) {
            this.currentImages = this.IMAGES_ATTACK;
        }
    }


    /**
     * This method checks if the current phase is the alert phase.
     * @returns {boolean} True if it is the alert phase, otherwise false.
     */
    isAlertPhase() {
        return this.animationPhase % 4 === 0;
    }


    /**
     * This method checks if the current phase is the walking phase.
     * @returns {boolean} True if it is the walking phase, otherwise false.
     */
    isWalkingPhase() {
        return this.animationPhase % 4 === 1;
    }


    /**
     * This method checks if the current phase is the attack phase.
     * @returns {boolean} True if it is the attack phase, otherwise false.
     */
    isAttackPhase() {
        return this.animationPhase % 4 >= 2;
    }


    /**
     * This method moves the endboss to the left when in walking animation.
     */
    moveEndboss() {
        setInterval(() => {
            if (this.currentImages === this.IMAGES_WALKING) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * This method reduces the endboss's energy when it takes damage and plays the hurt sound.
     * If the energy falls below or equal to zero, the endboss dies.
     * Otherwise, it sets the endboss to the hurt state and switches to the hurt animation.
     */
    takeDamage() {
        this.reduceEnergy();
        this.playHurtSound();
        if (this.isEnergyDepleted()) {
            this.energy = 0;
            this.die();
        } else {
            this.enterHurtState();
        }
    }


    /**
     * This method plays the endboss hurt sound.
     */
    playHurtSound() {
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play();
    }


    /**
     * This method reduces the endboss's energy by a fixed amount.
     */
    reduceEnergy() {
        this.energy -= 20;
    }


    /**
     * This method checks if the endboss's energy is depleted.
     * @returns {boolean} True if the energy is zero or less, otherwise false.
     */
    isEnergyDepleted() {
        return this.energy <= 0;
    }


    /**
     * This method sets the endboss to the hurt state and switches to the hurt animation.
     */
    enterHurtState() {
        this.isHurt = true;
        this.previousImages = this.currentImages;
        this.currentImages = this.IMAGES_HURT;
        this.currentImageIndex = 0;
    }

    
    /**
     * This method andles the endboss's death.
     * It stops the existing animation interval and starts the death animation.
     * It stops the endboss theme, removes the endboss from the world 
     * and shows the game won screen after a delay.
     */
    die() {
        this.isDead = true;
        this.onCollisionCourse = false;
        clearInterval(this.animationInterval);
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 250);
        setTimeout(() => {
            if (this.world) {
                this.stopEndbossTheme();
                this.world.removeEnemy(this);
                this.world.displayWinScreen();
            }
        }, 1000);
    }

}