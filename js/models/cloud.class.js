class Cloud extends MovableObject {
    /**
     * The vertical position of the cloud on the canvas.
     * @type {number}
     */
    y = 5;
    /**
     * The width of the cloud image.
     * @type {number}
     */
    width = 500;
    /**
     * The height of the cloud image.
     * @type {number}
     */
    height = 250;

    /**
     * Constructs a new Cloud object.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.speed = 0.09;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at regular intervals.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Updates the cloud's position by moving it to the left.
     */
    update() {
        this.moveLeft();
    }
}
