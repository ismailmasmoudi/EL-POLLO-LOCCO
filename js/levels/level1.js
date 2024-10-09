
const Level1 = new Level(
[
    new Chicken(),
    new Chicken(),
    new Chicken(),
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
]
,
[
    new Coin(200, 200),
    new Coin(500, 150),
    // ... weitere Coins
],
[
    new Bottle(300, 250),
    new Bottle(500, 150)
   
])