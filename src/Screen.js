import { processRequest, drawSlider, arrows, full } from './Assets.js'

export default class Screen {
    static drawScreen(state) {
        switch (state) {

            case 'pause':
                processRequest('pause', `
                PAUSE
                `)
                break;

            case 'play':
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
                                onmousedown="Ants.helpers.moveCamera('up'); setTimeout(()=>{Ants.helpers.startAutoMove('up')}, 1000);"
                                touchstart="Ants.helpers.moveCamera('up'); setTimeout(()=>{Ants.helpers.startAutoMove('up')}, 1000);">
                                ${arrows.up}
                            </div>
                        </div>

                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.helpers.moveCamera('left'); setTimeout(()=>{Ants.helpers.startAutoMove('left')}, 1000);"
                                    touchstart="Ants.helpers.moveCamera('left'); setTimeout(()=>{Ants.helpers.startAutoMove('left')}, 1000);">
                                    ${arrows.left}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.helpers.moveCamera('right'); setTimeout(()=>{Ants.helpers.startAutoMove('right')}, 1000);"
                                    touchstart="Ants.helpers.moveCamera('right'); setTimeout(()=>{Ants.helpers.startAutoMove('right')}, 1000);">
                                    ${arrows.right}
                                </div>
                            </div>

                        </div>

                        <div class="button down">   
                            <div 
                                onmousedown="Ants.helpers.moveCamera('down'); setTimeout(()=>{Ants.helpers.startAutoMove('down')}, 1000);"
                                touchstart="Ants.helpers.moveCamera('down'); setTimeout(()=>{Ants.helpers.startAutoMove('down')}, 1000);">
                                ${arrows.down}
                            </div>
                        </div>

                        <div class="button"></div>


                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.helpers.moveCamera('zoomIn'); setTimeout(()=>{Ants.helpers.startAutoMove('zoomIn')}, 1000);"
                                    touchstart="Ants.helpers.moveCamera('zoomIn'); setTimeout(()=>{Ants.helpers.startAutoMove('zoomIn')}, 1000);">
                                    ${arrows.zoomIn}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.helpers.moveCamera('zoomOut'); setTimeout(()=>{Ants.helpers.startAutoMove('zoomOut')}, 1000);"
                                    touchstart="Ants.helpers.moveCamera('zoomOut'); setTimeout(()=>{Ants.helpers.startAutoMove('zoomOut')}, 1000);">
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