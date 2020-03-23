import config from 'config'
import storage from '@utils/localStorage'
import patients from '@utils/patients'
import modal from '@components/modal'
import button from '@components/button'
import notification from './notification'
import validate from '@utils/validate'

//
// create a new user
// --------------------------------------------------

export default () => {
  const inputPhone = document.querySelector(config.userPhone)
  const phone = inputPhone.value
  const inputFirstName = document.querySelector(config.userFirstName)
  const firstName = inputFirstName.value
  const inputName = document.querySelector(config.userName)
  const doctor = document.querySelector(config.doctorSelect).value
  const room = config.room
  let name = inputName.value

  // required fields
  if (!phone || !room || !name || !firstName) {
    modal.create(false, config._missingField)
    return
  }

  // force at least one doctor
  if (!doctor) {
    modal.create(false, config._doctorMissing)
    return
  }

  // validate phone numnber
  if (!validate.phone(phone)) {
    modal.create(false, config._wrongPhone)
    return
  }

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
      const time = new Date(Date.now())

      if (user) {
        let storagePatients = storage.get('patients')
        name = firstName + ' ' + name

        // create dom elements
        patients.create(name, phone, user, doctor, time)

        // clear inputs
        inputPhone.value = ''
        inputName.value = ''
        inputFirstName.value = ''

        // save the user to local storage
        storagePatients = storagePatients === null ? [] : storagePatients
        storagePatients.push({
          user: user,
          name: name,
          phone: phone,
          doctor: doctor,
          time: time
        })

        storage.set('patients', storagePatients)

        // send new patient his dashboard link
        notification(user)
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
