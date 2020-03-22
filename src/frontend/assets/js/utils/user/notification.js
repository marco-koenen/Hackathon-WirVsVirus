import config from 'config'
import modal from '@components/modal'
import button from '@components/button'

//
// send user a notification
// --------------------------------------------------

export default user => {
  fetch(config.fetch.endpoint + 'user/' + user + '/call', {
    method: 'GET',
    headers: config.fetch.headers,
    mode: config.fetch.mode
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const success = data.success === 'sent'
      const message = success ? config.notificationSuccess : config.notificationError
      modal.create(success, message)
      button.state()
    })
    .catch(error => {
      modal.create(false, config.generalError)
      button.state()
      console.warn(error)
    })
}
