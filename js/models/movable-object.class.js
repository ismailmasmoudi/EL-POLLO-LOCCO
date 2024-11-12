class MovableObject extends drawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        }
        else { return this.y < 130; }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 0.1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;

    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    removeFromGame() {
        this.removed = true;
    }

    animate() {
        this.moveInterval = setInterval(() => { // Store the interval ID
            if (gameStarted) { // Check gameStarted flag
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => { // Store the interval ID
            if (gameStarted && !this.isDead) { // Check gameStarted flag
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    // Add a method to clear the intervals
    clearIntervals() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }

    kill() {
        this.speed = 0;
        this.img = this.imageCache[this.IMAGE_DEAD];
        this.draw(this.world.ctx);
        this.isDead = true;
        if (soundManager.isSoundOn) {
            if (this instanceof Chicken) {
                soundManager.chickenDeadSound.play();
            } else if (this instanceof SmallChicken) {
                soundManager.SmallchickenDeadSound.play();
            }
        }
        setTimeout(() => {
            this.removeFromGame();
        }, 200);
    }

}