class World {
    character = new Character();
    endbossStatusBar;
    intervalId;
    level = Level1;
    canvas;
    ctx;
    keyboard;
    healthStatusBar;
    throwableObjects = [];
    camera_x = 0;
    showEndbossStatusBarPermanently = false;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.healthStatusBar = new HealthStatusBar(this.character);
        this.coinStatusBar = new CoinStatusBar(this.character);
        this.bottleStatusBar = new BottleStatusBar(this.character);
        this.endbossStatusBar = new EndbossStatusBar(this.level.endboss);
        this.level = new Level(
            Level1.enemies,
            Level1.clouds,
            Level1.backgoundObjects,
            Level1.bottles,
            Level1.coins,
            Level1.endboss,
            Level1.level_end_x
        );
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.run();
        this.characterReady = true;
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let roundedCameraX = Math.round(this.camera_x); 
        this.ctx.translate(roundedCameraX, 0); 
        this.level.backgoundObjects.forEach(bgObject => bgObject.draw(this.ctx));
        this.addObjectsToMap(this.level.clouds, this.ctx);
        this.ctx.translate(-roundedCameraX, 0); 
        this.drawStatusBars();
        this.ctx.translate(roundedCameraX, 0); 
        this.drawLevelElements(this.ctx); 
        this.ctx.translate(-roundedCameraX, 0); 
    }
    
    /**
     * Draws the level elements, excluding background objects and status bars.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    drawLevelElements(ctx) {
        this.addObjectsToMap(this.level.coins, this.ctx);
        this.level.bottles.forEach(bottle => bottle.draw(this.ctx));
        this.addObjectsToMap(this.throwableObjects, this.ctx);
        this.addToMap(this.character, this.ctx);
        if (this.level.endboss) {
            this.addToMap(this.level.endboss, this.ctx);
        }
        this.checkAndPlayEndbossMusic();
        this.addObjectsToMap(this.level.enemies, this.ctx);
    }

    /**
     * Draws the status bars, including health, coin, bottle, and endboss status bars.
     */
    drawStatusBars() {
        this.addToMap(this.healthStatusBar, this.ctx);
        this.addToMap(this.coinStatusBar, this.ctx);
        this.addToMap(this.bottleStatusBar, this.ctx);
        if (this.shouldDrawEndbossStatusBar()) {
            this.addToMap(this.endbossStatusBar, this.ctx);
        }
    }

    /**
     * Checks if the endboss music should be played and starts it if necessary.
     */
    checkAndPlayEndbossMusic() {
        if (this.character.x >= 3000 && !this.endbossMusicStarted) {
            this.endbossMusicStarted = true;
            if (soundManager.isSoundOn) {
                soundManager.backgroundMusic.pause();
                soundManager.endboss_BackgroundSound.loop = true;
                soundManager.endboss_BackgroundSound.play();
            }
        }
    }

    /**
     * Checks if the endboss status bar should be drawn.
     * @returns {boolean} True if the endboss status bar should be drawn, false otherwise.
     */
    shouldDrawEndbossStatusBar() {
        if (this.showEndbossStatusBarPermanently) {
            return true;
        }
        if (this.character.x >= 3000) {
            this.showEndbossStatusBarPermanently = true;
            return true;
        }
        return false;
    }

    /**
     * Starts the game loop that checks for collisions and handles throwing objects.
     */
    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
        }, 200);
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
             this.checkBottleCollisions();
        }, 1000 / 60);
    }

    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
            this.checkThrowableObjectCollisions();
            this.checkEndbossCollision();
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.coins++;
                this.coinStatusBar.updateStatusBar();
                if (soundManager.isSoundOn) {
                    soundManager.coinCollectSound.play();
                }
                return false;
            }
            return true; 
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkBottleCollisions() {
        this.level.bottles = this.level.bottles.filter((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.collect(this.character);
                this.bottleStatusBar.updateStatusBar();
                return false; 
            }
            return true;
        });
    }

    /**
     * Checks for collisions between throwable objects and enemies or the endboss.
     */
    checkThrowableObjectCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.checkEnemyBottleCollisions(bottle, bottleIndex);
            this.checkEndbossBottleCollision(bottle, bottleIndex);
        });
    }

    /**
     * Checks for collisions between a throwable object and enemies.
     * @param {ThrowableObject} bottle - The throwable object to check for collisions.
     * @param {number} bottleIndex - The index of the throwable object in the throwableObjects array.
     */
    checkEnemyBottleCollisions(bottle, bottleIndex) {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isColliding(bottle)) {
                enemy.kill();
                bottle.bottleIsColliding();
                setTimeout(() => {
                    this.throwableObjects.splice(bottleIndex, 1);
                }, 60);
                return;
            }
        });
    }

    /**
     * Checks for collisions between a throwable object and the endboss.
     * @param {ThrowableObject} bottle - The throwable object to check for collisions.
     * @param {number} bottleIndex - The index of the throwable object in the throwableObjects array.
     */
    checkEndbossBottleCollision(bottle, bottleIndex) {
        if (this.level.endboss && this.level.endboss.isColliding(bottle) && !bottle.hasCollidedWithEndboss) { 
            this.level.endboss.hit();
            this.endbossStatusBar.updateStatusBar();
            bottle.bottleIsColliding();
            bottle.hasCollidedWithEndboss = true; 
            this.throwableObjects.splice(bottleIndex, 1); 
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy && !enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthStatusBar.updateStatusBar();
                } else {
                    this.character.jumpOn(enemy);
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and the endboss.
     */
    checkEndbossCollision() {
        if (this.level.endboss && !this.level.endboss.isDead() && this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.healthStatusBar.updateStatusBar();
        }
    }

    /**
     * Adds an array of objects to the game world.
     * @param {Array<MovableObject>} objects - The array of objects to add.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    addObjectsToMap(objects) {
        for (let i = objects.length - 1; i >= 0; i--) {
            let o = objects[i];
            if (o.removed) {
                objects.splice(i, 1);
            } else {
                this.addToMap(o);
            }
        }
    }

    /**
     * Adds a single object to the game world.
     * @param {MovableObject} mo - The object to add.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        if (this.character.x >= 3380) {
            if (mo instanceof EndbossStatusBar) {
                mo.draw(this.ctx);
            }
        }
    }

    /**
    * Flips the image of a movable object horizontally.
    * @param {MovableObject} mo - The movable object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Resets the canvas transformation after flipping an image.
     * @param {MovableObject} mo - The movable object that was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Sets the world property of all game objects to this world instance.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.clouds.forEach(cloud => cloud.world = this);
        this.level.bottles.forEach(bottle => bottle.world = this);
        this.level.coins.forEach(coin => coin.world = this);
        this.level.backgoundObjects.forEach(bgObject => bgObject.world = this);
    }

    /**
     * Checks if the character is throwing a bottle and creates a new throwable object if so.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.throwableBottles > 0) {
            let bottleX = this.character.x + 50;
            let isAhead = true;
            if (this.character.otherDirection) {
                bottleX = this.character.x - 20;
                isAhead = false;
            }
            let bottle = new ThrowableObject(bottleX, this.character.y + 150, isAhead);
            this.throwableObjects.push(bottle);
            this.character.throwableBottles--;
            this.bottleStatusBar.updateStatusBar();
        }
    }
}