export default class Trace {
    constructor(type, liveTime, maxSize, color){
        this.type = type || 'normal'
        this.liveTime = liveTime || 1000
        this.maxSize = maxSize || 0.8
        this.color = color || '#999999'
        this.liveTraceCoords = []
        this.liveTraceStamp = [] // check the las stamp an remove it if the liveTime has exceeded, then check the next, if it's ok go on , if not, repeat
        this.liveTraceSizes = []
    }

    clamp(coord){
        this.liveTraceCoords.push(coord)
        this.liveTraceStamp.push(Ants.world.time.globalSeconds)
        this.liveTraceSizes.push(Ants.helpers.getRandomInt(0, Ants.counters.dropSizesRange * Ants.counters.stepSize))
    }

    release() {
        this.liveTraceCoords.shift()
        this.liveTraceStamp.shift()
        this.liveTraceSizes.shift()
    }
}