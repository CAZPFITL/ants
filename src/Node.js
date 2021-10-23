export default class Node {
    constructor(value) {
        this.value = value;
        this.edges = [];
        this.searched = false;
        this.parent = null;
    }

    addEdge = function (neighbor) {
        this.edges.push(neighbor);
        // Both directions!
        neighbor.edges.push(this);
    }
}