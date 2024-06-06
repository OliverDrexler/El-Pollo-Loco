class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;  
    speed_y = 0;
    acceleration = 2;
    offsetY = 0; // Initialize offsetY with a default value
    energy = 100;
    lastHit = 0;


    /**
     * This method applies gravity to the object.
     * It decreases the object's y position and speed_y due to gravity at regular intervals.
     */
    applyGravity() {
        setInterval(() => {
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


    ////////////// OLD & BASIC isColliding METHOD //////////////

    /*isColliding(mo) {
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y && 
        this.x < mo.x && 
        this. y < mo.y + mo.height
    }*/

    ////////////////////////////////////////////////////////////


    /**
    * This method checks if the current object is colliding with another object.
    * @param {Object} obj - The object to check for collision.
    * @param {number} obj.x - The x position of the other object.
    * @param {number} obj.y - The y position of the other object.
    * @param {number} obj.width - The width of the other object.
    * @param {number} obj.height - The height of the other object.
    * @param {boolean} obj.onCollisionCourse - Indicates if the other object is on a collision course.
    * @returns {boolean} True if the objects are colliding, false otherwise.
    */
    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) &&
            obj.onCollisionCourse;
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
     * This method checks for collisions with enemies.
     * If the character collides from the top, it does not take damage.
     * If the character collides from the sides or bottom, it takes damage.
     */
    checkCollisionsWithEnemies(enemies) {
        enemies.forEach((enemy) => {
            if (this.isCollidingTop(enemy)) {
                enemy.die();
            } else if (this.isColliding(enemy)) {
                this.hit();
            }
        });
    }


    /**
    * This method decreases the energy of the object hit by 2. 
    * If the energy falls below 0, it sets the energy to 0.
    * It also updates the last hit timestamp.
    */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
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


}