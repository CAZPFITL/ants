export default class Trace {
    constructor(type, liveTime, maxSize){
        this.type = type ?? 'normal'
        this.liveTime = liveTime ?? 1000
        this.maxSize = maxSize ?? 0.8
        this.color = '#999999'
        this.liveTraceCoords = []
        this.liveTraceStamp = []
    }
}