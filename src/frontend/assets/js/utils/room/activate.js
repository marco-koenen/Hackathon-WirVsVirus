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
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      otp: code
    })
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      const success = response.success === 'activated'
      const invalid = response.success === 'invalidotp'

      if (success) {
        modal.remove('modal-room-activate', 130)
        modal.create(true, config._roomActivated)
        config.roomActivated = true
      }

      if (invalid) {
        modal.create(false, config._optInvalid)
        config.roomActivated = false
      }

      localStorage.setItem('roomActivated', config.roomActivated)
      button.state()
    })
    .catch(error => {
      console.warn('This room has not yet been activated. No message can be sent.')
      modal.create(false, config._roomCouldNotActivated)
      button.state()
      console.warn(error)
    })
}
