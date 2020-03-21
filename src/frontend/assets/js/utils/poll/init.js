import config from 'config'

//
// refresh poll
// --------------------------------------------------

export default (fn, callback, error) => {
  const endTime = Number(new Date()) + config.pollTimeout

  ;(function poll() {
    if (fn()) {
      callback()
    } else if (Number(new Date()) < endTime) {
      setTimeout(poll, config.pollInterval)
    } else {
      error(new Error('timed out for ' + fn))
    }
  })()
}
