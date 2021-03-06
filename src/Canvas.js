import Screen from './Screen.js'
import Camera from './Camera.js'

export default class Canvas extends Screen {
    static requestAnimation() {
        window.requestAnimationFrame(Ants.helpers.draw)
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
        screen.style.width = window.innerWidth
        screen.style.height = window.innerHeight
        return screen
    }

    /**
     * Screen contains the game controls
     * @returns On game Screen
     */
    static getCollections() {
        let collections = document.createElement('div')
        let relative = document.createElement('div')
        collections.id = 'collections'
        relative.className = 'relative'
        collections.append(relative)
        return collections
    }

    /**
     * Create canvas in DOM and Ants Global
     */
    static createCanvas() {
        let canvas = Ants.helpers.getCanvas()
        let screen = Ants.helpers.getScreen()
        let collections = Ants.helpers.getCollections()

        Ants.camera = new Camera(canvas.getContext('2d'), {
            initialPosition: [Ants.helpers.getStepSize(Ants.canvasBounds[0]) / 2, Ants.helpers.getStepSize(Ants.canvasBounds[1]) / 2],
            gameScale: Ants.counters.stepSize,
            distance: Ants.counters.initialZoom,
            keys: Ants.settings.keys
        })

        document.getElementsByTagName('body')[0].prepend(collections)
        document.getElementsByTagName('body')[0].prepend(screen)
        document.getElementsByTagName('body')[0].prepend(canvas)
        Ants.helpers.addDomFunct()
        Ants.helpers.requestAnimation()
    }

    static addDomFunct() {
        window.addEventListener('keydown', (e) => Ants.helpers.processKeyDown(e.key));
        window.addEventListener('keyup', (e) => Ants.helpers.processKeyUp(e.key));
        window.addEventListener('resize', () => Ants.helpers.getCanvas());
        Ants.screens = {
            screen: document.querySelector('#screen'),
            body: document.querySelector('body'),
            collections: document.querySelector('#collections'),
        }
    }

    /**
     * Renews the canvas on every draw loop
     */
    static clearCanvas() {
        Ants.camera.context.clearRect(0, 0, Ants.camera.context.canvas.width, Ants.camera.context.canvas.height);
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
        Ants.helpers.drawSurrounds()
        window.requestAnimationFrame(Ants.helpers.draw)
    }

    /**
     * Draw map surrounds
     */
    static drawSurrounds(color = Ants.settings.surroundsColor, scale = 2000) {
        Ants.helpers.drawEntity([-(scale / 2), -(scale / 2)], scale, color, (scale / 2))
        Ants.helpers.drawEntity([-(scale / 2), -(scale / 2)], (scale / 2), color, scale)
        Ants.helpers.drawEntity([-(scale / 2), Ants.canvasBounds[1] + 1], scale, color, (scale / 2))
        Ants.helpers.drawEntity([Ants.canvasBounds[0] + 1, -(scale / 2)], (scale / 2), color, scale)

        var ctx = Ants.camera.context;
        ctx.font = "80px Mouse";
        ctx.fillStyle = "rgba(253, 118, 144)";
        ctx.fillText(Ants.name, 0, -40);
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
                Ants.helpers.updateClock()
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

        Ants.camera.end();
        Ants.helpers.clearCanvas()
        Ants.camera.begin();

        Ants.helpers.drawBoard()
        Ants.helpers.drawAnthill('#693A00')
        Ants.helpers.drawFood('#EB9B34')
        Ants.helpers.drawPath(Ants.world.traces)
        Ants.helpers.drawAnts()
        Ants.helpers.drawGrid()
    }

    /**
     * Draws a squared entity
     * @param {entity position*} coords 
     * @param {size based on stepsize parameter} size 
     * @param {color of the entity} color 
     */
    static drawEntity(coords, size, color, size2 = size) {
        Ants.camera.context.fillStyle = color
        Ants.camera.context.fillRect(
            Ants.helpers.getStepSize(coords[0]),
            Ants.helpers.getStepSize(coords[1]),
            Ants.counters.stepSize * size,
            Ants.counters.stepSize * size2)
    }

