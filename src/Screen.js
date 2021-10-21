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
                        <div class="box">
                            <span>Speed:</span>
                            <div class="slider-wrapper">
                                <span>min</span>
                                ${drawSlider(0, 119, 120 - Ants.counters.speed, 'Ants.counters.speed = 120 - this.value')}
                                <span>max</span>
                            </div>
                        </div>
                        <div class="box">
                            <span>draw path: (use wisely)</span>
                            <div class="slider-wrapper">
                                <span>min</span>
                                ${drawSlider(1, 100, Ants.counters.maxDraw * 100, 'Ants.counters.maxDraw = this.value / 100')}
                                <span>max</span>
                            </div>
                        </div>
                    </div>
                    <div class="controls">
                        <div 
                            onmousedown="Ants.Helpers.Move('up'); setTimeout(()=>{Ants.Helpers.startAutoMove('up')}, 400);"
                            onmouseup="Ants.Helpers.stopAutoMove()"
                            class="button up">
                            ${arrows.up}
                        </div>

                        <div class="middle">
                            <div 
                                onmousedown="Ants.Helpers.Move('left'); setTimeout(()=>{Ants.Helpers.startAutoMove('left')}, 400);"
                                onmouseup="Ants.Helpers.stopAutoMove()"
                                class="button left">
                                ${arrows.left}
                            </div>

                            <div 
                                onmousedown="Ants.Helpers.Move('right'); setTimeout(()=>{Ants.Helpers.startAutoMove('right')}, 400);"
                                onmouseup="Ants.Helpers.stopAutoMove()"                                
                                class="button right">
                                ${arrows.right}
                            </div>

                        </div>

                        <div 
                            onmousedown="Ants.Helpers.Move('down'); setTimeout(()=>{Ants.Helpers.startAutoMove('down')}, 400);"
                            onmouseup="Ants.Helpers.stopAutoMove()"     
                            class="button down">
                            ${arrows.down}
                        </div>

                        <div class="button"></div>


                        <div class="middle">
                            <div 
                                onmousedown="Ants.Helpers.Move('zoomIn'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomIn')}, 400);"
                                onmouseup="Ants.Helpers.stopAutoMove()"
                                class="button left">
                                ${arrows.zoomIn}
                            </div>

                            <div 
                                onmousedown="Ants.Helpers.Move('zoomOut'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomOut')}, 400);"
                                onmouseup="Ants.Helpers.stopAutoMove()"
                                class="button right">
                                ${arrows.zoomOut}
                            </div>

                        </div>

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