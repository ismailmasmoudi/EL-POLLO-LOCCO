class Coin extends CollectableObject {
    constructor(x, y) {
        super('img/8_coin/coin_1.png', x, y);
    }

    collect(character) {
        character.coins++; // Erhöhe die Anzahl der Coins des Characters
    }
}
