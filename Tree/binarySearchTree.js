import { Compare, defaultCompare } from '../util'
import { Node } from './node'

// 二叉搜索树 比节点小的放到左边，比节点大的放到右边
export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    // 用来比较节点值
    this.compareFn = compareFn
    // 二叉搜索树的根节点
    this.root = null
  }

  insert(key) {
    if (!this.root) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    // 比较节点值大小
    if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
      if (!node.left) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (!node.right) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历节点：从小到大的顺序
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  // 先序遍历：优先于后代节点的顺序
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key)
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
    }
  }

  // 后序遍历：先访问后代节点
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left)
      this.postOrderTraverseNode(node.right)
      callback(node.key)
    }
  }

  // 最小值
  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    while (current && current.left) {
      current = current.left
    }
    return current
  }

  // 最大值
  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    while (current && current.right) {
      current = current.right
    }
    return current
  }

  // 搜索值
  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (!node) return false
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (!node) return null
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (!node.left && !node.right) {
        node = null
        return node
      }
      if (!node.left) {
        node = node.right
        return node
      }
      if (!node.right) {
        node = node.left
        return node
      }
    }
  }

}
