import Delaunator from 'https://cdn.skypack.dev/delaunator@5.0.0';
import State from './State.js'
import Ant from './Ant.js'
import Helpers from './Helpers.js'

/**
 * Ants app
 */
export default class AntsApp {
    constructor() {
        this.name = 'Ants App v0.0.1'
        this.state = new State()
        this.ants = []
        this.idProvider = 0
        this.counters = {
            counter: 0,
            stepper: 0,
            cycles: 30,
            cyclesTop: 300,
            stepperLimit: 100,
            stepSize: 10
        }
        this.delunator = {
            mapCoords: [],
            baseClass: Delaunator,
            allTrianglesCoords: [],
            showAllTriangles: ()=>{
                for (let i = 0; i < triangles.length; i += 3) {
                    this.delunator.allTrianglesCoords.push([
                        points[triangles[i]],
                        points[triangles[i + 1]],
                        points[triangles[i + 2]]
                    ]);
                }
            }
        }
        this.Helpers = Helpers
    }

    /**
     * Initializates the application
     */
    static init() {
        Helpers.createGlobal(this)
        Ants.state.add(Ants)
        Ants.state.changeState('loading')
        Ants.state.changeState('create canvas')
        Ants.state.changeState('request delunator')
        Ants.state.changeState('request animation')
        Ants.state.changeState('request ants')
        Ants.state.changeState('walking ants')
    }

    /**
     * Here you can process any state change from the app, reading "this.state.name" // create canvas -> createCanvas()
     */
    notification() {
        let funct = this.Helpers.getStateFunction()
        if (Ants[funct]) {
            Ants[funct](this)
        }
    }

    /**
     * Create canvas in DOM and Ants Global
     */
    createCanvas(This) {
        let canvas = this.Helpers.getCanvas()
        document.getElementsByTagName('body')[0].prepend(canvas)
        This.canvas = canvas
    }

    /**
     * Request Delunator Frame
     * @param {drawing function} draw 
     */
    requestDelunator() {
        Ants.Helpers.getMapCoords()
        this.delunator.instance = new this.delunator.baseClass(this.delunator.mapCoords)
    }

    /**
     * Request Animation Frame
     * @param {drawing function} draw 
     */
    requestAnimation() {
        window.requestAnimationFrame(Ants.draw)
    }

    /**
     * creates a new Ant()
     * @param {this parameter} This 
     */
    requestAnts(This) {
        This.createAnt(0, 0)
    }

    /**
     * New Ant data push and position
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    createAnt(posX, posY) {
        Ants.ants.push(new Ant(posX, posY))
    }

    /**
     * Draw all ants in the board
     * @param {this parameter} This 
     */
    drawAntsCollection(This) {
        This.ctx.fillStyle = "#333333"
        This.ants.forEach((ant) => {
            This.ctx.fillRect(ant.posX, ant.posY, 10, 10)
        })
    }

    /**
     * Renews the canvas on every draw loop
     * @param {this parameter} This 
     */
    drawNewCanvas(This) {
        This.ctx = This.canvas.getContext('2d')
        This.ctx.clearRect(0, 0, This.canvas.width, This.canvas.height);
    }

    /**
     * Feeds the stepper and gets a stepProcess method.
     */
    step() {
        Ants.counters.counter++
        if (Ants.counters.counter % Ants.counters.cycles == 0) {
            if (Ants.counters.stepper === Ants.counters.stepperLimit) {
                Ants.counters.stepper = 0
            } else {
                Ants.counters.stepper++
            }
            Ants.stepProcess()
        }
    }
    
    stepProcess() {
        //console.log(Ants.counters.stepper)
        Ants.ants.forEach(ant => {
            ant.move()
        })
    }

    /**
     * draw
     */
    draw() {
        // this.antPng = new Image();
        // this.antPng.src = './src/ant.png'

        Ants.step()
        Ants.drawNewCanvas(Ants)
        Ants.drawAntsCollection(Ants)
        Ants.requestAnimation()
    }
}