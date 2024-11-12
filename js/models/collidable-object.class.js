class CollidableObject extends MovableObject {
    /**
     * Indicates whether the object can collide with other objects.
     * @type {boolean}
     */
    collidable = true;
    /**
     * The amount of damage the object inflicts on collision.
     * @type {number}
     */
    damage = 0;
    /**
     * Offsets for collision detection, adjusting the collision boundaries of the object.
     * @type {object}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
}
