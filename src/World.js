import State from './State.js';
import Food from './Food.js';

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
        this.walkedPathTrace = [[0, 0]]
        this.weather = ''
        this.droppedFood = []
        this.time = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0,
            years: 0
        }
        this.setWeather(weather)
        this.dropFood()
        this.dropFood()
    }
    // --queen ant #1 says: let's sleep
    setWeather(weather) {
        Ants.messages.processMessage({ message: '= W E A T H E R - B R O A D C A S T = >> ' + weather, from: 'setWeather()' })
        this.weather = weather
        this.state.changeState(weather)
    }

    dropFood() {
        this.droppedFood.push(new Food())
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