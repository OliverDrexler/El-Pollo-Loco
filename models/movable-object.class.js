class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speed_y = 0;
    acceleration = 2;
    offsetYTop = 0; // Initialize offsetY with a default value
    offsetYBottom = 0;
    offsetX = 0;
    energy = 100;
    lastHit = 0;
    groundLevel = 400;
    amountCoins = 0;
    amountBottles = 0;


    /**
     * This method applies gravity to the object.
     * It decreases the object's y position and speed_y due to gravity at regular intervals.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This method checks if the object is above the ground.
     * For instances of ThrowableObject, it always returns true.
     * For other objects, it checks if the y position is less than 120.
     * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 120;
        }
    }


    /**
     * This method checks if the current object is colliding with another object.
     * It includes an additional collision distance specifically for collisions 
     * between throwable objects and the Endboss to account for visual offset.
     * @param {Object} obj - The object to check for collision.
     * @param {number} obj.x - The x position of the other object.
     * @param {number} obj.y - The y position of the other object.
     * @param {number} obj.width - The width of the other object.
     * @param {number} obj.height - The height of the other object.
     * @param {boolean} obj.onCollisionCourse - Indicates if the other object is on a collision course.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        let extraCollisionDistance = (this instanceof ThrowableObject && obj instanceof Endboss) ? -100 : 0;
        return (this.x + this.width - this.offsetX + extraCollisionDistance) >= obj.x &&
            (this.x + this.offsetX) <= (obj.x + obj.width) &&
            (this.y + this.height - this.offsetYBottom) >= obj.y &&
            (this.y + this.offsetYTop) <= (obj.y + obj.height) &&
            obj.onCollisionCourse;
    }


    /**
     * This method checks if the object is colliding with the ground.
     * @returns {boolean} - Returns true if the object is colliding with the ground, otherwise false.
     */
    isCollidingWithGround() {
        return this.y == 400;
    }


    /**
     * This method checks if the character is colliding with the top of the given object.
     * It only returns true, if the character is in the downward motion of the jump.
     * @param {MovableObject} obj - The object to check collision with.
     * @returns {boolean} - Returns true if colliding from the top, otherwise false.
     */
    isCollidingTop(obj) {
        return this.isColliding(obj) && (this.speed_y < 0) && (this.y + this.height) <= (obj.y + obj.height);
    }


    /**
     * This method checks for collisions with coins and collects them if a collision is detected.
     * @param {Array<Object>} coins - An array of coin objects to check for collisions.
     */
    checkCollisionsWithCoins(coins) {
        coins.forEach((coin) => {
            if (this.isColliding(coin) || this.isCollidingTop(coin)) {
                this.collectCoin(coin);
            }
        });
    }


    /**
     * This method collects a coin, increases the count of collected coins
     * and removes the coin from the world.
     * @param {Object} coin - The coin object to be collected.
     */
    collectCoin(coin) {
        this.amountCoins++;
        this.world.removeCollectableObject(coin, this.world.level.coins);
    }


    /**
     * This method checks for collisions with bottles and collects them if a collision is detected.
     * @param {Array<Object>} bottles - An array of bottle objects to check for collisions.
     */
    checkCollisionsWithBottles(bottles) {
        bottles.forEach((bottle) => {
            if (this.isColliding(bottle) || this.isCollidingTop(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }


    /**
    * This method collects a bottle, increases the count of collected bottles
    * and removes the bottle from the world.
    * @param {Object} bottle - The bottle object to be collected.
    */
    collectBottle(bottle) {
        this.amountBottles++;
        this.world.removeCollectableObject(bottle, this.world.level.bottles);
    }


    /**
     * This method checks for collisions between the character and enemies.
     * It handles collisions with the endboss and other enemies separately.
     * @param {Array<Object>} enemies - An array of enemy objects to check for collisions.
     */
    checkCollisionsWithEnemies(enemies) {
        enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                this.checkCollisionsWithEndboss(enemy);
            } else {
                this.checkCollisionsWithRegularEnemy(enemy);
            }
        });
    }


    /**
     * This method checks for collisions with the endboss.
     * If the character collides with the Endboss, the character takes damage.
     * @param {Endboss} endboss - The endboss object to check for collisions.
     */
    checkCollisionsWithEndboss(endboss) {
        if (this.isColliding(endboss) || this.isCollidingTop(endboss)) {
            this.hit(endboss);
        }
    }


    /**
    * This method checks for collisions with regular enemies.
    * If the character collides with an enemy from the top, the enemy dies.
    * If the character collides with an enemy from the sides or bottom, the character takes damage.
    * @param {Object} enemy - The regular enemy object to check for collisions.
    */
    checkCollisionsWithRegularEnemy(enemy) {
        if (this.isCollidingTop(enemy)) {
            enemy.die();
        } else if (this.isColliding(enemy)) {
            this.hit(enemy);
        }
    }


    /**
     * This method decreases the energy of the based on the type of enemy hit. 
     * If the energy falls below 0, it sets the energy to 0.
     * It also updates the last hit timestamp.
     * @param {Object} enemy - The enemy object that the character collided with.
     */
    hit(enemy) {
        let damage = this.claculateDamage(enemy)
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This method calculates the damage based on the type of enemy.
     * @param {Object} enemy - The enemy object to calculate damage for.
     * @returns {number} - The amount of damage to apply.
     */
    claculateDamage(enemy) {
        if (enemy instanceof Endboss) {
            return 10;
        } else if (enemy instanceof Chicken) {
            return 5;
        } else if (enemy instanceof Chick) {
            return 2;
        }
    }


    /**
     * This method checks if the character was hit in the last 300 milliseconds.
     * @returns {boolean} - Returns true if the character was hit in the last 300 milliseconds, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in milliseconds
        return timePassed < 300;
    }


    /**
     * This method checks if the character is dead based on its energy level.
     * @returns {boolean} - Returns true if the character's energy is 0, indicating that the character is dead.
     */
    isDead() {
        return this.energy == 0;
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


    ////////////// OLD isAboveGround METHOD //////////////

    /**
    * This method checks if the object is above the ground.
    * For instances of ThrowableObject, it always returns true.
    * For other objects, it checks if the y position is less than the ground level.
    * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
    */
    /*isAboveGround() {
        return this.y + this.height < this.groundLevel;
    }*/

    ////////////////////////////////////////////////////////


    ////////////// OLD & BASIC isColliding METHOD //////////////

    /*isColliding(mo) {
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y && 
        this.x < mo.x && 
        this. y < mo.y + mo.height
    }*/

    ////////////////////////////////////////////////////////////

}