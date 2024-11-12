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

function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

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

function update() {
    if (gameStarted) {
        world.draw();
        checkWinLoseConditions();
        requestAnimationFrame(update);
    }
}

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

function showGameOverScreen() {
    gameStarted = false;
    soundManager.backgroundMusic.pause();
    soundManager.endboss_BackgroundSound.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameOverSound.play();
    }
    document.getElementById('game-over').style.display = 'flex';
}

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

function hideAllScreens() {
    document.getElementById('intro-screen').style.display = 'none';
    const screens = document.querySelectorAll('#intro-screen, #game-over, #game-win');
    screens.forEach(screen => {
        screen.classList.add('d-none');
    });
}

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

function howToPlay() {
    document.getElementById('howToPlayOverlay').classList.remove('hidden');
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
}

document.addEventListener('click', function (event) {
    const overlay = document.getElementById('howToPlayOverlay');
    if (event.target === overlay) {
        overlay.classList.add('hidden');
    }
});

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