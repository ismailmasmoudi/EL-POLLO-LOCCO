class Cloud extends MovableObject {
    y = 5;
    width = 500;
    height = 250;
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.speed = 0.09 ;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
    }
    update() {
        this.moveLeft();
    }
}
