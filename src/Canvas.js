import Screen from './Screen.js'
import Camera from './Camera.js'

export default class Canvas extends Screen {
    static requestAnimation() {
        window.requestAnimationFrame(Ants.helpers.draw)
    }

    /**
     * draw
     */
    static draw() {
        if (Ants.state.state === 'pause state') {
            return;
        }
        Ants.helpers.step()
        Ants.helpers.drawCollection()
        window.requestAnimationFrame(Ants.helpers.draw)
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    static step() {
        Ants.counters.counter++
        //NOTE: stepProcess At Speed Selected
        if (Ants.counters.counter % Ants.counters.speed === 0) {
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
        Ants.helpers.clearCanvas()
        Ants.camera.begin();
        Ants.helpers.drawBoard()
        Ants.helpers.drawAnthill('#693a00')
        
        // NOTE: Path related - world.walkedPathTrace sliced by setted % 
        // NOTE: THIS IS A DEVELOP TOOL; DON'T PUSH IT OR THE USERS WILL SUFFER WITH THE DRAWING PATHS!!!!!
        Ants.helpers.drawPath(Ants.world.walkedPathTrace.slice(-Ants.world.walkedPathTrace.length * Ants.counters.maxDraw), '#BBBBBB')
        
        Ants.helpers.Ants()


    }

    /**
     * Draw Ants in Board
     */
    static Ants() {
        let step = Ants.counters.stepSize * 6;
        Ants.anthill.ants.forEach((ant) => {
            Ants.camera.context.fillStyle = ant.color
            step = Ants.counters.stepSize
            if (ant.job === 'queen') {
                Ants.camera.context.fillRect(
                    ant.actualPosition[0] * step - step * 2,
                    ant.actualPosition[1] * step - step * 2,
                    step * 4,
                    step * 4)
            } else {
                Ants.camera.context.fillRect(
                    ant.actualPosition[0] * step,
                    ant.actualPosition[1] * step,
                    step,
                    step)
            }
        })
    }

    /**
     * Renews the canvas on every draw loop
     */
    static clearCanvas() {
        Ants.camera.context.clearRect(0, 0, Ants.camera.context.canvas.width, Ants.camera.context.canvas.height);
    }

    /**
     * Draws board background
     */
    static drawBoard() {
        Ants.camera.context.fillStyle = 'green'
        Ants.camera.context.fillRect(
            0,
            0,
            Ants.counters.stepSize * (Ants.canvasBounds[0] + 1),
            Ants.counters.stepSize * (Ants.canvasBounds[1] + 1))
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
            Ants.helpers.getStepSize(Ants.anthill.position[0]) - Ants.helpers.getStepSize(Ants.anthill.size / 2), //change by random then save it in anthill, then spawn every ant from there
            Ants.helpers.getStepSize(Ants.anthill.position[1]) - Ants.helpers.getStepSize(Ants.anthill.size / 2),
            Ants.helpers.getStepSize(Ants.anthill.size),
            Ants.helpers.getStepSize(Ants.anthill.size))
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
        let canvas = Ants.helpers.getCanvas()
        let screen = Ants.helpers.getScreen()

        Ants.camera = new Camera(canvas.getContext('2d'), {
            initialPosition: [Ants.helpers.getStepSize(Ants.canvasBounds[0]) / 2, Ants.helpers.getStepSize(Ants.canvasBounds[1]) / 2],
            gameScale: Ants.counters.stepSize,
            keys : Ants.settings.keys
        })

        document.getElementsByTagName('body')[0].prepend(screen)
        document.getElementsByTagName('body')[0].prepend(canvas)
        Ants.helpers.requestAnimation()
    }
}