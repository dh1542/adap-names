import { describe, it, expect, expectTypeOf } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asNameString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asNameString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], "#");
    n.insert(1, "cs");
    expect(n.asNameString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asNameString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asNameString()).toBe("oss.cs.fau.de#people");
  });
});

describe("test removal", () => {
  it("test removal", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.remove(1);
    expect(n.asNameString()).toBe("oss.fau.de");
  });
});

describe("test setting component", () => {
  it("Test setting component", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asNameString()).toBe("oss.cs.fau.de");
    n.setComponent(0, "test");
    expect(n.asNameString()).toBe("test.cs.fau.de");
  });
});

describe("Test number of components", () => {
  it("Test number of components", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de", "test1", "test2"]);
    expect(n.getNoComponents()).toBe(6);
  });
});

describe("Test whole class", () => {
  it("Test whole class", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de", "test1", "test2"], "7");
    n.remove(5);
    expect(n.asNameString()).toBe("oss7cs7fau7de7test1");
    expect(n.getComponent(3)).toBe("de");
    n.setComponent(3, "ADAP");
    expect(n.asNameString()).toBe("oss7cs7fau7ADAP7test1");
    n.insert(3, "de");
    expect(n.asNameString()).toBe("oss7cs7fau7de7ADAP7test1");
    n.insert(4, "co.uk");
    n.insert(3, "something");
    expect(n.getNoComponents()).toBe(8);
    n.remove(0);
    n.remove(0);
    expect(n.getNoComponents()).toBe(6);
  });
});
