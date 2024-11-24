import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";

export class Link extends Node {
  protected targetNode: Node | null = null;

  constructor(bn: string, pn: Directory, tn?: Node) {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    IllegalArgumentException.assertIsNotNullOrUndefined(
      pn,
      "Parent node can't be null or undefined"
    );
    super(bn, pn);

    if (tn != undefined) {
      this.targetNode = tn;
    }

    MethodFailureException.assertCondition(
      this.getBaseName() == bn,
      "Failed to set base name"
    );
    MethodFailureException.assertCondition(
      this.getParentNode() == pn,
      "Failed to set parent node"
    );
  }

  public getTargetNode(): Node | null {
    return this.targetNode;
  }

  public setTargetNode(target: Node): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      target,
      "Target node can't be null or undefined"
    );
    this.targetNode = target;
    MethodFailureException.assertCondition(
      this.targetNode == target,
      "Failed to set target node"
    );
  }

  public getBaseName(): string {
    const target = this.ensureTargetNode(this.targetNode);
    return target.getBaseName();
  }

  public rename(bn: string): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    const target = this.ensureTargetNode(this.targetNode);
    target.rename(bn);
    MethodFailureException;
  }

  protected ensureTargetNode(target: Node | null): Node {
    IllegalArgumentException.assertCondition(
      target != undefined,
      "Target node is undefined"
    );
    const result: Node = this.targetNode as Node;
    return result;
  }
}
