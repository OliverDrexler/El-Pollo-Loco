class World {

    character;
    level;
    canvas; // New variable for draw function
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoins = new StatusbarCoins();
    statusbarEndboss = new StatusbarEndboss();
    throwableObject = [];


    /**
     * This method creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element from game.js.
     * @param {Object} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) { // canvas- & keyboard-variable from game.js
        this.character = new Character();
        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // this.canvas = Variable from this document
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This method sets the current instance of the world to the character and enemies.
     * It assigns the world instance (e.g., all variables) to the character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }


    /**
     * This method starts the main game loop.
     * Periodically checks for collisions, throwable objects
     * and game over status.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsWithThrowableObjects();
            this.checkGameOver();
        }, 100);
    }


    /**
     * This method checks if the game is over.
     * If the character is dead, it triggers the game over screen.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.stopGame();
        }
    }

    /**
     * This method stops the game, hides the canvas and shows the game over screen.
     */
    stopGame() {
        this.displayGameOverScreen();
    }

    /**
     * This method displays the game over screen.
     */
    displayGameOverScreen() {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('game-over-screen').classList.remove('d-none');
    }


    /**
     * This method checks if the space key is pressed to throw an object.
     * If the space key is pressed, it creates a new throwable object
     * and adds it to the list of throwable objects if the throw is initiated.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character);
            bottle.setWorld(this);
            if (bottle.throwInitiated) {
                this.throwableObject.push(bottle);
            }
        }
    }


    /**
     * This method checks for collisions and updates the statusbars accordingly.
     */
    checkCollisions() {
        this.checkCharacterCollisions();
        this.updateStatusbars();
    }


    /**
     * This method checks for collisions between the character and various objects.
     */
    checkCharacterCollisions() {
        this.character.checkCollisionsWithEnemies(this.level.enemies);
        this.character.checkCollisionsWithCoins(this.level.coins);
        this.character.checkCollisionsWithBottles(this.level.bottles);
    }


    /**
     * This method updates the statusbars for character health, collected coins, 
     * collected bottles and endboss energy.
     */
    updateStatusbars() {
        this.statusbarHealth.setPercentage(this.character.energy);
        this.statusbarCoins.setAmount(this.character.amountCoins);
        this.statusbarBottle.setAmount(this.character.amountBottles);
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            this.statusbarEndboss.setPercentage(endboss.energy);
        }
    }


    /**
     * This method checks for collisions between throwable objects and enemies or the ground.
     */
    checkCollisionsWithThrowableObjects() {
        this.throwableObject.forEach((throwableObject) => {
            throwableObject.checkBottleCollision(this.level.enemies, this.level.endboss);
        });
    }


    /**
     * This method removes a specific enemy from the level.
     * @param {MovableObject} enemy - The enemy to remove.
     */
    removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }


    /**
     * This method removes a collectable object from the specified array.
     * @param {MovableObject} object - The object to remove.
     * @param {Array} array - The array from which to remove the object.
     */
    removeCollectableObject(object, array) {
        const index = array.indexOf(object);
        if (index > -1) {
            array.splice(index, 1);
        }
    }


    /**
     * This method removes a specific throwableObject from the level.
     * @param {MovableObject} throwableObject - The throwableObject to remove.
     */
    removeThrowableObject(throwableObject) {
        const index = this.throwableObject.indexOf(throwableObject);
        if (index > -1) {
            this.throwableObject.splice(index, 1);
        }
    }


    /**
     * This method draws the game world on the canvas.
     * It clears the canvas and redraws the entire scene to create animations.
     */
    draw() {
        this.clearCanvas();
        this.drawBackgroundObjects();
        this.drawFixedObjects();
        this.drawMovableObjects();
        let self = this; // Using 'self' to refer to the current instance in requestAnimationFrame
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This method clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * This method draws all background objects.
     */
    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * This method draws all fixed objects.
     */
    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarEndboss);
    }


    /**
     * This method draws the character and enemies.
     */
    drawMovableObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0); // Resets the canvas translation
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