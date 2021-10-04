export default class State {
    constructor() {
        this.observers = []
        this.name = ''
        this.showNotifications = false
    }

    /**
     * Add observer to state
     * @param {Observer to be added} Observer 
     */
    add(Observer) {
        this.observers.push(Observer)
    }
    
    /**
     * Remove Observer from state
     * @param {Observer to be removed} Observer 
     */
    remove(Observer) {
        this.observers = this.observers.filter(fx => fx != Observer)
    }

    /**
     * Notify all the observers
     * @param {show items notified (bool)} showItemsNotified 
     */
    notify(showItemsNotified = false) {
        this.observers.forEach(item => {
            showItemsNotified ? console.log('item notified:',item) : ''
            item.notification ? item.notification() : console.log(item.name + ' Notified, \nbut no notification function was found in the item')
        })
    }

    /**
    * Changes the app state from string paramters
    * @param {State to be applied} state 
    */
    changeState(state) {
        this.name = state
        console.log('New state "' + Ants.state.name + '":')
        this.notify(this.showNotifications)
    }
}