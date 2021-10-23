export default class Settings {
    constructor(keys) {
        this.pauseKey = keys && keys.pauseKey ? keys.pauseKey : 'p'
        this.rainKey = keys && keys.rainKey ? keys.rainKey : 'r'
        this.sunnyKey = keys && keys.sunnyKey ? keys.sunnyKey : 's'
        this.upKey = keys && keys.upKey ? keys.upKey : 'upKey'
        this.downKey = keys && keys.downKey ? keys.downKey : 'downKey'
        this.leftKey = keys && keys.leftKey ? keys.leftKey : 'leftKey'
        this.rightKey = keys && keys.rightKey ? keys.rightKey : 'rightKey'
    }
}