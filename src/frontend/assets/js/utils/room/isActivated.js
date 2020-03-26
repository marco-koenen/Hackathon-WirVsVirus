import config from 'config'
import modal from '@components/modal'

//
// check if a room is activated
// --------------------------------------------------

export default () => {
  // set roomActivated and show modal if neccessary
  const roomActivated = (activated) => {
    config.roomActivated = activated
    localStorage.setItem('roomActivated', config.roomActivated)
    if (!activated) modal.open('modal-room-activate')
  }

  fetch(config.fetch.endpoint + 'room/' + config.room + '/activated', {
    method: 'GET',
    headers: config.fetch.headers,
    mode: config.fetch.mode
  })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
      const activated = response.activated === true

      roomActivated(!!activated)
    })
    .catch((error) => {
      roomActivated(false)
      console.warn(error)
    })
}
