let canvas;
let world;
let keyboard = new Keyboard();
let startscreenTheme = new Audio('./audio/theme.mp3');
startscreenTheme.loop = true;
let gameTheme = new Audio('./audio/ingame_music.mp3');
gameTheme.loop = true;
gameTheme.volume = 0.5;


/**
 * This function shows the startscreen and initiates the startscreen music.
 */
function showStartscreen() {
    document.getElementById('start-question').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('controls').classList.remove('d-none');
    playStartscreenMusic();
}


/**
 * This function initializes the game by setting up the canvas and world.
 * It also starts checking the position of the endboss relative to the character.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.level.endboss.checkCharacterPosition();
}


/**
 * This function starts the game by hiding the startscreen, 
 * showing the canvas and initializing the game.
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
    playIngameMusic();
    stopStartscreenMusic();
}


/**
 * This function restarts the game by clearing all intervals,
 * hiding the game over screen, showing the canvas and reinitializing the game.
 */
function restartGame() {
    clearAllIntervals();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('game-won-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
    playIngameMusic();
}


/**
 * This function plays the starscreen music.
 */
function playStartscreenMusic() {
    startscreenTheme.currentTime = 0;
    startscreenTheme.play();
}


/**
 * This function stops the starscreen music.
 */
function stopStartscreenMusic() {
    startscreenTheme.pause();
    startscreenTheme.currentTime = 0;
}


/**
 * This function clears all active intervals.
 * It iterates through a large range of interval IDs and clears each one.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * This function plays the ingame music.
 */
function playIngameMusic() {
    gameTheme.currentTime = 0;
    gameTheme.play();
}


/**
 * This function stops the ingame music.
 */
function pauseIngameMusic() {
    gameTheme.pause();
    gameTheme.currentTime = 0;
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
