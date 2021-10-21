
export default class Anthill {
    constructor() {
        this.idProvider = 0
        this.name = 'Home'
        this.food = {
            max: 1000,
            min: 10,
            count: 500
        }
        this.size = 10
        this.position = [Ants.canvasBounds[0]/2, Ants.canvasBounds[1]/2]
        this.idealConditions = {
            temperature: {
                minC: 23.8,
                maxC: 35.1,
                minF: 74.8,
                maxF: 95.1
            },
        }
        this.ants = []
        this.totalAnts = this.ants.length
        this.antsColors = {
            worker: '#000000',
            soldier: '#e01e01',
            queen: '#9600bc'
        }
    }

    /**
     * Creates a new Queen.
     */
    createQueen() {
        this.createAnt(Ants.anthill.antsColors.queen, 'queen')
    }
    /**
     * Creates a new worker ant.
     */
    createWorker(qty = 1) {
        for (let index = 0; index < qty; index++) {
            this.createAnt(Ants.anthill.antsColors.worker, 'worker')
        }
    }

    /**
     * New Ant data push and position
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    createAnt(trace, job) {
        let babyAnt = new Ants.antClass(Ants.anthill.position[0], Ants.anthill.position[1], trace, job)
        babyAnt.notification(`*new ant created!!!: ${babyAnt.name} says: -${Ants.messages.greetings[Ants.Helpers.getRandomInt(0, Ants.messages.greetings.length - 1)]}`)
        Ants.world.state.add(babyAnt)
        Ants.anthill.ants.push(babyAnt)
    }
}