class EndbossStatusBar extends drawableObject {
    y = 0; // Adjust y position as needed
    x = 230; // Adjust x position as needed
    width = 200;
    height = 60;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    constructor(endboss) {
        super();
        this.loadImages(this.IMAGES);
        this.endboss = endboss;
        this.img = this.imageCache[this.IMAGES[5]]; // Start with full energy
    }


    updateStatusBar() {
        let energyPercentage = (this.endboss.energy / 100) * 100; 
        let imageIndex = this.getImageIndexFromPercentage(energyPercentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }

    getImageIndexFromPercentage(percentage) {
        if (percentage >= 80) return 5; 
        if (percentage >= 60) return 4; 
        if (percentage >= 40) return 3; 
        if (percentage >= 20) return 2; 
        if (percentage >= 0) return 1; 
        return 0; 
    }

}

