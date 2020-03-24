import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'
import error from '@utils/error'
import remove from './remove'
import init from './init'

//
// create a new doctor
// --------------------------------------------------

export default () => {
  const lastName = document.querySelector(config.doctorLastName)
  const firstName = document.querySelector(config.doctorFirstName)
  const title = document.querySelector(config.doctorTitle)
  const wrapper = lastName.parentNode

  // force at least the last name
  if (!lastName.value) {
    modal.create(false, config._missingField, wrapper)
    return
  }

  // check if doctor is already in list
  const doctor = title.value + ' ' + lastName.value
  const select = document.querySelector(config.doctorSelect)
  const options = select.querySelectorAll('option')
  let doctorExists = false

  options.forEach(option => {
    if (option.value === doctor) doctorExists = true
  })

  if (doctorExists) {
    modal.create(false, config._doctorExists)
    return
  }

  // remove error states
  error.remove(wrapper)

  // save the doctor to local storage
  const data = {name: doctor, value: doctor}
  let storageDoctors = storage.get('doctors')

  storageDoctors = storageDoctors === null ? [] : storageDoctors
  storageDoctors.push(data)
  storage.set('doctors', storageDoctors)

  // create doctor dom element
  init([data])
}
