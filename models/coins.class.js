class Coins extends DrawableObject {

    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    height = 180;
    width = 180;


    /**
     * Creates an instance of Coins.
     * Loads the initial image and sets up the animation for the coin.
     */
    constructor() {
        super().loadImage('../../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 300 + Math.random() * 2100;
        this.y = 0 + Math.random() * 300;
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