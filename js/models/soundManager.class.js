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

        // Set any initial sound properties (looping, volume, etc.)
        this.backgroundMusic.loop = true;

        // Character Sounds
        this.characterWalkingSound = new Audio('audio/character_walking.mp3'); // Example path
        this.characterJumpSound = new Audio('audio/character_jump.mp3');
        this.characterHurtSound = new Audio('audio/character_hurt.mp3');
        this.characterSleepSound = new Audio('audio/character_sleep.mp3');

        // Enemy Sounds

        this.chickenDeadSound = new Audio('audio/chicken_dead.mp3');
        this.SmallchickenDeadSound = new Audio('audio/smallchicken_dead.mp3');

        // Endboss Sounds
        this.endbossDeadSound = new Audio('audio/endboss_dead.mp3');
        this.endbossHurtSound = new Audio('audio/endboss_hurt.mp3');
        this.endbossWalkingSound = new Audio('audio/endboss_walking.mp3');
        this.endbossAttackSound = new Audio('audio/endboss_attack.mp3');


        // Bottle Sounds
        this.bottleThrowSound = new Audio('audio/bottle_throw.mp3');
        this.bottleHitSound = new Audio('audio/bottle_hit.mp3');
        this.bottleCollectSound = new Audio('audio/bottle_collect.mp3');


        // Coin Sound
        this.coinCollectSound = new Audio('audio/coin_collect.mp3');

        // Game Over Sound
        this.gameOverSound = new Audio('audio/game_over.mp3'); // Replace with your actual file path

        // Game Win Sound
        this.gameWinSound = new Audio('audio/game_win.mp3'); // Replace with your actual file path
    }

    toggleAllSounds() {
        this.isSoundOn = !this.isSoundOn;

        if (this.isSoundOn) {
            this.backgroundMusic.play();
        } else {
            this.backgroundMusic.pause();

        }
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
