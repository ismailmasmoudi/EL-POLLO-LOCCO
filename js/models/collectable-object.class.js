class CollectableObject extends MovableObject {
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 50; 
        this.height = 50; 
        this.offset = {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
        };
    }

    collect(character) {
        if (this instanceof Coin) {
            character.coins++; 
            if (soundManager.isSoundOn) {
                soundManager.coinCollectSound.play(); 
            }
        } else if (this instanceof Bottle) {
            character.bottles++; 
            character.throwableBottles++; 
            if (soundManager.isSoundOn) {
                soundManager.bottleCollectSound.play(); 
            }
        }
        }
    }

