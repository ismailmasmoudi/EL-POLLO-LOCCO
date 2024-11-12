class ThrowableObject extends MovableObject {

    bottleCollided = false;
    isSpinning = false;

    IMAGES_BOTTLE_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    /**
     * Constructs a Bottle object with specified coordinates.
     * Loads the image assets for the bottle and its animations.
     * Sets the initial position and dimensions of the bottle.
     * Initiates the throwing animation and the animation loop.
     * @param {number} x - The x-coordinate of the bottle's position.
     * @param {number} y - The y-coordinate of the bottle's position.
     */
    constructor(x, y, isAhead) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_SPIN);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.ahead = isAhead;
        this.offset = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
        this.throw(100, 150);
        this.animate();
    }


    /**
     * Marks the bottle as collided and plays a sound effect.
     */
    bottleIsColliding() {
        this.bottleCollided = true;
        this.speedY = 0; 
        if (soundManager.isSoundOn) {
            soundManager.bottleHitSound.play();
        }
    }


    /**
     * Initiates the throwing action of the bottle.
     * Sets the initial vertical speed, starts spinning, plays a sound effect, and applies gravity.
     * Additionally, it sets an interval to move the bottle horizontally.
     */
    throw() {
        this.speedY = 20;
        this.isSpinning = true;
        this.applyGravity();
        setInterval(() => {
            if (this.ahead === true) {
                this.x += 10;
            } else {
                this.x -= 10;
            }
        }, 25);
        if (soundManager.isSoundOn) {
            soundManager.bottleThrowSound.play(); 
        }
    }

    /**
     * Initiates the animation of the bottle.
     * Sets intervals to switch between spinning and splash animations based on bottle state.
     */
    animate() {
        setInterval(() => {
            if (this.isSpinning) {
                this.playAnimation(this.IMAGES_BOTTLE_SPIN);
            }
        }, 50);

        let splashAnimationStarted = false; 

        setInterval(() => {
            if (this.bottleCollided && !splashAnimationStarted) {
                this.isSpinning = false;
                this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
                splashAnimationStarted = true; 
                setTimeout(() => {
                    this.removeFromGame();
                }, this.IMAGE_BOTTLE_SPLASH.length * 100); 
            }
        }, 100);
    }
}