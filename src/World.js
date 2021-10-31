import State from './State.js';
import Food from './Food.js';
import Trace from './Trace.js';

class WeatherGen {
    constructor() {
        this.avaliableWeathers = ['sunny', 'rainy', 'foggy', 'stormy', 'precipitation soon']
    }

    static get() {
        let gen = ''
        return gen
    }
}

export default class Wold {
    constructor(weather) {
        this.name = 'World'
        this.state = new State(this)
        this.walkedPathTrace = []
        this.traces = [
            new Trace('normal', 1000, 0.8, '#CACACA'), 
            new Trace('food', 600, 0.8, '#3391B5')
        ]
        this.weather = ''
        this.droppedFood = []
        this.time = {
            globalSeconds: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0,
            years: 0
        }
        this.setWeather(weather)
        this.dropFood('bread')
        this.dropFood('pizza leftovers')
        this.dropFood('fruit')
        this.dropFood('candy')
        this.dropFood('fruit')
        this.dropFood('spilled soda')
    }
    // --queen ant #1 says: let's sleep
    setWeather(weather) {
        Ants.messages.processMessage({ message: '= W E A T H E R - B R O A D C A S T = >> ' + weather, from: 'setWeather()' })
        this.weather = weather
        this.state.changeState(weather)
    }

    dropFood(type) {
        this.droppedFood.push(new Food(type))
    }

    startDay() {

    }

    startNight() {

    }

    starRain() {

    }

    stopRain() {

    }
}