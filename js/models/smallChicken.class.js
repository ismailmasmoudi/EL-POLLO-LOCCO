class SmallChicken extends MovableObject {
    /**
     * The vertical position of the small chicken on the canvas.
     * @type {number}
     */
    y = 385;
    /**
     * The height of the small chicken image.
     * @type {number}
     */
    height = 40;
    /**
     * The width of the small chicken image.
     * @type {number}
     */
    width = 40;
    /**
     * Indicates whether the small chicken is dead.
     * @type {boolean}
     */
    isDead = false;
    /**
     * Indicates whether the small chicken has been removed from the game.
     * @type {boolean}
     */
    removed = false;
    /**
     * Offsets for collision detection.
     * @type {object}
     */
    offset = {
        top: 30,
        bottom: 15,
        left: 15,
        right: 15
    };

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Image path for the dead chicken.
     * @type {string}
     */
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Constructs a new SmallChicken object.
     * @param {number} x - The initial x-coordinate of the small chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
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
