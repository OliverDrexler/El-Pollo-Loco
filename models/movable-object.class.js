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
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.y < 120) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // loadImage('./img/test.png')
    loadImage(path) {
        this.img = new Image(); // Image bereits vordefiniert
        this.img.src = path;
    }

    /**
     * 
     * @param {JSON} arr - ['img/img1.png', 'img/img2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // = 60 FPS
    }

}