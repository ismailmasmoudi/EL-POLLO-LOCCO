class Cloud extends MovableObject {
    y = 5;
    width = 500;
    height = 250;

    constructor(x) {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
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
