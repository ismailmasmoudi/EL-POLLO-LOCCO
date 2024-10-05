let canvas;
let ctx;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let isFullscreen = false;
let gameStarted = false; // Flag to control game logic
let gamePaused = true; // Flag to track if the game is paused
let world; // Declare world here
soundManager.init();

// Event Listener for btnSound
document.getElementById('btnSound').addEventListener('click', () => {
    soundManager.toggleAllSounds(); // Use the instance to call the method
});

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    ctx = canvas.getContext('2d');
    console.log('My Chracter is ', world.character);
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
//     }
//     requestAnimationFrame(update); // Call update recursively for animation
// }

function update() {
    if (gameStarted && !gamePaused) {
        world.draw(); 
    } else if (gamePaused) {
        // Display "Paused" message when game is paused
        showPauseMessage(); 
    }
    requestAnimationFrame(update); 
}

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