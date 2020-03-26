import config from 'config'

//
// open a modal
// --------------------------------------------------

export default (className) => {
  const wrapper = document.querySelector(config.modal)
  const modal = wrapper.querySelector('.' + className)
  const delay = 0

  setTimeout(() => modal.classList.add(config.isOpen), delay)
}
