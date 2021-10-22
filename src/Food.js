import State from 'State.js'

export default class Food {
    constructor(){
        this.type = 'bread' //set Typesƒ
        this.coords = [10, 10] //[x, y]
        this.size = 10 //0-10
        this.factor = 10 //0-10
        this.state = new State(this)
    }
}