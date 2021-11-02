export default class Settings {
    constructor(keys) {
        this.keys = {
            pauseKey : keys && keys.pauseKey ? keys.pauseKey : 'p',
            rainKey : keys && keys.rainKey ? keys.rainKey : 'r',
            sunnyKey : keys && keys.sunnyKey ? keys.sunnyKey : 's',
            upKey : keys && keys.upKey ? keys.upKey : 'ArrowUp',
            downKey : keys && keys.downKey ? keys.downKey : 'ArrowDown',
            leftKey : keys && keys.leftKey ? keys.leftKey : 'ArrowLeft',
            rightKey : keys && keys.rightKey ? keys.rightKey : 'ArrowRight',
            zoomInKey : keys && keys.zoomInKey ? keys.zoomInKey : '+',
            zoomOutKey : keys && keys.zoomOutKey ? keys.zoomOutKey : '-',
        }
        this.surroundsColor = 'rgba(33,15,45)'
    }
}