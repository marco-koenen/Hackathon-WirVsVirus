import config from 'config'

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
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      const hash = data.hash
      const phone = data.phone
      const room = data.room
      const status = data.status

      console.warn(data)
    })
    .catch(function(error) {
      console.warn(error)
    })
}
