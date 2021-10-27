import State from './State.js'

export default class Food {
    constructor(type) {
        this.type = type || 'bread' //set Types
        this.actualPosition = [
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[0] - 2)),
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[1] - 2))
        ]
        this.size = [Math.trunc(Ants.helpers.getRandomInt(20, 50) / 10), Math.trunc(Ants.helpers.getRandomInt(20, 50) / 10)] //0-10
        this.factor = 10 //0-10
        this.state = new State(this)
    }
}