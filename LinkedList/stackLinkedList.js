import DoublyLinkedList from './doublyLinkedList'

export default class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList()
  }

  push(element) {
    this.items.push(element)
  }

  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.removeAt(this.size() - 1)
  }

  isEmpty() {
    return this.items.isEmpty()
  }

  size() {
    return this.items.size()
  }

  clear() {
    this.items.clear()
  }

  toString() {
    return this.items.toString()
  }
}
