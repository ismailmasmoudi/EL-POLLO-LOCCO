class Level {
   enemies;
   clouds;
   backgoundObjects;
   coins = [];
   bottles = [];
   endboss;
   level_end_x; 
   constructor(enemies, clouds, backgoundObjects, coins, bottles, endboss,level_end_x) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgoundObjects = backgoundObjects;
      this.coins = coins;
      this.bottles = bottles;
      this.endboss = endboss;
      this.level_end_x = level_end_x; 
   }
}   
