import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import patient from '@components/patient'
import storage from '@utils/localStorage'

//
// send user a notification
// --------------------------------------------------

export default (user, doctor = null, removedPatient = null) => {
  const message = doctor ? doctor + ' ' + config._messageCall : config._messageLink

  // create removed patient again
  const createPatientAgain = () => {
    if (!removedPatient) return
    let storagePatients = storage.get('patients')

    storagePatients.push(removedPatient)
    storage.set('patients', storagePatients)
    patient.init([removedPatient])
  }

  // message cannot be sent because the room is not yet activated
  if (!config.roomActivated) {
    modal.create(false, config._roomNotActivated)
    createPatientAgain()
    console.warn(message)
    console.error('The message was not sent.')
    return
  }

  // do not send messages in development mode
  if (config.localhost) {
    console.warn(message)
    console.error('The message was not sent.')
    return
  }

  fetch(config.fetch.endpoint + 'user/' + user + '/call', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      notify_text: message,
      room_hash: config.room
    })
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const success = data.success === 'sent'

      if (success) {
        modal.create(true, config._messageSuccess)
      } else {
        modal.create(false, data.success === 'notactivated' ? config._roomNotActivated : config._messageError)
        createPatientAgain() // create removed patient again
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
