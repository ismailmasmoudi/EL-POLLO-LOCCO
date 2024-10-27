// class Endboss extends MovableObject {
//     y = 100;
//     height = 350;
//     width = 300;
//     offset = {
//         top: 50,     // Example: Adjust as needed
//         bottom: 30,   // Example: Adjust as needed
//         left: 40,    // Example: Adjust as needed
//         right: 40    // Example: Adjust as needed
//     };

//     IMAGES_ALERT = [
//         'img/4_enemie_boss_chicken/2_alert/G5.png',
//         'img/4_enemie_boss_chicken/2_alert/G6.png',
//         'img/4_enemie_boss_chicken/2_alert/G7.png',
//         'img/4_enemie_boss_chicken/2_alert/G8.png',
//         'img/4_enemie_boss_chicken/2_alert/G9.png',
//         'img/4_enemie_boss_chicken/2_alert/G10.png',
//         'img/4_enemie_boss_chicken/2_alert/G11.png',
//         'img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];

//     IMAGES_WALKING = [
//         'img/4_enemie_boss_chicken/1_walk/G1.png',
//         'img/4_enemie_boss_chicken/1_walk/G2.png',
//         'img/4_enemie_boss_chicken/1_walk/G3.png',
//         'img/4_enemie_boss_chicken/1_walk/G4.png'
//     ];

//     IMAGES_ATTACK = [
//         'img/4_enemie_boss_chicken/3_attack/G13.png',
//         'img/4_enemie_boss_chicken/3_attack/G14.png',
//         'img/4_enemie_boss_chicken/3_attack/G15.png',
//         'img/4_enemie_boss_chicken/3_attack/G16.png',
//         'img/4_enemie_boss_chicken/3_attack/G17.png',
//         'img/4_enemie_boss_chicken/3_attack/G18.png',
//         'img/4_enemie_boss_chicken/3_attack/G19.png',
//         'img/4_enemie_boss_chicken/3_attack/G20.png'
//     ]

//     IMAGES_HURT = [
//         'img/4_enemie_boss_chicken/4_hurt/G21.png',
//         'img/4_enemie_boss_chicken/4_hurt/G22.png',
//         'img/4_enemie_boss_chicken/4_hurt/G23.png'
//     ];

//     IMAGES_DEAD = [
//         'img/4_enemie_boss_chicken/5_dead/G24.png',
//         'img/4_enemie_boss_chicken/5_dead/G25.png',
//         'img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];






//     currentImage = 0;

//     constructor() {
//         super().loadImage(this.IMAGES_ALERT[0]);
//         this.loadImages(this.IMAGES_ALERT);
//         this.loadImages(this.IMAGES_ATTACK);
//         this.loadImages(this.IMAGES_HURT);
//         this.loadImages(this.IMAGES_DEAD);
//         this.loadImages(this.IMAGES_WALKING);
//         this.x = 3700;
//         this.animate();

//     }
   
//     animate() {
//         let hurtAnimationPlaying = false; // Flag to track hurt animation

//         setInterval(() => {
//             if (!gamePaused && !this.isDead) {
//                 if (this.energy <= 0) {
//                     this.die();
//                 } else if (this.isHurt && !hurtAnimationPlaying) {
//                     // Play hurt animation once
//                     this.playAnimation(this.IMAGES_HURT);
//                     hurtAnimationPlaying = true; // Set the flag
//                     this.currentImage = 0; // Reset animation index

//                     // Reset the flag after the animation completes
//                     setTimeout(() => {
//                         hurtAnimationPlaying = false;
//                         this.isHurt = false; // Reset isHurt after animation
//                     }, this.IMAGES_HURT.length * 200); // Assuming 200ms per frame
//                 } else if (!hurtAnimationPlaying) {
//                     // Play default animation if hurt animation is not playing
//                     this.playAnimation(this.IMAGES_ALERT);
//                 }
//             }
//         },100/ 60);
//     }

//     hit() {
//         this.energy -= 14.28;
//         if (this.energy <= 0) {
//             this.die();
//         } else {
//             this.isHurt = true; // Set the flag to trigger hurt animation
//         }
//     }

//     die() {
//         this.isDead = true;
//         this.speed = 0;
//         this.playAnimation(this.IMAGES_DEAD);
//     }


   



// }