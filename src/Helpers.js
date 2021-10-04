/**
 * This is an abstract class containing all game helpers methods
 */
export default class Helpers {
    /**
     * Creates Ants on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App) {
        window.Ants = new App()
    }

    /**
     * returns a random number
     * @param {Max Limit} max 
     * @returns 
     */
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * returns the String capitalized
     * @param {String} str 
     * @returns 
     */
    static capitalize(str) {
        if (typeof str === 'undefined') {
            return false
        } else {
            let fistLetter = str.charAt(0).toUpperCase()
            let low = str.toLowerCase()
            let slicedWord = low.slice(1)
            return fistLetter + slicedWord
        }
    }

    /**
     * returns state function related
     * @returns processed state
     */
    static getStateFunction() {
        let func = Ants.state.name.split(' ')
        func[1] = Helpers.capitalize(func[1])
        return func.join('')
    }

    /**
     * returns a brand new canvas for the ants
     * @returns canvas created
     */
    static getCanvas() {
        let canvas = document.createElement('canvas')
        canvas.id = 'AntsApp'
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas
    }
}