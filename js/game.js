let canvas;
let world;
let keyboard = new Keyboard();
let startscreen_theme = new Audio('./audio/theme.mp3');
startscreen_theme.loop = true;

let walking_sound = new Audio('../audio/running_looped.mp3');
let jumping_sound = new Audio('../audio/jump3.mp3');
let snoring_sound = new Audio('../audio/snore.mp3');
let hurt_sound = new Audio('../audio/character_hurt.mp3');
let chick_dying_sound = new Audio('../audio/chick.mp3');
let chicken_dying_sound = new Audio('../audio/chicken.mp3');
let endboss_hurt_sound = new Audio('../audio/endboss_hurt.mp3');
let coin_sound = new Audio('../audio/coin.mp3');
let bottle_sound = new Audio('../audio/collect_bottle.mp3');

let game_theme = new Audio('./audio/ingame_music.mp3');
game_theme.loop = true;
game_theme.volume = 0.2;
let win_theme = new Audio('./audio/win.mp3');
let lose_theme = new Audio('./audio/lose.mp3');
let isMuted = false;


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
    startscreen_theme.currentTime = 0;
    startscreen_theme.play();
}


/**
 * This function stops the starscreen music.
 */
function stopStartscreenMusic() {
    startscreen_theme.pause();
    startscreen_theme.currentTime = 0;
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
    game_theme.currentTime = 0;
    game_theme.play();
}


/**
 * This function stops the ingame music.
 */
function pauseIngameMusic() {
    game_theme.pause();
    game_theme.currentTime = 0;
}


/**
 * This function plays the win music.
 */
function playWinMusic() {
    win_theme.currentTime = 0;
    win_theme.play();
}


/**
 * This function plays the lose music.
 */
function playLoseMusic() {
    lose_theme.currentTime = 0;
    lose_theme.play();
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
