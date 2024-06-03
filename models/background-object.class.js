class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    
    /**
     * Creates an instance of BackgroundObject.
     * Loads the images for the background object and sets their initial position.
     * @param {string} imagePath - The path to the background images.
     * @param {number} x - The initial x position of the background objects.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; 
    }
}