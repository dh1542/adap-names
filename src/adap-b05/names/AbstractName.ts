import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    IllegalArgumentException.assertCondition(
      delimiter.length === 1,
      "delimiter must be a single character"
    );
    this.delimiter = delimiter;
  }

  public clone(): Name {
    throw new Error("needs implementation");
  }

  public asString(delimiter: string = this.delimiter): string {
    IllegalArgumentException.assertCondition(
      delimiter.length == 1,
      "Delimiter must be a single character"
    );
    let output: string = "";

    let numberOfComponents = this.getNoComponents();

    for (let i = 0; i < this.getNoComponents(); i++) {
      output += this.getComponent(i)
        .replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, ESCAPE_CHARACTER)
        .replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
      if (i < this.getNoComponents() - 1) output += delimiter;
    }
    return output;
  }

  public toString(): string {
    return this.asDataString();
  }

  public asDataString(): string {
    let result = "";
    for (let i = 0; i < this.getNoComponents(); i++) {
      result += this.getComponent(i);
      if (i < this.getNoComponents() - 1) result += DEFAULT_DELIMITER;
    }
    return result;
  }

  public isEqual(other: Name): boolean {
    IllegalArgumentException.assertIsNotNullOrUndefined(
      other,
      "argument is null"
    );
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
    return this.getNoComponents() == 0;
  }

  public getDelimiterCharacter(): string {
    IllegalArgumentException.assertCondition(
      this.delimiter.length == 1,
      "Delimiter must be a single character"
    );
    return this.delimiter;
  }

  abstract getNoComponents(): number;

  abstract getComponent(i: number): string;
  abstract setComponent(i: number, c: string): void;

  abstract insert(i: number, c: string): void;
  abstract append(c: string): void;
  abstract remove(i: number): void;

  public concat(other: Name): void {
    IllegalArgumentException.assertCondition(other != null, "argument is null");
    IllegalArgumentException.assertCondition(
      other.getNoComponents() > 0,
      "argument has no components"
    );
    IllegalArgumentException.assertCondition(
      this.getNoComponents() > 0,
      "this has no components"
    );
    IllegalArgumentException.assertCondition(
      this.getDelimiterCharacter() == other.getDelimiterCharacter(),
      "delimiters do not match"
    );
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }
  }
}