let canvas;
let ctx;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let isFullscreen = false;
let gameStarted = false;
let gamePaused = true;
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
    console.log('My Character is ', world.character);
}

function startGame() {
    hideAllScreens(); 
    gameStarted = true;
    gamePaused = false;
    console.log("Game Started");
    if (!world) {
        init();
    }
    if (soundManager.isSoundOn) {
        soundManager.backgroundMusic.play();
    }
    update();
}

function pauseGame() {
    if (gameStarted) {
        gamePaused = true;
        console.log("Game Paused");
        soundManager.backgroundMusic.pause();
    }
}

function toggleStartPause() {
    console.log("Toggle function triggered"); 
    if (!gameStarted || gamePaused) {
        startGame();
    } else {
        pauseGame();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyK') {
        console.log("K key pressed!");
        console.log("Before toggle: gameStarted =", gameStarted, "gamePaused =", gamePaused);
        toggleStartPause();
        console.log("After toggle: gameStarted =", gameStarted, "gamePaused =", gamePaused);
    }
});

function update() {
    if (gameStarted && !gamePaused) {
        world.draw();
        checkWinLoseConditions();
    } else if (gamePaused) {
        showPauseMessage();
    }
    if (!gamePaused) {
        requestAnimationFrame(update);
    }
}

function showPauseMessage() {
    if (gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "48px Zabars";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        ctx.fillText("Paused", x, y);
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
    gamePaused = true;
    soundManager.backgroundMusic.pause();
    soundManager.endboss_BackgroundSound.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameOverSound.play();
    }
    document.getElementById('game-over').style.display = 'flex';
}

function showWinScreen() {
    gameStarted = false;
    gamePaused = true;
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
    gamePaused = true;
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
    gamePaused = true;
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
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        fullscreenElement.requestFullscreen();
    }
}