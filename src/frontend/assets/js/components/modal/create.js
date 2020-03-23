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
  div.className += success ? config.isSuccess : config.isError
  p.innerHTML = message

  div.append(p)
  document.body.append(div)

  // we need a small delay here for the css animation
  setTimeout(() => div.classList.add(config.isOpen), 50)

  // remove it
  setTimeout(() => div.classList.remove(config.isOpen), showTime)
  setTimeout(() => div.remove(), showTime + animationTime)
}
