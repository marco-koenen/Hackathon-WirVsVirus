import config from 'config'
import dashboard from './dashboard'
import modal from '@components/modal'

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
      dashboard(data)
    })
    .catch(error => {
      modal.create(false, config.generalError)
      console.warn(error)
    })
}
