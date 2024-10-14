class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 80;
    offset = {
        top: 20,     // Example: Adjust as needed
        bottom: 10,   // Example: Adjust as needed
        left: 15,    // Example: Adjust as needed
        right: 15    // Example: Adjust as needed
    };
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = Math.random() * 5000; // 500 not 5000 just for testing
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








