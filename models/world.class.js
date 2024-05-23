class World {
    character = new Character();
    level = level1;
    canvas; // neue Variable für draw function
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) { // canvas- & keyboard-Variable aus game.js
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = Variable aus diesem Dokument
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        // hiermit wird die aktuelle Instanz der Welt (zB alle Variablen) an character übergeben
        this.character.world = this; 
    }

    draw() {
        // löscht das canvas, um es direk danach neu zu zeichnen (für bewegte Bilder)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);  
        this.addToMap(this.character);  
        
        this.ctx.translate(-this.camera_x, 0);


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
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}