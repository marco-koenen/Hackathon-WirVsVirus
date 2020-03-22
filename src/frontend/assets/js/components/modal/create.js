import config from 'config'

//
// create a new modal
// --------------------------------------------------

export default (success, message) => {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const showTime = 3000
  const animationTime = 400

  div.className += 'modal-wrapper '
  div.className += success ? 'is-success' : 'is-error'
  p.innerHTML = message

  div.append(p)
  document.body.append(div)

  // add it
  setTimeout(() => div.classList.add(config.isOpen), 50)

  // remove it
  setTimeout(() => div.classList.remove(config.isOpen), showTime)
  setTimeout(() => div.remove(), showTime + animationTime)
}
