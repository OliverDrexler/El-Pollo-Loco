class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    
    /**
     * Creates an instance of Level.
     * @param {Array} enemies - An array of enemy objects in the level.
     * @param {Array} clouds - An array of cloud objects in the level.
     * @param {Array} backgroundObjects - An array of background objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}