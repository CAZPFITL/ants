import State from './State.js'

/**
 * Little strong and smart ant
 * TODO: add to oobservers any closer ant and remove it when if goes away
 */
export default class Ant {
    constructor(posX, posY, trace, job, age = 0) {
        Ants.anthill.idProvider++
        this.id = Ants.anthill.idProvider
        this.name = job + ' ant #' + this.id
        this.job = job
        this.age = age
        this.walkedPath = [[0, 0]]
        this.actualPosition = [posX ?? 0, posY ?? 0]
        this.trace = trace ?? 'transparent'
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
        this.notification()
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
    notification() {
        let antState = this.getTask(Ants.world.state.state)
        this.state.changeState(antState)
        console.log(this.name + ' says: let`s ' + antState)
    }

    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    walk() {
        this.walkedPath.push(this.actualPosition)

        let posiblePaths = []

        if (this.actualPosition[0] != 0) {
            posiblePaths.push('left')
        }
        if (this.actualPosition[1] != 0) {
            posiblePaths.push('up')
        }
        if (this.actualPosition[0] != Ants.canvasBounds[0]) {
            posiblePaths.push('right')
        }
        if (this.actualPosition[1] != Ants.canvasBounds[1]) {
            posiblePaths.push('down')
        }

        let nextMove = posiblePaths[Ants.Helpers.getRandomInt(posiblePaths.length)]

        console.log(nextMove)

        let x = nextMove === 'left' ? (this.actualPosition[0] / 10) - 1 : nextMove === 'right' ? (this.actualPosition[0] / 10) + 1 : (this.actualPosition[0] / 10)
        let y = nextMove === 'down' ? (this.actualPosition[1] / 10) + 1 : nextMove === 'up' ? (this.actualPosition[1] / 10) - 1 : (this.actualPosition[1] / 10)

        this.actualPosition = [Ants.Helpers.getStepSize(x), Ants.Helpers.getStepSize(y)]
    }

    cycle() {
        if (this.state.state === 'sleep') {
            return
        } else if (this.state.state === 'explore') {
            this.walk()
            // this.search()
        }

        // TODO: IF Panic search path
    }
}