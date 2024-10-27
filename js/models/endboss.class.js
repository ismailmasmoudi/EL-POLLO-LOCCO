class Endboss extends MovableObject {

    y = 100;
    height = 350;
    width = 300;
    speed = 1;
    startEndBoss = false;
    attack = false;
    firstSight = true;
    turnRight = false;
    bottleHits = 0; 
    lastFrameTime = 0;
    animationCounter = 0;
    animationSpeed = 0.1; // Animationsgeschwindigkeit (Bilder pro Sekunde)
    
    offset = {
        top: 50,     // Example: Adjust as needed
        bottom: 30,   // Example: Adjust as needed
        left: 40,    // Example: Adjust as needed
        right: 40    // Example: Adjust as needed
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
        this.checkTurnAround();
        this.animate();
        this.checkGameWin();
        this.checkCharacterPosition(); // Neue Funktion zum Überprüfen der Charakterposition
    }


    checkGameWin() {
        setInterval(() => this.gameWinner(), 1000 / 60);
    }


   checkTurnAround() {
       setTimeout(() => this.canTurnAround(), 2000);
   }


    canTurnAround() {
        setInterval(() => this.endBossTurnAround(), 200)
    }

    // animate() {
    //     this.animateImages();
    //     this.moveEndBoss();
    // }

    animate() {
        setInterval(() => {
            if (!gamePaused && !this.isDead()) {
                if (this.energy <= 0) {
                    this.die();
                } else if (super.isHurt()) {
                    this.playHurtAnimations();
                } else {
                    this.playImages(); // Füge den Aufruf von playImages() hier hinzu
                }
            }
        }, 1000 / 60);
    }
     

    animateImages() {
        this.playImages(); 
    }

    checkCharacterPosition() {
        setInterval(() => {
            if (world.character.x >= 3380 && !this.isDead() && !this.animationsStarted) {
                this.startAnimations(); // Starte die Animationen des Endboss
            }
        }, 1000 / 60);
    }
    startAnimations() {
        this.animationsStarted = true; 
        this.playImages(); 
        this.moveEndBoss(); // Rufe moveEndBoss() hier auf
    }

    // playImages() {
    //     let intervalId = setInterval(() => {
    //         if (!gamePaused) {
    //             if (super.isDead()) { // Korrigierte Zeile: super.isDead()
    //                 this.playDeadAnimations(intervalId);
    //             } else if (super.isHurt()) { 
    //                 this.playHurtAnimations();
    //             } else if (this.canWalk() && !world.character.isDead()) { 
    //                 this.playWalkAnimations();
    //             } else if (this.canAttack() && !world.character.isDead()) {
    //                 this.playAnimation(this.IMAGES_ATTACK);
    //             } else if (this.canAlert() || world.character.isDead()) {
    //                 this.playAlertAnimations();
    //             } 
    //         }
    //     }, 200); 
    // }

    // playImages() {
    //     let intervalId = setInterval(() => {
    //         if (!gamePaused) {
    //             if (super.isDead()) {
    //                 this.playDeadAnimations(intervalId);
    //             } else if (super.isHurt()) { 
    //                 this.playHurtAnimations();
    //             } else if (this.canAlert() || world.character.isDead()) { // Zuerst canAlert() prüfen
    //                 this.playAlertAnimations();
    //             } else if (this.canWalk() && !world.character.isDead()) { // Dann canWalk() prüfen
    //                 this.playWalkAnimations();
    //             } else if (this.canAttack() && !world.character.isDead()) {
    //                 this.playAnimation(this.IMAGES_ATTACK);
    //             } 
    //         }
    //     }, 200); 
    // }
    
    playImages() {
        let intervalId = setInterval(() => {
            if (!gamePaused) {
                if (super.isDead()) {
                    this.playDeadAnimations(intervalId);
                } else if (super.isHurt()) { 
                    this.playHurtAnimations();
                } else if (this.canAlert()) { // Zuerst canAlert() prüfen
                    this.playAlertAnimations();
                } else if (this.canAttack() && !world.character.isDead()) { // Dann canAttack() prüfen
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (this.canWalk() && !world.character.isDead()) { // Dann canWalk() prüfen
                    this.playWalkAnimations();
                } 
            }
        }, 1000 / 60); 
    }
    
    

    playHurtAnimations() {
        this.playAnimation(this.IMAGES_HURT);
        this.attack = true;
        this.speed = 2;
        this.isHurt = false; // isHurt zurücksetzen
    }

        
    // moveEndBoss() {
    //     setInterval(() => {
    //         if (!gamePaused && !this.isDead() && !world.character.isDead()) {
    //             let distanceToCharacter = world.character.x - this.x;
    //             if (distanceToCharacter > 150) { // Adjust the distance threshold as needed
    //                 this.moveRight();
    //             } else if (distanceToCharacter < -150) {
    //                 this.moveLeft();
    //             }
    //         }
    //     }, 1000 / 200);
    // }
    
    moveEndBoss() {
        setInterval(() => {
            if ( !gamePaused && !this.isDead() && !world.character.isDead()) {
                this.moveLeft(); // Endboss bewegt sich immer nach links
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

    canMoveRight() {
        return this.turnRight;
    }


    moveRight() {
        if (!this.isDead() && !world.character.isDead()) {
            super.moveRight();
            this.otherDirection = true;
        }
    }


    canMoveLeft() {
        return !this.turnRight && this.startEndBoss;
    }


    moveLeft() {
        if (!this.isDead() && !world.character.isDead()) {
            super.moveLeft();
            this.otherDirection = false;
        }
    }

  
    playDeadAnimations(intervalId) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        setTimeout(() => {
            clearInterval(intervalId);
        }, 1200);
    }

    // die() {
    //     this.playAnimation(this.IMAGES_DEAD);
    //     this.speed = 0;
    //     this.isDead = true; // Setze den Todesstatus auf true
    
    //     // Optionale Aktionen beim Tod des Endboss:
    //     // 1. Soundeffekt abspielen
    //     // soundManager.playDeathSound(); 
    
    //     // 2. Punkte vergeben
    //     // world.character.score += 1000; // Beispiel: 1000 Punkte vergeben
    
    //     // 3. Endboss nach einer Verzögerung aus dem Spiel entfernen
    //     setTimeout(() => {
    //         this.removeFromGame();
    //     }, 2000); // Beispiel: 2 Sekunden Verzögerung
    // }

    // canAttack() {
    //     return this.attack; // Weniger restriktive Bedingung
    // }



    // playAlertAnimations() {
    //     setTimeout(() => this.firstSight = false, 1000);
    //     this.playAnimation(this.IMAGES_ALERT)
    // }

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


    endBossTurnAround() {
        if (this.canTurnRight())
            this.turnRight = true;
        if (this.canTurnLeft())
            this.turnRight = false;
    }


    canTurnRight() {
        return this.shouldTurnRight() && !this.turnRight;
    }


    shouldTurnRight() {
        return (this.x + this.width + 30) < world.character.x;
    }


    canTurnLeft() {
        return this.shouldTurnLeft() && this.turnRight;
    }


    shouldTurnLeft() {
        return (this.x - 30) > world.character.x + world.character.width;
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
       
            this.bottleHits++; // Trefferzähler erhöhen
            if (this.bottleHits >= 7) {
                this.energy = 0; // Energie auf 0 setzen, wenn 7 Treffer erreicht sind
            } else {
                this.energy -= 14,28571428571429; // Beispiel: 20 Energiepunkte abziehen
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
    }
    
      
        

}