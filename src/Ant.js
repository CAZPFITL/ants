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
        this.directions = {
            stepsToDo: 1 !== 1 ? 0 : Ants.Helpers.getRandomInt(0, 6),
            directionToDo: false
        }
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
     * World reactiveness
     * @param {message} message 
     */
    notification(message) {
        let antState = this.getTask(Ants.world.state.state)
        this.state.changeState(antState)
        Ants.messages.processMessage(message)
        Ants.messages.processMessage(`--${this.name} says: let's ${antState}`)
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
     * Get posible paths based in map bounds
     * @returns posible paths based in map bounds
     */
    getPosiblePaths() {
        let posiblePaths = []
        if (this.actualPosition[0] >= 0) { posiblePaths.push('left') }
        if (this.actualPosition[1] >= 0) { posiblePaths.push('up') }
        if (this.actualPosition[0] <= Ants.canvasBounds[0]) { posiblePaths.push('right') }
        if (this.actualPosition[1] <= Ants.canvasBounds[1]) { posiblePaths.push('down') }
        return posiblePaths
    }

    /**
     * Gets random direction in bounds
     * @returns random direction
     */
    getRandomDirection() {
        let posiblePaths = this.getPosiblePaths()
        let output = posiblePaths[Ants.Helpers.getRandomInt(0, posiblePaths.length)]
        return output
    }

    /**
     * listen on app state change
     */
    move(nextMove) {
        let x = nextMove === 'left' ? (this.actualPosition[0] - 1) : nextMove === 'right' ? (this.actualPosition[0] + 1) : this.actualPosition[0]
        let y = nextMove === 'down' ? (this.actualPosition[1] + 1) : nextMove === 'up' ? (this.actualPosition[1] - 1) : this.actualPosition[1]
        this.outOfBounds = (this.actualPosition[0] > Ants.canvasBounds[0] && this.actualPosition[1] > Ants.canvasBounds[1]) ? true : false;
        this.actualPosition = this.outOfBounds ? [0, 0] : [x, y]
        this.directions.stepsToDo--
    }

    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    walk() {
        //Smells just in case
        this.smell()
        //Then move
        this.move(this.directions.directionToDo)
        //Limits trace
        if (Ants.world.walkedPathTrace.length >= Ants.counters.maxPath) { Ants.world.walkedPathTrace.shift() }

        //Save mark step only if it hasn't
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
     * check if we are going out bounds in the walking cycle
     * @returns souldWeThink? | boolean
     */
     checkPosition() {
        if (this.actualPosition[0] <= 0) {
            this.resetDirection('right')
        } else if (this.actualPosition[1] <= 0) {
            this.resetDirection('down')
        } else if (this.actualPosition[0] >= Ants.canvasBounds[0]) {
            this.resetDirection('left')
        } else if (this.actualPosition[1] >= Ants.canvasBounds[1]) {
            this.resetDirection('up')
        }
    }

    /**
     * This process clamp let the ant check his arounds and check the position, and any other thing she need to check on every step.
     * smells then 3 - 6 (random) steps on one direction
     */
    smell() {
        let diameter = 6
        this.directions.smelledPath = []
        for (let a = 0; a < diameter; a++) {
            for (let b = 0; b < diameter; b++) {
                this.directions.smelledPath.push([a, b])
            }
        }

        this.checkPosition()                
    }

    /**
     * No parameters will get a random direction and the ant will smell it
     * Parameters will change de direction and reset a new random stepsToDo
     * @param {forced direction} dir
     */
    resetDirection(dir) {
        this.directions.directionToDo = dir ?? this.getRandomDirection()
        this.directions.stepsToDo = Ants.Helpers.getRandomInt(0, dir ? 3 : 6)
        console.log('i think i will go ', this.directions.directionToDo)
        if (!dir){
            this.smell()
        }
    }

    //Adjust the process to the slider of speed.
    cycle() {
        if (this.state.state === 'sleep' || this.job === 'queen') {
            return
        }
        if (this.state.state === 'explore') {
            if (this.directions.stepsToDo < 1) {
                this.resetDirection()
            } else {
                this.walk()
            }
        }
    }
}