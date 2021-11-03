import State from './State.js'
import Ant from './Ant.js'
import Anthill from './Anthill.js'
import World from './World.js'
import Helpers from './Helpers.js'
import Messages from './Messages.js'
import Settings from './Settings.js'

/**
 * Ants app
 */
export default class AntsApp {
    constructor(_v) {
        this.name = `Ants App ${_v}`
        this.state = new State(this)
        this.messages = new Messages()
        this.settings = new Settings()
        this.helpers = Helpers
        this.antClass = Ant
        this.world
        this.anthill
        this.camera // declared on Canvas.js at createCanvas() from requestLoad() state
        this.dataGraph = []
        this.domCollections = []
        this.canvasBounds = [120, 100]
        this.counters = {
            speed: 60, // 1 - 60
            counter: 0, //control
            stepSize: 20, // pixel size
            maxPath: 0.05, //0% of the screen
            maxDraw: 0.5, //% of the maxPath DRAWED
            path: true,
            initialWorkers: 1,
            homeSize: 6,
            initialZoom: 3500,
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
        Ants.messages.processMessage({ message: 'New ' + this.name + ' state: ' + this.state.state, from: 'AntsApp.notification()' })
        let funct = this.helpers.getStateFunction()
        if (Ants[funct]) {
            Ants[funct](this)
        }
        this.helpers.drawScreen(Ants.state.state)
    }

    requestLoad() {
        this.helpers.createCanvas()
        this.helpers.fullScreenFunctionality()
    }

    welcomeToAnts() {
        this.anthill = new Anthill(this.counters.homeSize)
        this.world = new World('sunny')
        this.anthill.createQueen()
        this.anthill.createWorker(this.counters.initialWorkers)
        this.state.changeState('play state');
    }

    playState() {
        Ants.helpers.requestAnimation()
    }
}