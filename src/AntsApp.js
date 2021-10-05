import State from './State.js'
import Ant from './Ant.js'
import Anthill from './Anthill.js'
import World from './World.js'
import Helpers from './Helpers.js'

/**
 * Ants app
 */
export default class AntsApp {
    constructor() {
        this.name = 'Ants App v0.0.5'
        this.state = new State(this)
        this.Helpers = Helpers
        this.antClass = Ant
        this.world
        this.anthill
        this.counters = {
            counter: 0,
            stepper: 0,
            cycles: 1,
            cyclesTop: 10,
            stepperLimit: 10,
            stepSize: 5
        }
    }

    /**
     * Initializates the application
     */
    static init() {
        Helpers.createGlobal(this)
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
    }

    requestLoad() {
        this.Helpers.createCanvas()
    }

    /**
     * creates a new Ant()
     * @param {this parameter} This 
     */
    requestSoldierAnt() {
        Ants.Helpers.createAnt(0, 0, Ants.anthill.antsColors.soldier, 'soldier')
    }

    requestWorkerAnt() {
        Ants.Helpers.createAnt(0, 0, Ants.anthill.antsColors.worker, 'worker')
    }

    welcomeToAnts() {
        this.world = new World('sunny')
        this.anthill = new Anthill()
        Ants.requestWorkerAnt()
    }
}