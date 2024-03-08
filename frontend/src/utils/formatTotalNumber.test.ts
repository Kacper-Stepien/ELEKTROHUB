import { formatTotalNumber } from "./formatTotalNumber";

describe("formatTotalNumber", () => {
  test("number 1000.25 should be formatted to 1 000.25", () => {
    expect(formatTotalNumber(1000.25)).toBe("1 000.25");
  });

  test("number 125381 should be formatted to 125 381", () => {
    expect(formatTotalNumber(125381)).toBe("125 381");
  });

  test("number 938125381 should be formatted to 938 125 381", () => {
    expect(formatTotalNumber(938125381)).toBe("938 125 381");
  });

  test("number -1000.25 should be formatted to -1 000.25", () => {
    expect(formatTotalNumber(-1000.25)).toBe("-1 000.25");
  });

  test("number -938125381 should be formatted to -938 125 381", () => {
    expect(formatTotalNumber(-938125381)).toBe("-938 125 381");
  });
});
