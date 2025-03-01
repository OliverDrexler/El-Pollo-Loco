class Level {
    
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 4400;

    
    /**
     * Creates an instance of Level.
     * Initializes the enemies, clouds, background objects, coins, and bottles.
     * Sets the endboss as the first enemy instance of Endboss found in the enemies array.
     * @param {Array} enemies - An array of enemy objects in the level.
     * @param {Array} clouds - An array of cloud objects in the level.
     * @param {Array} backgroundObjects - An array of background objects in the level.
     * @param {Array} coins - An array of coin objects in the level.
     * @param {Array} bottles - An array of bottle objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = this.enemies.find(enemy => enemy instanceof Endboss);
    }
    
}