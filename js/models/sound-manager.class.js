class SoundManager {
    constructor() {
        this.isSoundOn = true;
        this.backgroundMusic = null;
        this.walkingSound = null;
        this.btnSound = document.getElementById('btnSound');
    }

    /**
     * Initializes the sound manager by loading and setting up audio objects.
     */
    init() {
        this.backgroundMusic = new Audio('audio/background_music.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
        this.characterWalkingSound = new Audio('audio/character_walking.mp3');
        this.characterJumpSound = new Audio('audio/character_jump.mp3');
        this.characterHurtSound = new Audio('audio/character_hurt.mp3');
        this.characterSleepSound = new Audio('audio/character_sleep.mp3');
        this.chickenDeadSound = new Audio('audio/chicken_dead.mp3');
        this.SmallchickenDeadSound = new Audio('audio/smallchicken_dead.mp3');
        this.endbossDeadSound = new Audio('audio/endboss_dead.mp3');
        this.endbossHurtSound = new Audio('audio/endboss_hurt.mp3');
        this.endbossWalkingSound = new Audio('audio/endboss_walking.mp3');
        this.endbossAttackSound = new Audio('audio/endboss_attack.mp3');
        this.endboss_BackgroundSound = new Audio('audio/endboss_background.mp3');
        this.bottleThrowSound = new Audio('audio/bottle_throw.mp3');
        this.bottleHitSound = new Audio('audio/bottle_hit.mp3');
        this.bottleCollectSound = new Audio('audio/bottle_collect.mp3');
        this.coinCollectSound = new Audio('audio/coin_collect.mp3');
        this.gameOverSound = new Audio('audio/game_over.mp3');
        this.gameWinSound = new Audio('audio/game_win.mp3');
        const globalVolume = 0.05;
        for (const soundProperty in this) {
            if (this[soundProperty] instanceof Audio) {
                this[soundProperty].volume = globalVolume;
            }
        }
    }

    /**
     * Toggles the sound on or off.
     */
    toggleAllSounds() {
        this.isSoundOn = !this.isSoundOn;
        if (this.isSoundOn) {
            if (world.endbossMusicStarted) {
                this.endboss_BackgroundSound.play();
            } else {
                this.backgroundMusic.play();
            }
        } else {
            this.backgroundMusic.pause();
            this.endboss_BackgroundSound.pause();
        }
        this.updateButtonImage();
    }

    /**
     * Updates the sound button image based on the current sound state.
     */
    updateButtonImage() {
        if (this.isSoundOn) {
            this.btnSound.querySelector('img').src = './img/Buttons/sound.png';
        } else {
            this.btnSound.querySelector('img').src = './img/Buttons/icons8-no-sound-50.png';
        }
    }
}
