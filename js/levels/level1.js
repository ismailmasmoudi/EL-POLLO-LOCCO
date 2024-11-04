let Level1 = {};

function initLevel1() {
    // let lastBackgroundObject = null; // Initialize to null
    Level1.enemies = [
        new Chicken(500),
        new Chicken(800),
        new Chicken(1200),
        new Chicken(1500),
        new Chicken(1800),
        new Chicken(2100),
        new Chicken(2400),
        new Chicken(2600),
        new Chicken(2700),
        new Chicken(2900),
        new Chicken(3000),
        new Chicken(3100),
        new Chicken(3200),
        new Chicken(3300),
        new Chicken(3400),
        new Chicken(3500),
        new SmallChicken(600),  
        new SmallChicken(1000), 
        new SmallChicken(1300), 
        new SmallChicken(1600),
        new SmallChicken(2000),
        new SmallChicken(2300),
        new SmallChicken(2500),
        new SmallChicken(2650),
        new SmallChicken(2800),
        new SmallChicken(2950),
        new SmallChicken(3100),
        new SmallChicken(3150),
        new SmallChicken(3250),
        new SmallChicken(3350),
        new SmallChicken(3450),
        new SmallChicken(3550),
    ];

    Level1.clouds = [
        new Cloud(300),
        new Cloud(1500),
        new Cloud(2500),
        new Cloud(3500)
    ];

    Level1.backgoundObjects = [
        new BackgoungObject('img/5_background/layers/air.png', -719),
        new BackgoungObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgoungObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgoungObject('img/5_background/layers/1_first_layer/2.png', -719),
    
        new BackgoungObject('img/5_background/layers/air.png', 0),
        new BackgoungObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgoungObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgoungObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgoungObject('img/5_background/layers/air.png', 719),
        new BackgoungObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgoungObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgoungObject('img/5_background/layers/1_first_layer/2.png', 719),
    
        new BackgoungObject('img/5_background/layers/air.png', 719*2),
        new BackgoungObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgoungObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgoungObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgoungObject('img/5_background/layers/air.png', 719*3),
        new BackgoungObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgoungObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgoungObject('img/5_background/layers/1_first_layer/2.png', 719*3) ,
    
        new BackgoungObject('img/5_background/layers/air.png', 719*4),
        new BackgoungObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgoungObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgoungObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        new BackgoungObject('img/5_background/layers/air.png', 719*5),
        new BackgoungObject('img/5_background/layers/3_third_layer/2.png', 719*5),
        new BackgoungObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgoungObject('img/5_background/layers/1_first_layer/2.png', 719*5),
        new BackgoungObject('img/5_background/layers/air.png', 719*6),
        new BackgoungObject('img/5_background/layers/3_third_layer/1.png', 719*6),
        new BackgoungObject('img/5_background/layers/2_second_layer/1.png', 719*6),
        new BackgoungObject('img/5_background/layers/1_first_layer/1.png', 719*6)
    ];

    Level1.bottles = [
        new Bottle(400, 340),
        new Bottle(800, 340),
        new Bottle(1200, 340),
        new Bottle(1600, 340),
        new Bottle(2000, 340),
        new Bottle(2400, 340),
        new Bottle(2800, 340),
        new Bottle(3200, 340),
        new Bottle(3400, 340),
        new Bottle(3600, 340)
    ];

    Level1.coins = [
        new Coin(600, 100),
        new Coin(1000, 120),
        new Coin(1400, 150),
        new Coin(1800, 200),
        new Coin(2200, 70),
        new Coin(2600, 110),
        new Coin(3000, 150),
        new Coin(2300, 90),
        new Coin(1200, 120),
        new Coin(3100, 200)
    ];
    console.log("Coins initialized:", Level1.coins); // Check the coins array

    Level1.endboss = new Endboss(3700); // Add the endboss here

    Level1.level_end_x = 4000;


    // Check if the array is defined
    if (Level1.backgoundObjects && Level1.backgoundObjects.length > 0) {
        lastBackgroundObject = Level1.backgoundObjects[Level1.backgoundObjects.length - 1];
    }
}
