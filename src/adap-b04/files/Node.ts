import { MethodFailedException } from "../../adap-b05/common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {
  protected baseName: string = "";
  protected parentNode: Directory;

  constructor(bn: string, pn: Directory) {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    IllegalArgumentException.assertIsNotNullOrUndefined(
      pn,
      "Parent node can't be null or undefined"
    );
    this.doSetBaseName(bn);
    this.parentNode = pn;
    MethodFailedException.assertCondition(
      this.getBaseName() === bn,
      "Failed to set base name"
    );
    MethodFailedException.assertCondition(
      this.getParentNode() === pn,
      "Failed to set parent node"
    );
  }

  public move(to: Directory): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      to,
      "Target directory can't be null or undefined"
    );
    this.parentNode.remove(this);
    to.add(this);
  }

  public getFullName(): Name {
    const result: Name = this.parentNode.getFullName();
    result.append(this.getBaseName());
    return result;
  }

  public getBaseName(): string {
    return this.doGetBaseName();
  }

  protected doGetBaseName(): string {
    return this.baseName;
  }

  public rename(bn: string): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    this.doSetBaseName(bn);
    MethodFailedException.assertCondition(
      this.getBaseName() === bn,
      "Failed to set base name"
    );
  }

  protected doSetBaseName(bn: string): void {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      bn,
      "Base name can't be null or undefined"
    );
    this.baseName = bn;
    MethodFailedException.assertCondition(
      this.baseName === bn,
      "Failed to set base name"
    );
  }

  public getParentNode(): Node {
    return this.parentNode;
  }
}
