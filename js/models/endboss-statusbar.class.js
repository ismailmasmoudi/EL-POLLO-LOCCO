class EndbossStatusBar extends drawableObject {
    y = 0;
    x = 230;
    width = 200;
    height = 60;

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    /**
     * Constructs a new EndbossStatusBar object.
     * @param {Endboss} endboss - The endboss object to track the energy for.
     */
    constructor(endboss) {
        super();
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
        if (percentage >= 119) return 5; 
        if (percentage >= 79) return 4; 
        if (percentage >= 59) return 3; 
        if (percentage >= 39) return 2;
        if (percentage >= 1) return 1; 
        return 0;  
    }
}
