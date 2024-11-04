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
    showEndbossStatusBarPermanently = false;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusBar = new StatusBar(this.character);
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
            coin.draw(this.ctx);
            coin.drawFrame(this.ctx); // Draw bounding boxes for visual debugging
        });

        this.level.bottles.forEach(bottle => {
            bottle.draw(this.ctx);
             // Draw the bottles
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
        // Conditionally add the endbossStatusBar
        if (this.shouldDrawEndbossStatusBar()) {
            this.addToMap(this.endbossStatusBar);
        }
    }

    shouldDrawEndbossStatusBar() {
        // Check if the flag for permanent display is set
        if (this.showEndbossStatusBarPermanently) {
            return true; // Always draw if the flag is true
        }

        // Otherwise, check the character's position
        if (this.character.x >= 3000) {
            this.showEndbossStatusBarPermanently = true; // Set the flag to true
            return true; // Draw the status bar
        }

        return false; // Don't draw if the character hasn't reached the position
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        setInterval(() => {
            // let collidableObjects = [...this.level.enemies, this.level.endboss];

            let collidableObjects = [...this.level.enemies];
            if (this.level.endboss) {
                collidableObjects.push(this.level.endboss);
            }

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
                if (this.character.isColliding(coin)) {
                    this.character.coins++;
                    this.coinStatusBar.updateStatusBar();
                    this.level.coins.splice(index, 1);
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

    // In your World class:
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

        // Check if the character has passed the threshold for showing the endbossStatusBar
        if (this.character.x >= 3380) {
            if (mo instanceof EndbossStatusBar) {
                mo.draw(this.ctx); // Only draw the endbossStatusBar if the condition is met
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