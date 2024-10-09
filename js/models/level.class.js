class Level {
   enemies;
   clouds;
   backgoundObjects;
   level_end_x = 2700;
   coins = [];
   bottles = [];
   constructor(enemies, clouds, backgoundObjects, coins, bottles) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgoundObjects = backgoundObjects;
      this.coins = coins;
      this.bottles = bottles;
   }
}   
