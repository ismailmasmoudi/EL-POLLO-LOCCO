class SmallChicken extends MovableObject {
    y = 385;
    height = 40;
    width = 40;
    offset = {
        top: 10,     // Example: Adjust as needed
        bottom: 5,   // Example: Adjust as needed
        left: 5,    // Example: Adjust as needed
        right: 5    // Example: Adjust as needed
    };
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 0.25;

        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            if (!gamePaused) { 
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!gamePaused) { 
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

}








