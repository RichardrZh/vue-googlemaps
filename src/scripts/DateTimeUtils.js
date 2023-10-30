
function getDayName(date, options) {
    let day = date.getDay()
    if (options == "short") {
        let shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return shortDays[day]
    } else {
        let longdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return longdays[day]
    }
}

function getFormattedTime(localTimestamp) {
    let date = new Date(localTimestamp)
    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes()
    let ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? `0${minutes}` : minutes
    return `${hours}:${minutes} ${ampm}`
}


export {
    getDayName,
    getFormattedTime
}