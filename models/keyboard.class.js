class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /**
     * This method creates an instance of World.
     */
    constructor() {
        this.registerEventListeners();
    }


    /**
     * This method registers the event listeners for keydown and keyup events.
     */
    registerEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.setKey(event.key, true);
        });

        document.addEventListener('keyup', (event) => {
            this.setKey(event.key, false);
        });
    }


    /**
     * This method sets the appropriate keyboard property based on the key and value.
     * @param {string} key - The key that was pressed or released.
     * @param {boolean} value - The value to set for the key property.
     */
    setKey(key, value) {
        if (key === 'ArrowLeft') {
            this.LEFT = value;
        }
        if (key === 'ArrowRight') {
            this.RIGHT = value;
        }
        if (key === 'ArrowUp') {
            this.UP = value;
        }
        if (key === 'ArrowDown') {
            this.DOWN = value;
        }
        if (key === ' ') {
            this.SPACE = value;
        }
        if (key === 'd' || key === 'D') {
            this.D = value;
        }
    }
}
