class Coin extends CollectableObject {
    /**
     * Constructs a new Coin object.
     * @param {number} x - The initial x-coordinate of the coin.
     * @param {number} y - The initial y-coordinate of the coin.
     */
    constructor(x, y) {
        super('img/8_coin/coin_1.png', x, y);
        /**
         * The width of the coin image.
         * @type {number}
         */
        this.width = 120;
        /**
         * The height of the coin image.
         * @type {number}
         */
        this.height = 120;
        /**
         * The original width of the coin image, used for scaling.
         * @type {number}
         */
        this.originalWidth = this.width;
        /**
         * The original height of the coin image, used for scaling.
         * @type {number}
         */
        this.originalHeight = this.height;
        /**
         * The scaling factor for the coin's size animation.
         * @type {number}
         */
        this.scaleFactor = 1;
        /**
         * Indicates whether the coin is currently growing in size.
         * @type {boolean}
         */
        this.growing = true;
        /**
         * The speed of the coin's size animation.
         * @type {number}
         */
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
