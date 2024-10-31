class World {
    character = new Character();
    endbossStatusBar;
    intervalId;
    level = Level1; // Access the globally defined level1
    canvas;
    ctx;
    keyboard;
    statusBar;
    throwableObjects = [];
    camera_x = 0;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBar = new StatusBar(this.character);
        this.coinStatusBar = new CoinStatusBar(this.character);
        this.bottleStatusBar = new BottleStatusBar(this.character);
        this.endbossStatusBar = new EndbossStatusBar(this.level.endboss);
        this.setWorld();
        this.draw();
        this.checkCollisions();
        this.run();
        // Trigger an event or set a flag to indicate character is ready
        this.characterReady = true;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.level.backgoundObjects.forEach(bgObject => {
            bgObject.draw(this.ctx); // Draw directly without addToMap()
        });
        // --- Draw everything that moves with the camera ---

        this.addObjectsToMap(this.level.clouds);
        this.level.clouds.forEach(cloud => {
            cloud.draw(this.ctx);
            cloud.update(); // Add this line to update each cloud's position
        });

        // Draw coins here
        this.level.coins.forEach(coin => {
            coin.draw(this.ctx); // Draw the coins
        });

        this.level.bottles.forEach(bottle => {
            bottle.draw(this.ctx); // Draw the bottles
        });
        // Draw throwable objects BEFORE the character
        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);

        if (this.level.endboss) {
            this.addToMap(this.level.endboss);

        }
        // Filter out dead enemies BEFORE drawing
        //    this.level.enemies = this.level.enemies.filter(enemy => !enemy.isDead);

        // Draw the filtered enemies
        this.addObjectsToMap(this.level.enemies);


        // Remove dead enemies after a delay (to show death animation)
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) {
                setTimeout(() => {
                    enemy.removeFromGame(); // Now remove the enemy
                }, 500); // Adjust delay (in milliseconds) as needed for your animation
            }
        });

        this.ctx.translate(-this.camera_x, 0);

        // --- Draw fixed elements (StatusBar) ---
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar); // Add this line to draw the bottleStatusBar
        this.addToMap(this.endbossStatusBar);
        // --- Check for win/lose conditions AFTER drawing everything else ---
        if (this.level.endboss && this.level.endboss.isDead()) {
            drawGameWin();
        } else if (this.character.isDead()) {
            drawGameOver();
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }




    checkCollisions() {
        setInterval(() => {
            let collidableObjects = [...this.level.enemies, this.level.endboss];
            collidableObjects.forEach((obj) => {
                if (obj && this.character.isColliding(obj)) {
                    // Only reduce character's energy if the enemy is NOT dead
                    if (!obj.isDead) {
                        this.character.hit();
                        this.statusBar.updateStatusBar();
                    }
                }
            });

            this.level.coins.forEach((coin, index) => {
                if (coin && this.character.isColliding(coin)) {
                    this.character.coins++; // Increase the character's coins
                    this.coinStatusBar.updateStatusBar(); // Update the coin status bar
                    this.level.coins.splice(index, 1); // Remove the collected coin
                }
            });



            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    bottle.collect(this.character);
                    this.bottleStatusBar.updateStatusBar(); // Call updateStatusBar here
                    this.level.bottles.splice(index, 1);
                }
            });


            this.level.enemies.forEach((enemy) => {
                if (enemy && !enemy.isDead) { // Check if enemy is alive BEFORE checking for collision
                    if (this.character.isColliding(enemy)) {
                        this.character.hit();
                        this.statusBar.updateStatusBar();
                    } else {
                        this.character.jumpOn(enemy);
                    }
                }
            });

            this.throwableObjects.forEach((bottle, bottleIndex) => {
                // Check collision with Endboss AND enemies in the SAME loop
                for (let i = 0; i < this.level.enemies.length; i++) {
                    let enemy = this.level.enemies[i];
                    if (enemy.isColliding(bottle)) {
                        enemy.kill();
                        bottle.bottleIsColliding(); // Trigger bottle splash animation
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 500); // Adjust delay as needed for your animation
                        return; // Bottle hit something, exit the loop
                    }
                }

                // Check Endboss collision ONLY if the bottle didn't hit an enemy
                if (this.level.endboss && this.level.endboss.isColliding(bottle)) {
                    this.level.endboss.hit();
                    this.endbossStatusBar.updateStatusBar();
                    bottle.bottleIsColliding(); // Trigger bottle splash animation
                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 500); // Adjust delay as needed for your animation
                }
            });

        }, 200);
    }



    addObjectsToMap(objects) {
        for (let i = objects.length - 1; i >= 0; i--) {
            let o = objects[i];
            if (o.removed) {
                objects.splice(i, 1); // Remove if marked for removal
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
        if (mo instanceof Endboss) {
            mo.startEndBoss = true; // Endboss aktivieren
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
            let isAhead = true; // Default: throw ahead
            if (this.character.otherDirection) {
                bottleX = this.character.x - 20;
                isAhead = false; // Throw behind if facing left
            }
            let bottle = new ThrowableObject(bottleX, this.character.y + 150, isAhead);
            this.throwableObjects.push(bottle);
            this.character.throwableBottles--;
            this.bottleStatusBar.updateStatusBar(); // Update the bottle status bar
        }
    }

}