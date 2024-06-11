class Cloud extends MovableObject {
    
    y = 20;
    height = 350;
    width = 500;


    /**
     * Creates an instance of Cloud.
     * Loads the initial image, sets a random initial x position and starts the animation.
     * @param {number} [x] - The optional initial x position for the cloud.
     */
    constructor(x) {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = x !== undefined ? x : Math.random() * 2500;
        this.animate();
    }


    /**
     * This method starts the animation for the cloud.
     * It moves the cloud to the left in intervals.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}