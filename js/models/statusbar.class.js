class StatusBar extends drawableObject {
    y = 10;
    x = 30;
    width = 200; // Add width
    height = 60; 
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    character; // Add a property to hold the character reference

    constructor(character) { // Pass the character object to the constructor
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.IMAGES_STATUSBAR);
        this.character = character; // Store the character reference
        this.updateStatusBar(); // Initial update
    }

    // Function to update the displayed image
    updateStatusBar() {
        let energyPercentage = Math.floor(this.character.energy / 10) * 10; // Calculate energy percentage
        let imageIndex = Math.floor(energyPercentage / 20);// Calculate the index for the image array
        let path = this.IMAGES_STATUSBAR[imageIndex] ; 
        this.img = this.imageCache[path]; // Update the displayed image
    }
}