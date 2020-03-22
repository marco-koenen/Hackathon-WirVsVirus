import config from 'config'
import page from '@utils/page'

//
// remove the waiting room
// --------------------------------------------------

export default () => {
  localStorage.removeItem('patients')
  localStorage.removeItem('room')
  localStorage.removeItem('user')
  config.room = ''
  config.user = ''
  page.view()
}
