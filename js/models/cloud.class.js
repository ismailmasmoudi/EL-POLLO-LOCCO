// class Cloud extends MovableObject{
//     y=5     ;
//     height=250;
//     width=500;

//     constructor() {
//         super().loadImage('img/5_background/layers/4_clouds/1.png')
//         this.x = 200 + Math.random() * 500; 
//         this.animate();
//     }

//     animate(){
//        this.moveLeft();
//     }

// }

class Cloud extends MovableObject {
    y = 5; // Random y-position within the top part
    width = 500;
    height = 250;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = x; // Random x-position
        this.speed = 0.09 ; // Random speed between 0.15 and 0.65
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // Move the cloud every frame (approx. 60 FPS)
    }
    update() {
        this.moveLeft();
    }
}
