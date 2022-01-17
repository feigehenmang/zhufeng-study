// 发布订阅
class Event {
    constructor() {
        this.events = []
    }
    on(callback) {
        this.events.push(callback)
        return () => {
            const index = this.events.findIndex(cb => cb === callback)
            this.events.splice(index, 1)
        }
    }
    emit() {
        this.events.forEach(cb => cb())
    }
}

const ev = new Event()
ev.on(() => {
    console.log('1')
})

const remove = ev.on(() => {
    console.log('2')
})

ev.emit()
remove()
ev.emit()