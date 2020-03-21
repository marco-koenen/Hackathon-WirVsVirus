import config from 'config'

//
// handle different page views
// --------------------------------------------------

export default () => {
  // remove user dashboard if it is not a user
  if (!config.user) {
    const userDashboard = document.querySelector('.user-dashboard')
    userDashboard && userDashboard.remove()
    localStorage.removeItem('user')
    config.user = ''
  }

  // remove room creation element
  else {
    const createRoom = document.querySelector('.room-create-wrapper')
    createRoom && createRoom.remove()
    localStorage.removeItem('patients')
    config.room = ''
  }
}
