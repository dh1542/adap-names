export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 *
 * Homogenous name examples
 *
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

  /** @methodtype Object Creation-method*/
  constructor(other: string[], delimiter?: string) {
    other.forEach((a) => this.components.push(a));
    if (delimiter != undefined) {
      this.delimiter = delimiter;
    }
  }


    /** Returns human-readable representation of Name instance
     * @methodtype conversion-method */
  public asNameString(delimiter: string = this.delimiter): string {
    let result: string = "";
    this.components.forEach((element, index) => {
      result += element;
      if (index < this.components.length - 1) {
        result += delimiter;
      }
    });
    return result;
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
