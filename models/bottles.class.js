class Bottles extends DrawableObject {

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    y = 340;
    height = 90;
    width = 90;


    /**
     * Creates an instance of Bottles.
     * Loads a random initial image from the IMAGES_BOTTLE array.
     */
    constructor() {
        super();
        this.loadRandomImage();
        this.x = 400 + Math.random() * 2100;
    }

    /**
     * This method loads a random image from the IMAGES_BOTTLE array.
     */
    loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
    }

}