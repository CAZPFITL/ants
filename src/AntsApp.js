export default class AntsApp {
    constructor() {
        this.name = 'Ants App v0.0.1'
        this.state = 'loading'
    }
    
    /**
     * Initializates the application
     */
    static init() {
        this.createGlobal()
        Ants.createCanvas()
        Ants.changeState('main')
    }
    
    /**
     * Creates Ants on window global variable
     */
    static createGlobal() {
        window.Ants = new this()
    }
    
    /**
     * Create canvas in DOM and Ants Global
     */
    createCanvas() {
        let canvas = document.createElement('canvas')
        canvas.id = 'AntsApp'
        document.getElementsByTagName('body')[0].prepend(canvas)
        this.canvas = canvas
    }

    /**
     * Changes the app state from string paramters
     * @param {State to be applied} state 
     */
    changeState(state) {
        this.state = state
    }

}