class MovableObject extends drawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    moveInterval;
    animationInterval;

    /**
     * Applies gravity to the object, simulating downward acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy when hit and updates the last hit timestamp.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is hurt (has been hit recently).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.2;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation by cycling through an array of images.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Removes the object from the game.
     */
    removeFromGame() {
        this.removed = true;
    }

    /**
     * Starts the animation loop for the object.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            if (gameStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (gameStarted && !this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Clears the animation intervals.
     */
    clearIntervals() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }

    /**
    * Kills the object, setting its speed to 0, changing its image to the dead image,
    * playing a death sound, and removing it from the game after a delay.
    */
    kill() {
        this.speed = 0;
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.draw(this.world.ctx);
        this.isDead = true;
        this.playDeathSound();
        setTimeout(() => this.removeFromGame(), 200);
    }

    /**
    * Plays the appropriate death sound for the object if sound is enabled.
    */
    playDeathSound() {
        if (soundManager.isSoundOn) {
            if (this instanceof Chicken) {
                soundManager.chickenDeadSound.play();
            } else if (this instanceof SmallChicken) {
                soundManager.SmallchickenDeadSound.play();
            }
        }
    }
}

