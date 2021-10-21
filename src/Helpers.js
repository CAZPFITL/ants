import Canvas from './Canvas.js';

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

    static Move(direction) {
        Ants.move = true
        switch (direction) {
            case 'up':
                Ants.camera.moveTo(Ants.camera.lookAt[0], Ants.camera.lookAt[1] - Ants.counters.stepSize);
                break;
            case 'down':
                Ants.camera.moveTo(Ants.camera.lookAt[0], Ants.camera.lookAt[1] + Ants.counters.stepSize);
                break;
            case 'left':
                Ants.camera.moveTo(Ants.camera.lookAt[0] - Ants.counters.stepSize, Ants.camera.lookAt[1])
                break;
            case 'right':
                Ants.camera.moveTo(Ants.camera.lookAt[0] + Ants.counters.stepSize, Ants.camera.lookAt[1])
                break;
            case 'zoomIn':
                Ants.camera.zoomTo(Ants.camera.distance - 50)
                break;
            case 'zoomOut':
                Ants.camera.zoomTo(Ants.camera.distance + 50)
                break;

            default:
                break;
        }
    }

    static startAutoMove(direction) {
        if (Ants.move) {
            let interval = setInterval(() => Ants.move ? Ants.Helpers.Move(direction) : clearInterval(interval), 20)
        }
    }

    static debounce_leading(func, timeout = 500) {
        let timer;
        return (...args) => {
            if (!timer) {
                func.apply(this, args);
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        };
    }
}