
class Keyboard {
    constructor() {
        this.RIGHT = false;
        this.LEFT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
        this.initEventListener();
    }

    /**
     * Initializes event listeners for keydown and keyup events.
     */
    initEventListener() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
        document.addEventListener('keyup', (e) => {
            this.handleKeyUp(e);
        });
        this.initMobileButtonListeners();
    }

    /**
     * Initializes touch event listeners for mobile buttons.
     */
    initMobileButtonListeners() {
        this.addTouchEventListeners('btnLeft', 'LEFT');
        this.addTouchEventListeners('btnRight', 'RIGHT');
        this.addTouchEventListeners('btnUp', 'SPACE');
        this.addTouchEventListeners('btnThrow', 'D');
    }

    /**
     * Adds touch start and touch end event listeners to a mobile button.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} key - The keyboard key to simulate when the button is pressed.
     */
    addTouchEventListeners(buttonId, key) {
        const button = document.getElementById(buttonId);
        button.addEventListener('touchstart', () => {
            this[key] = true;
        });
        button.addEventListener('touchend', () => {
            this[key] = false;
        });
    }

    /**
     * Handles keydown events, setting the corresponding key property to true.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown(e) {
        if (e.code == 'ArrowRight') this.RIGHT = true;
        if (e.code == 'ArrowLeft') this.LEFT = true;
        if (e.code == 'ArrowUp') this.UP = true;
        if (e.code == 'ArrowDown') this.DOWN = true;
        if (e.code == 'Space') this.SPACE = true;
        if (e.code == 'KeyD') this.D = true;
    }

    /**
     * Handles keyup events, setting the corresponding key property to false.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyUp(e) {
        if (e.code == 'ArrowRight') this.RIGHT = false;
        if (e.code == 'ArrowLeft') this.LEFT = false;
        if (e.code == 'ArrowUp') this.UP = false;
        if (e.code == 'ArrowDown') this.DOWN = false;
        if (e.code == 'Space') this.SPACE = false;
        if (e.code == 'KeyD') this.D = false;
    }
}
