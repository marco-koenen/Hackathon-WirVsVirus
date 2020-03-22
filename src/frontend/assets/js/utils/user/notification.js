import config from 'config'
import modal from '@components/modal'
import button from '@components/button'

//
// send user a notification
// --------------------------------------------------

export default (user, doctor = false) => {
  const message = doctor ? doctor + ' ' + config.messageCall : config.messageLink + ' ' + config.origin + '/#' + user
  const body = {notify_text: message}

  fetch(config.fetch.endpoint + 'user/' + user + '/call', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const success = data.success === 'sent'
      modal.create(success, success ? config.notificationSuccess : config.notificationError)
      button.state()
    })
    .catch(error => {
      modal.create(false, config.generalError)
      button.state()
      console.warn(error)
    })
}
