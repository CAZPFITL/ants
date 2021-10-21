import State from './State.js'

export default class Ant {
    constructor(posX, posY, trace, job, age = 0) {
        Ants.anthill.idProvider++
        this.id = Ants.anthill.idProvider
        this.name = job + ' ant #' + this.id
        this.job = job
        this.age = age
        this.outOfBounds = false
        this.color = Ants.anthill.antsColors[job]
        this.actualPosition = [posX ?? 0, posY ?? 0]
        this.scanner = () => {
            console.log(`

            `)
        }
        this.data = {
            idealConditions: {
                temperature: {
                    minC: 23.8,
                    maxC: 35.1,
                    minF: 74.8,
                    maxF: 95.1
                },
            },
            extremeConditions: {
                temperature: {
                    minC: 14,
                    maxC: 40,
                    minF: 57.2,
                    maxF: 104
                },
            },
            limitConditions: {
                temperature: {
                    minC: 1,
                    maxC: 50,
                    minF: 33.8,
                    maxF: 122
                },
            },
        }
        this.state = new State(this)
    }

    /**
     * get ant state
     * @param {world state} state 
     * @returns 
     */
    getTask(state) {
        return state === 'sunny' ? 'explore' : state === 'precipitation soon' ? 'getFood' : 'sleep'
    }

    /**
     * listen on app state change
     */
    notification(message) {
        let antState = this.getTask(Ants.world.state.state)
        this.state.changeState(antState)
        Ants.messages.processMessage(message)
        Ants.messages.processMessage(`--${this.name} says: let's ${antState}`)
    }

    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    walk() {

        //DESCRIPTION: =FIRST FILTER=
        //NOTE: keeps the ants on the map 
        let posiblePaths = []
        if (this.actualPosition[0] != 0) { posiblePaths.push('left') }
        if (this.actualPosition[1] != 0) { posiblePaths.push('up') }
        if (this.actualPosition[0] != Ants.canvasBounds[0]) { posiblePaths.push('right') }
        if (this.actualPosition[1] != Ants.canvasBounds[1]) { posiblePaths.push('down') }

        //NOTE: KEEPS THE ANTS IN THE MAP
        let nextMove = posiblePaths[Ants.Helpers.getRandomInt(posiblePaths.length)]
        let x = nextMove === 'left' ? (this.actualPosition[0] - 1) : nextMove === 'right' ? (this.actualPosition[0] + 1) : this.actualPosition[0]
        let y = nextMove === 'down' ? (this.actualPosition[1] + 1) : nextMove === 'up' ? (this.actualPosition[1] - 1) : this.actualPosition[1]
        this.outOfBounds = (this.actualPosition[0] > Ants.canvasBounds[0] && this.actualPosition[1] > Ants.canvasBounds[1]) ? true : false;
        this.actualPosition = this.outOfBounds ? [0, 0] : [x, y]


        //NOTE: KEEPS THE GLOBAL MAX PATH ON THE LIMIT
        if (Ants.world.walkedPathTrace.length >= Ants.counters.maxPath) { Ants.world.walkedPathTrace.shift() }

        //NOTE: SAVE MARK STEP ONLY IF IT HASN'T
        for (var i = 0, l = Ants.world.walkedPathTrace.length; i < l; i++) {
            if (Ants.world.walkedPathTrace[i][0] === this.actualPosition[0] && Ants.world.walkedPathTrace[i][1] === this.actualPosition[1]) {
                break;
            } else {
                Ants.world.walkedPathTrace.push(this.actualPosition)
                break;
            }
        }

    }

    /**
     * smells 3 steps on every direction
     */
    smell() {

    }

    cycle() {
        if (this.state.state === 'sleep' || this.job === 'queen') {
            return
        } else if (this.state.state === 'explore') {
            this.walk()
            // this.search()
        }

        // TODO: IF Panic search path
    }
}