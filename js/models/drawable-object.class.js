class drawableObject {
    x = 120;
    height = 100;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
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

    draw(ctx) {
        try{
    
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(e){
            console.warn('Error loading image',e);
            console.log('could not load img ',this.img.src);
        }
    }

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken) {
    //         ctx.beginPath();
    //         ctx.lineWidth = "5";
    //         ctx.strokeStyle = "blue";
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

   

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
    
            // Apply offsets to the rectangle's position and dimensions
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, // Only add top offset to y-position
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
    
   

}