import config from 'config'
import storage from '@utils/localStorage'
import patients from '@utils/patients'
import modal from '@components/modal'
import button from '@components/button'
import notification from './notification'
import validate from '@utils/validate'
import error from '@utils/error'

//
// create a new user
// --------------------------------------------------

export default () => {
  const phone = document.querySelector(config.userPhone)
  const firstName = document.querySelector(config.userFirstName)
  const lastName = document.querySelector(config.userLastName)
  const doctor = document.querySelector(config.doctorSelect)
  const wrapper = phone.parentNode

  // required fields
  if (!firstName.value || !lastName.value || !phone.value || !config.room) {
    modal.create(false, config._missingField, wrapper)
    return
  }

  // force at least one doctor
  if (!doctor.value) {
    modal.create(false, config._doctorMissing, wrapper)
    return
  }

  // validate phone numnber
  if (!validate.phone(phone.value)) {
    modal.create(false, config._wrongPhone, wrapper)
    return
  }

  // remove error states
  error.remove(wrapper)

  // create new user
  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      phone: phone.value,
      room: config.room
    })
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const user = data.user_hash
      const name = firstName.value + ' ' + lastName.value
      const time = new Date(Date.now())

      // remove button state
      button.state()

      // something went wrong, we did not get the user hash
      if (!user) {
        modal.create(false, config._errorGeneral)
        return
      }

      // create dom element
      patients.create(name, phone.value, user, doctor.value, time)

      // save the user to local storage
      let storagePatients = storage.get('patients')

      storagePatients = storagePatients === null ? [] : storagePatients
      storagePatients.push({
        user: user,
        name: name,
        phone: phone.value,
        doctor: doctor.value,
        time: time
      })

      storage.set('patients', storagePatients)

      // send new patient his dashboard link
      notification(user)
    })

    // show error message to user
    .catch(err => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(err)
    })
}
