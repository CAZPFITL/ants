/**
 * Little strong and smart ant
 */
export default class Ant {
    constructor(posX, posY, trace) {
        Ants.idProvider++
        this.id = Ants.idProvider
        this.name = 'Ant #' + this.id
        this.posX = posX ?? 0
        this.posY = posY ?? 0
        this.walkedPath = [[0,0]]
        this.trace = trace ?? 'transparent'
    }
    
    /**
     * listen on app state change
     */
    notification() {
        console.log(this.name + ' says: what is that smell...')
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

    // TODO: calc the path
    // TODO: connect this with the explore state
    move(){
        this.newPosition(Ants.Helpers.getStepSize(Ants.counters.stepper), 0)
    }
}