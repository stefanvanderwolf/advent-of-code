import assert from "node:assert";
import { describe, it } from "node:test";
import { LinkedList } from "../linked_list.js";

describe(LinkedList.name, () => {
  describe("initialize", () => {
    it('should initialize with null head and tail', () => {
      const list = new LinkedList();
      assert.strictEqual(list.head, null);
      assert.strictEqual(list.tail, null);
    });
  });

  describe("isEmpty", () => {
    it('should correctly identify an empty list', () => {
      const list = new LinkedList();
      assert.strictEqual(list.isEmpty, true);

      list.push(1);
      assert.strictEqual(list.isEmpty, false);
    });
  });

  describe("push", () => {
    it('should push elements to the beginning of the list', () => {
      const list = new LinkedList();
      list.push(1);
      list.push(2);

      assert.strictEqual(list?.head?.element, 2);
      assert.strictEqual(list?.tail?.element, 1);
      assert.strictEqual(list?.head?.next, list.tail);
      assert.strictEqual(list?.tail?.previous, list.head);
    });
  });

  describe("insert", () => {
    it('should insert element as the new tail', () => {
      const list = new LinkedList();
      const node = list.append(1)
      list.insert(2, node)

      assert.strictEqual(list?.head?.element, 1);
      assert.strictEqual(list?.head?.next?.element, 2);
      assert.strictEqual(list?.tail?.element, 2);
    });

    it('should insert element after the node', () => {
      const list = new LinkedList();
      const node = list.append(1)
      list.append(3)
      list.insert(2, node)

      assert.strictEqual(list?.head?.element, 1);
      assert.strictEqual(list?.head?.next?.element, 2);
      assert.strictEqual(list?.head?.next?.next?.element, 3);
    });
  });

  describe("append", () => {
    it('should append elements to the end of the list', () => {
      const list = new LinkedList();
      list.append(1);
      list.append(2);

      assert.strictEqual(list?.head?.element, 1);
      assert.strictEqual(list?.tail?.element, 2);
      assert.strictEqual(list?.head.next, list.tail);
      assert.strictEqual(list?.tail.previous, list.head);
    });
  });

  describe("pop", () => {
    it('should pop elements from the end of the list', () => {
      const list = new LinkedList();
      list.push(1);
      list.push(2);
      const popped = list.pop();

      assert.strictEqual(popped?.element, 1);
      assert.strictEqual(list?.tail?.element, 2);
      assert.strictEqual(list?.tail?.next, null);
    });
  });

  describe("iterator", () => {
    it('should allow iteration through the list', () => {
      const list = new LinkedList();
      list.push(1);
      list.push(2);
      list.push(3);

      const elements = [];
      for (const node of list) {
        elements.push(node.element);
      }

      assert.deepStrictEqual(elements, [3, 2, 1]);
    });
  });
});
