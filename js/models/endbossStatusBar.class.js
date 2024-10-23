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
        let energyPercentage = Math.floor(this.endboss.energy / 10) * 10;
        let imageIndex = Math.floor(energyPercentage / 20);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }
}
