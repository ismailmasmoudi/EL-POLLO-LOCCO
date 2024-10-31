class CollectableObject extends MovableObject {
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 50; 
        this.height = 50; 
        this.offset = {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
        };
    }

    collect(character) {
        if (this instanceof Coin) {
            character.coins++; 
        } else if (this instanceof Bottle) {
            character.bottles++; 
        }
    }
}
