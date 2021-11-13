import { AntSvg } from './Assets.js'

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
        this.born()
    }

    born() {

        this.images = new Image()
        this.images.src = "./src/ants.png";
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
     * No parameters will get a random direction and the ant will smell it
     * Parameters will change de direction and reset a new random stepsToDo
     * @param {forced direction} dir
     */
    resetDirection(dir) {
        this.directions.directionToDo = dir ?? this.getRandomDirection()
        this.directions.stepsToDo = Ants.helpers.getRandomInt(0, dir ? 3 : 6)
        // console.log('i think i will go ', this.directions.directionToDo)
        if (!dir) {
            this.think()
        }
    }

    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     */
    async walk(panic = false) {
        /**
         * Moving the ant.
         */
        const move = async (panic) => {
            if (panic) {
                this.actualPosition = Ants.helpers.getHomeStep(this.actualPosition)
            } else {
                this.think()
                this.lastPosition = this.actualPosition
                Ants.helpers.moveEntity(this, this.directions.directionToDo)
            }
        }
        /**
         * Path related scripts.
         */
        move(panic).then(()=>{
            /**
             * clamp() from Trace.js
             * release() from Trace.js
             */
            Ants.world.traces.forEach(path => {
                //clamps normal path
                if (path.type === 'normal') {
                    path.clamp(this.actualPosition)
                //clamps food path
                } else if (path.type === 'food' && this.bringFood) {
                    //path.clamp(this.actualPosition)
                }
                //TODO: move to Traces and create cycle in there
                //Clears dead paths
                if (Ants.world.time.globalSeconds >= (path.liveTraceStamp[0] + path.liveTime)) {
                    path.release()
                }
            })
        })
    }

    /**
     * Smell Food
     */
    smellFoods() {
        this.smellFood = [false, [], []]
        Ants.world.droppedFood.forEach(foodPiece => {
            if (typeof foodPiece === 'undefined') {
                return
            }
            let scannedFoodBody = Ants.helpers.scanTarget(this, foodPiece.body)
            const sniffPositive = (_scannedFoodBody) => {
                this.smellFood[0] = true
                this.smellFood[1].push(foodPiece)
                _scannedFoodBody.forEach(f => this.smellFood[2].push(f))
            }
            if (scannedFoodBody.length > 0) {
                sniffPositive(scannedFoodBody)
            } else {
                scannedFoodBody = Ants.helpers.scanTarget(this, foodPiece.body, 2)
                if (scannedFoodBody.length > 0) {
                    sniffPositive(scannedFoodBody)
                } else {
                    scannedFoodBody = Ants.helpers.scanTarget(this, foodPiece.body, 3)
                    if (scannedFoodBody.length > 0) {
                        sniffPositive(scannedFoodBody)
                    }
                }
            }
        })
    }

    /**
     * Smell Traces
     */
    smellTraces() {
        // - STEP: - 1 - DETECT THE LAS STEP AND AVOID IT
        let lastStepsDirectionFromHere = Ants.helpers.getCoordsRelationalDirection(this.actualPosition, this.lastPosition) // - left
        this.directions.directionToDo === lastStepsDirectionFromHere ? this.resetDirection() : () => { }

        // - STEP: - 2 - DETECTS WALKED PATHS SMELLS AROUND AT scannedPaths > scannedPathsFiltered
        Ants.world.traces.forEach(trace => {
            const scannedPaths = Ants.helpers.scanTarget(this, trace)
            const scannedPathsFiltered = scannedPaths.filter(value => { return value !== lastStepsDirectionFromHere }) // [left]
            const antIndex = (Ants.helpers.getRandomInt(0, ((scannedPathsFiltered.length * 10) / 10)))
            const nextDir = scannedPathsFiltered[antIndex]
            // - STEP: - 3 - CHECK IF THE FILTERED DIRECTIONS CONTAINS THE ACTUAL DIRECTION TODO 
            // - NOTE: - Remember it does 3-6 steps for direction only if we are in bounds)
            // - NOTE: - this means we have a chance to explore that path, T 50/50 F
            // - TODO: - FROM: - 0.4.1 Check how many times the paths is pushed to change probability:
            if (!scannedPathsFiltered.includes(this.directions.directionToDo) && scannedPathsFiltered.length > 0) {
                if (Ants.helpers.getRandomInt(0, 1000000) <= 500000) {
                    this.resetDirection(nextDir)
                }
            }
        })

    }

    /**
     * Smell Bounds
     */
    smellBounds() {
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
     * This process clamp let the ant check his rounds and check the position, and any other thing she need to check on every step.
     * smells then 3 - 6 (random) steps on one direction
     * 
     */
    think() {
        this.smellFoods()
        /**
         * Food found
         */
        if (this.smellFood[0]) {
            /**
             * Use Antennas
             */
            this.useAntennas()
        } else {
            /**
             * Smells Path related
             */
            this.smellTraces()
        }
        /**
         * Smells Bounds Around
         */
        this.smellBounds()
    }

    /**
     * touch the ground
     */
    touch(targetsCollection , distance = 1, ant) {
        let actualX = [...ant.actualPosition][0]
        let actualY = [...ant.actualPosition][1]
        let references = { x1: actualX, x2: actualX, y1: actualY, y2: actualY, }

        let checkPositions = {
            up: [actualX, references.y1 - distance],
            down: [actualX, references.y2 + distance],
            left: [references.x1 - distance, actualY],
            right: [references.x2 + distance, actualY],
        }
        return (
            (ant.directions.directionToDo === 'up' && Ants.helpers.includesMultiDimension(targetsCollection, checkPositions.up)) ? true :
                (ant.directions.directionToDo === 'down' && Ants.helpers.includesMultiDimension(targetsCollection, checkPositions.down)) ? true :
                    (ant.directions.directionToDo === 'right' && Ants.helpers.includesMultiDimension(targetsCollection, checkPositions.right)) ? true :
                        (ant.directions.directionToDo === 'left' && Ants.helpers.includesMultiDimension(targetsCollection, checkPositions.left)) ? true : false
        )
    }
    /**
     * Use Antennas
     */
    useAntennas() {

        this.smellFood[1].forEach(food => {
            if (this.touch(food.body, 1, this)) {
                this.state.changeState('grabbing food');
                return
            }
        })

        const bridgeIndex = (Ants.helpers.getRandomInt(0, ((this.smellFood[2].length * 100) / 100)))
        const pointer = this.smellFood[2][bridgeIndex]
        Ants.messages.processMessage({
            message: `${this.name} says: \n-*sniff* *snif* \n-smells like ${this.smellFood[1].map(f => `${f.type} and `).join('')}\n-*sniff* *snif* smells good!`,
            console: true,
            log: false,
            from: `${this.name}'s Ant 212`
        })
        this.resetDirection(pointer)
        console.log(this.smellFood)
    }

    /**
     * Harvest Food
     */
    harvestFoodPiece() {
        console.log(`yumi yumi yumi yumi yumi`)
    }

    //Adjust the process to the slider of speed.
    async cycle() {
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
        } else if (this.state.state === 'grabbing food') {
            this.harvestFoodPiece()
        }
    }
}