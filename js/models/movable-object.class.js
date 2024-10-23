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
        if (this instanceof ThrowableObject) { // throwable object always full
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
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    moveRight() {
        this.x += this.speed;
        console.log(this.x);
    }


    moveLeft() {
        this.x -= this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i=  % 6 ; => 1 , Rest 1 //berechnet er den Rest der Division von this.currentImage
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    removeFromGame() {
        this.removed = true; 
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
        this.img = this.imageCache[this.IMAGE_DEAD]; // Assuming IMAGE_DEAD is available in MovableObject
        this.draw(this.world.ctx); 
        this.isDead = true; 

        setTimeout(() => { 
            this.removeFromGame(); 
        }, 500); 
    }

}