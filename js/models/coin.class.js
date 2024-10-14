class Coin extends CollectableObject {
    constructor(x, y) {
        super('img/8_coin/coin_1.png', x, y);
        this.width = 120; // Adjust this value as needed
        this.height = 120; // Adjust this value as needed
        
    }

    collect(character) {
        character.coins++; 
    }
}
