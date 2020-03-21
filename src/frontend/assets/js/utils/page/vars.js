import config from 'config'

//
// update global variables
// --------------------------------------------------

export default (name, phone, user = null) => {
  config.page = config.content.getAttribute('page')
}
