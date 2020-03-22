import config from 'config'
import storage from '@utils/localStorage'
import user from '@utils/user'
import modal from '@components/modal'

//
// remove patient
// --------------------------------------------------

export default (event, onlyDelete = false) => {
  const button = event.target
  const wrapper = button.parentNode.parentNode
  const userHash = button.getAttribute('user')
  const patients = storage.get('patients')
  let doctor

  if (!patients) return

  // remove patient from local storage
  patients.forEach((patient, index) => {
    if (patient.user === userHash) {
      doctor = patient.doctor
      patients.splice(index, 1)
    }
  })

  storage.set('patients', patients)

  // remove patient from dom
  wrapper.remove()

  // only delete without notification
  if (onlyDelete) {
    modal.create(true, config.deleteSuccess)
    return
  }

  user.notification(userHash, doctor)
}
