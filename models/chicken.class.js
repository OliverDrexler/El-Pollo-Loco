class Chicken extends MovableObject {

    y = 345;
    width = 80;
    height = 80;

    IMAGES_WALKING = [
        'https://oliverdrexler.com/pollo-loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'https://oliverdrexler.com/pollo-loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'https://oliverdrexler.com/pollo-loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    img_dead = 'https://oliverdrexler.com/pollo-loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    onCollisionCourse = true;
    isDead = false;


    /**
     * Creates an instance of Chicken.
     * Loads the initial image, loads the walking animation images, 
     * sets a random initial x position and speed and starts the animation.
     * @param {number} [x] - The optional initial x position for the chicken.
     */
    constructor(x) {
        super().loadImage('https://oliverdrexler.com/pollo-loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Calls the function of the parent class (MovableObject)
        this.loadImages(this.IMAGES_WALKING);
        this.x = x !== undefined ? x : 400 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * This method starts the animation for the chicken, including movement and walking animation.
     */
    animate() {
        this.moveChicken();
        this.playChickenWalkingAnimation();
    }


    /**
    * This method moves the chicken to the left if it is not dead.
    * Runs at 60 frames per second.
    */
    moveChicken() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
    * This method plays the walking animation for the chicken if it is not dead.
    * It changes the image every 150 milliseconds.
    */
    playChickenWalkingAnimation() {
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
        if (!isMuted) {
            chicken_dying_sound.currentTime = 1;
            chicken_dying_sound.play();
            setTimeout(() => {
                chicken_dying_sound.pause();
            }, 720); 
        } 
    }


    /**
     * This method sets the chicken as dead, changes the image and stops the animation.
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