import config from 'config'
import dashboard from '@components/dashboard'
import modal from '@components/modal'
import button from '@components/button'

//
// get user data from database
// --------------------------------------------------

export default () => {
  if (!config.user) return

  fetch(config.fetch.endpoint + 'user/' + config.user, {
    method: 'GET',
    headers: config.fetch.headers,
    mode: config.fetch.mode
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      dashboard.init(data)
      button.state()
    })
    .catch(error => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
