import State from './State.js'

export default class Food {
    constructor(type) {
        this.type = type || 'bread' //set Types
        this.actualPosition = [
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[0] - 2)),
            Ants.helpers.getRandomInt(0, (Ants.canvasBounds[1] - 2))
        ]
        this.size = [Math.trunc(Ants.helpers.getRandomInt(200, 500) / 100), Math.trunc(Ants.helpers.getRandomInt(200, 500) / 100)] //0-10
        this.state = new State(this)
    }

    getFoodSmell() {
        let output = []
        this.actualPosition
        this.size

        for (let xAxis = 0; xAxis < this.size[0]; xAxis++) {
            for (let yAxis = 0; yAxis < this.size[1]; yAxis++) {
                xAxis = xAxis > this.size[0] ? 0 : xAxis
                yAxis = yAxis > this.size[1] ? 0 : yAxis
                output.push([this.actualPosition[0] + xAxis,this.actualPosition[1] + yAxis])
            }
        }
        return [output, this.type]
    }
}