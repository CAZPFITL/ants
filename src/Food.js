import Ant from './Ant.js'
import State from './State.js'

export default class Food {
    constructor(type = 'bread') {
        this.type = type //set Types
        this.actualPosition
        this.size
        this.body = []
        this.state = new State(this)
        this.initFood(type)
    }

    initFood(type) {
        this.dropFood()
        this.getBody()
        Ants.messages.processMessage({
            message: `-- Live News: new ${type} has dropped in the map --`,
            console: true,
            log: false,
            from: `Food - 17`
        })
        this.body = this.getBody()
    }

    dropFood() {
        this.size = [
            Math.trunc(Ants.helpers.getRandomInt(200, 500) / 100), 
            Math.trunc(Ants.helpers.getRandomInt(200, 500) / 100)  //0-10
        ]
        this.actualPosition = [
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[0] - 2)),
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[1] - 2))
        ]
    }
    
    getBody() {
        let output = []
        for (let xAxis = 0; xAxis < this.size[0]; xAxis++) {
            for (let yAxis = 0; yAxis < this.size[1]; yAxis++) {
                xAxis = xAxis > this.size[0] ? 0 : xAxis
                yAxis = yAxis > this.size[1] ? 0 : yAxis
                output.push([this.actualPosition[0] + xAxis,this.actualPosition[1] + yAxis])
            }
        }
        return output
    }
}