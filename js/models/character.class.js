class Character extends MovableObject {

    height = 300;
    width = 150;
    y = 65;
    speed = 1.2;
    world;
    coins = 0;
    bottles = 0;
    idleStartTime = null;
    throwableBottles = 0;
    passedBoundary = false;
    otherDirection = false;
    offset = {
        top: 120,
        bottom: 15,
        left: 40,
        right: 40
    };

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor(world, keyboard) {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.world = world;
        this.keyboard = keyboard;
    }


    /**
     * Animates the character's movement and actions based on keyboard input.
     */
    animate() {
        setInterval(() => {
            if (gameStarted) {
                this.handleMovement();
                this.world.camera_x = -this.x + 100;
                this.handleJump();
                this.updateIdleStartTime();
            }
        }, 100 / 60);
        setInterval(() => {
            if (gameStarted) {
                this.handleAnimation();
            }
        }, 80);
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
    }

    /**
     * Plays the walking sound if sound is enabled.
     */
    playWalkingSound() {
        if (soundManager.isSoundOn) {
            soundManager.characterWalkingSound.play();
        }
    }

    /**
     * Handles the character's jump action.
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            if (soundManager.isSoundOn) {
                soundManager.characterJumpSound.play();
            }
        }
    }

    /**
     * Updates the idle start time based on character movement.
     */
    updateIdleStartTime() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
            if (this.idleStartTime === null) {
                this.idleStartTime = Date.now();
            }
        } else {
            this.idleStartTime = null;
        }
    }

    /**
     * Handles the character's animation based on its current state.
     */
    handleAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (soundManager.isSoundOn) {
                soundManager.characterHurtSound.play();}
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleStartTime = null;
        } else if (this.idleStartTime) {this.playIdleOrSleepAnimation();}
    }

    /**
     * Plays the idle or sleeping animation based on idle duration.
     */
    playIdleOrSleepAnimation() {
        let currentTime = Date.now();
        let idleDuration = (currentTime - this.idleStartTime) / 1000;
        if (idleDuration > 10) {
            this.playAnimation(this.IMAGES_SLEEP);
            if (soundManager.isSoundOn) {
                soundManager.characterSleepSound.play();
            }
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Makes the character jump.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 28;
            this.idleStartTime = null;
        }
    }

    /**
     * Handles the character jumping on an enemy.
     * @param {Enemy} enemy - The enemy to jump on.
     */
    jumpOn(enemy) {
        if (this.isJumpingOn(enemy)) {
            if (this.isFalling(enemy)) {
                enemy.kill();
            }
        }
    }

    /**
     * Checks if the character is jumping on an enemy.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
     */
    isJumpingOn(enemy) {
        return this.isAbove(enemy) && this.isFalling() && this.isCollidingHorizontally(enemy);
    }

    /**
     * Checks if the character is above another object.
     * @param {MovableObject} mo - The object to check.
     * @returns {boolean} True if the character is above the object, false otherwise.
     */
    isAbove(mo) {
        return this.y + this.height - this.offset.bottom < mo.y + mo.offset.top;
    }

    /**
     * Checks if the character is falling at a certain speed, considering the enemy type.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the character is falling at the required speed, false otherwise.
     */
    isFalling(enemy) {
        if (enemy instanceof SmallChicken) {
            return this.speedY < -20;
        } else if (enemy instanceof Chicken) {
            return this.speedY < -17;
        } else {
            return this.speedY < -17;
        }
    }

    /**
     * Checks if the character is colliding horizontally with another object.
     * @param {MovableObject} mo - The object to check.
     * @returns {boolean} True if the character is colliding horizontally, false otherwise.
     */
    isCollidingHorizontally(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    }
}
