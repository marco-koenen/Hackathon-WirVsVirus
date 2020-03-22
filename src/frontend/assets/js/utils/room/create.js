import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import page from '@utils/page'

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
        localStorage.removeItem('user')
        config.room = room
        config.user = null
        page.view()
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config.generalError)
      button.state()
      console.warn(error)
    })
}
