class Bottle extends CollectableObject {
    constructor(x, y) {
        super('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', x, y);
    }

    collect(character) {
        character.bottles++; // Erhöhe die Anzahl der Flaschen des Characters
    }
}
