class Endboss extends MovableObject {
    y = 100;
    height = 350;
    width = 300;
    speed = 0.9;
    startEndBoss = false;
    attack = false;
    firstSight = true;
    turnRight = false;
    bottleHits = 0;
    lastHitTime = 0;
    hitCooldown = 500;
    gamesstarted = true;
    direction = 'left';
    offset = {
        top: 60,
        bottom: 10,
        left: 30,
        right: 20
    };

    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3700;
        this.animate();
        this.startEndBoss = false;
        let checkCharacterInterval = setInterval(() => {
            if (world && world.characterReady) {
                clearInterval(checkCharacterInterval);
                this.checkCharacterPosition();
            }
        }, 100);
         this.energy = 120 ;
    }

    /**
     * Starts the animation loop for the endboss.
     */
    animateImages() {
        this.animate();
    }

    /**
     * Checks the character's position at regular intervals to trigger endboss actions.
     */
    checkCharacterPosition() {
        setInterval(() => {
            if (world.character.x >= 3000 && !this.isDead() && !this.animationsStarted) {
                this.startAnimations();
            }
        }, 1000 / 60);
    }

    /**
     * Starts the endboss animations and movement.
     */
    startAnimations() {
        this.animationsStarted = true;
        this.animate();
        this.moveEndBoss();
    }

     /**
     * Animates the endboss based on its current state.
     */
     animate() {
            let intervalId = setInterval(() => {
            if (!gameStarted) return;
            if (super.isDead()) {
                this.playDeadAnimations(intervalId);
                return; }
            if (super.isHurt()) this.playHurtAnimations();
            else if (this.canAlert()) this.playAlertAnimations();
            else if (this.canAttack() && !world.character.isDead()) {
                this.playAnimation(this.IMAGES_ATTACK);
                soundManager.isSoundOn && soundManager.endbossAttackSound.play();
            } else if (this.canWalk() && !world.character.isDead()) {
                soundManager.isSoundOn && soundManager.endbossWalkingSound.play();
                this.playWalkAnimations();} }, 1000 / 5);
    }
 
    /**
     * Plays the hurt animations and sets the endboss's state to attack mode.
     */
    playHurtAnimations() {
        this.playAnimation(this.IMAGES_HURT);
        this.attack = true;
        this.speed = 1;
        this.isHurt = false;
    }


    moveEndBoss() {
        setInterval(() => {
            if (gameStarted && !this.isDead() && !world.character.isDead() && this.canWalk()) {
                if (this.direction === 'left') {
                    this.moveLeft();
                    if (this.x <= 0) { // Left boundary 3400 (adjust as needed)
                      this.direction = 'right';
                    }
                } else {
                    this.moveRight();
                    if (this.x >= world.level.level_end_x - this.width) { // Right Boundary at level end - endboss width
                        this.direction = 'left';

                    }
                }
            }
        }, 1000 / 200);
    }

    moveLeft() {
        if (!this.isDead() && !world.character.isDead() && this.canWalk() && this.direction === 'left') {
            super.moveLeft();
             this.otherDirection = false; // Moving left, don't flip
             if (this.x <= 0) { // Left boundary 3400 (adjust as needed)
                this.direction = 'right';
                 this.otherDirection = true; // flip only at edge
              }
        }
    }

    moveRight() {
        if (!this.isDead() && !world.character.isDead() && this.canWalk() && this.direction === 'right'){
            this.x += this.speed;
            this.otherDirection = true; // Moving right, flip
            if (this.x >= world.level.level_end_x - this.width) { // Right Boundary at level end - endboss width
                this.direction = 'left';
                 this.otherDirection = false;// flip only at edge
            }
        }
    }

    /**
     * Checks if the endboss is close enough to the character to attack.
     * @returns {boolean} True if the endboss can attack, false otherwise.
     */
    canAttack() {
        let distanceToCharacter = Math.abs(world.character.x - this.x);
        return distanceToCharacter < 200;
    }

    /**
     * Checks if the endboss should be in alert mode.
     * @returns {boolean} True if the endboss can alert, false otherwise.
     */
    canAlert() {
        return this.charMeetEndBoss() && this.firstSight;
    }

    /**
     * Plays the dead animations and stops the endboss.
     * @param {number} intervalId - The interval ID of the animation loop.
     */
    playDeadAnimations(intervalId) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        setTimeout(() => {
            clearInterval(intervalId);
        }, 200);
    }

    /**
     * Plays the alert animations and sets the endboss to start mode after a delay.
     */
    playAlertAnimations() {
        this.playAnimation(this.IMAGES_ALERT);
        setTimeout(() => {
            this.firstSight = false;
            this.startEndBoss = true;
        }, 1000);
    }

    /**
     * Checks if the endboss can walk.
     * @returns {boolean} True if the endboss can walk, false otherwise.
     */
    canWalk() {
        return this.startEndBoss;
    }

    /**
     * Plays the walking animations.
     */
    playWalkAnimations() {
        this.playAnimation(this.IMAGES_WALK);
    }

    /**
     * Checks if the character has met the endboss.
     * @returns {boolean} True if the character has met the endboss, false otherwise.
     */
    charMeetEndBoss() {
        if (world.character.x > 3000) {
            return (this.x - 10) > world.character.x + world.character.width && (world.character.x + world.character.width) > this.x - 200;
        } else {
            return false;
        }
    }

    /**
     * Handles the endboss being hit by a bottle.
     */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHitTime <= this.hitCooldown) return;
        this.bottleHits++;
        this.energy = this.bottleHits >= 7 ? 0 : Math.max(0, this.energy - 20);
        if (this.energy > 0) {
            this.lastHit = currentTime;
            this.isHurt = true;}
        world.endbossStatusBar.updateStatusBar();
        if (this.energy === 0) {
            this.playDeadAnimations();
            soundManager.isSoundOn && soundManager.endbossDeadSound.play(); }
        this.lastHitTime = currentTime;
        soundManager.isSoundOn && soundManager.endbossHurtSound.play();}
}
