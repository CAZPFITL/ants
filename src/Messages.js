export default class Messages {
    constructor() {
        this.log = []
        this.names = [
            'Antony',
            'Bob',
            'Ryan',
            'Fangio',
            'Johnny',
            'Leonel',
            'Tito',
            'Bort',
            'Dodo',
        ]
        this.greetings = [
            `Hello, sunshine!`,
            `Hello World!`,
            `Howdy, partner!`,
            `Hey, howdy, hi!`,
            `What’s kickin’, little chicken?`,
            `Peek-a-boo!`,
            `Howdy-doody!`,
            `Hey there, freshman!`,
            `Hi, mister!`,
            `I come in peace!`,
            `Hiya!`,
            `‘Ello, gov’nor!`,
            `Top of the mornin’ to ya!`,
            `What’s crackin’?`,
            `‘Sup, homeslice?`,
            `This call may be recorded for training purposes.`,
            `Howdy, howdy ,howdy!`,
            `How does a lion greet the other animals in the field? Answer: what is a lion? :(.`,
            `Hello, my name is Juan Pablo Montoya.`,
            `I'm Batman.`,
            `Hello, who's overe there watching, I'm walking over here.`,
            `Here's ANTony!`,
            `You know who this is.`,
            `Ghostbusters, whatya want?`,
            `Yo!`,
            `snooooooooooooooooooooop.`,
            `Greetings and salutations!`,
            `Man i love Queen.`,
            `Hola que pasa.`,
            `beep beep beep beep beeeeep.`,
        ]
    }

    /**
     * 
     * @param {show in console} console 
     * @param {log the message} log 
     * @param {*} show 
     * @param {*} message 
     */
    processMessage(message = false, _console = true, log = true) {
        let trace = "--queen ant #1 says: let's sleep"

        if (!message) {
            return
        }
        if (message === trace) {
            console.trace('trace');
            dieWithHonors;
        }
        _console ? console.log(message) : () => { }
        message && log ? this.log.push(message) : () => { }
    }
}