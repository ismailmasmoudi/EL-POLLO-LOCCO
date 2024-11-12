class EndbossStatusBar extends drawableObject {
    /**
     * The vertical position of the endboss status bar on the canvas.
     * @type {number}
     */
    y = 0;
    /**
     * The horizontal position of the endboss status bar on the canvas.
     * @type {number}
     */
    x = 230;
    /**
     * The width of the endboss status bar image.
     * @type {number}
     */
    width = 200;
    /**
     * The height of the endboss status bar image.
     * @type {number}
     */
    height = 60;
    /**
     * An array of image paths representing different energy levels of the endboss.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    /**
     * Constructs a new EndbossStatusBar object.
     * @param {Endboss} endboss - The endboss object to track the energy for.
     */
    constructor(endboss) {
        super();
        /**
         * The endboss object whose energy is being displayed.
         * @type {Endboss}
         */
        this.endboss = endboss;
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[5]];
    }

    /**
     * Updates the endboss status bar image based on the endboss's current energy level.
     */
    updateStatusBar() {
        let energyPercentage = (this.endboss.energy / 100) * 100;
        let imageIndex = this.getImageIndexFromPercentage(energyPercentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }

    /**
     * Returns the index of the image in the IMAGES array that corresponds to the given energy percentage.
     * @param {number} percentage - The energy percentage of the endboss.
     * @returns {number} The index of the image in the IMAGES array.
     */
    getImageIndexFromPercentage(percentage) {
        if (percentage >= 85) return 5;
        if (percentage >= 72) return 4;
        if (percentage >= 40) return 3;
        if (percentage >= 20) return 2;
        if (percentage >= 1) return 1;
        return 0;
    }
}
