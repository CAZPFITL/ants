export default class Anthill {
    constructor() {
        this.idProvider = 0
        this.name = 'Home'
        this.food = {
            max: 1000,
            min: 10,
            count: 500
        }
        this.idealConditions = { 
            temperature : {
                minC: 23.8,
                maxC: 35.1,
                minF: 74.8,
                maxF: 95.1
            },
        },
        this.ants = []
        this.totalAnts = this.ants.length
        this.antsColors = {
            worker: '#CCCCCC',
            soldier: '#F0E4BD'
        }
    }
}