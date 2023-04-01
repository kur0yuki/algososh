interface IQueue<T> {
    enqueue(el: T): void;
    dequeue(): T;
}
const QUEUE_CAPACITY = 7

export default class Queue<T> implements IQueue<T> {
    container: Array<T|null>
    headIdx: number
    tailIdx: number
    constructor() {
        this.container = Array<T|null>(QUEUE_CAPACITY).fill(null)
        this.headIdx = 0
        this.tailIdx = -1
    }
    incTailIdx(){
        if (++this.tailIdx >= QUEUE_CAPACITY)
            this.tailIdx = this.tailIdx % QUEUE_CAPACITY
        console.log(this.tailIdx)
        if (this.container[this.tailIdx]!==null) throw Error
        return this.tailIdx
    }

    dequeue(): T {
        const el = this.container[this.headIdx]!!
        this.container[this.headIdx++] = null
        return el
    }

    enqueue(el: T): void {
        this.container[this.incTailIdx()]=el
    }

    getElements() {
        return this.container;
    }

    clear() {
        this.container = Array<T|null>(QUEUE_CAPACITY).fill(null)
    }
}