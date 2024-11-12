class Bottle extends CollectableObject {
    /**
     * Constructs a new Bottle object.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     */
    constructor(x, y) {
        super('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', x, y);
        /**
         * The width of the bottle image.
         * @type {number}
         */
        this.width = 100;
        /**
         * The height of the bottle image.
         * @type {number}
         */
        this.height = 100;
    }
}
