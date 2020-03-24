import config from 'config'
import error from '@utils/error'

//
// create a new modal
// --------------------------------------------------

export default (success, message, wrapper) => {
  const modal = document.querySelector(config.modal)
  const div = document.createElement('div')
  const p = document.createElement('p')
  const showTime = 3000
  const animationTime = 400

  // check if some input fields need an error class
  error.add(wrapper)

  // create the modal
  div.className += 'modal '
  div.className += success ? config.isSuccess : config.isError
  p.innerHTML = message

  div.append(p)
  modal.append(div)

  // we need a small delay here for the css animation
  setTimeout(() => div.classList.add(config.isOpen), 50)

  // remove it
  setTimeout(() => div.classList.remove(config.isOpen), showTime)
  setTimeout(() => div.remove(), showTime + animationTime)
}
