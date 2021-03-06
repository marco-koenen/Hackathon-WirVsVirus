import config from 'config'
import timeSince from './timeSince'

//
// start a timer
// --------------------------------------------------

export default (time, element) => {
  const timer = element

  // prevent the time from being displayed too late
  timer.innerHTML = config._waitingTime + ' ' + timeSince(time)

  setInterval(() => {
    timer.innerHTML = config._waitingTime + ' ' + timeSince(time)
  }, 1000)
}
