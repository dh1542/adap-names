import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];

  constructor(other: string[] = [], delimiter?: string) {
    super(delimiter);
    this.components = other;
  }

  getNoComponents(): number {
    return this.components.length;
  }

  getComponent(i: number): string {
    this.checkForArrayOutOfBounds(i);
    return this.components[i];
  }
  setComponent(i: number, c: string) {
    this.checkForArrayOutOfBounds(i);
    this.components[i] = c;
  }

  insert(i: number, c: string) {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 0, c);
  }
  append(c: string) {
    if (this.components != null) {
      this.components.push(c);
    }
  }
  remove(i: number) {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 1);
  }
  clone(): Name {
    return new StringArrayName(this.components, this.delimiter);
  }

  /**
   * Checks if the passed index is inside the array (components) boundaries and
   * throws exception if necessary
   * @methodtype assertion-method
   */
  private checkForArrayOutOfBounds(index: number): void {
    if (index < 0 || index > this.components.length - 1) {
      throw new Error("Array index out of bounds!");
    }
  }
}
