import storage from '@utils/localStorage'

//
// send notification to patient
// --------------------------------------------------

export default (event, onlyDelete = false) => {
  const button = event.target
  const wrapper = button.parentNode
  const user = button.getAttribute('user')
  const patients = storage.get('patients')

  // remove patient from local storage
  patients.forEach((patient, index) => {
    if (patient.user === user) {
      patients.splice(index, 1)
    }
  })

  storage.set('patients', patients)

  // remove patient from dom
  wrapper.remove()

  if (onlyDelete) return

  console.warn('send notification to user: ' + user)
}
