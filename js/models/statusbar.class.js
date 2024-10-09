class StatusBar extends drawableObject {
    y = 10;
    x = 30;
    width = 200; // Add width
    height = 60;
    IMAGES_STATUSBAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    IMAGES_STATUSBAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_STATUSBAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'

    ];

    IMAGES_STATUSBAR_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];



    character; // Add a property to hold the character reference

    constructor(character) { // Pass the character object to the constructor
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
        this.loadImages(this.IMAGES_STATUSBAR_COINS);
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.character = character; // Store the character reference
        this.updateStatusBar(); // Initial update
        this.setCoinImage(0); // Initialisiere die Anzeige der Coins
        this.setBottleImage(0); // Initialisiere die Anzeige der Flaschen
    }

    // Function to update the displayed image
    updateStatusBar() {
        let energyPercentage = Math.floor(this.character.energy / 10) * 10; // Calculate energy percentage
        let imageIndex = Math.floor(energyPercentage / 20);// Calculate the index for the image array
        let path = this.IMAGES_STATUSBAR_HEALTH[imageIndex];
        this.img = this.imageCache[path]; // Update the displayed image
        this.setCoinImage(this.character.coins);
        this.setBottleImage(this.character.bottles);
    }
    async updateStatusBar() { // Make updateStatusBar async
        try {
            let energyPercentage = Math.floor(this.character.energy / 10) * 10; // Calculate energy percentage
            let imageIndex = Math.floor(energyPercentage / 20);// Calculate the index for the image array
            let path = this.IMAGES_STATUSBAR_HEALTH[imageIndex];

            // Wait for the image to load before updating
            let img = await this.loadImage(path); 
            this.img = img;

            this.setCoinImage(this.character.coins);
            this.setBottleImage(this.character.bottles);
        } catch (error) {
            console.error("Error loading image:", error);
        }
    }
    setCoinImage(coinCount) {
        let imageIndex = Math.floor(coinCount / 20); // Calculate image index based on coin count
        imageIndex = Math.min(imageIndex, this.IMAGES_STATUSBAR_COINS.length - 1); // Ensure index is within array bounds
        let path = this.IMAGES_STATUSBAR_COINS[imageIndex];
        this.img = this.imageCache[path]; // Update the displayed image
    }

    setBottleImage(bottleCount) {
        let imageIndex = Math.floor(bottleCount / 20); // Calculate image index based on bottle count
        imageIndex = Math.min(imageIndex, this.IMAGES_STATUSBAR_BOTTLES.length - 1); // Ensure index is within array bounds
        let path = this.IMAGES_STATUSBAR_BOTTLES[imageIndex];
        this.img = this.imageCache[path]; // Update the displayed image
    }
}