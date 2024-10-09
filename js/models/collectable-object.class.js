class CollectableObject extends MovableObject {
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 50; 
        this.height = 50; 
        this.offset = {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        };
    }

    // Wird aufgerufen, wenn das Objekt eingesammelt wird
    collect(character) {
        if (this instanceof Coin) {
            character.coins++; 
        } else if (this instanceof Bottle) {
            character.bottles++; 
        }
    }
}
