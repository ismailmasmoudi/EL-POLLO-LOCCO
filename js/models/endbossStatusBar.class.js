class EndbossStatusBar extends drawableObject {
    y = 0; 
    x = 230; 
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
        this.endboss = endboss;
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[5]]; 
    }


    updateStatusBar() {
        let energyPercentage = (this.endboss.energy / 100) * 100; 
        let imageIndex = this.getImageIndexFromPercentage(energyPercentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }

    getImageIndexFromPercentage(percentage) {
        if (percentage >= 85) return 5; 
        if (percentage >= 72) return 4; 
        if (percentage >= 40) return 3; 
        if (percentage >= 20) return 2; 
        if (percentage >= 1) return 1; 
        return 0; 
    }

}

