class Coin extends CollectableObject {
    constructor(x, y) {
        super('img/8_coin/coin_1.png', x, y);
        this.width = 120; 
        this.height = 120; 
        this.originalWidth = this.width; // Store the original width
        this.originalHeight = this.height; // Store the original height
        this.scaleFactor = 1; // Start with the original size
        this.growing = true; // Start by growing
        this.animationSpeed = 0.05; // Adjust the speed of the animation
        this.animateSize(); // Start the animation loop
    }

    // collect(character) {
    //     character.coins++; 
    //     if (soundManager.isSoundOn) {
    //         soundManager.coinCollectSound.play(); // Play collect sound
    //     }
    // }
    animateSize() {
        setInterval(() => {
            if (this.growing) {
                this.scaleFactor += this.animationSpeed;
                if (this.scaleFactor >= 1.05) { // Adjust the maximum scale factor as needed
                    this.growing = false;
                }
            } else {
                this.scaleFactor -= this.animationSpeed;
                if (this.scaleFactor <= 1) {
                    this.growing = true;
                }
            }

            // Update the width and height based on the scale factor
            this.width = this.originalWidth * this.scaleFactor;
            this.height = this.originalHeight * this.scaleFactor;
        }, 1000 / 5); // Adjust the animation speed here (in milliseconds)
    }
}
