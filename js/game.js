let canvas;
let world;
let keyboard = new Keyboard();
let startscreen_theme = new Audio('https://oliverdrexler.com/pollo-loco/audio/theme.mp3');
let game_theme = new Audio('https://oliverdrexler.com/pollo-loco/audio/ingame_music.mp3');
let win_theme = new Audio('https://oliverdrexler.com/pollo-loco/audio/win.mp3');
let lose_theme = new Audio('https://oliverdrexler.com/pollo-loco/audio/lose.mp3');
let walking_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/running_looped.mp3');
let jumping_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/jump3.mp3');
let snoring_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/snore.mp3');
let hurt_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/character_hurt.mp3');
let chick_dying_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/chick.mp3');
let chicken_dying_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/chicken.mp3');
let endboss_hurt_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/endboss_hurt.mp3');
let coin_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/coin.mp3');
let bottle_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/collect_bottle.mp3');
let splashing_bottle_sound = new Audio('https://oliverdrexler.com/pollo-loco/audio/glass_break.mp3');
let endboss_theme = new Audio('https://oliverdrexler.com/pollo-loco/audio/ingame_music_endboss.mp3');
startscreen_theme.loop = true;
game_theme.loop = true;
game_theme.volume = 0.5;
let isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;


/**
 * This function shows the startscreen and initiates the startscreen music.
 */
function showStartscreen() {
    document.getElementById('startQuestion').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('muteButtonStart').classList.remove('d-none');
    document.getElementById('controls').classList.remove('d-none');
    document.getElementById('muteButtonStart').classList.remove('d-none');
    playStartscreenMusic();
    //checkMuteStatus();
    hideElements();
}


/**
 * This function hides certain elements based on screen width.
 * If the screen width is less than 1000px and teh height is less than 750px, 
 * it hides the headline and legal container.
 */
function hideElements() {
    if (window.innerWidth < 1000 && window.innerHeight < 750) {
        hideHeadline();
        hideLegalContainer();
    }
}


/**
 * This function hides the headline by adding the 'd-none' class.
 */
function hideHeadline() {
    return document.querySelector('h1').classList.add('d-none');
}


/**
 * This function hides the legal container by adding the 'd-none' class.
 */
function hideLegalContainer() {
    return document.querySelector('.legal-container').classList.add('d-none');
}


/**
 * This function checks if the game is muted in steady intervals.
 */
function checkMuteStatus() {
    setInterval(() => {
        console.log('Mute Status:', isMuted);
    }, 100);
}


/**
 * This function toggles the mute status, saves the mute status to the local storage, 
 * updates all sounds and updates the mute button text.
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    updateAllSounds();
    updateMuteButtonText();
}


/**
 * This function updates the mute status for all sounds.
 * If muted, it pauses all sounds. Otherwise, it resumes the appropriate music.
 */
function updateAllSounds() {
    const sounds = getAllSounds();
    muteAllSounds(sounds);
    if (isMuted) {
        pauseAllSounds(sounds);
    } else {
        resumeAllSounds();
    }
}


/**
 * This function returns an array of all audio elements.
 * @returns {Array} - Array of all audio elements.
 */
function getAllSounds() {
    return [
        startscreen_theme,
        game_theme,
        win_theme,
        lose_theme,
        walking_sound,
        jumping_sound,
        snoring_sound,
        hurt_sound,
        chick_dying_sound,
        chicken_dying_sound,
        endboss_hurt_sound,
        coin_sound,
        bottle_sound,
        splashing_bottle_sound,
        endboss_theme
    ];
}


/**
 * This function mutes or unmutes all sounds based on the global isMuted variable.
 * @param {Array} sounds - Array of all audio elements.
 */
function muteAllSounds(sounds) {
    sounds.forEach(audio => {
        audio.muted = isMuted;
    });
}


/**
 * This function pauses all sounds.
 * @param {Array} sounds - Array of all audio elements.
 */
function pauseAllSounds(sounds) {
    sounds.forEach(audio => audio.pause());
}


/**
 * This function resumes the appropriate sounds based on the game state.
 * It checks if the game, endboss or startscreen is active and plays the corresponding music.
 */
function resumeAllSounds() {
    if (!isMuted) {
        if (isGameActive()) {
            if (isEndbossActive()) {
                world.playEndbossTheme();
            } else {
                playIngameMusic();
            }
        }
        if (isStartscreenActive()) {
            playStartscreenMusic();
        }
    }
}


/**
 * This function checks if the game is active.
 * @returns {boolean} - Returns true if the game is active, otherwise false.
 */
function isGameActive() {
    return !document.getElementById('canvasContainer').classList.contains('d-none');
}


/**
 * This function checks if the endboss is active.
 * @returns {boolean} - Returns true if the endboss is active, otherwise false.
 */
function isEndbossActive() {
    return world.level.enemies.some(enemy => enemy instanceof Endboss && enemy.isCharacterNearby);
}


/**
 * This function checks if the startscreen is active.
 * @returns {boolean} - Returns true if the startscreen is active, otherwise false.
 */

function isStartscreenActive() {
    return !document.getElementById('startScreen').classList.contains('d-none');
}


/**
 * This function updates the text of the mute button.
 */
function updateMuteButtonText() {
    const buttons = document.querySelectorAll('.mute-button');
    buttons.forEach(button => {
        if (isMuted) {
            button.textContent = 'AUDIO ON';
        } else {
            button.textContent = 'AUDIO OFF';
        }
    });
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
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('muteButtonStart').classList.add('d-none');
    document.getElementById('canvasContainer').classList.remove('d-none');
    document.getElementById('muteButtonCanvas').classList.remove('d-none');
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
    document.getElementById('gameoverScreen').classList.add('d-none');
    document.getElementById('gamewonScreen').classList.add('d-none');
    document.getElementById('canvasContainer').classList.remove('d-none');
    document.getElementById('muteButtonCanvas').classList.remove('d-none');
    init();
    playIngameMusic();
}


/**
 * This function plays the starscreen music.
 */
function playStartscreenMusic() {
    if (!isMuted) {
        startscreen_theme.currentTime = 0;
        startscreen_theme.play();
    }
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
    if (!isMuted) {
        game_theme.currentTime = 0;
        game_theme.play();
    }
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
 * Sets up an event listener to check the screen width when the window is resized.
 */ 
window.addEventListener('resize', checkScreenWidth);



/**
 * Checks the screen width and height to determine whether to display
 * the rotate message. If the screen width is less than 650px, 
 * it removes the 'd-none' class from the rotate message element,
 * making it visible. Otherwise, it adds the 'd-none' class, hiding the message.
 */
function checkScreenWidth() {
    const rotateMessage = document.getElementById('rotateMessage');
    if (window.innerWidth < 650) {
        rotateMessage.classList.remove('d-none');
    } else {
        rotateMessage.classList.add('d-none');
    }
}


/**
 * Requests fullscreen mode for the provided element.
 * @param {HTMLElement} element - The element to display in fullscreen mode.
 */
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}


/**
 * Adds an event listener to the DOMContentLoaded event to check the screen width
 * when the document has finished loading. This ensures that the rotate message
 * is correctly displayed or hidden based on the initial screen dimensions.
 * If the screen width is less than 940px and the height is less than 480px,
 * it requests fullscreen mode for the document.
 */
document.addEventListener('DOMContentLoaded', function () {
    checkScreenWidth();
    if (window.innerWidth < 940 && window.innerHeight < 480) {
        //requestFullscreen(document.documentElement);
    }
});
