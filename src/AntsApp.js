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
    }

    /**
     * Initializates the application
     */
    static init() {
        Helpers.createGlobal(this)
        Ants.state.add(Ants)
        Ants.state.changeState('loading')
        Ants.state.changeState('create canvas')
        Ants.state.changeState('request animation')
        Ants.state.changeState('request ants')
        Ants.state.changeState('main')
    }

    /**
     * Here you can process any state change from the app, reading "this.state.name" // create canvas -> createCanvas()
     */
    notification() {
        let funct = Helpers.getStateFunction()
        if(Ants[funct]) {
            Ants[funct](this)
        }
    }

    /**
     * Create canvas in DOM and Ants Global
     */
    createCanvas(This) {
        let canvas = Helpers.getCanvas()
        document.getElementsByTagName('body')[0].prepend(canvas)
        This.canvas = canvas
    }

    /**
     * Request Animation Frame
     * @param {drawing function} draw 
     */
    requestAnimation() {
        window.requestAnimationFrame(() => Ants.draw(Ants))
    }

    /**
     * creates a new Ant()
     * @param {this parameter} This 
     */
    requestAnts(This) {
        This.createAnt(Helpers.getRandomInt(This.canvas.width), Helpers.getRandomInt(This.canvas.height))
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
     * draw
     */
    draw(This) {
        // this.antPng = new Image();
        // this.antPng.src = './src/ant.png'

        This.drawNewCanvas(This)
        This.drawAntsCollection(This)

        This.requestAnimation()
    }
}