function readonly(target, key, descriptor) {
    descriptor.writable = false
}

export class Person {
    @readonly Pi = 3.14
}