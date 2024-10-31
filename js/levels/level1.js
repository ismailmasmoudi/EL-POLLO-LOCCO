
const Level1 = new Level(
[
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
    new SmallChicken(300),  
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
]
,[
    new Cloud(300),
    new Cloud(1500),
    new Cloud(2500),
    new Cloud(3500)
],
[
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
    new BackgoungObject('img/5_background/layers/1_first_layer/2.png', 719*5)
] ,
generateRandomCoins(10) , // Your existing coin generation
generateRandomBottles(10),
new Endboss(3700) ,
4000
);

const lastBackgroundObject = Level1.backgoundObjects[Level1.backgoundObjects.length - 1];
Level1.level_end_x = 4000; 


function generateRandomCoins(numCoins) {
    const coins = [];
    let x = 350; // Start position of the first coin
    const maxCoins = 10; // Set the maximum number of coins
    for (let i = 0; i < Math.min(numCoins, maxCoins); i++) { // Limit to maxCoins
        let y = Math.random() * 300; // Adjust the maximum y-coordinate as needed
        coins.push(new Coin(x, y));
        x += 350; // Distance of at least 150 between the coins (30 + Coin width of 120)
    }
    return coins;
}

function generateRandomBottles(numBottles) {
    const bottles = [];
    let x = 500; // Adjust the starting x-coordinate as needed
    const maxBottles = 10; // Set the maximum number of bottles
    for (let i = 0; i < Math.min(numBottles, maxBottles); i++) { // Limit to maxBottles
        let y = 340; // Adjust the maximum y-coordinate as needed
        bottles.push(new Bottle(x, y));
        x += 350; // Adjust the spacing between bottles as needed
    }
    return bottles;
}