    /**
     * Draw Ants in Board
     */
    static drawAnts() {
        Ants.anthill.ants.forEach((ant) => {
            if (ant.job === 'queen') {
                Ants.camera.context.fillStyle = ant.color
                Ants.camera.context.fillRect(
                    ant.actualPosition[0] * Ants.counters.stepSize - Ants.counters.stepSize * 2,
                    ant.actualPosition[1] * Ants.counters.stepSize - Ants.counters.stepSize * 2,
                    Ants.counters.stepSize * 4,
                    Ants.counters.stepSize * 4)
            } else {
                //Ants.helpers.drawEntity(ant.actualPosition, 1, ant.color)
                // let step = [Ants.helpers.getStepSize(ant.actualPosition[0]), Ants.helpers.getStepSize(ant.actualPosition[1])]
                // var path = new Path2D(`M ${step[0]},${step[1]} h 50 v 50 h 50`);
                // Ants.camera.context.stroke(path);
                //ant.updateDom()
                let step = Ants.counters.stepSize
                let coords = [Ants.helpers.getStepSize(ant.actualPosition[0]), Ants.helpers.getStepSize(ant.actualPosition[1])]
                let direction = ant.directions.directionToDo === 'up' ? 0 : ant.directions.directionToDo === 'down' ? 200 : ant.directions.directionToDo === 'right' ? 400 : 600
                Ants.camera.context.drawImage(
                    ant.images, // Image.
                    0, // tile
                    direction, // tile
                    200, //image scale
                    200, //image scale
                    coords[0] - step / 2, // position in canvas
                    coords[1] - step / 2, // position in canvas
                    step * 2, //canvas scale
                    step * 2, //canvas scale
                )
            }
        })
    }

    /**
     * Draws board background
     */
    static drawBoard() {
        Ants.helpers.drawEntity([0, 0], (Ants.canvasBounds[0] + 1), 'green', (Ants.canvasBounds[1] + 1))
    }

    /**
     * draws all the traces for the ant
     * @param {trace path} path 
     * @param {trace color} color 
     */
    static drawPath(element) {
        element.forEach(path => {
            path.liveTraceCoords.forEach(step => {
                Ants.helpers.drawEntity(step, 1, path.color)
            })
        })
    }

    /**
     * draws home
     * @param {home color} color 
     */
    static drawAnthill(color) {
        let c00rds = [
            Ants.anthill.position[0] - (Ants.anthill.size / 2),
            Ants.anthill.position[1] - (Ants.anthill.size / 2)
        ]
        Ants.helpers.drawEntity(c00rds, Ants.anthill.size + 1, color)
    }

    /**
     * Draws Food entities
     * @param {Foods color} color 
     */
    static drawFood(color) {
        Ants.world.droppedFood.forEach((value) => {

            Ants.helpers.drawEntity(value.actualPosition, value.size[0], color, value.size[1])
        })
    }

    /**
     * For Debug purposes
     */
    static drawGrid() {
        Ants.camera.context.strokeStyle = '#0000004D'
        if (Ants.arh)
            for (let xxx = 0; xxx < Ants.canvasBounds[0] + 1; xxx++) {
                Ants.camera.context.beginPath();
                Ants.camera.context.moveTo(Ants.helpers.getStepSize(xxx), Ants.helpers.getStepSize(0));
                Ants.camera.context.lineTo(Ants.helpers.getStepSize(xxx), Ants.helpers.getStepSize(Ants.canvasBounds[1] + 1));
                Ants.camera.context.stroke();
            }
        if (Ants.arh)
            for (let yyy = 0; yyy < Ants.canvasBounds[1] + 1; yyy++) {
                Ants.camera.context.beginPath();
                Ants.camera.context.moveTo(Ants.helpers.getStepSize(0), Ants.helpers.getStepSize(yyy));
                Ants.camera.context.lineTo(Ants.helpers.getStepSize(Ants.canvasBounds[0] + 1), Ants.helpers.getStepSize(yyy));
                Ants.camera.context.stroke();
            }

    }
}