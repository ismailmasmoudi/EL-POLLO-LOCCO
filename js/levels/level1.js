
const Level1 = new Level(
[
    new Chicken(500),
    new Chicken(800),
    new Chicken(1200),
    new Chicken(1500),
    new Chicken(1800),
    new Chicken(2100),
    new Chicken(2400),
    new SmallChicken(300),  
    new SmallChicken(600),  
    new SmallChicken(1000), 
    new SmallChicken(1300), 
    new SmallChicken(1600),
    new SmallChicken(2000),
    new SmallChicken(2300),
    new SmallChicken(2600)
]
,[
    new Cloud()
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
generateRandomCoins(5) , // Your existing coin generation
generateRandomBottles(5),
new Endboss(2700) // 
);

function generateRandomCoins(numCoins) {
    const coins = [];
    let x = 350; // Start position of the first coin
    for (let i = 0; i < numCoins; i++) {
        let y = Math.random() * 300; // Adjust the maximum y-coordinate as needed
        coins.push(new Coin(x, y));
        x += 350; // Distance of at least 150 between the coins (30 + Coin width of 120)
    }
    return coins;
};                        

function generateRandomBottles(numBottles) {
    const bottles = [];
    let x = 500; // Adjust the starting x-coordinate as needed
    for (let i = 0; i < numBottles; i++) {
        let y = 340; // Adjust the maximum y-coordinate as needed
        bottles.push(new Bottle(x, y));
        x += 350; // Adjust the spacing between bottles as needed
    }
    return bottles;
}
