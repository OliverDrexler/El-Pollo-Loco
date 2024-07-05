class StatusbarHealth extends DrawableObject {

    IMAGES_STATUSBAR = [
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;
    x = 25;
    y = 10;
    width = 230;
    height = 60;


    /**
     * Creates an instance of StatusbarHealth.
     * Loads the initial images and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }


    /**
     * This method sets the percentage and updates the status bar image accordingly.
     * @param {number} percentage - The percentage to set for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This method resolves the image index based on the current percentage.
     * @returns {number} The index of the image to use based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 76) {
            return 4;
        } else if (this.percentage > 51) {
            return 3;
        } else if (this.percentage > 26) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }

}