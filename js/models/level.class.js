class Level {
   /**
    * An array of enemy objects in the level.
    * @type {Enemy[]}
    */
   enemies;
   /**
    * An array of cloud objects in the level.
    * @type {Cloud[]}
    */
   clouds = [];
   /**
    * An array of background objects in the level.
    * @type {BackgoungObject[]}
    */
   backgoundObjects;
   /**
    * An array of coin objects in the level.
    * @type {Coin[]}
    */
   coins = [];
   /**
    * An array of bottle objects in the level.
    * @type {Bottle[]}
    */
   bottles = [];
   /**
    * The endboss object for the level.
    * @type {Endboss}
    */
   endboss;
   /**
    * The x-coordinate of the end of the level.
    * @type {number}
    */
   level_end_x;

   /**
    * Constructs a new Level object.
    * @param {Enemy[]} enemies - An array of enemy objects.
    * @param {Cloud[]} clouds - An array of cloud objects.
    * @param {BackgoungObject[]} backgoundObjects - An array of background objects.
    * @param {Bottle[]} bottles - An array of bottle objects.
    * @param {Coin[]} coins - An array of coin objects.
    * @param {Endboss} endboss - The endboss object.
    * @param {number} level_end_x - The x-coordinate of the end of the level.
    */
   constructor(enemies, clouds, backgoundObjects, bottles, coins, endboss, level_end_x) {
       this.enemies = enemies;
       this.clouds = clouds;
       this.backgoundObjects = backgoundObjects;
       this.bottles = bottles;
       this.coins = coins;
       this.endboss = endboss;
       this.level_end_x = level_end_x;
   }
}
