class Bottles extends DrawableObject {

    IMAGES_BOTTLE = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    x = 300;
    y = 100;
    height = 180;
    width = 180;


    /**
     * Creates an instance of Bottles.
     * Loads the initial image and sets up the animation for the bottle.
     */
    constructor() {
        super().loadImage('../../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_BOTTLE);
        //this.x = 100 + Math.random() * 2100;
        //this.y = 0 + Math.random() * 300;
        this.animate();
    }


    /**
     * This method starts the animation for the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 180);
    }

}