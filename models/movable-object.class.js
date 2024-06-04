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
    offsetY = 0; // Initialize offsetY with a default value
    energy = 100;


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
     * This method draws a frame around the objects on the canvas 
     * if it is an instance of Character or Chicken.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '10';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
    * This method checks if the current object is colliding with another object.
    * @param {Object} obj - The object to check for collision.
    * @param {number} obj.x - The x position of the other object.
    * @param {number} obj.y - The y position of the other object.
    * @param {number} obj.width - The width of the other object.
    * @param {number} obj.height - The height of the other object.
    * @param {boolean} obj.onCollisionCourse - Indicates if the other object is on a collision course.
    * @returns {boolean} True if the objects are colliding, false otherwise.
    */
    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) &&
            obj.onCollisionCourse;
    }


    /**
    * This method decreases the energy of the object hit by 2. 
    * If the energy falls below 0, it sets the energy to 0.
    */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


    /**
    * This method checks if the character is dead based on its energy level.
    * @returns {boolean} - Returns true if the character's energy is 0, indicating that the character is dead.
    */
    isDead() {
        return this.energy == 0;
    }


    ////////////// OLD & BASIC isColliding METHOD //////////////

    /*isColliding(mo) {
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y && 
        this.x < mo.x && 
        this. y < mo.y + mo.height
    }*/

    ////////////////////////////////////////////////////////////

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