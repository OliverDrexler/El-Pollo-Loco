class StatusbarEndboss extends DrawableObject {
    
    IMAGES_STATUSBAR = [
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'https://oliverdrexler.com/pollo-loco/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 100;
    x = 460;
    y = 15;
    width = 230;
    height = 60;


    /**
     * Creates an instance of StatusbarEndboss.
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
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
}