let canvas;
let ctx;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let isFullscreen = false;
let gameStarted = false;
let world;
soundManager.init();

document.getElementById('btnSound').addEventListener('click', () => {
    soundManager.toggleAllSounds();
});

/**
 * Initializes the game by setting up the canvas, level, and world.
 */
function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

/**
 * Starts the game by hiding all screens, setting the gameStarted flag to true,
 * initializing the game if necessary, starting the background music, and calling the update function.
 */
function startGame() {
    hideAllScreens();
    gameStarted = true;
    if (!world) {
        init();
    }
    if (soundManager.isSoundOn) {
        soundManager.backgroundMusic.play();
    }
    update();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyK') {
        startGame();
    }
});

/**
 * Updates the game state by drawing the world, checking win/lose conditions,
 * and requesting the next animation frame.
 */
function update() {
    if (gameStarted) {
        world.draw();
        checkWinLoseConditions();
        requestAnimationFrame(update);
    }
}

/**
 * Checks if the player has won or lost the game and displays the appropriate screen.
 */
function checkWinLoseConditions() {
    let winTimeout = null;
    if (world.level.endboss && world.level.endboss.isDead()) {
        winTimeout = setTimeout(showWinScreen, 800);
    } else if (world.character.isDead()) {
        if (winTimeout) {
            clearTimeout(winTimeout);
        }
        showGameOverScreen();
    }
}

/**
 * Displays the game over screen and plays the game over sound.
 */
function showGameOverScreen() {
    gameStarted = false;
    soundManager.backgroundMusic.pause();
    soundManager.endboss_BackgroundSound.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameOverSound.play();
    }
    document.getElementById('game-over').style.display = 'flex';
}

/**
 * Displays the game win screen and plays the game win sound.
 */
function showWinScreen() {
    gameStarted = false;
    soundManager.backgroundMusic.pause();
    soundManager.endboss_BackgroundSound.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameWinSound.play();
    }
    document.getElementById('coin-display').innerText = `YOU WINS WITH ${world.character.coins}/10 COINS`;
    document.getElementById('game-win').style.display = 'flex';
}

/**
 * Hides all game screens.
 */
function hideAllScreens() {
    document.getElementById('intro-screen').style.display = 'none';
    const screens = document.querySelectorAll('#intro-screen, #game-over, #game-win');
    screens.forEach(screen => {
        screen.classList.add('d-none');
    });
}

/**
 * Restarts the game by clearing intervals, reinitializing the level and world, and starting the game.
 */
function restartGame() {
    clearInterval(world.intervalId);
    world.level.enemies.forEach(enemy => clearInterval(enemy.intervalId));
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-win").style.display = 'none';
    gameStarted = false;
    initLevel1();
    world = new World(canvas, keyboard);
    startGame();
}

/**
 * Returns to the home screen by clearing intervals, reinitializing the level and world,
 * and displaying the intro screen.
 */
function goHome() {
    clearInterval(world.intervalId);
    world.level.enemies.forEach(enemy => clearInterval(enemy.intervalId));
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-win").style.display = 'none';
    gameStarted = false;
    initLevel1();
    world = new World(canvas, keyboard);
    document.getElementById("intro-screen").style.display = 'flex';
}

/**
 * Displays the how to play overlay.
 */
function howToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('hidden');
}

/**
 * Closes the how to play overlay.
 */
function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
}

document.addEventListener('click', function (event) {
    const overlay = document.getElementById('howToPlayOverlay');
    if (event.target === overlay) {
        overlay.classList.add('hidden');
    }
});

/**
 * Toggles fullscreen mode for the game canvas.
 */
function toggleFullscreen() {
    const fullscreenElement = document.getElementById('canvas-container');
    let fullscreenIcon = document.getElementById("fullscreen-icon");
    if (document.fullscreenElement) {
        document.exitFullscreen();
        canvas.style.width = "";
        canvas.style.height = "";
        fullscreenIcon.src = "./img/Buttons/fullscreen.png";
    } else {
        fullscreenElement.requestFullscreen();
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        fullscreenIcon.src = "./img/Buttons/exitfullscreen.png";
    }
}

/**
 * Disables the default context menu (right-click menu) for all buttons on the page.
 * This is often used to prevent unwanted browser behavior, especially on mobile devices
 * where a long-press can trigger the context menu.
 */
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
});

/**
 * Prevents the default action of the spacebar key when a button is focused.
 * 
 * This event listener is added to the `window` object to capture all `keydown` events.
 * It specifically targets the spacebar key (`event.code === 'Space'`) and checks if the currently
 * focused element (`document.activeElement`) is a button (`tagName === 'BUTTON'`).
 * 
 * If both conditions are met, it means the user has pressed the spacebar while a button is focused.
 * In this case, `event.preventDefault()` is called to prevent the default action of the spacebar,
 * which is typically to activate the focused button. This is useful to avoid unintended button clicks
 * when navigating with the keyboard or using assistive technologies.
 */
window.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && document.activeElement.tagName === 'BUTTON') { 
        event.preventDefault(); 
    }
});




