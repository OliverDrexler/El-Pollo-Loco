class Chicken extends MovableObject {

    y = 345;
    width = 80;
    height = 80;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    img_dead = '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    onCollisionCourse = true;
    isDead = false;
    

    /**
     * Creates an instance of Chicken.
     * Loads the initial image, loads the walking animation images, 
     * sets a random initial x position and speed and starts the animation.
     */
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Calls the function of the parent class (MovableObject)
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.25; 
        this.animate();
    }

    
    /**
     * This method starts the animation for the chicken.
     * It moves the chicken to the left and plays the walking animation in intervals.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60); // = 60 FPS
        
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    
    /**
     * This method sets the chicken as dead, changes the image and stops the animation.
     * After 1 second, it removes the chicken from the game.
     */
    die() {
        this.isDead = true;
        this.img.src = this.img_dead;
        this.onCollisionCourse = false;
        setTimeout(() => {
            if (this.world) {
                this.world.removeEnemy(this); 
            } 
        }, 1000);
    }


}