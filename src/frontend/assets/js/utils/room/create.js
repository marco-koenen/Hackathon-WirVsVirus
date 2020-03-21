import config from 'config'

//
// create a new room
// --------------------------------------------------

export default () => {
  fetch(config.fetch.endpoint + 'room/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({})
  })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      const room = data.room_hash

      if (room) {
        localStorage.setItem('room', room)
        localStorage.setItem('patients', null)
        config.room = room
        window.location.href = '/waiting-room.html'
      }
    })
    .catch(function(error) {
      console.warn(error)
    })
}
