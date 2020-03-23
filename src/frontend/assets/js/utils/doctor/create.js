import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'
import fallbackText from '@utils/fallbackText'
import remove from './remove'
import init from './init'

//
// create a new doctor
// --------------------------------------------------

export default () => {
  const input = document.querySelector(config.doctorName)
  const inputFirstName = document.querySelector(config.doctorFirstName)
  const title = document.querySelector(config.doctorTitle).value
  let doctor = input.value

  if (!doctor) {
    modal.create(false, config.missingField)
    return
  }

  const select = document.querySelector(config.doctorSelect)
  const options = select.querySelectorAll('option')
  let alreadyAvailable = false

  // check if doctor is already in list
  doctor = title + ' ' + doctor

  options.forEach(option => {
    const value = option.value
    if (value === doctor) alreadyAvailable = true
  })

  if (alreadyAvailable) {
    modal.create(false, config.doctorAlreadyAvailable)
  } else {
    // clear input fields
    input.value = ''
    inputFirstName.value = ''

    // save to local storage
    let storageDoctors = storage.get('doctors')

    storageDoctors = storageDoctors === null ? [] : storageDoctors
    storageDoctors.push({
      name: doctor,
      value: doctor
    })

    storage.set('doctors', storageDoctors)

    // add doctor to doctor list
    init([
      {
        name: doctor,
        value: doctor
      }
    ])
  }
}
