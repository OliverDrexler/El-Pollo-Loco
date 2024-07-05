class Bottles extends DrawableObject {

    IMAGES_BOTTLE = [
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'https://oliverdrexler.com/pollo-loco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    y = 340;
    height = 90;
    width = 90;
    onCollisionCourse = true;


    /**
     * Creates an instance of Bottles.
     * Loads a random initial image from the IMAGES_BOTTLE array.
     */
    constructor() {
        super();
        this.loadRandomImage();
        this.x = 400 + Math.random() * 3700;
    }

    /**
     * This method loads a random image from the IMAGES_BOTTLE array.
     */
    loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
    }

}