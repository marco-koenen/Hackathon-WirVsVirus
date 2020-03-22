import config from 'config'

//
// handle different page views
// --------------------------------------------------

export default () => {
  const waitingRoom = document.querySelector(config.waitingRoom)
  const createWaitingRoom = document.querySelector(config.createWaitingRoom)
  const userDashboard = document.querySelector(config.userDashboard)

  // show user dashboard
  if (config.user && config.hash) {
    waitingRoom && waitingRoom.classList.add(config.isHidden)
    createWaitingRoom && createWaitingRoom.classList.add(config.isHidden)
    userDashboard && userDashboard.classList.remove(config.isHidden)
    localStorage.removeItem('patients')
    localStorage.removeItem('room')
    localStorage.removeItem('doctors')
    config.room = ''
    config.page = 'user-dashboard'
  }

  // show waitingRoom
  if (config.room) {
    userDashboard && userDashboard.classList.add(config.isHidden)
    createWaitingRoom && createWaitingRoom.classList.add(config.isHidden)
    waitingRoom && waitingRoom.classList.remove(config.isHidden)
    localStorage.removeItem('user')
    config.user = ''
    config.page = 'waiting-room'
  }

  // show createWaitingRoom
  if (!config.room && !config.user && !config.hash) {
    waitingRoom && waitingRoom.classList.add(config.isHidden)
    userDashboard && userDashboard.classList.add(config.isHidden)
    createWaitingRoom && createWaitingRoom.classList.remove(config.isHidden)
    localStorage.removeItem('patients')
    localStorage.removeItem('room')
    localStorage.removeItem('user')
    localStorage.removeItem('doctors')
    config.room = ''
    config.user = ''
    config.page = 'home'
  }
}
