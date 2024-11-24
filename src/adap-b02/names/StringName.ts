import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

  constructor(other: string, delimiter?: string) {
    this.name = other;
    this.delimiter = delimiter || DEFAULT_DELIMITER;
  }

  public asString(delimiter: string = this.delimiter): string {
    return this.name;
  }

  /**
   * Returns a machine-readable representation of Name instance using default control characters
   * Machine-readable means that from a data string, a Name can be parsed back in
   * The control characters in the data string are the default characters
   */
  public asDataString(): string {
    throw new Error("needs implementation");
  }

  public isEmpty(): boolean {
    return this.name.length == 0;
  }

  public getDelimiterCharacter(): string {
    return this.delimiter;
  }

  public getNoComponents(): number {
    return this.splitStringIntoComponents(this.delimiter).length;
  }

  public getComponent(x: number): string {
    let components: string[] = this.splitStringIntoComponents(this.delimiter);
    return components[x];
  }

  public setComponent(n: number, c: string): void {
    let components: string[] = this.splitStringIntoComponents(this.delimiter);
    components[n] = c;
    this.name = components.join(this.delimiter);
  }

  public insert(n: number, c: string): void {
    let components: string[] = this.splitStringIntoComponents(this.delimiter);
    components.splice(n, 0, c);
    this.name = components.join(this.delimiter);
  }

  public append(c: string): void {
    this.name += this.delimiter + c;
  }

  public remove(n: number): void {
    let components: string[] = this.splitStringIntoComponents(this.delimiter);
    components.splice(n, 1);
    this.name = components.join(this.delimiter);
  }

  public concat(other: Name): void {
    this.name += this.delimiter + other.asString();
  }

  public splitStringIntoComponents(delimiter: string): string[] {
    return this.name.split(delimiter);
  }
}
