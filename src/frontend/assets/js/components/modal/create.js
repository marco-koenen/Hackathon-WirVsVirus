import config from 'config'

//
// create a new modal
// --------------------------------------------------

export default (success, message) => {
  const wrapper = document.querySelector(config.modal)
  const div = document.createElement('div')
  const p = document.createElement('p')
  const showTime = 3000
  const animationTime = 400

  div.className += 'modal '
  div.className += success ? config.isSuccess : config.isError
  p.innerHTML = message

  div.append(p)
  wrapper.append(div)

  // we need a small delay here for the css animation
  setTimeout(() => div.classList.add(config.isOpen), 50)

  // remove it
  setTimeout(() => div.classList.remove(config.isOpen), showTime)
  setTimeout(() => div.remove(), showTime + animationTime)
}
