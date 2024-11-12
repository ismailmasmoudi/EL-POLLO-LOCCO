class Chicken extends MovableObject {
    y = 330;
    height = 100;
    width = 100;
    isDead = false; 
    removed = false;
    offset = {
        top: 15,     
        bottom: 10,   
        left: 5,    
        right: 5    
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
        this.animate();
        this.imgDead = new Image();
        this.imgDead.onload = () => { 
            this.imageCache[this.IMAGE_DEAD] = this.imgDead;
        };
        this.imgDead.src = this.IMAGE_DEAD; 
        this.x = x;
        this.speed = 0.5 + Math.random() * 0.25;
        this.moveLeft();
    }  
}








