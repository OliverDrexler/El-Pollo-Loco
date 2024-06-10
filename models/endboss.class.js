class Endboss extends MovableObject {

    height = 420;
    width = 280;
    y = 30;

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


    /**
     * Creates an instance of BossEnemy.
     * Loads the initial image and the walking animation images, sets the initial position
     * and starts the animation.
     */
    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4600;
        this.animate();
    }

    
    /**
     * This method starts the animation for the boss enemy.
     * It plays the alert and walking animation alternately.
     */
    animate() {
        setInterval(() => {
            this.playAnimationEndboss();
        }, 130);
    }


    /**
     * This method handles the animation logic, including switching between
     * alert and walking animations once each set of images has been fully displayed.
     */
    playAnimationEndboss() {
        if (this.currentImageIndex >= this.currentImages.length) {
            this.switchAnimation();
        }
        this.img = this.imageCache[this.currentImages[this.currentImageIndex]];
        this.currentImageIndex++;
    }


    /**
     * This method switches the animation between alert and walking.
     */
    switchAnimation() {
        this.currentImageIndex = 0;
        this.animationPhase++;
        if (this.animationPhase % 2 === 0) {
            this.currentImages = this.IMAGES_ALERT;
        } else {
            this.currentImages = this.IMAGES_WALKING;
        }
    }


}