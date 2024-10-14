
const Level1 = new Level(
[
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(), 
    new SmallChicken(), 
    new SmallChicken(), 
    new SmallChicken(),
    new Endboss()
],[
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
generateRandomBottles(5)
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
