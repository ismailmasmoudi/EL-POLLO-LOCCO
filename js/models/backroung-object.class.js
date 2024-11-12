class BackgoungObject extends MovableObject {
    /**
     * The width of the background object image.
     * @type {number}
     */
    width = 720;
    /**
     * The height of the background object image.
     * @type {number}
     */
    height = 480;

    /**
     * Constructs a new BackgoungObject object.
     * @param {string} imagePath - The path to the image representing the background object.
     * @param {number} x - The initial x-coordinate of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
