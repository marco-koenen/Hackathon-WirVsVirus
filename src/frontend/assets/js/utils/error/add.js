import config from 'config'
import validate from '@utils/validate'

//
// add error class to elements
// --------------------------------------------------

export default (wrapper) => {
  if (!wrapper) return

  const fields = wrapper.querySelectorAll('input, select')

  fields.forEach((field) => {
    const value = field.value
    const isPhone = field.type === 'tel'

    if (field.value === '' || (isPhone && !validate.phone(value))) {
      field.classList.add(config.isError)
    } else {
      field.classList.remove(config.isError)
    }
  })
}
