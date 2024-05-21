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

        // malt Pepe
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        // forEach-Schleife für enemies-Array, das für jedes Chicken im Array das entsprechende Bild erzeugt
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

         // forEach-Schleife für clouds-Array
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        // this. kann in requestAnimationFrame nicht verwendet werden, daher neue Variable self, mit der draw() immer wieder aufgerufen wird
        let self = this; 
        requestAnimationFrame(function() {
            self.draw();
        }); 
    }
}