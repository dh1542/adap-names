export class Name {
  public readonly DEFAULT_DELIMITER: string = ".";
  private readonly ESCAPE_CHARACTER = "\\";

  private components: string[] = [];
  private delimiter: string = this.DEFAULT_DELIMITER;

  constructor(other: string[], delimiter?: string) {
    other.forEach((a) => this.components.push(a));
    if (delimiter != undefined) {
      this.delimiter = delimiter;
    }
  }
    /** Returns human-readable representation of Name instance */
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

  public getComponent(i: number): string {
    this.checkForArrayOutOfBounds(i);
    return this.components[i];
  }

  public setComponent(i: number, c: string): void {
    this.checkForArrayOutOfBounds(i);
    this.components[i] = c;
  }
    /** Returns number of components in Name instance */
  public getNoComponents(): number {
    console.log(this.components.length);
    return this.components.length;
  }

  public insert(i: number, c: string): void {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 0, c);
  }

  public append(c: string): void {
    this.components.push(c);
  }

  public remove(i: number): void {
    this.checkForArrayOutOfBounds(i);
    this.components.splice(i, 1);
  }

  /**
   * Checks if the passed index is inside the array (components) boundaries and
   * throws exception if necessary
   */
  private checkForArrayOutOfBounds(index: number): void {
    if (index < 0 || index > this.components.length - 1) {
      throw new Error("Array index out of bounds!");
    }
  }
}
