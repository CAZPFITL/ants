/**
 * Little strong and smart ant
 */
export default class Ant {
    constructor(posX, posY) {
        Ants.idProvider++
        this.id = Ants.idProvider
        this.posX = posX ?? 0
        this.posY = posY ?? 0
    }
}