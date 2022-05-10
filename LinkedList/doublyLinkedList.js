import LinkedList from './linkedList'
import { defaultEquals } from '../util'
import { DoublyNode } from './nodes/doublyLinkedNode'

// 双向链表
export default class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }

  push(element) {
    const node = new DoublyNode(element)
    if (this.head) {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      node.prev = current
      current.next = node
    } else {
      this.head = node
    }
    this.tail = node
    this.count++
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        if (this.head) {
          node.next = current
          current.prev = node
          this.head = node
        } else {
          this.head = node
          this.tail = node
        }
      } else if (index === this.count) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        const prevNode = this.getElementAt(index - 1)
        current = prevNode.next
        current.prev = node
        node.next = current
        prevNode.next = node
        node.prev = prevNode
      }
      this.count++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      // 移除第一项
      if (index === 0) {
        this.head = current.next
        // 如果只有一项，移除后head和tail都是undefined
        if (this.count === 1) {
          this.tail = undefined
        } else {
          // 重置head.prev
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) { // 移除最后一项
        current = this.tail
        // 把尾部指向倒数第二项
        this.tail = current.prev
        // 倒数第二项的next置为undefined
        this.tail.next = undefined
      } else {
        // 获取要移除的项
        current = this.getElementAt(index)
        // 通过下两行代码跳过当前项current
        // 把current上一项的next指向current下一项
        current.prev.next = current.next
        // 把current下一项的prev指向current上一项
        current.next.prev = current.prev
      }
      this.count--
      return current
    }
    return undefined
  }
}