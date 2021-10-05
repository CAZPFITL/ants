import State from './State.js'

class WeatherGen {
    constructor(){
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
            seconds : 0,
            minutes : 0,
            hours : 0,
            days : 0,
            months : 0,
            years : 0
        }
        this.setWeather(weather)
    }

    setWeather(weather) {
        console.log('weather conditions: ' + weather)
        this.weather = weather
        this.state.changeState(weather)
    }

    startDay(){

    }

    startNight(){

    }

    starRain(){

    }

    stopRain(){

    }
}