let level1;


/**
 * This function initializes the game level by creating a new instance of the Level class
 * and populating it with enemies, clouds, background objects, coins and bottles.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(600),
            new Chicken(3200),
            new Chicken(3800),
            new Chicken(4000),
            new Chicken(4200),
            new Chicken(4400),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(700),
            new Chick(3800),
            new Chick(3800),
            new Chick(4000),
            new Chick(4400),
            new Chick(4400),
            new Endboss()
        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(400),
            new Cloud(1600),
            new Cloud(2400),
            new Cloud(2900),
            new Cloud(3200),
            new Cloud(3800),
            new Cloud(4200),
            new Cloud(4400),
            new Cloud(4400)
        ],

        [
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', -719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 0),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('https://oliverdrexler.com/pollo-loco/img/5_background/layers/1_first_layer/1.png', 719 * 6)

        ],

        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],

        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles()
        ]
    );
}