let canvas;
let world;
let keyboard = new Keyboard();
let gameIntervals = [];


/**
 * This function initializes the game by setting up the canvas and world.
 * It also starts checking the position of the endboss relative to the character.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.level.endboss.checkCharacterPosition();
}


/**
 * This function starts the game by hiding the startscreen, 
 * showing the canvas and initializing the game.
 */
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').classList.remove('d-none');
    init();
}


function restartGame() {
    clearAllIntervals();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
