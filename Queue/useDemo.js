import Deque from './deque'
import Queue from './queue'

// 回文检查
export function palindromeChecker(aString) {
  if (!aString || (aString && aString.length === 0)) {
    return false
  }
  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar
  for (let i = 0; i < lowerString.length; i++) {
    deque.enqueueBack(lowerString.charAt(i))
  }
  console.log(deque)
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.dequeueFront()
    lastChar = deque.dequeueBack()
    console.log(firstChar, lastChar)
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }
  return isEqual
}

// 击鼓传花游戏
export function hotPotato(elementsList, num) {
  const queue = new Queue()
  const eliminatedList = []
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      // 把位置为num的移出队列后再加入队列
      queue.enqueue(queue.dequeue())
    }
    // 把位置为num的移出队列并放到eliminatedList里
    eliminatedList.push(queue.dequeue())
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}
