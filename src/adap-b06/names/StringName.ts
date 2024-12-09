import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {
  protected name: string = "";
  protected noComponents: number = 0;

  constructor(other: string, delimiter?: string) {
    AbstractName.checkComponentPre(other.length);
    super(delimiter);
    this.name = other;
    this.noComponents = other.split(this.delimiter).length;

    AbstractName.instanceofName(this);

  }

  public getNoComponents(): number {
    return this.noComponents;
  }

  public getComponent(i: number): string {
    this.isInBounds(i);
    AbstractName.instanceofName(this);

    const component = this.name.split(this.delimiter)[i];
    
    AbstractName.instanceofName(this);
    return component;
  }

  public setComponent(i: number, c: string) {
    this.isInBounds(i);
    AbstractName.instanceofName(this);
    AbstractName.checkComponentPre(this.noComponents);

    const clone = this.clone();

    
    clone.remove(i);
    clone.insert(i, c);

    AbstractName.instanceofName(clone);
    AbstractName.checkComponentPost(clone.getNoComponents());
    return clone;

    
  }

  public insert(i: number, c: string) {
    this.isInBounds(i);
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
    AbstractName.instanceofName(this);
    return this;
  }

  public append(c: string) {
    this.name += this.delimiter + c;
    this.noComponents++;
  }

  public remove(i: number) {
    this.isInBounds(i);
    const components = this.name.split(this.delimiter);
    this.name = components
      .slice(0, i)
      .concat(components.slice(i + 1))
      .join(this.delimiter);
  }
}
