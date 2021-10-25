import State from './State.js'

export default class Ant {
    constructor({ posX, posY, trace, job, age = 0 }) {
        Ants.anthill.idProvider++
        this.anthill = Ants.anthill
        this.id = Ants.anthill.idProvider
        this.name = job + ' ant #' + this.id
        this.job = job
        this.age = age
        this.outOfBounds = false
        this.color = Ants.anthill.antsColors[job]
        this.actualPosition = [posX ?? 0, posY ?? 0]
        this.directions = {
            stepsToDo: 1 !== 1 ? 0 : Ants.helpers.getRandomInt(0, 6),
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
        Ants.messages.processMessage({ message: message, from: 'Ant.Notification()' })
        Ants.messages.processMessage({ message: `--${this.name} says: let's ${antState}`, from: 'Ant.Notification()' })
    }

    /**
     * get ant state
     * @param {world state} state 
     * @returns 
     */
    getTask(state) {
        return state === 'sunny' ? 'explore' : state === 'precipitation soon' ? 'getFood' : state === 'rainy' ? 'go home' : 'sleep'
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
        let output = posiblePaths[Ants.helpers.getRandomInt(0, posiblePaths.length)]
        return output
    }

    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    walk(panic = false) {
        if (panic) {
            this.actualPosition = Ants.helpers.getHomeStep(this.actualPosition)
        } else {
            //Smells just in case
            this.smell()
            //Then move
            Ants.helpers.moveEntity(this, this.directions.directionToDo)
        }
        //Limits trace 
        // TODO: change  the shift for the lifetime of the path and DONT verify if it is already included, too much buffer used
        // NOTE: For now: if you walket the max path in half split the path in half
        if (Ants.world.walkedPathTrace.length >= Ants.counters.maxPathLength) { 
            Ants.world.walkedPathTrace = Ants.world.walkedPathTrace.slice(-(Ants.world.walkedPathTrace.length * 0.8)) 
            console.log('20% of path cleaned')
        } else {
            Ants.world.walkedPathTrace.push(this.actualPosition)
        }
    }

    /**
     * This process clamp let the ant check his arounds and check the position, and any other thing she need to check on every step.
     * smells then 3 - 6 (random) steps on one direction
     */
    smell() {
        // Detect another ants and push them into the observers
        Ants.helpers.scanTarget(1, this, Ants.anthill.ants)

        //Corrects a end of bounds
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
     * No parameters will get a random direction and the ant will smell it
     * Parameters will change de direction and reset a new random stepsToDo
     * @param {forced direction} dir
     */
    resetDirection(dir) {
        this.directions.directionToDo = dir ?? this.getRandomDirection()
        this.directions.stepsToDo = Ants.helpers.getRandomInt(0, dir ? 3 : 6)
        // console.log('i think i will go ', this.directions.directionToDo)
        if (!dir) {
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
        } else if (this.state.state === 'go home') {
            this.walk(true)
        }
    }
}