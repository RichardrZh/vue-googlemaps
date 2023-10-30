
/**
 * Gets the weekday name of a Date object.
 * @param {Date} date - A Date object.
 * @param {String} [options="long"] - Optional: A string "short" or "long" representing short/long form day strings.
 * @returns {String} Returns a string containing the name of the weekday.
 */
function getDayName(date, options='long') {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = date.getDay()

    switch(options) {
        case 'short':
          return weekdays[day].slice(0, 3)
        case 'long':
          return weekdays[day]
        default:
          return weekdays[day]
    } 
}

/**
 * Gets a formatted string representing the time.
 * @param {Number} timestamp - The time in seconds since midnight, January 1, 1970.
 * @returns {String} Returns a string representing the time. eg: '3:45 am'
 */
function getFormattedTime(timestamp) {
    let date = new Date(timestamp)

    let hours = date.getUTCHours()
    let minutes = date.getUTCMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'

    /* convert hours to 12h format */
    hours = hours % 12
    hours = hours ? hours : 12

    /* adds leading zero for single digit minutes */
    minutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${minutes} ${ampm}`
}

export {
    getDayName,
    getFormattedTime
}