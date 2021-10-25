import Canvas from './Canvas.js';

/**
 * This is an abstract class containing all game helpers methods
 */
export default class helpers extends Canvas {
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
    static getRandomInt(min = 0, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Get coord/num in base of the size selected
     * @param {number} num 
     * @returns 
     */
    static getStepSize(num) {
        return Ants.counters.stepSize * num
    }

    /**
     * Process Key Ups
     * @param {event} e 
     */
    static processKeyUp(e) {

    }

    /**
     * Process Key Downs
     * @param {event} e 
     */
    static processKeyDown(e) {
        if (e === Ants.settings.keys.pauseKey) {
            Ants.state.changeState(Ants.state.state === 'pause state' ? 'play state' : 'pause state')
        } else if (e === Ants.settings.keys.rainKey) {
            Ants.world.state.changeState('rainy')
        } else if (e === Ants.settings.keys.sunnyKey) {
            Ants.world.state.changeState('sunny')
        }
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
        func[1] = helpers.capitalize(func[1])
        return func.join('')
    }

    /**
     * Move Entity to given direction (Requires actualPosition[x,y] key)
     * @param {Next's move direction} // nextMove 
     */
    static moveEntity(entity, nextMove) {
        let x = nextMove === 'left' ? (entity.actualPosition[0] - 1) : nextMove === 'right' ? (entity.actualPosition[0] + 1) : entity.actualPosition[0]
        let y = nextMove === 'down' ? (entity.actualPosition[1] + 1) : nextMove === 'up' ? (entity.actualPosition[1] - 1) : entity.actualPosition[1]
        let outOfBounds = (entity.actualPosition[0] > Ants.canvasBounds[0] && entity.actualPosition[1] > Ants.canvasBounds[1]) ? true : false;
        entity.actualPosition = outOfBounds ? [0, 0] : [x, y]
        entity.directions.stepsToDo--
    }

    /**
     * Scan any target you specify in an array, both, observer and observable must have .state key in
     * @param {Search diameter} diameter 
     * @param {Who is scanning} watcher 
     * @param {What are we scanning} targetsColection 
     */
    static scanTarget(radius, watcher, targetsColection) {
        const scannedPosition = [...watcher.actualPosition]
        let xAxisIndex = scannedPosition[0]
        let yAxisIndex = scannedPosition[1]
        xAxisIndex = xAxisIndex - radius
        yAxisIndex = yAxisIndex - radius
        let xEnd = 0 + (radius * 2)
        let yEnd = 0 + (radius * 2)
        // console.log('scanned start:', [xAxisIndex, yAxisIndex])

        for (let x = 0; x < xEnd; x++) {
            for (let y = 0; y < yEnd; y++) {

                // /**
                //  * Found closer targets
                //  */
                // if (watcher.actualPosition[0] === xAxisIndex && watcher.actualPosition[1] === yAxisIndex && this !== target) {
                //     if (!watcher.state.observers.includes(target)) {
                //         console.log(watcher.name, ' - found - ', target.name)
                //         watcher.state.add(target)
                //     }
                // }

                // /**
                //  * Loose closer Targets
                //  */
                // watcher.state.observers.forEach(x => {

                // })
                yAxisIndex++
                // console.log('scanned:', [xAxisIndex, yAxisIndex])
                xAxisIndex++
                // console.log('scanned:', [xAxisIndex, yAxisIndex])
            }
        }
        if (watcher.state.observers.length > 0) {
            // console.log('close targets to ', watcher.name, ': ', watcher.state.observers)
        }
    }

    static getHomeStep(_actual, home = Ants.anthill.position) {
        let path = []
        let actual = [...(path.length > 0 ? path[path.length - 1] : _actual)]
        let x = actual[0]
        let y = actual[1]

        if (x == home[0] && y == home[1]) {
            return actual
        } else {
            if (x < home[0]) {
                x++;
            } else if (x > home[0]) {
                x--;
            } else if (y < home[1]) {
                y++;
            } else if (y > home[1]) {
                y--;
            }
            return [x, y];
        }
    }
}