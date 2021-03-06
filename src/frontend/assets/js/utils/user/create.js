import config from 'config'
import storage from '@utils/localStorage'
import patient from '@components/patient'
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
  let phoneNumber

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

  // remove all white spaces from phone number
  if (phone.value) {
    phoneNumber = phone.value.replace(/ /g, '')
  }

  // validate phone numnber
  if (!validate.phone(phoneNumber)) {
    modal.create(false, config._wrongPhone, wrapper)
    return
  }

  // create new user
  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      phone: phoneNumber,
      room: config.room
    })
  })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      const invalid = response.success === 'invalid-room'
      const user = response.user_hash
      const name = firstName.value + ' ' + lastName.value
      const time = new Date(Date.now())

      // remove button state
      button.state()

      // the room is not valid
      if (invalid) {
        modal.create(false, config._roomInvalid)
        return
      }

      // something went wrong, we did not get the user hash
      if (!user) {
        modal.create(false, config._errorGeneral)
        return
      }

      // save the user to local storage
      let storagePatients = storage.get('patients')
      const data = {
        user: user,
        name: name,
        phone: phoneNumber,
        doctor: doctor.value,
        time: time
      }

      storagePatients = storagePatients === null ? [] : storagePatients
      storagePatients.push(data)
      storage.set('patients', storagePatients)

      // create patient dom element
      patient.init([data])

      // send new patient his dashboard link
      notification(user)

      // remove error states
      error.remove(wrapper)
    })

    // show error message to user
    .catch((err) => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(err)
    })
}
