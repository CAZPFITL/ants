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
     * check if we are going out bounds in the walking cycle
     * @returns souldWeThink? | boolean
     */
    checkPosition() {
        let shouldWeThink = false
        
        if (this.actualPosition[0] <= 0) {
            this.think('right'); shouldWeThink = true;
        } else if (this.actualPosition[1] <= 0) {
            this.think('down'); shouldWeThink = true;
        } else if (this.actualPosition[0] >= Ants.canvasBounds[0]) {
            this.think('left'); shouldWeThink = true;
        } else if (this.actualPosition[1] >= Ants.canvasBounds[1]) {
            this.think('up'); shouldWeThink = true;
        }
        
        if (shouldWeThink) {
            console.log('no')
            return
        } else {
            console.log('ok cool')
        }
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
        //NOTE: Walking
        // console.log('walk')
        this.checkPosition()
        this.move(this.directions.directionToDo)

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
        this.think()
    }

    /**
     * No more steps to do let's think what to do next.
     */
    think(dir) {
        this.directions.directionToDo = dir ?? this.getRandomDirection()
        this.directions.stepsToDo = Ants.Helpers.getRandomInt(0, dir ? 3 : 6)
        console.log('i think ', this.directions.directionToDo)
    }

    cycle() {
        if (this.state.state === 'sleep' || this.job === 'queen') {
            return
        }
        if (this.state.state === 'explore') {
            if (this.directions.stepsToDo < 1) {
                this.smell()
            } else {
                this.walk()
            }
        }

        // TODO: IF Panic search path RANDOM
    }
}