import config from 'config'
import storage from '@utils/localStorage'
import fallbackText from '@utils/fallbackText'

//
// remove a doctor
// --------------------------------------------------

export default (event, name) => {
  const button = event.target
  const wrapper = button.parentNode.parentNode
  const doctors = storage.get('doctors')
  const select = document.querySelector(config.doctorSelect)
  const options = select.querySelectorAll('option')

  if (!doctors) return

  // remove patient from local storage
  doctors.forEach((doctor, index) => {
    if (doctor.name === name) {
      let optionIndex = index + 1 >= doctors.length ? doctors.length : index + 1
      doctors.splice(index, 1)
      options[optionIndex].remove()
    }
  })

  storage.set('doctors', doctors)

  // remove doctors from dom
  wrapper.remove()

  // show fallback text when no doctor is available
  fallbackText.create(doctors.length === 0, config.doctorList)
}
