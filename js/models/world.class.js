class World {
    character = new Character();
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
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // --- Draw everything that moves with the camera ---
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgoundObjects);
        this.addObjectsToMap(this.level.clouds);

        // Draw throwable objects BEFORE the character
        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // --- Draw fixed elements (StatusBar) ---
        this.addToMap(this.statusBar);

    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottleX = this.character.x + 100; // Default: throw from the right
            if (this.character.otherDirection) {
                bottleX = this.character.x - 150; // Throw from the left if facing left
            }
            let bottle = new ThrowableObject(bottleX, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
    }

   

    checkCollisions() {
        setInterval(() => {
            let collidableObjects = [...this.level.enemies, this.level.endboss];
            collidableObjects.forEach((obj) => {
                if (obj && this.character.isColliding(obj)) { // Check if obj is defined
                    this.character.hit();
                    this.statusBar.updateStatusBar();
                }});
         
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
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection); // Pass character's direction
            this.throwableObjects.push(bottle);
        }
    }
}