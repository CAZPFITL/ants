import { processRequest, drawSlider, arrows, full } from './Assets.js'

export default class Screen {
    static drawScreen(state) {
        switch (state) {

            case 'level paused':
                processRequest('pause', `
                PAUSE
                `)
                break;

            case 'welcome to Ants':
                processRequest('start', `
                <div class="wrapper">
                    <div class="screen-controls">
                        <span>Speed:</span>
                        <div class="slider-wrapper">
                            <span>min</span>
                            ${drawSlider(0, 119, 120 - Ants.counters.speed)}
                            <span>max</span>
                        </div>
                    </div>
                    <div class="controls">
                        <div onclick="Snake.helpers.processKeyDown({key:'ArrowUp'});" class="button up">${arrows.up}</div>
                        <div class="middle">
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowLeft'});" class="button left">${arrows.left}</div>
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowRight'});" class="button right">${arrows.right}</div>
                            </div>
                            <div onclick="Snake.helpers.processKeyDown({key:'ArrowDown'});" class="button down">${arrows.down}</div>
                    </div>
                </div>
                `)

                break;

            default:
                break;
        }
    }

}

// onclick="!Ants.isFull ? Ants.fullScreen() : Ants.normalScreen()"