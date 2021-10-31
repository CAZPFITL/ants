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
        this.smellFood = [false, []]
        this.bringFood = false
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
     */
    walk(panic = false) {
        /**
         * Moving the ant.
         */
        (function walk({ panic = false, This, Ants }) {
            if (panic) {
                This.actualPosition = Ants.helpers.getHomeStep(This.actualPosition)
            } else {
                This.smell()
                This.lastPosition = This.actualPosition
                Ants.helpers.moveEntity(This, This.directions.directionToDo)
            }
        })({ panic, This: this, Ants });

        /**
         * Path related scripts.
         */
        (function leaveTraces({ Ants, This }) {
            Ants.world.traces.forEach(path => {
                if (path.type === 'normal' || (path.type === 'food' && This.bringFood)) {
                    path.liveTraceCoords.push(This.actualPosition)
                    path.liveTraceStamp.push(Ants.world.time.globalSeconds)
                } else if (path.type === 'food' && This.bringFood) {
                    path.liveTraceCoords.push(This.actualPosition)
                    path.liveTraceStamp.push(Ants.world.time.globalSeconds)
                }

                if (Ants.world.time.globalSeconds >= (path.liveTraceStamp[0] + path.liveTime)) {
                    path.liveTraceCoords.shift()
                    path.liveTraceStamp.shift()
                }
            })
        })({ Ants, This: this });

    }

    /**
     * This process clamp let the ant check his arounds and check the position, and any other thing she need to check on every step.
     * smells then 3 - 6 (random) steps on one direction
     * 
     */
    smell() {
        /**
         * Smell Food
         * TODO: more experienced and young Ants will be able to smell further (this "is statement mess" is temporal)
         * 
         * 
         */
        (function smellFood({ Ants, This }) {
            This.smellFood = [false, [], []]
            Ants.world.droppedFood.forEach(foodPiece => {
                if (typeof foodPiece === 'undefined') {
                    return
                }
                function sniffPositive(_scannedFoodBody) {
                    This.smellFood[0] = true
                    This.smellFood[1].push(foodPiece)
                    _scannedFoodBody.forEach(f => This.smellFood[2].push(f))
                }
                let scannedFoodBody = Ants.helpers.scanTarget(This, foodPiece.getFoodSmell())

                if (scannedFoodBody.length > 0) {
                    sniffPositive(scannedFoodBody)
                } else {
                    scannedFoodBody = Ants.helpers.scanTarget(This, foodPiece.getFoodSmell(), 2)
                    if (scannedFoodBody.length > 0) {
                        sniffPositive(scannedFoodBody)
                    } else {
                        scannedFoodBody = Ants.helpers.scanTarget(This, foodPiece.getFoodSmell(), 3)
                        if (scannedFoodBody.length > 0) {
                            sniffPositive(scannedFoodBody)
                        }
                    }
                }
            })
        })({ Ants, This: this });

        /**
         * FOOOD!!!
         */
        if (this.smellFood[0]) {
            //TODO: eat method - bug found, false positives.
            const bridgeIndex = (Ants.helpers.getRandomInt(0, ((this.smellFood[2].length * 100) / 100)))
            const pointer = this.smellFood[2][bridgeIndex]
            Ants.messages.processMessage({
                message: `${this.name} says: mmm smells like ${this.smellFood[1].map(f => f.type + ' and ')}smells good!`,
                console: true,
                log: false,
                from: `${this.name}'s smell() method`
            })
            this.resetDirection(pointer)

        } else {
            /**
             * Smells Path related
             */
            (function smellTraces({ Ants, This }) {
                // - STEP: - 1 - DETECT THE LAS STEP AND AVOID IT
                let lastStepsDirectionFromHere = Ants.helpers.getCoordsRelationalDirection(This.actualPosition, This.lastPosition) // - left
                This.directions.directionToDo === lastStepsDirectionFromHere ? This.resetDirection() : () => { }

                // - STEP: - 2 - DETECTS WALKED PATHS SMELLS AROUND AT scannedPaths > scannedPathsFiltered
                Ants.world.traces.forEach(trace => {
                    const scannedPaths = Ants.helpers.scanTarget(This, trace)
                    const scannedPathsFiltered = scannedPaths.filter(value => { return value !== lastStepsDirectionFromHere }) // [left]
                    const antIndex = (Ants.helpers.getRandomInt(0, ((scannedPathsFiltered.length * 10) / 10)))
                    const nextDir = scannedPathsFiltered[antIndex]
                    // - STEP: - 3 - CHECK IF THE FILTERED DIRECTIONS CONTAINS THE ACTUAL DIRECTION TODO 
                    // - NOTE: - Remember it does 3-6 steps for direction only if we are in bounds)
                    // - NOTE: - This means we have a chance to explore that path, T 50/50 F
                    // - TODO: - FROM: - 0.4.1 Check how many times the paths is pushed to change probability:
                    if (!scannedPathsFiltered.includes(This.directions.directionToDo) && scannedPathsFiltered.length > 0) {
                        if (Ants.helpers.getRandomInt(0, 1000000) <= 500000) {
                            This.resetDirection(nextDir)
                        }
                    }
                })

            })({ Ants, This: this });
        }

        /**
         * Smells Bounds Around
         */
        (function smellBoundsAround({ Ants, This }) {
            if (This.actualPosition[0] <= 0) {
                This.resetDirection('right')
            } else if (This.actualPosition[1] <= 0) {
                This.resetDirection('down')
            } else if (This.actualPosition[0] >= Ants.canvasBounds[0]) {
                This.resetDirection('left')
            } else if (This.actualPosition[1] >= Ants.canvasBounds[1]) {
                This.resetDirection('up')
            }
        })({ Ants, This: this })
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
                this.walk(false)
            }
        } else if (this.state.state === 'go home') {
            this.walk(true)
        }
    }
}