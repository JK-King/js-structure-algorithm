import { defaultEquals } from '../util'
import { Node } from './nodes/linkedNode.js'

// 单向链表
export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  push(element) {
    const node = new Node(element)
    let current
    if (this.head) {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    } else {
      this.head = node
    }
    this.count++
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
      } else {
        // let preNode
        // for (let i = 0; i < index; i++) {
        //   preNode = current
        //   current = current.next
        // }
        const preNode = this.getElementAt(index - 1)
        current = preNode.next
        // 将上一个node的next跟当前的next关联，相当于关联了下一个的node，跳过当前值
        preNode.next = current.next
      }
      this.count--
      return current
    }
    return undefined
  }

  // 获取指定位置的node
  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head
      for (let i = 0; i < index && node; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // 插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const iNode = new Node(element)
      if (index === 0) {
        const current = this.head
        this.head = iNode
        iNode.next = current
      } else {
        // 获取index上一个node
        const preNode = this.getElementAt(index - 1)
        // 获取当前index的node
        const current = preNode.next
        // 上一个node的next指向新的node
        preNode.next = iNode
        // 新node的next指向当前index的node，旧的node后移一位
        iNode.next = current
      }
      this.count++
      return true
    }
    return false
  }

  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index) ? true : false
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head
  }

  toString() {
    if (this.head) {
      let objString = `${this.head.element}`
      let current = this.head.next
      for (let i = 1; i < this.count; i++) {
        objString = `${objString}, ${current.element}`
        current = current.next
      }
      return objString
    }
    return ''
  }
}