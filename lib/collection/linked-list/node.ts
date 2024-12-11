export class Node<Element> {
  private _previous: WeakRef<Node<Element>> | null = null;
  get previous(): Node<Element> | null {
    return this._previous?.deref() ?? null;
  }
  set previous(node: Node<Element> | null) {
    this._previous = node != null ? new WeakRef(node) : null;
  }

  element: Element;

  next: Node<Element> | null;

  constructor(
    previous: Node<Element> | null,
    element: Element,
    next: Node<Element> | null
  ) {
    this.previous = previous;
    this.element = element;
    this.next = next;
  }
}
