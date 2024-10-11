class BottleStatusBar extends StatusBarBase {
    constructor(character) {
        super(character, 30, 50, 200, 60); // Call super() first

        this.images = this.IMAGES.bottles; // Now you can access this.IMAGES
        this.loadImages(this.images).then(() => {
            this.updateStatusBar(); 
        });
    }

    updateStatusBar() {
        let imageIndex = Math.floor(this.character.bottles / 20);
        imageIndex = Math.min(imageIndex, this.images.length - 1);
        this.img = this.imageCache[this.images[imageIndex]];
    }
}
