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


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.level.backgoundObjects.forEach(bgObject => {
            bgObject.draw(this.ctx);
        });
        this.addObjectsToMap(this.level.clouds);
        this.level.clouds.forEach(cloud => {
            cloud.draw(this.ctx);
            cloud.update();
        });
        this.level.coins.forEach(coin => {
            coin.draw(this.ctx);
            coin.drawFrame(this.ctx);
        });
        this.level.bottles.forEach(bottle => {
            bottle.draw(this.ctx);
        });
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        if (this.level.endboss) {
            this.addToMap(this.level.endboss);
        }
        this.checkAndPlayEndbossMusic();
        this.addObjectsToMap(this.level.enemies);
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) {
                setTimeout(() => {
                    enemy.removeFromGame();
                }, 500);
            }
        });
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.shouldDrawEndbossStatusBar()) {
            this.addToMap(this.endbossStatusBar);
        }
    }

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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkEndbossCollision();

            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.coins++;
                    this.coinStatusBar.updateStatusBar();
                    if (soundManager.isSoundOn) {
                        soundManager.coinCollectSound.play();
                    }
                    this.level.coins.splice(index, 1);
                }
            });
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    bottle.collect(this.character);
                    this.bottleStatusBar.updateStatusBar();
                    this.level.bottles.splice(index, 1);
                }
            });
 

            this.throwableObjects.forEach((bottle, bottleIndex) => {
                for (let i = 0; i < this.level.enemies.length; i++) {
                    let enemy = this.level.enemies[i];
                    if (enemy.isColliding(bottle)) {
                        enemy.kill();
                        bottle.bottleIsColliding();
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 500);
                        return;
                    }
                }
                if (this.level.endboss && this.level.endboss.isColliding(bottle)) {
                    this.level.endboss.hit();
                    this.endbossStatusBar.updateStatusBar();
                    bottle.bottleIsColliding();
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 500);
                }
            });

        }, 200);
    }

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
    
    checkEndbossCollision() {
        if (this.level.endboss && !this.level.endboss.isDead() && this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.healthStatusBar.updateStatusBar();
        }
    }

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

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        if (this.character.x >= 3380) {
            if (mo instanceof EndbossStatusBar) {
                mo.draw(this.ctx);
            }
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.clouds.forEach(cloud => cloud.world = this);
        this.level.bottles.forEach(bottle => bottle.world = this);
        this.level.coins.forEach(coin => coin.world = this);
        this.level.backgoundObjects.forEach(bgObject => bgObject.world = this);
    }


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