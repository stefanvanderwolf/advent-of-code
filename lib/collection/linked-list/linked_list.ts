import { Node } from "./node.js";

export class LinkedList<Element> {
  head: Node<Element> | null;
  // @todo should this be a WeakRef?
  tail: Node<Element> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
    * Create a iterator from the list.
    *
    * Allows the `LinkedList` to be used in for loops etc.
    */
  *[Symbol.iterator](): Iterator<Node<Element>> {
    let current = this.head;
    while (current != null) {
      yield current;

      current = current.next;
    }
  }

  /**
    * Returns if the list is empty
    */
  get isEmpty(): boolean {
    return this.head == null
  }

  /**
    * Append the `element` to the end of the list.
    *
    * @time: O(1)
    * @memory: O(1)
    */
  append(element: Element) {
    // Note: not using `isEmpty` so Typescript can statically see that tail is
    // defined.
    if (!this.tail) {
      this.push(element)
    } else {
      // Make a new tail and set the previous to the current tail.
      const node = new Node(this.tail, element, null)

      this.tail.next = node;
      this.tail = node;
    }
  }

  /**
    * Push the `element` to the head of the list.
    *
    * @time: O(1)
    * @memory: O(1)
    */
  push(element: Element) {
    const node = new Node(null, element, null)

    if (this.head) {
      this.head.previous = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node
      this.tail = node
    }
  }

  /**
    * Pop the tail of the list and return it.
    *
    * @time: O(1)
    * @memory: O(1)
    */
  pop(): Node<Element> | null {
    const node = this.tail;

    // The new tail will be the currents tail previous. We basically move the
    // pointer back.
    this.tail = this.tail?.previous ?? null;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    return node;
  }
}
