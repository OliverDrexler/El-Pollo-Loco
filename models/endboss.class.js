class Endboss extends MovableObject {

    height = 420;
    width = 280;
    y = 30;
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    onCollisionCourse = true;


    /**
     * Creates an instance of BossEnemy.
     * Loads the initial image and the walking animation images, sets the initial position
     * and starts the animation.
     */
    constructor() {
        super().loadImage('../img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 4600;
        this.animate();
    }

    
    /**
     * This method starts the animation for the boss enemy.
     * It plays the walking animation in intervals.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 230);
    }


}