class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 130;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

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

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // = 60 FPS
    }

}