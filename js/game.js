let canvas;
let world;
let keyboard = new Keyboard();


/**
 * This function initializes the game by setting up the canvas and world and logging the character.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('my character is', world.character)
}


/**
 * This function hides the startscreen, shows the canvas and initializes the game.
 */
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    init();
}


/**
 * Event listener for keydown events.
 * Sets the appropriate keyboard properties to true based on the pressed key.
 * @param {KeyboardEvent} event - The keyboard event.
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }  
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }  
    if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    }  
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }  
    if (event.key === ' ') {
        keyboard.SPACE = true;
    }
});


/**
 * Event listener for keyup events.
 * Sets the appropriate keyboard properties to false based on the released key.
 * @param {KeyboardEvent} event - The keyboard event.
 */
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } 
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }  
    if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    }  
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }  
    if (event.key === ' ') {
        keyboard.SPACE = false;
    }
});
