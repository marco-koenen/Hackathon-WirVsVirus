import config from 'config'
import modal from '@components/modal'
import button from '@components/button'

//
// send user a notification
// --------------------------------------------------

export default (user, doctor = false) => {
  const message = doctor ? doctor + ' ' + config._messageCall : config._messageLink + ' ' + config.origin + '/#' + user

  // only log message for development
  if (config.localhost) {
    console.warn(message)
    return
  }

  fetch(config.fetch.endpoint + 'user/' + user + '/call', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      notify_text: message
    })
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const success = data.success === 'sent'
      modal.create(success, success ? config._messageSuccess : config._errorGeneral)
      button.state()
    })
    .catch(error => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
