import config from 'config'
import storage from '@utils/localStorage'

//
// remove a doctor
// --------------------------------------------------

export default (event, name) => {
  const button = event.target
  const wrapper = button.parentNode.parentNode
  const doctors = storage.get('doctors')

  if (!doctors) return

  // remove patient from local storage
  doctors.forEach((doctor, index) => {
    if (doctor.name === name) {
      doctors.splice(index, 1)
    }
  })

  storage.set('doctors', doctors)

  // remove doctors from dom
  wrapper.remove()

  // show fallback text when no doctor is available
  if (doctors.length === 0) {
    const fallbackText = document.querySelector(config.doctorList).querySelector('p')
    fallbackText.classList.remove(config.isHidden)
  }
}
