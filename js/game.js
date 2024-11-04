// let canvas;
// let ctx;
// let keyboard = new Keyboard();
// let soundManager = new SoundManager();
// let isFullscreen = false;
// let gameStarted = false; // Flag to control game logic
// let gamePaused = true; // Flag to track if the game is paused
// let character; // Declare the character variable
// let statusBar; // Declare the statusBar variable
// let world;


// soundManager.init();


// document.getElementById('btnSound').addEventListener('click', () => {
//     soundManager.toggleAllSounds(); // Use the instance to call the method
// });

// function init() {
//     canvas = document.getElementById("canvas");
//     world = new World(canvas, keyboard); // Now character is defined
//     ctx = canvas.getContext('2d');
//     console.log('My Chracter is ', world.character);

// }


// window.addEventListener('keydown', (e) => {
//     if (e.keyCode == 39) {
//         keyboard.RIGHT = true;
//     }
//     if (e.keyCode == 37) {
//         keyboard.LEFT = true;
//     }
//     if (e.keyCode == 32) {
//         keyboard.SPACE = true;
//     }
//     if (e.keyCode == 38) {
//         keyboard.UP = true;
//     }
//     if (e.keyCode == 40) {
//         keyboard.DOWN = true;
//     }
//     if (e.keyCode == 68) {
//         keyboard.D = true;
//     }

//     console.log(e);
// });

// window.addEventListener('keyup', (e) => {
//     if (e.keyCode == 39) {
//         keyboard.RIGHT = false;
//     }
//     if (e.keyCode == 37) {
//         keyboard.LEFT = false;
//     }
//     if (e.keyCode == 32) {
//         keyboard.SPACE = false;
//     }
//     if (e.keyCode == 38) {
//         keyboard.UP = false;
//     }
//     if (e.keyCode == 40) {
//         keyboard.DOWN = false;
//     }
//     if (e.keyCode == 68) {
//         keyboard.D = false;
//     }


// });

// function toggleFullscreen() {
//     let fullscreenElement = document.fullscreenElement;

//     if (!fullscreenElement) {
//         enterFullscreen(document.getElementById("fullscreen"));
//         isFullscreen = true;
//     } else {
//         exitFullscreen();
//         isFullscreen = false;
//     }
// }


// function enterFullscreen(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen();
//     }
// }


// function exitFullscreen() {
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     }
// }


// // Function to start/resume the game
// function startGame() {
//     document.getElementById('intro-screen').style.display = 'none';
//     gameStarted = true;
//     gamePaused = false;
//     if (!world) {
//         init();
//     }

//     if (soundManager.isSoundOn) {
//         soundManager.backgroundMusic.play();
//     }

//     update();
// }


// // Function to pause the game
// function pauseGame() {
//     if (gameStarted) { // Only allow pausing if the game has started
//         gamePaused = true;
//         console.log("Game Paused");
//         soundManager.backgroundMusic.pause();
//     }
// }


// function toggleStartPause(){

//     if (!gameStarted || gamePaused) {
//         startGame();
//     } else {
//         pauseGame();
//     }
// }


// // Event listeners for starting/pausing
// document.addEventListener('keydown', (event) => {
//     if (event.code === 'KeyK') {
//         if (!gameStarted || gamePaused) {
//             startGame();
//         } else {
//             pauseGame();
//         }
//     }
// });

// function update() {
//     if (gameStarted && !gamePaused) {
//         world.draw(); 
//     } else if (gamePaused) {
//    //     Display "Paused" message when game is paused
//         showPauseMessage(); 
//     }
//     requestAnimationFrame(update); 
// }

// function showPauseMessage() {
//     // Clear the canvas (optional, but recommended for a clean overlay)
//     ctx.clearRect(0, 0, canvas.width, canvas.height); 

//     // Set text style for the pause message
//     ctx.font = "48px Zabars"; // Use your desired font and size
//     ctx.fillStyle = "white";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";

//     // Calculate the center of the canvas
//     let x = canvas.width / 2;
//     let y = canvas.height / 2;

