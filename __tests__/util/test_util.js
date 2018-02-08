import { timeFormatting, timeFormattingMonth } from "../../app/util";

describe("Time Formatting", () => {
  it("should return the minutes, seconds, milliseconds", () => {
    expect(timeFormatting(3495)).toEqual({
      m: "00",
      s: "03",
      ms: "49"
    });
  });

  it("should return the minutes, seconds, milliseconds", () => {
    expect(timeFormatting(3095)).toEqual({
      m: "00",
      s: "03",
      ms: "09"
    });
  });

  it("should return the minutes, seconds, milliseconds", () => {
    expect(timeFormatting(103095)).toEqual({
      m: "01",
      s: "43",
      ms: "09"
    });
  });
});

describe("Time Formatting Month", () => {
  it("should return the month, date, year", () => {
    expect(timeFormattingMonth(3495)).toEqual({
      month: 12,
      date: 31,
      year: 1969
    });
  });

  it("should return the minutes, seconds, milliseconds", () => {
    expect(timeFormattingMonth(1500951451086)).toEqual({
      month: 7,
      date: 24,
      year: 2017
    });
  });
});
