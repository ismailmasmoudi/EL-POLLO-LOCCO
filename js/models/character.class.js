class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 65;
    speed = 1;
    world;
    coins = 0;
    bottles = 0;
    idleStartTime = null;
    offset = {
        top: 10,    // Example: Adjust as needed
        bottom: 10,  // Example: Adjust as needed
        left: 10,   // Example: Adjust as needed
        right: 10   // Example: Adjust as needed
    };
   
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP= [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    constructor(world,keyboard) {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.world = world; 
        this.keyboard = keyboard; // Store the keyboard object
    }

    
    animate() {
        setInterval(() => {
            soundManager.walkingSound.pause(); 

            // Only move and play walking sound if the game is not paused
            if (!gamePaused) { // Check if the game is paused
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (soundManager.isSoundOn) { 
                        soundManager.walkingSound.play(); 
                    }
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    if (soundManager.isSoundOn) { 
                        soundManager.walkingSound.play(); 
                    }
                }
                this.world.camera_x = -this.x + 100;

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
                    if (this.idleStartTime === null) { // Set only if not already set
                        this.idleStartTime = Date.now();
                    }
                } else {
                    this.idleStartTime = null; // Reset if moving
                }
            } 
        }, 100 / 60);

 
        setInterval(() => {
            if (!gamePaused) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isAboveGround()) {
                    if (this.speedY > 0) {
                        this.playAnimation(this.IMAGES_JUMPING);
                    } else {   
                        this.playAnimation(this.IMAGES_JUMPING); 
                    }
                } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.idleStartTime = null; // Reset idle time when walking
                } else if (this.idleStartTime) { // Only check idle if idleStartTime is set
                    let currentTime = Date.now();
                    let idleDuration = (currentTime - this.idleStartTime) / 1000;
                    if (idleDuration > 3) {
                        this.playAnimation(this.IMAGES_SLEEP);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                } else { 
                    // Character is not idle, so don't play idle or sleep animations
                }
            }
        }, 100); 
    }

    jump() {
        if (!this.isAboveGround()) { 
            this.speedY = 28; 
            this.idleStartTime = null; // Reset idle time when jumping
        }
    }
}
    
    
