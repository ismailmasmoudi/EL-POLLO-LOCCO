class World {
    character = new Character();
    level = Level1;
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
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgoundObjects);
        this.ctx.translate(-this.camera_x, 0);
        // ---------Space for fixed objects-------//
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        // draw () wird immer wieder aufgerufen 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200); }

        checkThrowObjects(){
            if (this.keyboard.D) {
                let bottle = new ThrowableObject( this.character.x +100, this.character.y +100);
                this.throwableObjects.push(bottle);
            }
        }
        checkCollisions() {
            setInterval(() => {
                this.level.enemies.forEach((enemy) => {
                    if (this.character.isColliding(enemy)) {
                        this.character.hit();
                        this.statusBar.updateStatusBar();
                        console.log(this.character.energy)
                    }
                });
            }, 200);
        }


        addObjectsToMap(objects) {
            objects.forEach(o => {
                this.addToMap(o);
            })
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
        }
    }