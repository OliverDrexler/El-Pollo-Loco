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
        this.registerTouchListeners();
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
     * This method registers the touch event listeners for the control buttons.
     */
    registerTouchListeners() {
        const buttons = this.getControlButtons();
        buttons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                element.addEventListener('touchstart', () => this.setKey(button.key, true));
                element.addEventListener('touchend', () => this.setKey(button.key, false));
            }
        });
    }

    /**
    * This method returns the control buttons with their corresponding keys.
    * @returns {Array} An array of control buttons with IDs and keys.
    */
    getControlButtons() {
        return [
            { id: 'btnLeft', key: 'ArrowLeft' },
            { id: 'btnJump', key: 'ArrowUp' },
            { id: 'btnRight', key: 'ArrowRight' },
            { id: 'btnThrow', key: 'd' }
        ];
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
