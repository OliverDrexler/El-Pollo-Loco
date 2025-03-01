class StatusbarBottle extends DrawableObject {

    IMAGES_STATUSBAR = [
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    amount = 0;
    x = 25;
    y = 60;
    width = 230;
    height = 60;


    /**
     * Creates an instance of StatusbarBottle.
     * Loads the initial images and sets the initial amount to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setAmount(0);
    }


    /**
     * This method sets the amount and updates the status bar image accordingly.
     * @param {number} amount - The amount to set for the status bar.
     */
    setAmount(amount) {
        this.amount = amount;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This method resolves the image index based on the current amount.
     * @returns {number} The index of the image to use based on the amount.
     */
    resolveImageIndex() {
        if (this.amount >= 9) {
            return 5;
        } else if (this.amount > 7) {
            return 4;
        } else if (this.amount > 5) {
            return 3;
        } else if (this.amount > 3) {
            return 2;
        } else if (this.amount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
    
}