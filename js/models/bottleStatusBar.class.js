class BottleStatusBar extends drawableObject {
    y = 85; // Adjust y position as needed
    x = 30;
    width = 200;
    height = 60;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor(character) {
        super(); // Call the constructor of drawableObject
        this.character = character;
        this.loadImages(this.IMAGES); 
        this.img = this.imageCache[this.IMAGES[0]]; // Start with the 0% image
    }

    updateStatusBar() {
        const maxBottles = 5; // Set maxBottles to 10
        let percentage = Math.floor((this.character.throwableBottles / maxBottles) * 100); // Use throwableBottles
        let imageIndex = this.getImageIndexFromPercentage(percentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
    
    
    getImageIndexFromPercentage(percentage) {
        if (percentage >= 100) return 5; // 9 coins (90%) or more
        if (percentage >= 80) return 4; // 8 coins (80%) - 89%
        if (percentage >= 60) return 3; // 7 coins (70%) - 79%
        if (percentage >= 40) return 2; // 6 coins (60%) - 69%
        if (percentage >= 20) return 1; // 5 coins (50%) - 59%
        return 0; // 0 coins (0%) - 49%
    }
    
}
