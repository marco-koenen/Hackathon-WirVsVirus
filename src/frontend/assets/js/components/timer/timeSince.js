//
// start a timer
// --------------------------------------------------

export default time => {
  let date = time

  if (typeof date !== 'object') {
    date = new Date(date)
  }

  const now = new Date()
  let diff = Math.abs(date - now)

  const ms = diff % 1000
  diff = (diff - ms) / 1000

  const ss = diff % 60
  diff = (diff - ss) / 60

  const mm = diff % 60
  diff = (diff - mm) / 60

  return (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
}
