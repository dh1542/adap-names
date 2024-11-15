import { StringName } from "../../../src/adap-b03/names/StringName";
import { describe, it, expect } from "vitest";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";


describe("Test StringName", () => {
    it("Test noOfComponents", () => {
      let n: StringName = new StringName("oss.cs.fau.de", ",");
      expect(n.getDelimiterCharacter()).toBe(",");
        expect(n.getNoComponents()).toBe(1);   
        
    });
});

describe("Test if name classes behave the same way", () => {
    let name_array = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    let name_string = new StringName("oss,cs,fau,de", ",");
    it("Test number of Components", () => {
        expect(name_array.getNoComponents()).toBe(name_string.getNoComponents());
    })
    it("Test delimiter character", () => {
        expect(name_array.getDelimiterCharacter()).toBe(name_string.getDelimiterCharacter());
    })
    it("Test asString", () => {
        expect(name_array.asString()).toBe("oss,cs,fau,de");
        expect(name_array.asString()).toBe(name_string.asString());
    })

})