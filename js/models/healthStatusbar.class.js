class HealthStatusBar extends drawableObject {
    y = -10;
    x = 30;
    width = 200; // Add width
    height = 60;
    Images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    character; 

    constructor(character) { 
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.Images);
        this.character = character; 
        this.updateStatusBar(); 
    }

    updateStatusBar() {
        let energyPercentage = Math.floor(this.character.energy / 10) * 10;
        let imageIndex = Math.floor(energyPercentage / 20);
        let path = this.Images[imageIndex] ; 
        this.img = this.imageCache[path];

    }
    

}