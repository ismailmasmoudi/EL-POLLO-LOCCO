class SoundManager {
    constructor() {
        this.isSoundOn = true;
        this.backgroundMusic = null;
        this.walkingSound = null;
        // Add other sound objects as needed 
        this.btnSound = document.getElementById('btnSound'); // Get a reference to the button
    }

    init() {
        // Load and initialize your sound objects here
        this.backgroundMusic = new Audio('audio/background_music.mp3'); // Example
        this.walkingSound = new Audio('audio/walking_sound.mp3'); // Example

        // Set any initial sound properties (looping, volume, etc.)
        this.backgroundMusic.loop = true;
    }

    toggleAllSounds() {
        this.isSoundOn = !this.isSoundOn;

        if (this.isSoundOn) {
            this.backgroundMusic.play();
            // Resume other sounds if they were playing before muting
        } else {
            this.backgroundMusic.pause();
            this.walkingSound.pause(); // Ensure walking sound is paused
            // Pause all other sound objects here
        }
        // Update button image based on sound state
        this.updateButtonImage();
    }

    updateButtonImage() {
        if (this.isSoundOn) {
            this.btnSound.querySelector('img').src = 'img/Buttons/icons8-no-sound-50.png';
        } else {
            this.btnSound.querySelector('img').src = 'img/Buttons/sound.png';
        }
    }
}
