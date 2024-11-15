import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
    }

    getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }
    setComponent(i: number, c: string) {
        throw new Error("needs implementation");
    }

    insert(i: number, c: string) {
        throw new Error("needs implementation");
    }
    append(c: string) {
        throw new Error("needs implementation");
    }
    remove(i: number) {
        throw new Error("needs implementation");
    }
}