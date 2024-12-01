import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import {
  AssertionDispatcher,
  ExceptionType,
} from "../common/AssertionDispatcher";
import { ServiceFailureException } from "../common/ServiceFailureException";

enum FileState {
  OPEN,
  CLOSED,
  DELETED,
}

export class File extends Node {
  protected state: FileState = FileState.CLOSED;

  constructor(baseName: string, parent: Directory) {
    super(baseName, parent);
    this.assertClassInvariants();
  }

  public open(): void {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.state === FileState.CLOSED,
      "File already open"
    );
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.state !== FileState.DELETED,
      "File is deleted, cannot open"
    );
    // do something
    this.assertClassInvariants();
  }

  public read(noBytes: number): Int8Array {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.state !== FileState.OPEN,
      "File not open"
    );
    let result: Int8Array = new Int8Array(noBytes);
    // do something

    let tries: number = 0;
    for (let i: number = 0; i < noBytes; i++) {
      try {
        result[i] = this.readNextByte();
      } catch (ex) {
        tries++;
        if (ex instanceof MethodFailedException) {
          // Oh no! What @todo?!
        }
      }
    }

    return result;
  }

  protected readNextByte(): number {
    return 0; // @todo
  }

  public close(): void {
    this.assertClassInvariants();
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.state === FileState.OPEN,
      "File not open"
    );
    AssertionDispatcher.dispatch(
      ExceptionType.PRECONDITION,
      this.state !== FileState.DELETED,
      "File is deleted"
    );
    // do something
    this.assertClassInvariants();
  }

  public getChildNodes(): Set<Node> {
    return new Set<Node>();
  }

  protected doGetFileState(): FileState {
    return this.state;
  }
}
