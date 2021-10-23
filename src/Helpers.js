import Node from './Node.js';
import Canvas from './Canvas.js';
import Graph from './Graph.js';

/**
 * This is an abstract class containing all game helpers methods
 */
export default class helpers extends Canvas {
    /**
     * Creates Ants on window global variable
     * @param {AppClass} App 
     */
    static createGlobal(App, _v) {
        window.Ants = new App(_v)
        Ants.state.add(Ants)
    }

    /**
     * This functions gives to Snake the fullscreen functionality
     */
    static fullScreenFunctionality() {
        // Iniciar pantalla completa
        Ants.fullScreen = () => {
            Ants.isFull = !Ants.isFull
            var docElm = document.documentElement
            //W3C   
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            }
            //FireFox   
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            }
            // Chrome, etc.   
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            }
            //IE11   
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen()
            }
        }

        // Salir de pantalla completa
        Ants.normalScreen = () => {
            Ants.isFull = !Ants.isFull
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }

    /**
     * returns a random number
     * @param {Max Limit} max 
     * @returns 
     */
    static getRandomInt(min = 0, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Get coord/num in base of the size selected
     * @param {number} num 
     * @returns 
     */
    static getStepSize(num) {
        return Ants.counters.stepSize * num
    }

    /**
     * Process Key Ups
     * @param {event} e 
     */
    static processKeyUp(e) {

    }

    /**
     * Process Key Downs
     * @param {event} e 
     */
    static processKeyDown(e) {
        if (e === Ants.settings.keys.pauseKey) {
            Ants.state.changeState(Ants.state.state === 'pause state' ? 'play state' : 'pause state')
        } else if (e === Ants.settings.keys.rainKey) {
            Ants.world.state.changeState('rainy')
        } else if (e === Ants.settings.keys.sunnyKey) {
            Ants.world.state.changeState('sunny')
        }
    }

    /**
     * returns the String capitalized
     * @param {String} str 
     * @returns 
     */
    static capitalize(str) {
        if (typeof str === 'undefined') {
            return false
        } else {
            let fistLetter = str.charAt(0).toUpperCase()
            let slicedWord = str.slice(1)
            return fistLetter + slicedWord
        }
    }

    /**
     * returns state function related
     * @returns processed state
     */
    static getStateFunction() {
        let func = Ants.state.state.split(' ')
        func[1] = helpers.capitalize(func[1])
        return func.join('')
    }

    /**
     * Move Entity to given direction (Requires actualPosition[x,y] key)
     * @param {Next's move direction} // nextMove 
     */
    static moveEntity(entity, nextMove) {
        let x = nextMove === 'left' ? (entity.actualPosition[0] - 1) : nextMove === 'right' ? (entity.actualPosition[0] + 1) : entity.actualPosition[0]
        let y = nextMove === 'down' ? (entity.actualPosition[1] + 1) : nextMove === 'up' ? (entity.actualPosition[1] - 1) : entity.actualPosition[1]
        let outOfBounds = (entity.actualPosition[0] > Ants.canvasBounds[0] && entity.actualPosition[1] > Ants.canvasBounds[1]) ? true : false;
        entity.actualPosition = outOfBounds ? [0, 0] : [x, y]
        entity.directions.stepsToDo--
    }

    /**
     * Scan any target you specify in an array, both, observer and observable must have .state key in
     * @param {Search diameter} diameter 
     * @param {Who is scanning} watcher 
     * @param {What are we scanning} targetsColection 
     */
    static scanTarget(diameter, watcher, targetsColection) {
        for (let x = 0; x < diameter; x++) {
            for (let y = 1; y < diameter; y++) {
                targetsColection.forEach(target => {
                    const scannedPosition = { ...target.actualPosition }
                    let xAxisIndex = scannedPosition[0]
                    let yAxisIndex = scannedPosition[1]

                    /**
                     * Found closer targets
                     */
                    if (watcher.actualPosition[0] === xAxisIndex && watcher.actualPosition[1] === yAxisIndex && this !== target) {
                        if (!watcher.state.observers.includes(target)) {
                            console.log(watcher.name, ' - found - ', target.name)
                            watcher.state.add(target)
                        }
                    }

                    /**
                     * Loose closer Targets
                     */
                    watcher.state.observers.forEach(x => {

                    })

                    yAxisIndex++
                    xAxisIndex++
                })
            }
        }
        if (watcher.state.observers.length > 0) {
            // console.log('close targets to ', watcher.name, ': ', watcher.state.observers)
        }
    }

    static createDataGraph() {
        for (let x_axis = 0; x_axis < Ants.canvasBounds[0]; x_axis++) {
            for (let y_axis = 0; y_axis < Ants.canvasBounds[1]; y_axis++) {
                Ants.dataGraph.push({
                    coord: [x_axis, y_axis],
                    surrounds: [
                        [(x_axis - 1), y_axis],
                        [x_axis, (y_axis - 1)],
                        [(x_axis + 1), y_axis],
                        [x_axis, (y_axis + 1)],
                    ]
                })
            }
        }
        console.log(Ants.dataGraph)
    }



    static findPath(initial, final) {
        const bounds = Ants.canvasBounds
        if (!initial || !final || initial[0] < 0 || initial[1] < 0 || final[0] > bounds[0] || final[1] > bounds[1]) {
            console.error('check your parameters bounds exceeded, or missing initial or final coords')
            return;
        } else {
            let data = Ants.dataGraph
            var graph = new Graph()
            var movies = data;

            for (var i = 0; i < movies.length; i++) {
                var movie = movies[i].coord;
                var cast = movies[i].surrounds;
                var movieNode = new Node(movie);
                graph.addNode(movieNode);
                console.log('step')
                // Y
                for (var j = 0; j < cast.length; j++) {
                    var actor = cast[j];
                    var actorNode = graph.getNode(actor);
                    if (actorNode == undefined) {
                        actorNode = new Node(actor);
                        // dropdown.option(actor);
                    }
                    graph.addNode(actorNode);
                    movieNode.addEdge(actorNode);
                }
            }

            function bfs() {
                graph.reset();
                const start = graph.setStart(initial);
                const end = graph.setEnd(final);
                const queue = [];
                start.searched = true;
                queue.push(start);

                while (queue.length > 0) {
                    let current = queue.shift();
                    if (current == end) {
                        console.log("Found " + current.value);
                        break;
                    }
                    let edges = current.edges;
                    for (let i = 0; i < edges.length; i++) {
                        var neighbor = edges[i];
                        if (!neighbor.searched) {
                            neighbor.searched = true;
                            neighbor.parent = current;
                            queue.push(neighbor);
                        }
                    }
                }

                const path = [];
                const simplePath = [];
                path.push(end);
                if(typeof end !== 'undefined') {
                    simplePath.push(end);
                }
                let next = end.parent;
                while (next != null && (next.value[0] !== initial[0] && next.value[1] !== initial[1]) ) {
                    console.log(next.value[0] == initial[0] && next.value[1] == initial[1])
                    path.push(next);
                    simplePath.push(next.value);
                    next = next.parent;
                }
                console.log(simplePath)
            }

            bfs()
        }
    }
}