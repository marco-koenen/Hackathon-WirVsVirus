import config from 'config'
import url from '@utils/url'

//
// activate a room
// --------------------------------------------------

export default () => {
  const params = url.getParams()

  if (params.activate !== undefined) {
    const room = params.activate

    config.roomActivated = true
    localStorage.setItem('roomActivated', config.roomActivated)

    console.warn('activate room: ' + room)

    // TODO: fetch backend
    // TODO: show success/error notification
  }

  // TODO: disable SMS send button when the room has not been activated
  if (!config.roomActivated) {
    console.warn('This room has not yet been activated. No message can be sent.')
  }
}
