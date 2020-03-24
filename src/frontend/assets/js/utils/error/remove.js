/* eslint-disable no-param-reassign */
import config from 'config'

//
// remove error class from elements and clear the values
// --------------------------------------------------

export default wrapper => {
  const fields = wrapper.querySelectorAll('input, select')

  fields.forEach(field => {
    if (field.tagName !== 'SELECT') field.value = ''
    field.classList.remove(config.isError)
  })
}
