export default class Canvas {
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
        if (Ants.counters.path) {
            Ants.Helpers.drawPath(Ants.world.walkedPathTrace.slice(-Ants.world.walkedPathTrace.length * Ants.counters.maxDraw ), '#BBBBBB')
        }

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
        let canvas = document.querySelector('canvas') ?? document.createElement('canvas')
        let step = Ants.counters.stepSize
        let Width = (window.innerWidth - step) - window.innerWidth.toString().slice(-1)
        let Height = (window.innerHeight - step) - window.innerHeight.toString().slice(-1)
        let border = (window.innerHeight - Height) / 2

        canvas.id = canvas.id ?? 'AntsApp'
        canvas.width = (Width / step) % 1 === 0 ? Width : Width + step / 2
        canvas.height = (Height / step) % 1 === 0 ? Height : Height + step / 2
        canvas.style.borderTop = `${(Height / step) % 1 === 0 ? border : border + 0.5}px solid #333333`

        Width = (Width / step) % 1 === 0 ? (Width / step) : (Width / step) + 0.5
        Height = (Height / step) % 1 === 0 ? (Height / step) : (Height / step) + 0.5

        Ants.canvasBounds = [Width - 2, Height - 2]

        Ants.canvas = canvas
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
        Ants.ctx = Ants.canvas.getContext('2d')
        Ants.Helpers.requestAnimation()
    }
}