import { MethodFailedException } from "../../adap-b05/common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {
  protected childNodes: Set<Node> = new Set();

  constructor(bn: string, pn: Directory) {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    IllegalArgumentException.assertIsNotNullOrUndefined(
      pn,
      "Parent node can't be null or undefined"
    );
    super(bn, pn);
  }

  public add(cn: Node): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      cn,
      "Child node can't be null or undefined"
    );
    this.childNodes.add(cn);
    MethodFailedException.assertCondition(
      this.childNodes.has(cn),
      "Failed to add child nodes"
    );
  }

  public remove(cn: Node): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      cn,
      "Child node can't be null or undefined"
    );
    this.childNodes.delete(cn); // Yikes! Should have been called remove
    MethodFailedException.assertCondition(
      !this.childNodes.has(cn),
      "Failed to remove child nodes"
    );
  }
}
