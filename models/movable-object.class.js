class MovableObject {

    x = 120;
    y = 180;
    img;
    height = 250;
    width = 130;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speed_y = 0;
    acceleration = 2;


    /**
     * This method applies gravity to the object.
     * It decreases the object's y position and speed_y due to gravity at regular intervals.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This method checks if the object is above the ground.
     * @returns {boolean} True if the object's y position is less than 120.
     */
    isAboveGround() {
        return this.y < 120;
    }


    /**
     * This method loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); // Image is predefined
        this.img.src = path;
    }


    /**
     * This method draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This method draws a frame around the objects on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '10';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * This method loads multiple images and caches them.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * This method plays an animation by cycling through an array of images.
     * @param {string[]} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This method moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This method moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This method makes the object jump.
     * It sets the vertical speed to create a jumping effect.
     */
    jump() {
        this.speed_y = 27;
    }

}