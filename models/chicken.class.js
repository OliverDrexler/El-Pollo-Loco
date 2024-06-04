class Chicken extends MovableObject {

    y = 345;
    width = 80;
    height = 80;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    onCollisionCourse = true;
    

    /**
     * Creates an instance of Chicken.
     * Loads the initial image, loads the walking animation images, 
     * sets a random initial x position and speed and starts the animation.
     */
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Calls the function of the parent class (MovableObject)
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 2300; // Sets the initial x position to a random value between 200 and 2500
        this.speed = 0.15 + Math.random() * 0.25; // Sets the speed to a random value between 0.15 and 0.40
        this.animate();
    }

    
    /**
     * This method starts the animation for the chicken.
     * It moves the chicken to the left and plays the walking animation in intervals.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // = 60 FPS
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

}