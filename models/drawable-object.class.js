class DrawableObject {

    x = 120;
    y = 180;
    height = 250;
    width = 130;
    img;
    imageCache = {};
    currentImage = 0;


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

}