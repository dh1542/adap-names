import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
  OPEN,
  CLOSED,
  DELETED,
}

export class File extends Node {
  protected state: FileState = FileState.CLOSED;

  constructor(baseName: string, parent: Directory) {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      baseName,
      "Base name can't be null or undefined"
    );
    IllegalArgumentException.assertIsNotNullOrUndefined(
      parent,
      "Parent directory can't be null or undefined"
    );
    super(baseName, parent);
  }

  public open(): void {
    IllegalArgumentException.assertCondition(
      this.state === FileState.CLOSED,
      "File is already open"
    );
    // do something
  }

  public close(): void {
    IllegalArgumentException.assertCondition(
      this.state === FileState.OPEN,
      "File is already closed"
    );
    // do something
  }

  protected doGetFileState(): FileState {
    return this.state;
  }
}
