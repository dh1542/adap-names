import {
  ExceptionType,
  AssertionDispatcher,
} from "../common/AssertionDispatcher";
import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { RootNode } from "./RootNode";

export class Node {
  protected baseName: string = "";
  protected parentNode: Directory;

  constructor(bn: string, pn: Directory) {
    try{
      this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);
      this.doSetBaseName(bn);
      this.parentNode = pn; // why oh why do I have to set this
      this.initialize(pn);
      this.assertClassInvariants();
    } catch(e: any){
      throw new ServiceFailureException("Error creating node", e)
    }
    
  }

  protected initialize(pn: Directory): void {
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      pn != null,
      "Invalid parent node"
    );
    this.parentNode = pn;
    this.parentNode.add(this);
    this.assertClassInvariants();
  }

  public move(to: Directory): void {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      to != null,
      "Invalid destination"
    );
    
    this.parentNode.remove(this);
    to.add(this);
    this.parentNode = to;
    this.assertClassInvariants();
  }

  public getFullName(): Name {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.parentNode != null,
      "Invalid parent node"
    );

    const result: Name = this.parentNode.getFullName();
    result.append(this.getBaseName());
    return result;
  }

  public getBaseName(): string {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.baseName != null,
      "Base name must not be null"
    );
    return this.doGetBaseName();
  }

  protected doGetBaseName(): string {
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.baseName != null,
      "Base name must not be null"
    );
    return this.baseName;
  }

  public rename(bn: string): void {
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      bn != "",
      "invalid base name"
    );
    this.assertClassInvariants();
    this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);
    this.doSetBaseName(bn);
    this.assertClassInvariants();
  }

  protected doSetBaseName(bn: string): void {
    this.baseName = bn;
  }

  public getParentNode(): Directory {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.parentNode != null,
      "Invalid parent node"
    );
    return this.parentNode;
  }

  /**
   * Returns all nodes in the tree that match bn
   * @param bn basename of node being searched for
   */
  public findNodes(bn: string): Set<Node> {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      bn != null && bn != undefined,
      "invalid base name"
    );
    let result: Set<Node> = new Set<Node>();
    try{
      if (this.getBaseName() == bn) {
        result.add(this);
      }
      this.getChildNodes().forEach((node) => {
        node.findNodes(bn).forEach((n) => {
          result.add(n);
        });
      });
    } catch(e: any){
      throw new ServiceFailureException("Error finding node", e)
    }
    

    return result;
  }

  protected assertClassInvariants(): void {
    const bn: string = this.doGetBaseName();
    this.assertIsValidBaseName(bn, ExceptionType.CLASS_INVARIANT);
  }

  protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
    const condition: boolean = bn != "";
    AssertionDispatcher.dispatch(et, condition, "invalid base name");
  }

  public getChildNodes(): Set<Node> {
    return new Set<Node>();
  }
}
