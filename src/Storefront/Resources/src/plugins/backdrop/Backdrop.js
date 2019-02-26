const SELECTOR_CLASS = "modal-backdrop";
const BODY_CLASS = "modal-open";

class BackdropSingleton {

    /**
     * Constructor
     * @returns {BackdropSingleton|*}
     */
    constructor() {
        if (!BackdropSingleton.instance) {
            BackdropSingleton.instance = this;
        }

        return BackdropSingleton.instance;
    }

    /**
     * Inserts a backdrop to document.body and sets a class to the body
     * itself to override default scrolling behavior
     */
    open() {
        // avoid multiple backdrops
        if (this._exists()) return;
        document.body.classList.add(BODY_CLASS);
        document.body.insertAdjacentHTML('beforeend', this._getTemplate());
    }

    /**
     * Removes all existing backdrops
     */
    close() {
        let backdrops = document.body.querySelectorAll(`.${SELECTOR_CLASS}`);
        backdrops.forEach(backdrop => backdrop.remove());
        document.body.classList.remove(BODY_CLASS);
    }

    /**
     * Checks if a backdrop already exists
     * @returns {boolean}
     * @private
     */
    _exists() {
        return (document.querySelectorAll(`.${SELECTOR_CLASS}`).length > 0);
    }

    /**
     * The backdrops HTML template definition
     * @returns {string}
     * @private
     */
    _getTemplate() {
        return `<div class="${SELECTOR_CLASS}"></div>`;
    }
}

/**
 * Make the Backdrop being a Singleton
 * @type {BackdropSingleton}
 */
const instance = new BackdropSingleton();
Object.freeze(instance);

export default class Backdrop {

    /**
     * Open the Backdrop
     */
    static open() {
        instance.open();
    }

    /**
     * Close the Backdrop
     */
    static close() {
        instance.close();
    }

    /**
     * Expose constant
     * @returns {string}
     */
    static SELECTOR_CLASS() {
        return SELECTOR_CLASS;
    }
}