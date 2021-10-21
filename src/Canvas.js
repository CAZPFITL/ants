import Screen from './Screen.js'
import Camera from './Camera.js'

export default class Canvas extends Screen {
    /**
     * draw
     */
    static draw() {
        Ants.Helpers.step()
        Ants.Helpers.drawCollection()
        Ants.Helpers.requestAnimation(Ants.Helpers.draw)
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    static step() {
        Ants.counters.counter++
        //NOTE: stepProcess At Speed Selected
        if (Ants.counters.counter % Ants.counters.speed === 0) {
            // Draw stuff at cycle
            Ants.anthill.ants.forEach(ant => {
                ant.cycle()
            })
        }
        //NOTE: avoids a big and slow calculations
        if (Ants.counters.counter === 120) {
            Ants.counters.counter = 0
        }
    }

    /**
     * Draw all ants in the board
     */
    static drawCollection() {
        let step;
        Ants.camera.end();

        Ants.Helpers.clearCanvas()

        Ants.camera.begin();

        Ants.Helpers.drawBoard()

        Ants.Helpers.drawPath(Ants.world.walkedPathTrace.slice(-Ants.world.walkedPathTrace.length * Ants.counters.maxDraw), '#BBBBBB')

        Ants.Helpers.drawAnthill('#693a00')

        Ants.anthill.ants.forEach((ant) => {
            Ants.camera.context.fillStyle = ant.color
            if (ant.job === 'queen') {
                step = Ants.counters.stepSize * 2
            } else {
                step = Ants.counters.stepSize
                let antPng = new Image();
                antPng.src = '/src/ant2.png'
                antPng.width = step
                antPng.height = step
                Ants.camera.context.drawImage(antPng, ant.actualPosition[0] * step, ant.actualPosition[1] * step, step, step);
            }
            Ants.camera.context.fillRect(
                ant.actualPosition[0] * step,
                ant.actualPosition[1] * step,
                step,
                step)
        })

    }

    /**
     * Renews the canvas on every draw loop
     */
    static clearCanvas() {
        Ants.camera.context.clearRect(0, 0, Ants.canvas.width, Ants.canvas.height);
    }

    static drawBoard() {
        console.log(Ants.canvasBounds[0])
        Ants.camera.context.fillStyle = 'green'
        Ants.camera.context.fillRect(
            0, //change by random then save it in anthill, then spawn every ant from there
            0,
            Ants.Helpers.getStepSize(Ants.canvasBounds[0]),
            Ants.Helpers.getStepSize(Ants.canvasBounds[1]))
    }

    /**
     * draws all the traces for the ant
     * @param {trace path} path 
     * @param {trace color} color 
     */
    static drawPath(path, color) {

        path.forEach((step) => {
            Ants.camera.context.fillStyle = color
            Ants.camera.context.fillRect(
                step[0] * Ants.counters.stepSize,
                step[1] * Ants.counters.stepSize,
                Ants.counters.stepSize,
                Ants.counters.stepSize)
        })
    }

    /**
     * draws home
     * @param {home color} color 
     */
    static drawAnthill(color) {
        let step = Ants.counters.stepSize * 6;
        Ants.camera.context.fillStyle = color
        Ants.camera.context.fillRect(
            0, //change by random then save it in anthill, then spawn every ant from there
            0,
            step,
            step)
    }

    /**
     * Request Animation Frame
     * @param {drawing function} draw 
     */
    static requestAnimation() {
        window.requestAnimationFrame(Ants.Helpers.draw)
    }

    /**
     * returns a brand new canvas for the ants
     * @returns canvas created
     */
    static getCanvas() {
        let canvas = document.querySelector('canvas') ?? document.createElement('canvas')
        let step = Ants.counters.stepSize
        let Width = (window.innerWidth - step) - window.innerWidth.toString().slice(-1)
        let Height = (window.innerHeight - step) - window.innerHeight.toString().slice(-1)

        canvas.id = canvas.id ?? 'AntsApp'
        canvas.width = (Width / step) % 1 === 0 ? Width : Width + step / 2
        canvas.height = (Height / step) % 1 === 0 ? Height : Height + step / 2

        Width = (Width / step) % 1 === 0 ? (Width / step) : (Width / step) + 0.5
        Height = (Height / step) % 1 === 0 ? (Height / step) : (Height / step) + 0.5

        Ants.canvasBounds = [1800, 1800]

        Ants.canvas = canvas
        return canvas
    }

    /**
     * Screen contains the game controls
     * @returns On game Screen
     */
    static getScreen() {
        let screen = document.createElement('div')
        screen.id = 'screen'
        screen.width = window.innerWidth
        screen.height = window.innerHeight
        return screen
    }

    /**
     * Create canvas in DOM and Ants Global
     */
    static createCanvas() {
        let step = Ants.counters.stepSize
        let canvas = Ants.Helpers.getCanvas()
        let screen = Ants.Helpers.getScreen()
        Ants.canvasBounds = [Math.trunc(canvas.width / step), Math.trunc(canvas.height / step)]
        Ants.camera = new Camera(Ants.canvas.getContext('2d'))
        document.getElementsByTagName('body')[0].prepend(screen)
        document.getElementsByTagName('body')[0].prepend(canvas)
        Ants.Helpers.requestAnimation()
    }
}