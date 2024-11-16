import { StringName } from "../../../src/adap-b03/names/StringName";
import { describe, it, expect, assert } from "vitest";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";
import { Name } from "./Name";
import { a } from "vitest/dist/chunks/suite.CcK46U-P";

describe("General Tests", () => {
  it("Test noOfComponents", () => {
    let n: StringName = new StringName("oss.cs.fau.de", ",");
    expect(n.getDelimiterCharacter()).toBe(",");
    expect(n.getNoComponents()).toBe(1);
  });
  it("Test isEqual", () => {
    let n: Name = new StringName("oss,cs,fau,de", ",");
    let n1: Name = new StringName("oss,cs,fau,de", ",");
    let n2: Name = new StringName("oss,cs,fau,de", ".");
    assert(n.isEqual(n1));
    assert(!n.isEqual(n2));
    n2 = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    assert(!n.isEqual(n2));
    n1 = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    assert(n1.isEqual(n2));
  });
  it("Test asString", () => {
    let n = new StringName("oss,cs,fau,de", ",");
    expect(n.asString()).toBe("oss,cs,fau,de");
    let n2 = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    expect(n2.asString()).toBe("oss.cs.fau.de");
  });
  it("Test isEmpty", () => {
    let n = new StringArrayName([], ",");
    expect(n.isEmpty()).toBe(true);
    n = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    expect(n.isEmpty()).toBe(false);
    let n2 = new StringName("oss,cs,fau,de", ",");
    expect(n2.isEmpty()).toBe(false);
    n2 = new StringName("", ",");
    expect(n2.isEmpty()).toBe(true);
  });
  it("Test hashCode", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    let n3: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    let n4: Name = new StringName("oss,cs,fau,de", ",");
    let n5: Name = new StringName("oss,cs,fau,de", ",");
    expect(n.getHashCode()).toBe(n2.getHashCode());
    expect(n.getHashCode()).not.toBe(n3.getHashCode());
    expect(n.getHashCode()).not.toBe(n4.getHashCode());
    expect(n4.getHashCode()).toBe(n5.getHashCode());
  });
  it("Test clone", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"], ",");
    let n2 = n.clone();
    assert(n.isEqual(n2));
    n = new StringName("oss,cs,fau,de", ",");
    n2 = n.clone();
    assert(n.isEqual(n2));
  });
});

describe("Test if name classes behave the same way", () => {
  let name_array = new StringArrayName(["oss", "cs", "fau", "de"], ",");
  let name_string = new StringName("oss,cs,fau,de", ",");
  it("Test number of Components", () => {
    expect(name_array.getNoComponents()).toBe(name_string.getNoComponents());
    let n1 = new StringArrayName([], ",");
    let n2 = new StringName("", ",");
    expect(n1.getNoComponents()).toBe(0);
    expect(n1.getNoComponents()).toBe(n2.getNoComponents());
  });
  it("Test delimiter character", () => {
    expect(name_array.getDelimiterCharacter()).toBe(
      name_string.getDelimiterCharacter()
    );
  });
  it("Test asString", () => {
    expect(name_array.asString()).toBe("oss,cs,fau,de");
    expect(name_array.asString()).toBe(name_string.asString());
  });
});

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
  it("setComponent", () => {
    let n: Name = new StringName("oss.fau.de");
    n.setComponent(1, "cs");
    expect(n.asString()).toBe("oss.cs.de");
  });
});
