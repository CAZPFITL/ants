export default class Graph {
    constructor() {
        this.nodes = [];
        this.graph = {};
        this.end = null;
        this.start = null;
    }

    reset() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].searched = false;
            this.nodes[i].parent = null;
        }
    }

    setStart(coords) {
        this.start = this.graph[String(coords)];
        return this.start;
    }

    setEnd(coords) {
        this.end = this.graph[String(coords)];
        return this.end;
    }
    
    
    addNode(n) {
        // Node into array
        this.nodes.push(n);
        var title = String(n.value);
        // Node into "hash"
        this.graph[title] = n;
    }

    getNode(coords) {
        var n = this.graph[coords];
        return n;
    }
}