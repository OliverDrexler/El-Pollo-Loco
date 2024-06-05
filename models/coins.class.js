class Coins extends MovableObject {

    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    x = 100;
    y = 100;
    height = 180;
    width = 180;

    constructor() {
        super().loadImage('../../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 180);
    }

}