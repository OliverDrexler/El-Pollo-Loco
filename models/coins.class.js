class Coins extends DrawableObject {

    IMAGES_COINS = [
        'https://oliverdrexler.com/pollo-loco/img/8_coin/fitted_coin_1.png',
        'https://oliverdrexler.com/pollo-loco/img/8_coin/fitted_coin_2.png'
    ];

    height = 70;
    width = 70;
    onCollisionCourse = true;


    /**
     * Creates an instance of Coins.
     * Loads the initial image and sets up the animation for the coin.
     */
    constructor() {
        super().loadImage('https://oliverdrexler.com/pollo-loco/img/8_coin/coin_1.png');
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