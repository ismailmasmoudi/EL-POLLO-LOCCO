class BottleStatusBar extends drawableObject {
    y = 85;
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
        super();
        this.character = character;
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[0]];
    }

    updateStatusBar() {
        const maxBottles = 10;
        let percentage = Math.floor((this.character.throwableBottles / maxBottles) * 100); // Use throwableBottles
        let imageIndex = this.getImageIndexFromPercentage(percentage);
        this.img = this.imageCache[this.IMAGES[imageIndex]];
    }


    getImageIndexFromPercentage(percentage) {
        if (percentage >= 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }

}
