class Chicken extends MovableObject {
    /**
     * The vertical position of the chicken on the canvas.
     * @type {number}
     */
    y = 330;
    /**
     * The height of the chicken image.
     * @type {number}
     */
    height = 100;
    /**
     * The width of the chicken image.
     * @type {number}
     */
    width = 100;
    /**
     * Indicates whether the chicken is dead.
     * @type {boolean}
     */
    isDead = false;
    /**
     * Indicates whether the chicken has been removed from the game.
     * @type {boolean}
     */
    removed = false;
    /**
     * Offsets for collision detection.
     * @type {object}
     */
    offset = {
        top: 15,
        bottom: 10,
        left: 5,
        right: 5
    };
    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    /**
     * Image path for the dead chicken.
     * @type {string}
     */
    IMAGE_DEAD = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Constructs a new Chicken object.
     * @param {number} x - The initial x-coordinate of the chicken.
     */
    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
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
