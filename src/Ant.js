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
        this.lastPosition = [posX ?? 0, posY ?? 0]
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
        // - STEP: - 1 - CHECK IF WE ARE IN PANIC
        // - NOTE: - IF WE ARE:
        if (panic) {
            // - STEP: - 2 - CHECK IF WE ARE IN PANIC
            this.actualPosition = Ants.helpers.getHomeStep(this.actualPosition)
            // - NOTE: - IF WE ARE NOT:
        } else {
            // - STEP: - 2 - SMELL
            this.smell()
            // - STEP: - 3 - UPDATE LAST POSITION
            this.lastPosition = this.actualPosition
            // - STEP: - 4 - THEN MOVE
            Ants.helpers.moveEntity(this, this.directions.directionToDo)
        }
        //Limits trace 
        // - STEP: - 5 - KILL EXTRA TRACE TO MAKE THINGS MORE INTERESTING
        // - NOTE: For now: if you already walked the max path in half split the path in half
        // - TODO: change  the shift for the lifetime of the path and DONT verify if it is already included, too much buffer used
        if (Ants.world.walkedPathTrace.length >= Ants.counters.maxPathLength) {
            Ants.world.walkedPathTrace = Ants.world.walkedPathTrace.slice(-(Ants.world.walkedPathTrace.length * 0.8))
            console.log('10% of path cleaned')
        }

        // - STEP: - 6 - PUSH STEP INTO "Ants.world.walkedPathTrace"
        Ants.world.walkedPathTrace.push(this.actualPosition)
    }

    /**
     * This process clamp let the ant check his arounds and check the position, and any other thing she need to check on every step.
     * smells then 3 - 6 (random) steps on one direction
     * 
     */
    smell() {
        // - STEP: - 1 - GET LAST'S STEPS DIRECTION FOR CONTROL
        let lastStepsDirectionFromHere = Ants.helpers.getCoordsRelationalDirection(this.actualPosition, this.lastPosition) // - left
        // - STEP: - 2 - AVOID GOING BACK TO LAST STEP AGAIN
        this.directions.directionToDo === lastStepsDirectionFromHere ? this.resetDirection() : ()=>{}
        
        // - STEP: - 3 - DETECTS WALKED PATHS SMELLS AROUND
        let scannedPaths = Ants.helpers.scanTarget(this, Ants.world.walkedPathTrace)
        // - STEP: - 4 - FILTER LAST'S STEPS DIRECTION TO AVOID HAVING IT LIKE AN OPTION
        // - NOTE: - This to get only interesting paths to explore if we decide to do it
        let scannedPathsFiltered = scannedPaths.filter(value => { return value !== lastStepsDirectionFromHere }) // [left]
        // - STEP: - 5 - CHECK IF THE FILTERED DIRECTIONS CONTAINS THE ACTUAL DIRECTION TODO 
        // - NOTE: - Remember it does 3-6 steps for direction only if we are in bounds)
        // - NOTE: - This means we have a chance to explore that path, T 70/30 F
        if (!scannedPathsFiltered.includes(this.directions.directionToDo) && scannedPathsFiltered.length > 0) {
            let shouldWeExploreThisPath = Ants.helpers.getRandomInt(0,1000000) <= 300000 ? true : false
            //console.log(scannedPathsFiltered)
            //console.log('hey a path! shouldWeExploreThisPath? : ', shouldWeExploreThisPath)

            if (shouldWeExploreThisPath) {
                const antIndex = (Ants.helpers.getRandomInt(0, ((scannedPathsFiltered.length * 10) / 10)))
                const nextDir = scannedPathsFiltered[antIndex]
                this.resetDirection(nextDir)
            }
        }

        // - STEP: - X - CORRECTS A END OF BOUNDS
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