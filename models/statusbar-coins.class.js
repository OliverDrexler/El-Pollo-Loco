class StatusbarCoins extends DrawableObject {
    
    IMAGES_STATUSBAR = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    amount = 0;
    x = 25;
    y = 100;
    width = 230;
    height = 60;


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setAmount(0);
    }


    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.amount == 10) {
            return 5;
        } else if (this.amount > 8) {
            return 4;
        } else if (this.amount > 6) {
            return 3;
        } else if (this.amount > 4) {
            return 2;
        } else if (this.amount > 2) {
            return 1;
        } else {
            return 0;
        }
    }
}