import config from 'config'
import button from '@components/button'

//
// remove a modal
// --------------------------------------------------

export default (className, delay = 1500) => {
  const wrapper = document.querySelector(config.modal)
  const modal = wrapper.querySelector('.' + className)

  // fade out modal and remove button state
  setTimeout(() => {
    modal.classList.remove(config.isOpen)
    button.state()
  }, delay)

  // remove it from dom
  setTimeout(() => modal.remove(), 1000)
}
