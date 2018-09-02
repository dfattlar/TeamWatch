import {
  timeFormatting,
  timeFormattingMonth,
  formatSplit
} from "../../app/util";

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

describe("Format Split", () => {
  it("should return 0 milliseconds", () => {
    expect(formatSplit(0)).toEqual(".00");
  });

  it("should return milliseconds", () => {
    expect(formatSplit(95)).toEqual(".09");
  });

  it("should return seconds with milliseconds", () => {
    expect(formatSplit(3495)).toEqual("3.49");
  });

  it("should return minutes, seconds and milliseconds", () => {
    expect(formatSplit(603495)).toEqual("10:03.49");
  });

  it("should return the what ever Moment decides...", () => {
    expect(formatSplit(1500951451086)).toEqual("7:57:31.08");
  });
});
