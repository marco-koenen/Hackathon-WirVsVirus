import config from 'config'

//
// start a timer
// --------------------------------------------------

export default time => {
  let date = time

  if (typeof date !== 'object') {
    date = new Date(date)
  }

  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 3600)
  let intervalType

  if (interval >= 1) {
    intervalType = 'Stunde'
  } else {
    interval = Math.floor(seconds / 60)

    if (interval >= 1) {
      intervalType = 'Minute'
    } else {
      interval = seconds
      intervalType = 'Sekunde'
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 'n'
  }

  return interval + ' ' + intervalType
}
