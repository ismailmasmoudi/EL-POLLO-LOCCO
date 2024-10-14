class Bottle extends CollectableObject {
    constructor(x, y) {
        super('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', x, y);
        this.width = 100; // Adjust this value as needed
        this.height = 100; 
    }

    collect(character) {
        character.bottles++; 
        character.throwableBottles++; 
    }
}
