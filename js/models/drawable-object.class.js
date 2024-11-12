class drawableObject {
    /**
     * The x-coordinate of the object on the canvas.
     * @type {number}
     */
    x = 120;
    /**
     * The height of the object's image.
     * @type {number}
     */
    height = 100;
    /**
     * The width of the object's image.
     * @type {number}
     */
    width = 100;
    /**
     * The image object representing the object.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * A cache of loaded images, indexed by their paths.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};
    /**
     * The index of the current image in an animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the object's `img` property.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of images from the specified paths and stores them in the `imageCache`.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's image on the canvas at its current position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
        }
    }
}
