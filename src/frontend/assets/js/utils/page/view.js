import config from 'config'
import modal from '@components/modal'

//
// handle different page views
// --------------------------------------------------

export default (init = false) => {
  const waitingRoom = document.querySelector(config.waitingRoom)
  const createWaitingRoom = document.querySelector(config.createWaitingRoom)
  const userDashboard = document.querySelector(config.userDashboard)
  const delayContent = init ? 0 : config.pageTransitionTime
  const delayAnimation = init ? config.pageTransitionTime : config.pageTransitionTime * 2

  // show overlay
  config.overlay.classList.remove(config.isClose)

  setTimeout(() => {
    // show user dashboard
    if (config.user && config.hash) {
      waitingRoom && waitingRoom.classList.add(config.isHidden)
      createWaitingRoom && createWaitingRoom.classList.add(config.isHidden)
      userDashboard && userDashboard.classList.remove(config.isHidden)
      localStorage.removeItem('patients')
      localStorage.removeItem('room')
      localStorage.removeItem('doctors')
      config.room = ''
    }

    // show waitingRoom
    if (config.room) {
      userDashboard && userDashboard.classList.add(config.isHidden)
      createWaitingRoom && createWaitingRoom.classList.add(config.isHidden)
      waitingRoom && waitingRoom.classList.remove(config.isHidden)
      localStorage.removeItem('user')
      config.user = ''
      modal.open('modal-room-activate')
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
    }
  }, delayContent)

  // close overlay
  setTimeout(() => {
    config.overlay.classList.add(config.isClose)
  }, delayAnimation)
}
