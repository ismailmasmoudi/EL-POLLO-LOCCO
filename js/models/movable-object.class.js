class MovableObject {
    x = 120;
    img;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 130;
    }

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementId('')
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image(); // this.img = document.getElementId('')
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i=  % 6 ; => 1 , Rest 1 //berechnet er den Rest der Division von this.currentImage
        // i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }
    jump(){
    this.speedY=20;
    }
}