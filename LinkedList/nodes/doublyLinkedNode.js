import { Node } from './linkedNode'
export class DoublyNode extends Node {
  constructor(element) {
    super(element)
    this.prev = undefined
  }
}