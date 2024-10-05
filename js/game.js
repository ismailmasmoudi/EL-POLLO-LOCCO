let canvas;
let ctx;
let keyboard = new Keyboard();
let soundManager = new SoundManager(); 
let isFullscreen = false;
// Initialize the sound manager
soundManager.init();

// Event Listener for btnSound
document.getElementById('btnSound').addEventListener('click', () => {
  soundManager.toggleAllSounds(); // Use the instance to call the method
});

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas , keyboard);

    ctx = canvas.getContext('2d');
    console.log('My Chracter is ', world.character);
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT=true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT=true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE=true;
    }
    if(e.keyCode == 38){
        keyboard.UP=true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN=true;
    }
    if(e.keyCode == 68){
        keyboard.D=true;
    }
    
    console.log(e);
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT=false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT=false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE=false;
    }
    if(e.keyCode == 38){
        keyboard.UP=false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN=false;
    }
    if(e.keyCode == 68){
        keyboard.D=false;
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
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {  
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
  }
  
  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  

 