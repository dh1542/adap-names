import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];

  constructor(other: string[], delimiter?: string) {
    IllegalArgumentException.assertCondition(
      other != null,
      "other must not be null"
    );
    IllegalArgumentException.assertCondition(
      other.length > 0,
      "other must not be empty"
    );
    super(delimiter);
    this.components = other;
  }

  public getNoComponents(): number {
    MethodFailedException.assertCondition(
      this.components.length > 0,
      "No components"
    );
    return this.components.length;
  }

  public getComponent(i: number): string {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.components.length,
      "Index must be less than the number of components"
    );
    return this.components[i];
  }

  public setComponent(i: number, c: string) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.components.length,
      "Index must be less than the number of components"
    );

    this.components[i] = c;
    MethodFailedException.assertCondition(
      this.components[i] == c,
      "Failed to set component"
    );
  }

  public insert(i: number, c: string) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.components.length,
      "Index must be less than the number of components"
    );
    IllegalArgumentException.assertCondition(c.length > 0, "c is empty");
    this.components.splice(i, 0, c);
    MethodFailedException.assertCondition(
      this.components[i] == c,
      "Failed to insert component"
    );
  }

  public append(c: string) {
    IllegalArgumentException.assertIsNotNullOrUndefined(c, "c is null");
    IllegalArgumentException.assertCondition(c.length > 0, "c is empty");
    this.components.push(c);
    MethodFailedException.assertCondition(
      this.components[this.getNoComponents() - 1] == c,
      "Failed to append component"
    );
  }

  public remove(i: number) {
    IllegalArgumentException.assertCondition(
      i >= 0,
      "Index must be greater than or equal to 0"
    );
    IllegalArgumentException.assertCondition(
      i < this.components.length,
      "Index must be less than the number of components"
    );
    this.components.splice(i, 1);
  }
}