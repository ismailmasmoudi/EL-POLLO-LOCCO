class drawableObject {
    x = 120;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try{
    
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(e){
            console.warn('Error loading image',e);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}