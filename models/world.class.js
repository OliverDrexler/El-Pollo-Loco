class World {

    character = new Character();
    level = level1;
    canvas; // New variable for draw function
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar;
    coins = new Coins;


    /**
    * This method creates an instance of World.
    * @param {HTMLCanvasElement} canvas - The canvas element from game.js.
    * @param {Object} keyboard - The keyboard input object.
    */
    constructor(canvas, keyboard) { // canvas- & keyboard-variable from game.js
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = Variable from this document
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    /**
     * This method sets the current instance of the world to the character.
     * It assigns the world instance (e.g., all variables) to the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This method checks for collisions between the character and enemies.
     * It runs in intervals and subtracts energy from the character 
     * when coliding with an enemy.
     */
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }


    /**
     * This method draws the game world on the canvas.
     * It clears the canvas and redraws the entire scene to create animations.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        
        this.ctx.translate(-this.camera_x, 0); 
        // ------- Space for fixed objects ------- //
        this.addToMap(this.statusbar);
        //this.addToMap(this.coins);
        this.ctx.translate(this.camera_x, 0); 

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0); // Resets the canvas translation
        
        let self = this; // Using 'self' to refer to the current instance in requestAnimationFrame
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This method adds multiple objects to the map.
     * It is a forEach loop for all arrays in this game.
     * @param {Array} objects - An array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * This method adds a single object to the map.
     * It draws the image of a movable object (mo) on the canvas.
     * @param {MovableObject} mo - The object to be drawn on the map.
     */
    addToMap(mo) {
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.mirrorImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.mirrorImageBack(mo);
        }
    }


    /**
     * This method mirrors the image of a movable object horizontally.
     * @param {MovableObject} mo - The object to mirror.
     */
    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This method restores the original orientation of the mirrored movable object.
     * @param {MovableObject} mo - The object to restore.
     */
    mirrorImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}