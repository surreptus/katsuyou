import { toA, toI } from "../vowel-changer";

describe("toI", () => {
  test("it should return the expected I vowel", () => {
    const cases = [
      [`う`, `い`],
      [`く`, `き`],
      [`す`, `し`],
      [`つ`, `ち`],
      [`ぬ`, `に`],
      [`ぶ`, `び`],
      [`む`, `み`],
      [`る`, `り`],
      [`ぐ`, `ぎ`],
    ];

    cases.forEach(([input, expected]) => {
      expect(toI(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toI("d")).toThrow("provided an unknown character!");
  });
});

describe("toA", () => {
  test("it should return the expected A vowel", () => {
    const cases = [
      [`う`, `わ`],
      [`く`, `か`],
      [`す`, `さ`],
      [`つ`, `た`],
      [`ぬ`, `な`],
      [`ぶ`, `ば`],
      [`む`, `ま`],
      [`る`, `ら`],
      [`ぐ`, `が`],
    ];

    cases.forEach(([input, expected]) => {
      expect(toA(input)).toBe(expected);
    });
  });

  test("it should throw on a bogus character", () => {
    expect(() => toA("d")).toThrow("provided an unknown character!");
  });
});
