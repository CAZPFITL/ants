import Canvas from './Canvas.js';
import { greetings } from './Assets.js';

/**
 * This is an abstract class containing all game helpers methods
 */
export default class Helpers extends Canvas {
    /**
     * Creates Ants on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App, _v) {
        window.Ants = new App(_v)
        Ants.state.add(Ants)
    }

    /**
     * This functions gives to Snake the fullscreen functionality
     */
    static fullScreenFunctionality() {
        // Iniciar pantalla completa
        Ants.fullScreen = () => {
            Ants.isFull = !Ants.isFull
            var docElm = document.documentElement
            //W3C   
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            }
            //FireFox   
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            }
            // Chrome, etc.   
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            }
            //IE11   
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen()
            }
        }

        // Salir de pantalla completa
        Ants.normalScreen = () => {
            Ants.isFull = !Ants.isFull
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
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
        babyAnt.notification(`new ant created: \n"${babyAnt.name}" says: -${greetings[Ants.Helpers.getRandomInt(greetings.length - 1)]}`)
        Ants.world.state.add(babyAnt)
        Ants.anthill.ants.push(babyAnt)
    }
}