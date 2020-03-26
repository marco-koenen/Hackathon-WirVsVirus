import config from 'config'
import button from '@components/button'
import modal from '@components/modal'

//
// activate a room
// --------------------------------------------------

export default () => {
  const code = document.querySelector('.room-activation-code').value

  // we need that code
  if (!code) {
    modal.create(false, config._missingCode)
    setTimeout(() => button.state(), 50)
    return
  }

  fetch(config.fetch.endpoint + 'room/' + config.room + '/activate', {
    method: 'GET',
    headers: config.fetch.headers,
    mode: config.fetch.mode
  })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const success = response.success === 'success'

      if (success) {
        modal.remove('modal-room-activate', 130)
        config.roomActivated = true
        localStorage.setItem('roomActivated', config.roomActivated)
        console.warn('room activated: ' + room)
      }

      console.log(response.success)

      button.state()
    })
    .catch((error) => {
      console.warn('This room has not yet been activated. No message can be sent.')
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
