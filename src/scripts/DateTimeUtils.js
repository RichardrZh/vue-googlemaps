
function getDateString(timestamp, options) {
    let date = new Date(timestamp)

    if (options) {
        var time = new Intl.DateTimeFormat(navigator.language, options).format(date)
    } else {
        var time = new Intl.DateTimeFormat(navigator.language).format(date)
    }

    return time
}

export {
    getDateString
}