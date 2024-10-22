class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 100;
    isDead = false; 
    removed = false;
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

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        // this.loadImages([this.IMAGE_DEAD]); // Pass IMAGE_DEAD as an array
        this.animate();
        this.imgDead = new Image();
        this.imgDead.onload = () => { 
            this.imageCache[this.IMAGE_DEAD] = this.imgDead; // Add to cache when loaded
        };
        this.imgDead.src = this.IMAGE_DEAD; 
        this.x = x; // 500 not 5000 just for testing
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
            if (!gamePaused && !this.isDead) { 
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    kill() {
        this.speed = 0;
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.draw(this.world.ctx); 
        this.isDead = true; 

        // Delay before marking for removal
        setTimeout(() => { 
            this.removeFromGame(); 
        }, 500); // Adjust delay as needed for your animation
    }
    
 
}








