import config from 'config'
import storage from '@utils/localStorage'
import fallbackText from '@utils/fallbackText'
import create from './create'

//
// initiate the patient list
// --------------------------------------------------

export default () => {
  const patients = storage.get('patients')

  // show fallback text
  fallbackText.create(!patients || patients.length === 0, config.userList)

  if (!patients) return

  // show patients list
  patients.forEach(patient => create(patient.name, patient.phone, patient.user, patient.doctor, patient.time))
}
