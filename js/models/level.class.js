class Level {
   enemies;
   clouds = [];
   backgoundObjects;
   coins = [];
   bottles = [];
   endboss;
   level_end_x; 
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


// class Level {
//    enemies = [];
//    clouds = [];
//    backgoundObjects = [];
//    coins = [];
//    bottles = [];
//    endboss;
//    level_end_x; 

//    constructor(enemies, clouds, backgoundObjects, bottles, coins, endboss, level_end_x) {

//        this.enemies = [...enemies]; // Deep copy using spread syntax
//        this.clouds = [...clouds];
//        this.backgoundObjects = [...backgoundObjects];
//        this.bottles = [...bottles];
//        this.coins = [...coins];
//        this.endboss = endboss;
//        this.level_end_x = level_end_x;
//    }
// }   
