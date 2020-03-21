import config from 'config'

//
// update global variables
// --------------------------------------------------

export default (name, phone, user = null) => {
  config.page = config.content.getAttribute('page')
  config.room = config.page === 'home' ? '' : config.room
  config.user = !config.hash ? null : config.user

  localStorage.setItem('room', config.room)
}
