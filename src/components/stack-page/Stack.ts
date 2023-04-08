interface IStack<T> {
    pop():void
    push(el:T):void
    clear():void
}

export default class Stack<T> implements IStack<T> {
    container: T[]
    constructor() {
      this.container = []
    }
    clear(): void {
        this.container = []
    }

    pop(): void {
        this.container.pop();
    }

    push(el: T): void {
        this.container.push(el)
    }

    getElements() {
        return this.container
    }

}