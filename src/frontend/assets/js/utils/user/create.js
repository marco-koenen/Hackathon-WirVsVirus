import config from 'config'
import storage from '@utils/localStorage'
import patients from '@utils/patients'
import modal from '@components/modal'
import button from '@components/button'

//
// create a new user
// --------------------------------------------------

export default () => {
  const phone = document.querySelector(config.userPhone).value
  const name = document.querySelector(config.userName).value
  const doctor = document.querySelector(config.doctorSelect).value
  const room = config.room

  if (!phone || !room || !name) return

  const body = {
    phone: phone,
    room: room
  }

  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const user = data.user_hash

      if (user) {
        let storagePatients = storage.get('patients')

        patients.create(name, phone, user, doctor)

        // save the user to the patients list
        storagePatients = storagePatients === null ? [] : storagePatients
        storagePatients.push({
          user: user,
          name: name,
          phone: phone,
          doctor: doctor
        })

        storage.set('patients', storagePatients)
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config.generalError)
      button.state()
      console.warn(error)
    })
}
