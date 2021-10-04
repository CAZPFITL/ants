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
        this.antsColors = {
            explorer: '#CCCCCC',
            gather: '#F0E4BD'
        }
        this.antClass = Ant
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
        Ants.state.changeState('loading')
        Ants.state.changeState('create canvas')
        Ants.state.changeState('request delunator')
        Ants.state.changeState('request explorerAnt')
        Ants.state.changeState('exploring world')
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
        This.Helpers.requestAnimation()
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
     * creates a new Ant()
     * @param {this parameter} This 
     */
    requestGatherAnt(This) {
        This.Helpers.createAnt(0, 0, This.antsColors.gather)
    }

    requestExplorerAnt(This) {
        This.Helpers.createAnt(0, 0, This.antsColors.explorer)
    }

    exploringWorld(This) {
        //TODO: Script for the world exploration
    }
}