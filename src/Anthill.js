
import { greetings } from './Assets.js';

export default class Anthill {
    constructor() {
        this.idProvider = 0
        this.name = 'Home'
        this.food = {
            max: 1000,
            min: 10,
            count: 500
        }
        this.size = 12
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
        this.createAnt(1, 1, Ants.anthill.antsColors.queen, 'queen')
    }
    /**
     * Creates a new worker ant.
     */
    createWorker(qty = 1) {
        for (let index = 0; index < qty; index++) {
            this.createAnt(0, 0, Ants.anthill.antsColors.worker, 'worker')
        }
    }

    /**
     * New Ant data push and position
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    createAnt(posX, posY, trace, job) {
        let babyAnt = new Ants.antClass(posX, posY, trace, job)
        babyAnt.notification(`new ant created: \n"${babyAnt.name}" says: -${greetings[Ants.Helpers.getRandomInt(greetings.length - 1)]}`)
        Ants.world.state.add(babyAnt)
        Ants.anthill.ants.push(babyAnt)
    }
}