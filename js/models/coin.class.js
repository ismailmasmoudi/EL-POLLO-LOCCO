class Coin extends CollectableObject {
    constructor(x, y) {
        super('./img/8_coin/coin_1.png', x, y);
        this.width = 120;
        this.height = 120;
        this.originalWidth = this.width;
        this.originalHeight = this.height;
        this.scaleFactor = 1;
        this.growing = true;
        this.animationSpeed = 0.05;
        this.animateSize();
    }

    /**
     * Animates the size of the coin, making it grow and shrink smoothly.
     */
    animateSize() {
        setInterval(() => {
            if (this.growing) {
                this.scaleFactor += this.animationSpeed;
                if (this.scaleFactor >= 1.05) {
                    this.growing = false;
                }
            } else {
                this.scaleFactor -= this.animationSpeed;
                if (this.scaleFactor <= 1) {
                    this.growing = true;
                }
            }
            this.width = this.originalWidth * this.scaleFactor;
            this.height = this.originalHeight * this.scaleFactor;
        }, 1000 / 5);
    }
}
