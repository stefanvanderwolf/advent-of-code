import assert from "node:assert";
import { describe, it } from "node:test";
import { Node } from "../node.js";

describe(Node.name, () => {
  it('should set the previous, element, and next properties correctly', () => {
    const node1 = new Node(null, 1, null);
    const node2 = new Node(node1, 2, null);

    assert.strictEqual(node2.previous, node1);
    assert.strictEqual(node2.element, 2);
    assert.strictEqual(node2.next, null);
  });
});
