import config from 'config'
import validate from '@utils/validate'

//
// create a new modal
// --------------------------------------------------

export default (success, message, parent = false) => {
  const wrapper = document.querySelector(config.modal)
  const div = document.createElement('div')
  const p = document.createElement('p')
  const showTime = 3000
  const animationTime = 400

  // check if some input fields need an error class
  if (parent) {
    const inputFields = parent.querySelectorAll('input, select')

    inputFields.forEach(field => {
      const value = field.value
      const isPhone = field.type === 'tel'

      if (field.value === '' || (isPhone && !validate.phone(value))) {
        field.classList.add(config.isError)
      } else {
        field.classList.remove(config.isError)
      }
    })
  }

  // create the modal
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
