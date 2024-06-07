class Chick extends MovableObject {

    y = 345;
    width = 60;
    height = 60;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    img_dead = '../img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    onCollisionCourse = true;
    isDead = false;
    dying_sound = new Audio('../audio/chicken.mp3');


    /**
     * Creates an instance of Chick.
     * Loads the initial image, loads the walking animation images, 
     * sets a random initial x position and speed and starts the animation.
     */
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.speed = 0.10 + Math.random() * 0.20;
        this.animate();
    }


    /**
     * This method starts the animation for the chick, including movement and walking animation.
     */
    animate() {
        this.moveChick();
        //this.playChickWalkingAnimation();
    }


    /**
    * This method moves the chicken to the left if it is not dead.
    * Runs at 60 frames per second.
    */
    moveChick() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
    * This method plays the walking animation for the chick if it is not dead.
    * It changes the image every 150 milliseconds.
    */
    playChickWalkingAnimation() {
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


    /**
     * This method plays the dying sound from 1 second to 1.72 seconds.
     */
    playDyingSound() {
        this.dying_sound.currentTime = 1;
        this.dying_sound.play();
        setTimeout(() => {
            this.dying_sound.pause();
        }, 720);
    }


    /**
     * This method sets the chick as dead, changes the image and stops the animation.
     * After 1 second, it removes the chicken from the game.
     */
    die() {
        this.isDead = true;
        this.img.src = this.img_dead;
        this.onCollisionCourse = false;
        this.playDyingSound();
        setTimeout(() => {
            if (this.world) {
                this.world.removeEnemy(this);
            }
        }, 1000);
    }
}