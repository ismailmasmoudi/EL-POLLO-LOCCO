class Endboss extends MovableObject {

    y = 100;
    height = 350;
    width = 300;
    speed = 0.5;
    startEndBoss = false;
    attack = false;
    firstSight = true;
    turnRight = false;
    bottleHits = 0; 
    lastHitTime = 0; // Time of the last hit
    hitCooldown = 500; // Cooldown period in milliseconds (adjust as needed)
    youWin = false;
    gamesstarted = true;
    offset = {
        top: 60,     // Example: Adjust as needed
        bottom: 10,   // Example: Adjust as needed
        left: 30,    // Example: Adjust as needed
        right: 20    // Example: Adjust as needed
    };


    IMAGES_WALK = [ 
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3700;
        this.animate();
        this.checkGameWin();
        let checkCharacterInterval = setInterval(() => {
            if (world && world.characterReady) {
                clearInterval(checkCharacterInterval); // Stop checking
                this.checkCharacterPosition(); 
            }
        }, 100); // Check every 100ms
    }


    checkGameWin() {
        setInterval(() => this.gameWinner(), 1000 / 60);
    }

    animateImages() {
        this.animate(); 
    }

    checkCharacterPosition() {
        setInterval(() => {
            if (world.character.x >= 3184 && !this.isDead() && !this.animationsStarted) {
                this.startAnimations(); // Starte die Animationen des Endboss
            }
        }, 1000 / 60);
    }

    startAnimations() {
        this.animationsStarted = true; 
        this.animate(); 
        this.moveEndBoss(); 
    }


    animate() {
        let intervalId = setInterval(() => {
            if (gameStarted && !gamePaused) {
                if (super.isDead()) {
                    this.playDeadAnimations(intervalId); 
                } else if (super.isHurt()) {
                    this.playHurtAnimations();
                } else if (this.canAlert()) {
                    this.playAlertAnimations();
                } else if (this.canAttack() && !world.character.isDead()) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (this.canWalk() && !world.character.isDead()) {
                    this.playWalkAnimations();
                }
            }
        }, 1000 / 5); 
    }

    
    playHurtAnimations() {
        this.playAnimation(this.IMAGES_HURT);
        this.attack = true;
        this.speed = 1;
        this.isHurt = false; // isHurt zurücksetzen
    }

        
    moveEndBoss() {
        setInterval(() => {
            if (gameStarted && !gamePaused && !this.isDead() && !world.character.isDead()) { // Check gameStarted here
                this.moveLeft(); 
            }
        }, 1000 / 200);
    }

    
    canAttack() {
        let distanceToCharacter = Math.abs(world.character.x - this.x);
        return distanceToCharacter < 200; // Beispiel: Angriff, wenn Abstand kleiner als 200 Pixel
    }
    
    canAlert() {
        return this.charMeetEndBoss() && this.firstSight;
    }


    moveLeft() {
        if (!this.isDead() && !world.character.isDead()) {
            super.moveLeft();
        }
    }

  
    // playDeadAnimations(intervalId) {
    //     this.playAnimation(this.IMAGES_DEAD);
    //     this.speed = 0;
    //     setTimeout(() => {
    //         clearInterval(intervalId);
    //     }, 1000 / 200);
    // }
    playDeadAnimations(intervalId) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;  
        setTimeout(() => {
            clearInterval(intervalId); 
        }, 200); 
    }
    

    playAlertAnimations() {
        this.playAnimation(this.IMAGES_ALERT);
        setTimeout(() => {
            this.firstSight = false;
            this.startEndBoss = true; // Endboss aktivieren
        }, 1000);
    }
    

    canWalk() {
        return this.startEndBoss;
    }


    playWalkAnimations() {
        this.playAnimation(this.IMAGES_WALK);
    }


    charMeetEndBoss() {
        if (world.character.x > 3380) {
            return (this.x - 10) > world.character.x + world.character.width && (world.character.x + world.character.width) > this.x - 200;
        } else {
            return false; // Charakter hat die Position 3380 noch nicht erreicht
        }
    }
    

    gameWinner() {
        if (this.isDead()) {
            youWin = true;
            gamesstarted = false;
        }
    }

    
    hit() {
        const currentTime = new Date().getTime();
    
        // Check if the cooldown period has passed since the last hit
        if (currentTime - this.lastHitTime > this.hitCooldown) {
            this.bottleHits++; // Trefferzähler erhöhen
    
            if (this.bottleHits >= 7) {
                this.energy = 0; // Energie auf 0 setzen, wenn 7 Treffer erreicht sind
            } else {
                // Only reduce energy if bottleHits is less than 7
                this.energy -= 14.28571428571429; // Beispiel: 20 Energiepunkte abziehen
                if (this.energy < 0) {
                    this.energy = 0; // Energie darf nicht unter 0 fallen
                } else {
                    this.lastHit = new Date().getTime(); // Letzten Treffer speichern
                    this.isHurt = true; // Endboss ist jetzt verletzt
                }
            }
    
            world.endbossStatusBar.updateStatusBar(); // Statusanzeige aktualisieren
    
            // Die()-Funktion nur aufrufen, wenn die Energie 0 ist
            if (this.energy === 0) {
                this.playDeadAnimations();
            }
    
            // Update the last hit time
            this.lastHitTime = currentTime;
        }
    }
    
    drawFrame(ctx) { // Add this method to the Endboss class
        if (this instanceof Endboss) { // Check if it's an Endboss instance
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
    
            // Apply offsets to the rectangle's position and dimensions
            ctx.rect(
                this.x + this.offset.left, 
                this.y + this.offset.top, 
                this.width - this.offset.left - this.offset.right, 
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

}