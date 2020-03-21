import config from 'config'

//
// create a new user
// --------------------------------------------------

export default () => {
  const body = {
    phone: '+491752728244',
    room: 'ö1358sfjf38'
  }

  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify(body)
  })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.warn(data)
    })
    .catch(function(error) {
      console.warn(error)
    })
}
