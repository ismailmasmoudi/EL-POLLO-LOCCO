class HealthStatusBar extends drawableObject {
    /**
     * The vertical position of the health status bar on the canvas.
     * @type {number}
     */
    y = -10;
    /**
     * The horizontal position of the health status bar on the canvas.
     * @type {number}
     */
    x = 30;
    /**
     * The width of the health status bar image.
     * @type {number}
     */
    width = 200;
    /**
     * The height of the health status bar image.
     * @type {number}
     */
    height = 60;
    /**
     * An array of image paths representing different health levels.
     * @type {string[]}
     */
    Images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * The character object whose health is being displayed.
     * @type {Character}
     */
    character;

    /**
     * Constructs a new HealthStatusBar object.
     * @param {Character} character - The character object to track health for.
     */
    constructor(character) {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.Images);
        this.character = character;
        this.updateStatusBar();
    }

    /**
     * Updates the health status bar image based on the character's current energy level.
     */
    updateStatusBar() {
        let energyPercentage = Math.floor(this.character.energy / 10) * 10;
        let imageIndex = Math.floor(energyPercentage / 20);
        let path = this.Images[imageIndex];
        this.img = this.imageCache[path];
    }
}