//     // Draw the "Paused" text
//     ctx.fillText("Paused", x, y);
// }



// game.js
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

// ... (rest of your existing code)

function startGame() {
    hideAllScreens(); // Hide all screens before starting
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

// function toggleStartPause() {
//     if (!gameStarted || gamePaused) {
//         startGame();
//     } else {
//         pauseGame();
//     }
// }


function toggleStartPause() {
    console.log("Toggle function triggered"); // This should always log
    if (!gameStarted || gamePaused) {
        startGame();
    } else {
        pauseGame();
    }
}
// document.addEventListener('keydown', (event) => {
//     if (event.code === 'KeyK') {
//         toggleStartPause();
//     }
// });

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
        checkWinLoseConditions(); // Check for win/lose conditions
    } else if (gamePaused) {
        showPauseMessage();
    }
    // Only request the next frame if the game is not paused
    if (!gamePaused) { 
        requestAnimationFrame(update); 
    }
}
// gamePaused = true;

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

// function checkWinLoseConditions() {
//     if (world.level.endboss && world.level.endboss.isDead()) {
//         setTimeout(showWinScreen, 2000);
//     } else if (world.character.isDead()) {
//         showGameOverScreen();
//     }
// }

function checkWinLoseConditions() {
    let winTimeout = null; // Store the timeout ID

    if (world.level.endboss && world.level.endboss.isDead()) {
        winTimeout = setTimeout(showWinScreen, 800);
    } else if (world.character.isDead()) {
        // Clear the timeout if the player loses before the win screen is shown
        if (winTimeout) {
            clearTimeout(winTimeout);
        }
        showGameOverScreen();
    }
}

// Function to show the game over screen
function showGameOverScreen() {
    gameStarted = false;
    gamePaused = true;
    soundManager.backgroundMusic.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameOverSound.play();
    }
    document.getElementById('game-over').style.display = 'flex';
}

// Function to show the game win screen
function showWinScreen() {
    gameStarted = false;
    gamePaused = true;
   soundManager.backgroundMusic.pause();
    if (soundManager.isSoundOn) {
        soundManager.gameWinSound.play();
    }
    document.getElementById('coin-display').innerText = `YOU WINS WITH ${world.character.coins}/10 COINS`;
    document.getElementById('game-win').style.display = 'flex';
}

// Function to hide all game screens
function hideAllScreens() {
    document.getElementById('intro-screen').style.display = 'none';

    const screens = document.querySelectorAll('#intro-screen, #game-over, #game-win');
    screens.forEach(screen => {
        screen.classList.add('d-none');
    });
}


function restartGame() {
    // 1. Clear All Intervals:
    clearInterval(world.intervalId); // Clear the main game loop interval
    world.level.enemies.forEach(enemy => clearInterval(enemy.intervalId)); // Clear enemy intervals
    // Clear intervals for other objects like clouds, projectiles, the endboss, etc.

    // 2. Hide Game Over/Win Screens:
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-win").style.display = 'none';

    // 3. Reset Game Flags:
    gameStarted = false;
    gamePaused = true;


    // Reinitialize Level 1:
    initLevel1();

    // Create a new World object using the newly initialized Level1:
    world = new World(canvas, keyboard);

    // Restart the game loop:
    startGame();
}

function goHome() {
    // 1. Clear All Intervals:
    clearInterval(world.intervalId); 
    world.level.enemies.forEach(enemy => clearInterval(enemy.intervalId)); 
    // Clear intervals for other objects like clouds, projectiles, the endboss, etc.

    // 2. Hide Game Over/Win Screens:
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-win").style.display = 'none';

    // 3. Reset Game Flags:
    gameStarted = false;
    gamePaused = true;

    // 4. Reinitialize Level 1:
    initLevel1();

    // 5. Create a New World Object:
    world = new World(canvas, keyboard);

    // 6. Show the Intro Screen:
    document.getElementById("intro-screen").style.display = 'flex'; 
}

