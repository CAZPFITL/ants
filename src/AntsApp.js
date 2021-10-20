import State from './State.js'
import Ant from './Ant.js'
import Anthill from './Anthill.js'
import World from './World.js'
import Helpers from './Helpers.js'

window.speed = 10

/**
 * Ants app
 */
export default class AntsApp {
    constructor(_v) {
        this.name = `Ants App ${_v}`
        this.state = new State(this)
        this.Helpers = Helpers
        this.antClass = Ant
        this.world
        this.anthill
        this.counters = {
            speed: 60, // 1 - 60
            counter: 0, //control
            stepSize: 10, // pixel size
            maxPath: 0.5, //0% of the screen
            maxDraw: 0.95, //% of the maxPath
            directionCounters: {
                c1: 0,
                c2: 0,
                c3: 0,
                c4: 0,
            },
            path: true,
        }
    }

    /**
     * Initializates the application
     */
    static init(_v) {
        Helpers.createGlobal(this, _v)
        Ants.state.changeState('request load', Ants)
        Ants.state.changeState('welcome to Ants', Ants)
    }

    /**
     * Here you can process any state change from the app, reading "this.state.name" // create canvas -> createCanvas()
     */
    notification() {
        console.log('New ' + this.name + ' state: ' + this.state.state)
        let funct = this.Helpers.getStateFunction()
        if (Ants[funct]) {
            Ants[funct](this)
        }
        this.Helpers.drawScreen(Ants.state.state)
    }

    requestLoad() {
        this.Helpers.createCanvas()
        this.Helpers.fullScreenFunctionality()
        window.addEventListener('resize', ()=>Ants.Helpers.getCanvas());
        Ants.counters.maxPath = Math.trunc(Ants.Helpers.getStepSize(this.canvasBounds[0] * this.canvasBounds[1])) * Ants.counters.maxPath
    }

    welcomeToAnts() {
        this.world = new World('sunny')
        this.anthill = new Anthill()
        this.anthill.createQueen()
        this.anthill.createWorker(2)
    }
}