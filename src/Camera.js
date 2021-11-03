/**
 * Camera by @robashton returns Camera object.
 *  constructor initial parameters:
 *  @param {context} str *required 
 *  @param {settings | initialPosition | fieldOfView | scaleX | scaleY } str *optional
  */
export default class Camera {
    constructor(context, settings = {}) {
        let scale = settings.gameScale || 100
        this.initial = {
            initialZoom: (context.canvas.width / context.canvas.height) * 800,
            initialMove: settings.initialPosition || [(scale * Ants.canvasBounds[0]) / 2, (scale * Ants.canvasBounds[1]) / 2]
        }
        this.distance = settings.distance || (context.canvas.width / context.canvas.height) * 1000
        this.lookAt = settings.initialPosition || [(scale * Ants.canvasBounds[0]) / 2, (scale * Ants.canvasBounds[1]) / 2]
        this.fieldOfView = settings.fieldOfView || Math.PI / 4.0
        this.gameScale = scale
        this.context = context
        this.keysPressed = []
        this.move = false
        this.down = false
        this.keys = settings.keys || {
            upKey: 'ArrowUp',
            downKey: 'ArrowDown',
            leftKey: 'ArrowLeft',
            rightKey: 'ArrowRight',
            zoomInKey: '+',
            zoomOutKey: '-',
        }
        this.viewport = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            scale: [settings.scaleX || 1.0, settings.scaleY || 1.0]
        }
        this.init()
    }

    /**
     * Camera Initialization
     * -Add listeners.
     * -Initial calculations.
     */
    init() {
        this.addListeners()
        this.updateViewport()
    }

    /**
     * Applies to canvas context the parameters:
     *  -Scale
     *  -Translation
     */
    begin() {
        this.context.save()
        this.applyScale()
        this.applyTranslation()
    }

    /**
     * 2d Context restore() method
     */
    end() {
        this.context.restore()
    }

    /**
     * 2d Context scale(Camera.viewport.scale[0], Camera.viewport.scale[0]) method
     */
    applyScale() {
        this.context.scale(this.viewport.scale[0], this.viewport.scale[1])
    }

    /**
     * 2d Context translate(-Camera.viewport.left, -Camera.viewport.top) method
     */
    applyTranslation() {
        this.context.translate(-this.viewport.left, -this.viewport.top)
    }

    /**
     * Camera.viewport data update
     */
    updateViewport() {
        this.aspectRatio = this.context.canvas.width / this.context.canvas.height
        this.viewport.width = this.distance * Math.tan(this.fieldOfView)
        this.viewport.height = this.viewport.width / this.aspectRatio
        this.viewport.left = this.lookAt[0] - (this.viewport.width / 2.0)
        this.viewport.top = this.lookAt[1] - (this.viewport.height / 2.0)
        this.viewport.right = this.viewport.left + this.viewport.width
        this.viewport.bottom = this.viewport.top + this.viewport.height
        this.viewport.scale[0] = this.context.canvas.width / this.viewport.width
        this.viewport.scale[1] = this.context.canvas.height / this.viewport.height
    }

    /**
     * Zooms to certain z distance
     * @param {*z distance} z 
     */
    zoomTo(z) {
        this.distance = z
        this.updateViewport()
    }

    /**
     * Moves the centre of the viewport to new x, y coords (updates Camera.lookAt)
     * @param {x axis coord} x 
     * @param {y axis coord} y 
     */
    moveTo(x, y) {
        this.lookAt[0] = x
        this.lookAt[1] = y
        this.updateViewport()
    }

    /**
     * Transform a coordinate pair from screen coordinates (relative to the canvas) into world coordinates (useful for intersection between mouse and entities)
     * Optional: obj can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code)
     * @param {x axis coord} x 
     * @param {y axis coord} y 
     * @param {obj can supply an object to be populated with the x/y} obj 
     * @returns 
     */
    screenToWorld(x, y, obj) {
        obj = obj || {}
        obj.x = (x / this.viewport.scale[0]) + this.viewport.left
        obj.y = (y / this.viewport.scale[1]) + this.viewport.top
        return obj
    }

    /**
     * Transform a coordinate pair from world coordinates into screen coordinates (relative to the canvas) - useful for placing DOM elements over the scene.
     * Optional: obj can supply an object to be populated with the x/y (for object-reuse in garbage collection efficient code).
     * @param {x axis coord} x 
     * @param {y axis coord} y  
     * @param {obj can supply an object to be populated with the x/y} obj 
     * @returns 
     */
    worldToScreen(x, y, obj) {
        obj = obj || {}
        obj.x = (x - this.viewport.left) * (this.viewport.scale[0])
        obj.y = (y - this.viewport.top) * (this.viewport.scale[1])
        return obj
    }

    /**
     * Moves camera
     */
    moveCamera(direction, timeout = '') {
        this.move = true
        switch (direction) {
            case 'up':
                this.moveTo(this.lookAt[0], this.lookAt[1] - (this.gameScale))
                break;
            case 'down':
                this.moveTo(this.lookAt[0], this.lookAt[1] + (this.gameScale))
                break;
            case 'left':
                this.moveTo(this.lookAt[0] - this.gameScale, this.lookAt[1])
                break;
            case 'right':
                this.moveTo(this.lookAt[0] + this.gameScale, this.lookAt[1])
                break;
            case 'zoomIn':
                this.zoomTo(this.distance - 50)
                break;
            case 'zoomOut':
                this.zoomTo(this.distance + 50)
                break;

            default:
                break;
        }

        if (timeout !== 'this key have autorepeat') {
            setTimeout(() => {
                Ants.interval = setInterval(() => {
                    if (this.move) {
                        this.moveCamera(direction, 'this key have autorepeat')
                    } else {
                        clearInterval(Ants.interval)
                    }
                }, 20)
            }, 200); // don't go below 500, it get's messy on the key refresh
        }
    }

    processKeyReading(keyPressed) {
        if (keyPressed === ' ') {
            this.zoomTo(this.initial.initialZoom)
            this.moveTo(this.initial.initialMove)
        } else if (keyPressed === this.keys.rightKey) {
            this.moveCamera('right', 'this key have autorepeat')
        } else if (keyPressed === this.keys.leftKey) {
            this.moveCamera('left', 'this key have autorepeat')
        } else if (keyPressed === this.keys.upKey) {
            this.moveCamera('up', 'this key have autorepeat')
        } else if (keyPressed === this.keys.downKey) {
            this.moveCamera('down', 'this key have autorepeat')
        } else if (keyPressed === this.keys.zoomInKey) {
            this.moveCamera('zoomIn', 'this key have autorepeat')
        } else if (keyPressed === this.keys.zoomOutKey) {
            this.moveCamera('zoomOut', 'this key have autorepeat')
        }
    }

    /**
     * Event Listeners for:
     *  -Zoom and scroll around world
     *  -Center camera on "R" key
     */
    addListeners() {
        window.onwheel = e => {
            if (e.ctrlKey) {
                // Your zoom/scale factor
                let zoomLevel = this.distance + (e.deltaY * 10) / this.gameScale
                if (zoomLevel <= 1) {
                    zoomLevel = 1
                }

                if (this.distance >= 11000) {
                    if (e.deltaY < 0) {
                        this.zoomTo(zoomLevel)
                    }
                } else {
                    if (this.distance <= 400) {
                        if (e.deltaY > 0) {
                            this.zoomTo(zoomLevel)
                        }
                    } else {
                        this.zoomTo(zoomLevel)
                    }
                }
            } else {
                let refx = (window.innerWidth / Ants.camera.viewport.scale[0]) / 2
                let refy = (window.innerHeigh / Ants.camera.viewport.scale[1]) / 2

                const x = (e.deltaX * 10 / this.gameScale)
                const y = (e.deltaY * 10 / this.gameScale)

                let newX = this.lookAt[0]
                let newY = this.lookAt[1]

                // if (this.viewport.left <= -refx) {
                //     if (e.deltaX > 0) {
                //         newX = newX + x
                //     }
                // } else {
                    //     if (this.viewport.right <= Ants.camera.lookAt[0]) {
                //         if (e.deltaX < 0) {
                //             newX = newX + x
                //         }
                //     } else {
                //         newX = newX + x
                //     }
                // }

                newX = newX + x
                newY = newY + y
                this.moveTo(newX, newY)
            }
        }

        window.addEventListener('keydown', e => {
            this.down = true;
            if (!this.keysPressed.includes(e.key))
                this.keysPressed.push(e.key)

            this.keysPressed.forEach(keyPressed => {
                if (!this.down) {
                    return
                } else {
                    this.processKeyReading(keyPressed)
                }
            })
        })

        window.addEventListener('keyup', e => {
            this.down = false;
            this.keysPressed = this.keysPressed.filter(x => { return x !== e.key })
            if (!this.down && this.keysPressed.length === 0) {
                this.move = false
            }
        })
    }
}