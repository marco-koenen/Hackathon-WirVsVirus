import config from 'config'
import modal from '@components/modal'

//
// check if a room is activated
// --------------------------------------------------

export default () => {
  // set roomActivated and show modal if neccessary
  const roomActivated = activated => {
    config.roomActivated = activated
    localStorage.setItem('roomActivated', config.roomActivated)
    if (!activated || activated === 'false') modal.open('modal-room-activate')
  }

  // TODO: backend fetch is currently not available
  roomActivated(config.roomActivated)

  // fetch(config.fetch.endpoint + 'room/' + config.room + '/activated', {
  //   method: 'POST',
  //   headers: config.fetch.headers,
  //   mode: config.fetch.mode,
  //   body: JSON.stringify({})
  // })
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((response) => {
  //     const activated = response.activated === true
  //     roomActivated(!!activated)
  //   })
  //   .catch((error) => {
  //     roomActivated(false)
  //     console.warn(error)
  //   })
}
