import State from './State.js'

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
        this.time = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0,
            years: 0
        }
        this.setWeather(weather)
    }

    setWeather(weather) {
        Ants.messages.processMessage('= W E A T H E R - B R O A D C A S T = >> ' + weather)
        this.weather = weather
        this.state.changeState(weather)
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