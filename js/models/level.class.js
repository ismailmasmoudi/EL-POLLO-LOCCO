class Level {
   enemies;
   clouds;
   backgoundObjects;
   level_end_x = 2700;
   coins = [];
   bottles = [];
   endboss;
   constructor(enemies, clouds, backgoundObjects, coins, bottles, endboss) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgoundObjects = backgoundObjects;
      this.coins = coins;
      this.bottles = bottles;
      this.endboss = endboss;
   }
}   
