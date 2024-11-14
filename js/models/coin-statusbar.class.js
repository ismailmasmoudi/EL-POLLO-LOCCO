class CoinStatusBar extends drawableObject { 
    y = 35;
    x = 30;
    width = 200;
    height = 60;

    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Constructs a new CoinStatusBar object.
     * @param {Character} character - The character object to track the number of coins for.
     */
    constructor(character) {
        super(); 
        this.character = character;
        this.loadImages(this.IMAGES); 
        this.img = this.imageCache[this.IMAGES[0]];
    }

    /**
     * Updates the coin status bar image based on the character's current coin count.
     */
    updateStatusBar() {
        const maxCoins = 10;
        let percentage = Math.floor((this.character.coins / maxCoins) * 100);
        let imageIndex = this.getImageIndexFromPercentage(percentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
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
