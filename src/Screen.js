import { processRequest, drawSlider, arrows, worldData, AntSvg } from './Assets.js'

export default class Screen {
    static drawScreen(state) {
        switch (state) {

            case 'pause state':
                processRequest('pause', `
                PAUSE
                `)
                break;

            case 'play state':
                processRequest('start', `
                <div 
                    class="wrapper" 
                    touchend="Ants.camera.move = false"
                    onmouseup="Ants.camera.move = false">
                    <div class="world-data">
                        ${worldData()}
                    </div>
                    <div class="screen-controls">
                        <div class="box">
                            <div class="middle">
                                <span>Create Worker:</span>
                                <div class="button ant">
                                    <div 
                                        onmousedown="Ants.anthill.createWorker(1);"
                                        touchstart="Ants.anthill.createWorker(1);">
                                        ${AntSvg(Ants.anthill.antsColors.worker)}
                                    </div>
                                </div>
                                <span>Create Soldier:</span>
                                <div class="button ant">
                                    <div 
                                        onmousedown="Ants.anthill.createWorker(1);"
                                        touchstart="Ants.anthill.createWorker(1);">
                                        ${AntSvg(Ants.anthill.antsColors.soldier)}
                                    </div>
                                </div>
                            </div>
                            <span>Speed:</span>
                            <div class="slider-wrapper">
                                <span>min</span>
                                ${drawSlider(30, 119, 120 - Ants.counters.speed, 'Ants.counters.speed = 120 - this.value')}
                                <span>max</span>
                            </div>
                        </div>
                        <div class="box">
                            <span>draw path: (use wisely)</span>
                            <div class="slider-wrapper">
                                <span>min</span>
                                ${drawSlider(1, Ants.counters.maxDraw * 100, Ants.counters.maxDraw * 100, 'Ants.counters.maxDraw = this.value / 100')}
                                <span>max</span>
                            </div>
                        </div>
                    </div>
                    <div class="controls">
                        <div class="button up">
                            <div 
                                onmousedown="Ants.camera.moveCamera('up');"
                                touchstart="Ants.camera.moveCamera('up');">
                                ${arrows.up}
                            </div>
                        </div>

                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.camera.moveCamera('left');"
                                    touchstart="Ants.camera.moveCamera('left');">
                                    ${arrows.left}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.camera.moveCamera('right');"
                                    touchstart="Ants.camera.moveCamera('right');">
                                    ${arrows.right}
                                </div>
                            </div>

                        </div>

                        <div class="button down">   
                            <div 
                                onmousedown="Ants.camera.moveCamera('down');"
                                touchstart="Ants.camera.moveCamera('down');">
                                ${arrows.down}
                            </div>
                        </div>

                        <div class="button"></div>


                        <div class="middle">
                            <div class="button left">
                                <div 
                                    onmousedown="Ants.camera.moveCamera('zoomIn');"
                                    touchstart="Ants.camera.moveCamera('zoomIn');">
                                    ${arrows.zoomIn}
                                </div>
                            </div>

                            <div class="button right">
                                <div 
                                    onmousedown="Ants.camera.moveCamera('zoomOut');"
                                    touchstart="Ants.camera.moveCamera('zoomOut');">
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