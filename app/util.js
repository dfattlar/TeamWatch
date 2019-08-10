"use strict";

import moment from "moment";

export function timeFormatting(time) {
  const pad = (time, length) => {
    while (time.length < length) {
      time = "0" + time;
    }
    return time;
  };

  time = new Date(time);
  const [m1, m2] = pad(time.getMinutes().toString(), 2).split("");
  const [s1, s2] = pad(time.getSeconds().toString(), 2).split("");
  const msNow = time.getMilliseconds();
  const msOffset = msNow % 10;
  const msDisplay = (msNow - msOffset) / 10;
  const [ms1, ms2] = pad(msDisplay.toString(), 2).split("");

  return {
    m1,
    m2,
    s1,
    s2,
    ms1,
    ms2
  };
}

export function timeFormattingMonth(timeStamp) {
  const time = new Date(timeStamp);
  const date = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();

  return {
    date,
    month,
    year
  };
}

export function formatSplit(split) {
  let formattedSplit;
  if (split === "") {
    return split;
  }

  if (split < 1000) {
    formattedSplit = moment(split).format(".SS");
  } else if (split < 10000) {
    formattedSplit = moment(split).format("s.SS");
  } else if (split < 60000) {
    formattedSplit = moment(split).format("ss.SS");
  } else if (split < 600000) {
    formattedSplit = moment(split).format("m:ss.SS");
  } else if (split < 3600000) {
    formattedSplit = moment(split).format("mm:ss.SS");
  } else {
    formattedSplit = moment(split).format("h:mm:ss.SS");
  }
  return formattedSplit;
}
