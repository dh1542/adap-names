import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
  
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }


    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        let output: string = "";
        let numberOfComponents = this.getNoComponents();
        
        for(let i = 0; i < numberOfComponents; i++) {
            output += this.getComponent(i);
            if(i < numberOfComponents - 1) {
                output += delimiter;
            }
        }
        return output;

    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public clone(): Name {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
       if(this.getNoComponents() == 0) {
           return true;
       }
       return false;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
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