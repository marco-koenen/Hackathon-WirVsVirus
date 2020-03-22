import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'

//
// initiate doctor list
// --------------------------------------------------

export default () => {
  const doctors = storage.get('doctors')
  const select = document.querySelector(config.doctorSelect)

  if (!select || !doctors) return

  doctors.forEach(doctor => {
    const option = document.createElement('option')

    option.text = doctor.name
    option.value = doctor.value

    select.appendChild(option)
  })
}
