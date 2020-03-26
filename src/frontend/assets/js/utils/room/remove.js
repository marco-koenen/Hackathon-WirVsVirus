/* eslint-disable no-alert */
import config from 'config'
import page from '@utils/page'
import storage from '@utils/localStorage'

//
// remove the waiting room
// --------------------------------------------------

export default () => {
  const prompt = window.confirm(config._roomDelete)

  if (prompt) {
    storage.set('patients', null)
    localStorage.removeItem('room')
    localStorage.removeItem('user')
    localStorage.removeItem('roomActivated')
    config.room = ''
    config.user = ''
    page.view()

    // clear the waiting room
    const patients = document.querySelectorAll('.patient-wrapper')
    const doctors = document.querySelector(config.doctorSelect).querySelectorAll('option')

    patients.forEach(patient => patient.remove())
    doctors.forEach(doctor => doctor.remove())

    // refresh page
    setTimeout(() => window.location.reload(), config.pageTransitionTime)
  }
}
