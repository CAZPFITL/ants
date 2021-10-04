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

    //TODO: add map chords coordenates
    static getMapCoords() {
        let array = Ants.delunator.mapCoords
        let mapTopX = Ants.canvas.width
        let mapTopy = Ants.canvas.height
    }

    /**
     * New Ant data push and position
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    static createAnt(posX, posY, trace) {
        let babyAnt = new Ants.antClass(posX, posY, trace)
        Ants.ants.push(babyAnt)
        Ants.state.add(babyAnt)
    }

    /**
     * draw
     */
    static draw() {
        // this.antPng = new Image();
        // this.antPng.src = './src/ant.png'
        Ants.Helpers.step()
        Ants.Helpers.drawNewCanvas()
        Ants.Helpers.drawAntsCollection()
        Ants.Helpers.requestAnimation()
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    static step() {
        Ants.counters.counter++
        if (Ants.counters.counter % Ants.counters.cycles == 0) {
            if (Ants.counters.stepper === Ants.counters.stepperLimit) {
                Ants.counters.stepper = 0
            } else {
                Ants.counters.stepper++
            }
            Ants.Helpers.stepProcess()
        }
    }

    /**
     * Moves every ant (runs move method on every ant on map)
     */
    static stepProcess() {
        Ants.ants.forEach(ant => {
            ant.move()
        })
    }

    /**
     * Draw all ants in the board
     */
    static drawAntsCollection() {
        Ants.ants.forEach((ant) => {
            Ants.Helpers.drawPath(ant.walkedPath, ant.trace)
            Ants.ctx.fillStyle = "#333333"
            Ants.ctx.fillRect(ant.posX, ant.posY, 10, 10)
        })
    }

    /**
     * Renews the canvas on every draw loop
     * @param {this parameter} This 
     */
    static drawNewCanvas() {
        Ants.ctx = Ants.canvas.getContext('2d')
        Ants.ctx.clearRect(0, 0, Ants.canvas.width, Ants.canvas.height);
    }

    /**
     * Request Animation Frame
     * @param {drawing function} draw 
     */
    static requestAnimation() {
        window.requestAnimationFrame(Ants.Helpers.draw)
    }

    /**
     * draws all the traces for the ant
     * @param {trace path} path 
     * @param {trace color} color 
     */
    static drawPath(path, color) {
        path.forEach((step) => {
            Ants.ctx.fillStyle = color
            Ants.ctx.fillRect(step[0], step[1], 10, 10)
        })
    }
}