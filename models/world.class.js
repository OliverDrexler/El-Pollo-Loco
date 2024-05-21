class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0, 80)
    ];
    canvas; // neue Variable für draw function
    ctx;

    constructor(canvas) { // canvas-Variable aus game.js
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = Variable aus diesem Dokument
        this.draw();
    }

    draw() {
        // löscht das canvas, um es direk danach neu zu zeichnen (für bewegte Bilder)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

        this.addToMap(this.character);   
        this.addObjectsToMap(this.enemies);  
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);

        // this. kann in requestAnimationFrame nicht verwendet werden, daher neue Variable self, mit der draw() immer wieder aufgerufen wird
        let self = this; 
        requestAnimationFrame(function() {
            self.draw();
        }); 
    }

    // forEach-Schleife für alle Arrays
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    // Auslagerung von drawImage
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}