class ThrowableObject extends MovableObject {

    height = 90;
    width = 90;


    /**
    * Creates an instance of a ThrowableObject.
    * Loads the initial image and sets the initial position.
    * Initiates the throw action.
    * @param {number} x - The initial x position of the object.
    * @param {number} y - The initial y position of the object.
    */
    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.throw();
    }


    /**
    * This method initiates the throw action.
    * It sets the initial vertical speed and applies gravity.
    * It moves the object to the right at a fixed interval.
    */
    throw() {
        this.speed_y = 28;
        this.applyGravity();
        setInterval(() => {
            this.x += 8;
        }, 25);
    }
}