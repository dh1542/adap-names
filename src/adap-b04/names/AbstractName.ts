import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    this.delimiter = delimiter;
  }

  public clone(): Name {
    throw new Error("needs implementation");
  }

  public asString(delimiter: string = this.delimiter): string {
    
    let output: string = "";

    let numberOfComponents = this.getNoComponents();
    

    for (let i = 0; i < numberOfComponents; i++) {
      output += this.getComponent(i);
      if (i < numberOfComponents - 1) {
        output += delimiter;
      }
    }
    return output;
  }

  public toString(): string {
    return this.asString() + ESCAPE_CHARACTER;
  }

  public asDataString(): string {
    return this.toString();
  }

  public isEqual(other: Name): boolean {
    return (
      this.getHashCode() == other.getHashCode() &&
      this.asString() == other.asString()
    );
  }

  public getHashCode(): number {
    const str = this.toString();
    const className = this.constructor.name;
    

    const delimiterCharCode = this.getDelimiterCharacter().charCodeAt(0);

    return (
      this.computeHash(str) ^ this.computeHash(className) ^ delimiterCharCode
    );
  }

  private computeHash(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  }

  public isEmpty(): boolean {
    throw new Error("needs implementation");
  }

  public getDelimiterCharacter(): string {
    throw new Error("needs implementation");
  }

  abstract getNoComponents(): number;

  abstract getComponent(i: number): string;
  abstract setComponent(i: number, c: string): void;

  abstract insert(i: number, c: string): void;
  abstract append(c: string): void;
  abstract remove(i: number): void;

  public concat(other: Name): void {
    throw new Error("needs implementation");
  }
}
