class SoundManager {
    constructor() {
        this.isSoundOn = true;
        this.backgroundMusic = null;
        this.walkingSound = null;
        // Add other sound objects as needed 
        this.btnSound = document.getElementById('btnSound'); // Get a reference to the button
    }

    init() {
        // Background Music
        this.backgroundMusic = new Audio('audio/background_music.mp3');
        this.backgroundMusic.loop = true;

        // Character Sounds
        this.walkingSound = new Audio('audio/walking_sound.mp3');
        this.jumpSound = new Audio('audio/jump.mp3'); // New jump sound
        this.hurtSound = new Audio('audio/hurt.mp3');   // New hurt sound
        this.coinCollectSound = new Audio('audio/coin_collect.mp3'); // New coin sound

        // Enemy Sounds
        this.chickenWalkingSound = new Audio('audio/chicken_walking.mp3');
        this.chickenDeadSound = new Audio('audio/chicken_dead.mp3');

        // Bottle Sounds
        this.bottleThrowSound = new Audio('audio/bottle_throw.mp3');
        this.bottleHitSound = new Audio('audio/bottle_hit.mp3');

        // ... add more sound effects as needed ...
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
            this.btnSound.querySelector('img').src = 'img/Buttons/sound.png';
        } else {
            this.btnSound.querySelector('img').src = 'img/Buttons/icons8-no-sound-50.png';
        }
    }
}
