import LinkedList from './linkedList'
import { defaultEquals } from '../util'
import { Node } from './nodes/linkedNode'

export default class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      const current = this.head
      if (index === 0) {
        if (!this.head) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          const tailNode = this.getElementAt(this.count)
          this.head = node
          tailNode.next = this.head
        }
      } else {
        const preNode = this.getElementAt(index - 1)
        // 先把添加的node的next指向preNode的下一个
        node.next = preNode.next
        preNode.next = node
      }
      this.count++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        if (this.count === 1) {
          this.head = undefined
        } else {
          const tailNode = this.getElementAt(this.count)
          this.head = current.next
          tailNode.next = this.head
        }
      } else {
        // 获取移除节点的上一个节点
        const preNode = this.getElementAt(index - 1)
        // 获取要移除的node
        current = preNode.next
        preNode.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
}