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
                            onclick="Ants.camera.moveTo(Ants.camera.lookAt[0], Ants.camera.lookAt[1] - ${Ants.counters.stepSize})" class="button up">
                            ${arrows.up}
                        </div>

                        <div class="middle">
                            <div 
                                onclick="Ants.camera.moveTo(Ants.camera.lookAt[0] - ${Ants.counters.stepSize}, Ants.camera.lookAt[1])" class="button left">
                                ${arrows.left}
                            </div>

                            <div 
                                onclick="Ants.camera.moveTo(Ants.camera.lookAt[0] + ${Ants.counters.stepSize}, Ants.camera.lookAt[1])" class="button right">
                                ${arrows.right}
                            </div>

                        </div>

                        <div 
                            onclick="Ants.camera.moveTo(Ants.camera.lookAt[0], Ants.camera.lookAt[1] + ${Ants.counters.stepSize})" class="button down">
                            ${arrows.down}
                        </div>

                        <div class="button"></div>


                        <div class="middle">
                            <div 
                                onclick="Ants.camera.zoomTo(Ants.camera.distance - 50)" class="button left">
                                ${arrows.zoomIn}
                            </div>

                            <div 
                                onclick="Ants.camera.zoomTo(Ants.camera.distance + 50)" class="button right">
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