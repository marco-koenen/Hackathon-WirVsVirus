import config from 'config'
import page from '@utils/page'
import storage from '@utils/localStorage'

//
// remove the waiting room
// --------------------------------------------------

export default () => {
  storage.set('patients', null)
  localStorage.removeItem('room')
  localStorage.removeItem('user')
  config.room = ''
  config.user = ''
  page.view()

  // clear the waiting room
  const patients = document.querySelectorAll('.patient-wrapper')
  const doctors = document.querySelector(config.doctorSelect).querySelectorAll('option')

  patients.forEach(patient => patient.remove())
  doctors.forEach(doctor => doctor.remove())
}
