import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'

//
// create a new doctor
// --------------------------------------------------

export default () => {
  const doctor = document.querySelector(config.doctorName).value

  if (!doctor) return

  const select = document.querySelector(config.doctorSelect)
  const options = select.querySelectorAll('option')
  let alreadyAvailable = false

  // check if doctor is already in list
  options.forEach(option => {
    const value = option.value
    if (value === doctor) alreadyAvailable = true
  })

  if (alreadyAvailable) {
    modal.create(false, config.doctorAlreadyAvailable)
  } else {
    const option = document.createElement('option')

    option.text = doctor
    option.value = doctor

    select.appendChild(option)

    // save to local storage
    let storageDoctors = storage.get('doctors')

    storageDoctors = storageDoctors === null ? [] : storageDoctors
    storageDoctors.push({
      name: doctor,
      value: doctor
    })

    storage.set('doctors', storageDoctors)
  }
}
