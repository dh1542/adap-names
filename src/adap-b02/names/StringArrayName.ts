import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {
  protected components: string[] = [];
  protected delimiter: string = DEFAULT_DELIMITER;

  /** @methodtype Object Creation-method*/
  constructor(other: string[], delimiter?: string) {
    other.forEach((a) => this.components.push(a));
    if (delimiter != undefined) {
      this.delimiter = delimiter;
    }
  }

  /** Returns human-readable representation of Name instance
   * @methodtype conversion-method */
  public asString(delimiter: string = this.delimiter): string {
    let result: string = "";
    this.components.forEach((element, index) => {
      result += element;
      if (index < this.components.length - 1) {
        result += delimiter;
      }
    });
    return result;
  }

  public asDataString(): string {
    return this.asString(ESCAPE_CHARACTER + this.delimiter);
  }

  public isEmpty(): boolean {
    return this.components.length == 0;
  }

  /** @methodtype get-method */
  public getComponent(i: number): string {
    this.checkForArrayOutOfBounds(i);
    return this.components[i];
  }

  /** @methodtype set-method */
  public setComponent(i: number, c: string): void {
    this.checkForArrayOutOfBounds(i);
    this.components[i] = c;
  }
  /** Returns number of components in Name instance
   * @methodType get-method */
  public getNoComponents(): number {
    return this.components.length;
  }

  /** @methodtype command-method */
  public insert(i: number, c: string): void {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 0, c);
  }

  /** @methodtype command-method */
  public append(c: string): void {
    this.components.push(c);
  }

  /** @methodtype command-method */
  public remove(i: number): void {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 1);
  }

  getDelimiterCharacter(): string {
    return this.delimiter;
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
