import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {
  protected name: string = "";
  protected noComponents: number = 0;

  constructor(other: string, delimiter?: string) {
    IllegalArgumentException.assertIsNotNullOrUndefined(other, "other is null");
    super(delimiter);
    this.name = other;
  }

  public getNoComponents(): number {
    MethodFailedException.assertCondition(
      this.getNoComponents() > 0,
      "No components"
    );
    return this.noComponents;
  }

  public getComponent(i: number): string {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.noComponents,
      "Index must be less than the number of components"
    );
    return this.name.split(this.delimiter)[i];
  }

  public setComponent(i: number, c: string) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.noComponents,
      "Index must be less than the number of components"
    );
    this.remove(i);
    this.insert(i, c);
    InvalidStateException.assertCondition(
      this.getComponent(i) == c,
      "Failed to set component"
    );
  }

  public insert(i: number, c: string) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.noComponents,
      "Index must be less than the number of components"
    );
    let delimiterCount = 0;
    let insertPosition = 0;

    for (let j = 0; j < this.name.length; j++) {
      if (this.name[j] === this.delimiter) {
        delimiterCount++;
      }
      if (delimiterCount === i) {
        insertPosition = j + 1;
        break;
      }
    }

    if (delimiterCount < i) {
      throw new Error("Index out of bounds");
    }

    this.name =
      this.name.slice(0, insertPosition) +
      c +
      this.delimiter +
      this.name.slice(insertPosition);
    InvalidStateException.assertCondition(
      this.getComponent(i) == c,
      "Failed to set component"
    );
  }

  public append(c: string) {
    IllegalArgumentException.assertCondition(c.length > 0, "c is empty");
    this.name += this.delimiter + c;
    this.noComponents++;
    InvalidStateException.assertCondition(
      this.getComponent(this.noComponents - 1) == c,
      "Failed to append component"
    );
  }

  public remove(i: number) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.noComponents,
      "Index must be less than the number of components"
    );
    const components = this.name.split(this.delimiter);
    this.name = components
      .slice(0, i)
      .concat(components.slice(i + 1))
      .join(this.delimiter);
  }
}
