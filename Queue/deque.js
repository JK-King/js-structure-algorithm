import Queue from './queue'

export default class Deque extends Queue {
  constructor() {
    super()
  }

  enqueueFront(element) {
    if (this.isEmpty()) {
      this.enqueueBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  enqueueBack(element) {
    this.enqueue(element)
  }

  dequeueFront() {
    return this.dequeue()
  }

  dequeueBack() {
    if (this.isEmpty()) return undefined
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peekFront() {
    return this.peek()
  }

  peekBack() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
}
