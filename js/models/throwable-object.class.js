class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection) { 
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection; 
        this.throw(100, 150);
        this.offset = { // Make sure this is present and correct
            top: 10,    
            bottom: 10,  
            left: 10,   
            right: 10   
        };
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();

        // Set the horizontal speed based on the direction
        let throwSpeed = 12; // Adjust as needed
        if (this.otherDirection) {
            throwSpeed *= -1; // Throw left if otherDirection is true
        }

        setInterval(() => {
            this.x += throwSpeed;
        }, 25);
    }
}