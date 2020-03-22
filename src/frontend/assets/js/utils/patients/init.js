import config from 'config'
import storage from '@utils/localStorage'
import create from './create'

//
// initiate the patient list
// --------------------------------------------------

export default () => {
  const patients = storage.get('patients')
  const fallbackText = document.querySelector(config.userList).querySelector('p')

  if (!patients || patients.length === 0) {
    fallbackText.classList.remove(config.isHidden)
    return
  }

  fallbackText.classList.add(config.isHidden)
  patients.forEach(patient => create(patient.name, patient.phone, patient.user, patient.doctor))
}
