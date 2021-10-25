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
        this.canvasBounds = [90, 90]
        this.counters = {
            speed: 60, // 1 - 60
            counter: 0, //control
            stepSize: 20, // pixel size
            maxPath: 0.35, //0% of the screen
            maxDraw: 0.05, //% of the maxPath DRAWED
            path: true,
            initialWorkers: 20,
            homeSize: 5
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
        // this.helpers.createDataGraph()
        this.helpers.createCanvas()
        this.helpers.fullScreenFunctionality()
        window.addEventListener('keydown', (e) => Ants.helpers.processKeyDown(e.key));
        window.addEventListener('keyup', (e) => Ants.helpers.processKeyUp(e.key));
        window.addEventListener('resize', () => Ants.helpers.getCanvas());
        // NOTE: maxPath
        Ants.counters.maxPathLength = Math.trunc(Ants.helpers.getStepSize(this.canvasBounds[0] * this.canvasBounds[1])) * Ants.counters.maxPath
    }

    welcomeToAnts() {
        this.world = new World('sunny')
        this.anthill = new Anthill(this.counters.homeSize)
        this.anthill.createQueen()
        this.anthill.createWorker(5000)
        this.state.changeState('play state');
    }

    playState() {
        Ants.helpers.requestAnimation()
    }
}