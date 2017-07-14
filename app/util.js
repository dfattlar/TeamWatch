export function timeFormatting(time) {
    const pad = (time, length) => {
        while (time.length < length) {
            time = '0' + time
        }
        return time
    }

    time = new Date(time);
    const m = pad(time.getMinutes().toString(), 2)
    const s = pad(time.getSeconds().toString(), 2)
    const msNow = time.getMilliseconds()
    const msOffset = msNow % 10
    const msDisplay = (msNow - msOffset) / 10
    const ms = pad(msDisplay, 3)

    return {
        m,
        s,
        ms
    };
}

export function timeFormattingMonth(timeStamp) {
    const time = new Date(timeStamp)
    const date = time.getDate()
    const month = time.getMonth() + 1
    const year = time.getFullYear()

    return {
        date,
        month,
        year
    }
}
