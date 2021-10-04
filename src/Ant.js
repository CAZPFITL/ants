/**
 * Little strong and smart ant
 */
export default class Ant {
    constructor(posX, posY) {
        Ants.idProvider++
        this.id = Ants.idProvider
        this.posX = posX ?? 0
        this.posY = posY ?? 0
        this.walkedPath = [[0,0]]
    }
    
    /**
     * Set a new coordinates position for "this" ant.
     * @param {Position X} posX 
     * @param {Position Y} posY 
     */
    newPosition(posX,posY) {
        this.posX = posX
        this.posY = posY
        this.walkedPath.push([posX,posY])
    }

    // TODO: determinar en base a una probabilidad que camino tomar (harcodear la probabilidad).
    move(){
        this.newPosition(Ants.Helpers.getStepSize(Ants.counters.stepper), 0)
    }
}