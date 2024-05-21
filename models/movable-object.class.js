class MovableObject {
    x = 120;
    y = 400;
    img;

    // loadImage('./img/test.png')
    loadImage(path) {
        this.img = new Image(); // Image bereits vordefiniert
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        
    }

}