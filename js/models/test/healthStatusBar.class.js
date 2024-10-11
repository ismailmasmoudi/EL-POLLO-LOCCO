
class HealthStatusBar extends StatusBarBase {
    constructor(character) {
        super(character, 30, 10, 200, 60); // Call super() first

        this.images = this.IMAGES.health; // Now you can access this.IMAGES
        this.loadImages(this.images).then(() => {
            this.updateStatusBar(); 
        });
    }

    async updateStatusBar() { 
        try {
            let energyPercentage = Math.floor(this.character.energy / 10) * 10; 
            let imageIndex = Math.floor(energyPercentage / 20);
            let path = this.images[imageIndex]; // Access images directly

            let img = await this.loadImage(path); 
            this.img = img;
        } catch (error) {
            console.error("Error loading image:", error);
        }
    }
}