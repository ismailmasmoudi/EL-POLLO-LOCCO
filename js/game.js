canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let isFullscreen = false;
let gameStarted = false; // Flag to control game logic
let gamePaused = true; // Flag to track if the game is paused
world = new World(canvas, keyboard); 
    console.log('My Chracter is ', world.character);// Declare the world variable
let character; // Declare the character variable
let statusBar; // Declare the statusBar variable
// let canvas = document.getElementById('canvas'); // Get your canvas element
// let ctx = canvas.getContext('2d');

let gameOverScreen = new Image();
gameOverScreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';

let gameWinScreen = new Image();
gameWinScreen.src = 'img/9_intro_outro_screens/win/won_2.png';

let buttonWidth = canvas.width * 0.2; // 20% of canvas width
let buttonHeight = buttonWidth / 4; // Maintain aspect ratio
let buttonX = (canvas.width - buttonWidth) / 2; // Center horizontally
let buttonY = canvas.height * 0.7; // Position vertically

let buttonScale = 1;
let buttonGrowing = true;


soundManager.init();


document.getElementById('btnSound').addEventListener('click', () => {
    soundManager.toggleAllSounds(); // Use the instance to call the method
});

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard); // Now character is defined
    ctx = canvas.getContext('2d');
    console.log('My Chracter is ', world.character);
    // Initialize button dimensions after canvas is initialized
    buttonWidth = canvas.width * 0.2; 
    buttonHeight = buttonWidth / 4; 
    buttonX = (canvas.width - buttonWidth) / 2; 
    buttonY = canvas.height * 0.7; 

}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    console.log(e);
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }


});

function toggleFullscreen() {
    let fullscreenElement = document.fullscreenElement;

    if (!fullscreenElement) {
        enterFullscreen(document.getElementById("fullscreen"));
        isFullscreen = true;
    } else {
        exitFullscreen();
        isFullscreen = false;
    }
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


// Function to start/resume the game
function startGame() {
    document.getElementById('intro-screen').style.display = 'none';
    gameStarted = true;
    gamePaused = false;
    if (!world) {
        init();
    }

    if (soundManager.isSoundOn) {
        soundManager.backgroundMusic.play();
    }

    update();
}


// Function to pause the game
function pauseGame() {
    if (gameStarted) { // Only allow pausing if the game has started
        gamePaused = true;
        console.log("Game Paused");
        soundManager.backgroundMusic.pause();
    }
}


function toggleStartPause(){

    if (!gameStarted || gamePaused) {
        startGame();
    } else {
        pauseGame();
    }
}


// Event listeners for starting/pausing
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyK') {
        if (!gameStarted || gamePaused) {
            startGame();
        } else {
            pauseGame();
        }
    }
});

// function update() {
//     if (gameStarted && !gamePaused) {
//         world.draw(); 
//     } else if (gamePaused) {
//         // Display "Paused" message when game is paused
//         showPauseMessage(); 
//     }
//     requestAnimationFrame(update); 
// }

function showPauseMessage() {
    // Clear the canvas (optional, but recommended for a clean overlay)
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Set text style for the pause message
    ctx.font = "48px Zabars"; // Use your desired font and size
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate the center of the canvas
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    // Draw the "Paused" text
    ctx.fillText("Paused", x, y);
}

// Function to draw the game over screen
function drawGameOver() {
    ctx.drawImage(gameOverScreen, 0, 0, canvas.width, canvas.height);

    // Draw the restart button
    drawRestartButton();

    // Add event listener for button click
    // canvas.addEventListener('click', restartGameClick, { once: true });
    canvas.addEventListener('click', restartGameClick);
}

// Function to draw the game win screen
function drawGameWin() {
    ctx.drawImage(gameWinScreen, 0, 0, canvas.width, canvas.height);

    // Draw the restart button (optional for win screen)
    drawRestartButton();

    // Add event listener for button click
    // canvas.addEventListener('click', restartGameClick, { once: true });
    canvas.addEventListener('click', restartGameClick);

}

// Function to draw the restart button with animation
function drawRestartButton() {
    ctx.fillStyle = 'green';
    ctx.fillRect(buttonX, buttonY, buttonWidth * buttonScale, buttonHeight * buttonScale);

    // Add text to the button
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Restart Game', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Button animation
    if (buttonGrowing) {
        buttonScale += 0.01;
        if (buttonScale >= 1.1) {
            buttonGrowing = false;
        }
    } else {
        buttonScale -= 0.01;
        if (buttonScale <= 1) {
            buttonGrowing = true;
        }
    }
}

// Function to handle restart button click
function restartGameClick(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
    ) {
        restartGame();
    }
}

// Function to restart the game
function restartGame() {
    // Stop all intervals
    stopGame();
    clearAllIntervals();

    // Reset game variables
    world = new World(canvas, keyboard); // Create a new world instance
    gameStarted = true;
    gamePaused = false;
    canvas.removeEventListener('click', restartGameClick);
    // Hide the game over/win screen (assuming you have a way to hide it)
    // For example, if you're using a div with an ID 'game-over-screen':
    // document.getElementById('game-over-screen').style.display = 'none';

    // Start the game loop again
    update();
    
}

// Example usage in your game loop (game.js):
function update() {
    if (gameStarted && !gamePaused) {
        world.draw();

        // Check for win/lose conditions
        if (world.level.endboss && world.level.endboss.isDead()) {
            drawGameWin();
        } else if (world.character.isDead()) {
            drawGameOver();
        }
    } else if (gamePaused) {
        showPauseMessage();
    }
    requestAnimationFrame(update);
}