import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {
  protected delimiter: string = DEFAULT_DELIMITER;

  constructor(delimiter: string = DEFAULT_DELIMITER) {
    AbstractName.checkDelimiterPre(delimiter);
    this.delimiter = delimiter;
    AbstractName.instanceofName(this);
  }

  public clone(): Name {
   AbstractName.instanceofName(this)

   const clone = Object.create(this);

   MethodFailedException.assert(clone != null)
   AbstractName.instanceofName(clone)
   return clone
  }

  public asString(delimiter: string = this.delimiter): string {
    AbstractName.checkDelimiterPre(delimiter)
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
    AbstractName.instanceofName(this)
    let result = "";
    for (let i = 0; i < this.getNoComponents(); i++) {
      result += this.getComponent(i);
      if (i < this.getNoComponents() - 1) result += DEFAULT_DELIMITER;
    }
    AbstractName.instanceofName(this)
    return result;
  }

  public isEqual(other: Name): boolean {
    AbstractName.instanceofName(this)
    
    return (
      this.getHashCode() == other.getHashCode() &&
      this.asString() == other.asString()
    );
  }

  public getHashCode(): number {
    AbstractName.instanceofName(this)
    const str = this.toString();
    const className = this.constructor.name;

    const delimiterCharCode = this.getDelimiterCharacter().charCodeAt(0);
    AbstractName.instanceofName(this)
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
    AbstractName.checkDelimiterPre(this.delimiter);
    return this.delimiter;
  }

  abstract getNoComponents(): number;

  abstract getComponent(i: number): string;
  abstract setComponent(i: number, c: string): void;

  abstract insert(i: number, c: string): void;
  abstract append(c: string): void;
  abstract remove(i: number): void;

  public concat(other: Name): void {
    AbstractName.instanceofName(this)
    AbstractName.checkComponentPre(this.getNoComponents());
    
    AbstractName.checkDelimiterPre(this.delimiter);
    for (let i = 0; i < other.getNoComponents(); i++) {
      this.append(other.getComponent(i));
    }

    AbstractName.checkComponentPost(this.getNoComponents());
  }

  protected isInBounds(index: number){
    if(index < 0 || index >= this.getNoComponents()){
      throw new IllegalArgumentException("Index out of bounds");
    }
  }

  protected static checkComponentPre(noComponents: number){
    if(noComponents < 0){
      throw new IllegalArgumentException("Number of components must be greater than 1!");
    }
  }

  protected static checkComponentPost(noComponents: number){
    if(noComponents < 0){
      throw new MethodFailedException("Number of components must be greater than 1!");
    }
  }

  protected static checkDelimiterPre(delimiter: string){
    if(delimiter.length !== 1){
      throw new IllegalArgumentException("Delimiter must be a single character");
    }
  }

  protected static checkDelimiterPost(delimiter: string){
    if(delimiter.length !== 1){
      throw new MethodFailedException("Delimiter must be a single character");
    }
  }

  protected static instanceofName(object: any){
    if(!(object instanceof AbstractName)){
      throw new InvalidStateException("Object is not an instance of Name");
    }
  }

  


}
