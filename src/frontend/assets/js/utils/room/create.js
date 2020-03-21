import config from 'config'
import modal from '@components/modal'

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
    .then(response => {
      return response.json()
    })
    .then(data => {
      const room = data.room_hash

      if (room) {
        localStorage.setItem('room', room)
        localStorage.setItem('patients', null)
        config.room = room
        window.location.href = '/waiting-room.html'
      }
    })
    .catch(error => {
      modal.create(false, config.generalError)
      console.warn(error)
    })
}
