class Coins extends DrawableObject {

    IMAGES_COINS = [
        '../img/8_coin/fitted_coin_1.png',
        '../img/8_coin/fitted_coin_2.png'
    ];

    height = 70;
    width = 70;


    /**
     * Creates an instance of Coins.
     * Loads the initial image and sets up the animation for the coin.
     */
    constructor() {
        super().loadImage('../../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 400 + Math.random() * 3700;
        this.y = 110 + Math.random() * 230;
        this.animate();
    }


    /**
     * This method starts the animation for the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 180);
    }

}