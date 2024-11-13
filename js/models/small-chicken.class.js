class SmallChicken extends MovableObject {
    y = 385;
    height = 40;
    width = 40;
    isDead = false;
    removed = false;
    offset = {
        top: 30,
        bottom: 15,
        left: 15,
        right: 15
    };

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = './img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages([this.IMAGE_DEAD]);
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
