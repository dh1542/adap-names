export class Name {
  public readonly DEFAULT_DELIMITER: string = ".";
  private readonly ESCAPE_CHARACTER = "\\";

  private components: string[] = [];
  private delimiter: string = this.DEFAULT_DELIMITER;

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
