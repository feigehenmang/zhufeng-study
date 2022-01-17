// 被观察这
class Subject {
    constructor(name) {
        this.name = name
        this.observers = []
    }
    attach(o) {
        this.observers.push(o)
    }

    send(message) {
        this.observers.forEach(o => o.update(message))
    }
}
class Observer {
    constructor(name) {
        this.name = name
    }
    update(text) {
        console.log(text)
    }
}

const baby = new Subject('baby')
const f = new Observer('F')
const m = new Observer('M')
baby.attach(f)
baby.attach(m)
baby.send('test')