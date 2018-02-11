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
  const m = pad(time.getMinutes().toString(), 2);
  const s = pad(time.getSeconds().toString(), 2);
  const msNow = time.getMilliseconds();
  const msOffset = msNow % 10;
  const msDisplay = (msNow - msOffset) / 10;
  const ms = pad(msDisplay.toString(), 2);

  return {
    m,
    s,
    ms
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
