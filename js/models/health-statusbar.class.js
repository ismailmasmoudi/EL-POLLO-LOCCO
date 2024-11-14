class HealthStatusBar extends drawableObject {
    y = -10;
    x = 30;
    width = 200;
    height = 60;

    Images = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * The character object whose health is being displayed.
     * @type {Character}
     */
    character;

    /**
     * Constructs a new HealthStatusBar object.
     * @param {Character} character - The character object to track health for.
     */
    constructor(character) {
        super().loadImage('./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.Images);
        this.character = character;
        this.updateStatusBar();
    }

    /**
     * Updates the health status bar image based on the character's current energy level.
     */
    updateStatusBar() {
        let percentage = Math.floor((this.character.energy / 100) * 100); // Calculate percentage correctly for 100 energy
        let imageIndex = this.getImageIndexFromPercentage(percentage);
        let path = this.Images[imageIndex];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the index of the image in the IMAGES array that corresponds to the given percentage.
     * @param {number} percentage - The percentage of coins collected.
     * @returns {number} The index of the image in the IMAGES array.
     */
    getImageIndexFromPercentage(percentage) {
        if (percentage >= 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 1) return 1;
        return 0;
    }
}

