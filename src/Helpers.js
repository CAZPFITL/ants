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
        } else if (e === 'q') {
            console.log(e)
            if (!Ants.arh) {
                Ants.arh = true
            } else {
                Ants.arh = !Ants.arh
            }
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
     * @param {Next's move direction} // nextMove   DIRECTION >> COORD
     */
    static moveEntity(entity, nextMove) {
        let x = nextMove === 'left' ? (entity.actualPosition[0] - 1) : nextMove === 'right' ? (entity.actualPosition[0] + 1) : entity.actualPosition[0]
        let y = nextMove === 'down' ? (entity.actualPosition[1] + 1) : nextMove === 'up' ? (entity.actualPosition[1] - 1) : entity.actualPosition[1]
        let outOfBounds = (entity.actualPosition[0] > Ants.canvasBounds[0] && entity.actualPosition[1] > Ants.canvasBounds[1]) ? true : false;
        entity.actualPosition = outOfBounds ? [0, 0] : [x, y]
        entity.directions.stepsToDo--
    }

    /**
     * 
     * @param {*} arr 
     * @param {*} str 
     * @returns 
     */
    static includesMultiDimension(arr, str) { 
        return JSON.stringify(arr).includes(JSON.stringify(str)) 
    };

    /**
     * COORD >> DIRECTION
     * @param {*} initialCoord 
     * @param {*} finalCoord 
     * @returns 
     */
    static getCoordsRelationalDirection(initialCoord, finalCoord) {
        if (finalCoord[0] > initialCoord[0] && initialCoord[1] === finalCoord[1]) {
            return 'right'
        } else if (finalCoord[0] < initialCoord[0] && initialCoord[1] === finalCoord[1]) {
            return 'left'
        } else if (initialCoord[0] === finalCoord[0] && finalCoord[1] < initialCoord[1]) {
            return 'up'
        } else if (initialCoord[0] === finalCoord[0] && finalCoord[1] > initialCoord[1]) {
            return 'down'
        } else {
            return false
        }
    }

    /**
     * Scan any target you specify in an array, both, observer and observable must have .state key in  -  COORD >> DIRECTIONS
     * @param {Search diameter} diameter  
     * @param {Who is scanning} watcher 
     * @param {What are we scanning} targetsColection 
     */
    static scanTarget(watcher, targetsColection, distance = 1) {
        const actualPosition = [...watcher.actualPosition]
        let actualX = actualPosition[0]
        let actualY = actualPosition[1]
        let references = { x1: actualX, x2: actualX, y1: actualY, y2: actualY, }
        let checkPositions = {
            up: [
                actualX,
                references.y1 - distance
            ],
            down: [
                actualX,
                references.y2 + distance
            ],
            left: [
                references.x1 - distance,
                actualY
            ],
            right: [
                references.x2 + distance,
                actualY
            ],
        }
        let output = []

        Ants.helpers.includesMultiDimension(targetsColection, checkPositions.up) ? output.push('up') : () => { }
        Ants.helpers.includesMultiDimension(targetsColection, checkPositions.right) ? output.push('right') : () => { }
        Ants.helpers.includesMultiDimension(targetsColection, checkPositions.down) ? output.push('down') : () => { }
        Ants.helpers.includesMultiDimension(targetsColection, checkPositions.left) ? output.push('left') : () => { }
        return output
    }

    /**
     * get random true / false 50/50 chance
     */
    static getFiftyFifty() {
        return Ants.helpers.getRandomInt(0, 1000000) >= 500000 ? true : false
    }

    /**
     * get home direction
     */
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

    /**
     * Update clock
     */
    static updateClock() {
        Ants.world.time.globalSeconds++
        if (Ants.world.time.seconds <= 58) {
            Ants.world.time.seconds++
        } else {
            Ants.world.time.seconds = 0
            if (Ants.world.time.minutes <= 58) {
                Ants.world.time.minutes++
            } else {
                Ants.world.time.minutes = 0
                if (Ants.world.time.hours <= 22) {
                    Ants.world.time.hours++
                } else {
                    Ants.world.time.seconds = 0
                    Ants.world.time.minutes = 0
                    Ants.world.time.hours = 0
                    Ants.world.time.days++
                }
            }
        }
        // console.log(+ Ants.world.time.hours + ':' + Ants.world.time.minutes + ':' + Ants.world.time.seconds)
    }
}