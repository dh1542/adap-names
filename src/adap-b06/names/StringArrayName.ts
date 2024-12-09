import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {
  protected components: string[] = [];

  constructor(other: string[], delimiter?: string) {
    
    super(delimiter);
    this.components = other;
  }

  public getNoComponents(): number {
    AbstractName.instanceofName(this);
    const lenght = this.components.length;
    AbstractName.checkComponentPost(lenght)
    AbstractName.instanceofName(this);
    return lenght;
  }

  public getComponent(i: number): string {
    AbstractName.instanceofName(this);
    this.isInBounds(i)
    AbstractName.checkComponentPre(this.components.length);

    const component = this.components[i];

    MethodFailedException.assert(component != null)
    return component;
  }



  public setComponent(i: number, c: string) {
    this.isInBounds(i)
    AbstractName.instanceofName(this)
    AbstractName.checkDelimiterPre(this.delimiter)
    AbstractName.checkComponentPre(this.components.length)

    const clone = this.clone()

    if( clone instanceof StringArrayName){
      clone.components[i] = c
    } else{
      MethodFailedException.assert(false, "Failed to set component")
    }
    AbstractName.instanceofName(clone)
    return clone
  }

  public insert(i: number, c: string) {
    this.isInBounds(i)
    AbstractName.checkComponentPre(this.components.length)  
    const clone = this.clone()
    if( clone instanceof StringArrayName){
      clone.components.splice(i, 0, c);
    } else{
      MethodFailedException.assert(false, "Failed to insert component")
    }
    AbstractName.checkComponentPost(this.components.length)
    AbstractName.instanceofName(this)

    return clone;
  }

  public append(c: string) {
    AbstractName.instanceofName(this)
    AbstractName.checkComponentPre(this.components.length)

    const clone = this.clone()
    if( clone instanceof StringArrayName){
      clone.components.push(c);
    } else{
      MethodFailedException.assert(false, "Failed to append component")
    }

    AbstractName.checkComponentPost(this.components.length)
    return clone;
  }

  public remove(i: number) {
    this.isInBounds(i)
    AbstractName.instanceofName(this)

    const clone = this.clone()
    if( clone instanceof StringArrayName){
      clone.components.splice(i, 1);
    } else{
      MethodFailedException.assert(false, "Failed to append component")
    }

    AbstractName.checkComponentPost(this.components.length)
    return clone;
  }
}
