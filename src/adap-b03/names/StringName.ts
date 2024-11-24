import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

  constructor(other: string, delimiter?: string) {
    super(delimiter);
    this.name = other;
  }

  getNoComponents(): number {
    if (this.name == "") {
      return 0;
    }
    return this.name.split(this.delimiter).length;
  }

  getComponent(i: number): string {
    return this.name.split(this.delimiter)[i];
  }
  setComponent(i: number, c: string) {
    this.remove(i);
    this.insert(i, c);
  }

  insert(i: number, c: string) {
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
  }

  append(c: string) {
    this.name += this.delimiter + c;
  }

  remove(i: number) {
    const components = this.name.split(this.delimiter);
    if (i < 0 || i >= components.length) {
      throw new Error("Index out of bounds");
    }
    this.name = components
      .slice(0, i)
      .concat(components.slice(i + 1))
      .join(this.delimiter);
  }

  clone(): Name {
    return new StringName(this.name, this.delimiter);
  }
}
