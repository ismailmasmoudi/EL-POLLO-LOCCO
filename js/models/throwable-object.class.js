class ThrowableObject extends MovableObject {
    /**
     * Indicates whether the bottle has collided.
     * @type {boolean}
     */
    bottleCollided = false;
    /**
     * Indicates whether the bottle is currently spinning.
     * @type {boolean}
     */
    isSpinning = false;

    IMAGES_BOTTLE_SPIN = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

  
    IMAGE_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Constructs a Bottle object with specified coordinates and direction.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     * @param {boolean} isAhead - Whether the bottle is thrown ahead (true) or behind (false).
     */
    constructor(x, y, isAhead) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_SPIN);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.ahead = isAhead;
        this.offset = { top: 0, left: 0, right: 0, bottom: 0 };
        this.throw();
        this.animate();
    }

    /**
     * Marks the bottle as collided, stops its vertical movement, and plays a sound effect.
     */
    bottleIsColliding() {
        this.bottleCollided = true;
        this.speedY = 0;
        if (soundManager.isSoundOn) {
            soundManager.bottleHitSound.play();
        }
    }

    /**
     * Initiates the throwing animation and movement of the bottle.
     */
    throw() {
        this.speedY = 20;
        this.isSpinning = true;
        this.applyGravity();
        setInterval(() => {
            this.ahead ? this.x += 10 : this.x -= 10;
        }, 25);
        if (soundManager.isSoundOn) {
            soundManager.bottleThrowSound.play();
        }
    }

    /**
     * Animates the bottle, switching between spinning and splash animations.
     */
    animate() {
        let splashAnimationStarted = false;
        setInterval(() => {
            if (this.isSpinning) {
                this.playAnimation(this.IMAGES_BOTTLE_SPIN);
            } else if (this.bottleCollided && !splashAnimationStarted) {
                this.playSplashAnimation();
                splashAnimationStarted = true;
            }
        }, 50);
    }

    /**
     * Plays the bottle splash animation and removes the bottle from the game after a delay.
     */
    playSplashAnimation() {
        this.isSpinning = false;
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        setTimeout(() => {
            this.removeFromGame();
        }, this.IMAGE_BOTTLE_SPLASH.length * 100);
    }
}
