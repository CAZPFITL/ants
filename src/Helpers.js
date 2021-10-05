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

    /**
     * draw
     */
    static draw() {
        // this.antPng = new Image();
        // this.antPng.src = './src/ant.png'
        Ants.Helpers.step()
        Ants.Helpers.clearCanvas()
        Ants.Helpers.drawAntsCollection()
        Ants.Helpers.requestAnimation(Ants.Helpers.draw)
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    static step() {
        Ants.counters.counter++
        //NOTE: stepProcess At Speed Selected
        if (Ants.counters.counter % Ants.counters.speed === 0) {
            Ants.Helpers.stepProcess()
        }
        //NOTE: avoids a big and slow calculations
        if (Ants.counters.counter === Ants.counters.counterLimit) {
            Ants.counters.counter = 0
        } 
    }

    /**
     * Moves every ant (runs move method on every ant on map)
     */
    static stepProcess() {
        Ants.anthill.ants.forEach(ant => {
            ant.cycle()
        })
    }

    /**
     * Renews the canvas on every draw loop
     */
    static clearCanvas() {
        Ants.ctx.clearRect(0, 0, Ants.canvas.width, Ants.canvas.height);
    }

    /**
     * Draw all ants in the board
     */
    static drawAntsCollection() {
        //Ants.Helpers.drawPath(Ants.world.walkedPathTrace, '#BBBBBB') --> // WARNING Low performance
        Ants.anthill.ants.forEach((ant) => {
            Ants.ctx.fillStyle = ant.color
            Ants.ctx.fillRect(
                ant.actualPosition[0] * Ants.counters.stepSize,
                ant.actualPosition[1] * Ants.counters.stepSize,
                Ants.counters.stepSize,
                Ants.counters.stepSize)
        })
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
            Ants.ctx.fillRect(
                step[0] * Ants.counters.stepSize,
                step[1] * Ants.counters.stepSize,
                Ants.counters.stepSize,
                Ants.counters.stepSize)
        })
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

    /**
     * Create canvas in DOM and Ants Global
     */
    static createCanvas() {
        let canvas = Ants.Helpers.getCanvas()
        let step = Ants.counters.stepSize
        Ants.canvasBounds = [Math.trunc(canvas.width / step), Math.trunc(canvas.height / step)]
        document.getElementsByTagName('body')[0].prepend(canvas)
        Ants.canvas = canvas
        Ants.ctx = Ants.canvas.getContext('2d')
        Ants.Helpers.requestAnimation()
    }
}