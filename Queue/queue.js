export default class Queue {
  constructor() {
    // 队列大小
    this.count = 0
    // 队列第一个元素位置
    this.lowestCount = 0
    // 队列
    this.items = {}
  }

  // 向队列添加元素
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  // 从队列移除元素
  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }
    // 获取队列首部
    const result = this.items[this.lowestCount]
    // 删除队列首部，出队列
    delete this.items[this.lowestCount]
    // 队列首部的标识增加1
    this.lowestCount++
    return result
  }

  // 查看队列头元素
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.count - this.lowestCount
  }

  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  toString() {
    if (this.isEmpty()) return ''
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount+1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}