/*
 *  Author: VJP
 *  Date: 15-Oct-26
 *
 *  This file contains utility functions for working with the DOM.
 */

/**
 * Returns the composed parent of the given node.  Works for across slots, shadow and light DOM.
 */
export function composedParent(node: Node) {
    if (!node) return null;

    // Light DOM -> assigned slot
    if ((node as HTMLSlotElement).assignedSlot) {
        return (node as HTMLSlotElement).assignedSlot;
    }

    // Normal DOM parent
    if (node.parentNode) {
        return node.parentNode;
    }

    // ShadowRoot -> host element
    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
        return root.host;
    }

    return null;
}

/**
 * Returns the composed path of the given node.  The path is an array of nodes from the
 * given node to the root.
 * @param node
 */
export function composedPath(node: Node) : Array<Node> {
    const path = [];
    let _node: Node | null = node;
    while (_node) {
        path.push(_node);
        _node = composedParent(_node);
    }
    return path;
}