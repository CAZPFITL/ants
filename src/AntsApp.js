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
    constructor() {
        this.name = 'Ants App v0.0.5'
        this.state = new State(this)
        this.Helpers = Helpers
        this.antClass = Ant
        this.world
        this.anthill
        this.counters = {
            speed: window.speed,
            counter: 0,
            counterLimit: window.speed,
            stepSize: 5,
            maxPath: 0.5,//0% of the screen
            maxDraw: 0.15,//% of the maxPath
            path: true
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
        window.addEventListener('resize', ()=>Ants.Helpers.getCanvas());
        Ants.counters.maxPath = Math.trunc((this.canvasBounds[0] * this.canvasBounds[1]) * Ants.counters.stepSize) * Ants.counters.maxPath
    }

    welcomeToAnts() {
        this.world = new World('sunny')
        this.anthill = new Anthill()
        this.showOff()
    }
    
    showOff() {
        for (let i = 0; i < 5; i++) {
            Ants.Helpers.createAnt(i, i, Ants.anthill.antsColors.worker, 'worker')
        }
    }
}