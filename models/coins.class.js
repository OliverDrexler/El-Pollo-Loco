class Coins extends DrawableObject {

    IMAGES_COINS = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    x = 40;
    y = 40;
    height = 40;
    width = 40;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
    }

}