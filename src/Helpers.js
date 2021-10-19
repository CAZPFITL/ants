import Canvas from './Canvas.js';
/**
 * This is an abstract class containing all game helpers methods
 */
export default class Helpers extends Canvas {
    /**
     * Creates Ants on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App) {
        window.Ants = new App()
        Ants.state.add(Ants)
    }

    /**
     * returns a random number
     * @param {Max Limit} max 
     * @returns 
     */
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static getStepSize(num) {
        return Ants.counters.stepSize * num
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
            let slicedWord = str.slice(1)
            return fistLetter + slicedWord
        }
    }

    /**
     * returns state function related
     * @returns processed state
     */
    static getStateFunction() {
        let func = Ants.state.state.split(' ')
        func[1] = Helpers.capitalize(func[1])
        return func.join('')
    }

    /**
     * New Ant data push and position
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    static createAnt(posX, posY, trace, job) {
        let babyAnt = new Ants.antClass(posX, posY, trace, job)
        Ants.world.state.add(babyAnt)
        Ants.anthill.ants.push(babyAnt)
    }
}