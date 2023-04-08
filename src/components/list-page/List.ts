export interface IList<T> {
    head: INode<T>
    tail: INode<T>
    addFirst(el:T): void
    addLast(el:T): void
    addAtIndex(el:T, idx: number): void
    removeFirst(): void
    removeLast(): void
    removeAtIndex(idx: number): void

    toArray():T[]
}
interface INode<T> {
    value: T
    next: INode<T>|null
    setNext(next: INode<T>):void
}
class Node<T> implements INode<T>{
    value;
    next: INode<T> | null = null;
    constructor(el: T, next?: INode<T>) {
        this.value = el
        this.next = next?next:null
    }
    setNext(node: INode<T>){
        this.next = node
    }
}

export default class List<T> implements IList<T> {
    head: INode<T>;
    tail: INode<T>;
    constructor(value:T) {
        const node = new Node(value)
        this.head = this.tail = node
    }

    addAtIndex(el: T, idx: number): void {
        let prev = this.head
        for (let i=1; i<idx; i++) {
            prev = prev.next!!
        }
        prev.next = new Node(el, prev.next!!)
    }

    addFirst(el: T): void {
        this.head = new Node(el, this.head)
    }

    addLast(el: T): void {
        const node = new Node(el)
        this.tail.setNext(node)
        this.tail = node
    }

    removeAtIndex(idx: number): void {
        if (idx === 0) this.head = this.head.next!!
        let prev = this.head
        for (let i=1; i<idx; i++) {
            prev = prev.next!!
        }
        prev.next = prev.next?.next!!
    }

    removeFirst(): void {
        this.head = this.head.next!!
    }

    removeLast(): void {
        let node = this.head
        while (node.next?.next) node = node.next
        this.tail = node
        node.next = null
    }

    toArray(): T[] {
        const array:T[] = []
        let node: INode<T>|null = this.head
        while (node) {
            array.push(node.value)
            node = node.next
        }
        return array;
    }

    getElements() {
        const array = []
        let node: INode<T>|null =  this.head
        while (node) {
            if ((node.value as Object).toString() !== "") array.push(node.value)
            node = node.next
        }
        return array
    }
}
