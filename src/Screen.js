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
                <div 
                    class="wrapper" 
                    touchend="Ants.move = false"
                    onmouseup="Ants.move = false">
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
                        <div class="button up">
                            <div 
                                onmousedown="Ants.Helpers.Move('up'); setTimeout(()=>{Ants.Helpers.startAutoMove('up')}, 1000);"
                                touchstart="Ants.Helpers.Move('up'); setTimeout(()=>{Ants.Helpers.startAutoMove('up')}, 1000);">
                                ${arrows.up}
                            </div>
                        </div>

                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.Helpers.Move('left'); setTimeout(()=>{Ants.Helpers.startAutoMove('left')}, 1000);"
                                    touchstart="Ants.Helpers.Move('left'); setTimeout(()=>{Ants.Helpers.startAutoMove('left')}, 1000);">
                                    ${arrows.left}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.Helpers.Move('right'); setTimeout(()=>{Ants.Helpers.startAutoMove('right')}, 1000);"
                                    touchstart="Ants.Helpers.Move('right'); setTimeout(()=>{Ants.Helpers.startAutoMove('right')}, 1000);">
                                    ${arrows.right}
                                </div>
                            </div>

                        </div>

                        <div class="button down">   
                            <div 
                                onmousedown="Ants.Helpers.Move('down'); setTimeout(()=>{Ants.Helpers.startAutoMove('down')}, 1000);"
                                touchstart="Ants.Helpers.Move('down'); setTimeout(()=>{Ants.Helpers.startAutoMove('down')}, 1000);">
                                ${arrows.down}
                            </div>
                        </div>

                        <div class="button"></div>


                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.Helpers.Move('zoomIn'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomIn')}, 1000);"
                                    touchstart="Ants.Helpers.Move('zoomIn'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomIn')}, 1000);">
                                    ${arrows.zoomIn}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.Helpers.Move('zoomOut'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomOut')}, 1000);"
                                    touchstart="Ants.Helpers.Move('zoomOut'); setTimeout(()=>{Ants.Helpers.startAutoMove('zoomOut')}, 1000);">
                                    ${arrows.zoomOut}
                                </div>
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