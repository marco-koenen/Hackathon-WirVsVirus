import config from 'config'
import storage from '@utils/localStorage'
import fallbackText from '@utils/fallbackText'
import timer from '@components/timer'
import remove from './remove'

//
// initiate the patient list
// --------------------------------------------------

export default (data = false) => {
  const patients = data || storage.get('patients')

  // show fallback text
  fallbackText.create(!patients || patients.length === 0, config.userList)

  if (!patients) return

  // show patients list
  patients.forEach(patient => {
    const list = document.querySelector(config.userList)
    const div = document.createElement('div')
    const inner = document.createElement('div')
    const buttonSend = document.createElement('button')
    const buttonDelete = document.createElement('button')
    const spanUser = document.createElement('span')
    const spanPhone = document.createElement('span')
    const spanTime = document.createElement('span')
    const spanDoctor = document.createElement('span')

    // remove fallback text
    fallbackText.create(!patient.doctor, config.userList)

    div.className = 'list-wrapper'
    inner.className = 'list-inner'
    buttonSend.innerHTML = 'SMS schicken'
    buttonSend.className = 'send primary'
    buttonDelete.innerHTML = 'Patient löschen'
    buttonDelete.className = 'doctor-remove icon icon-remove'

    // start timer
    timer.start(patient.time, spanTime)

    spanUser.innerHTML = patient.name
    spanPhone.innerHTML = patient.phone
    spanDoctor.innerHTML = patient.doctor

    inner.append(buttonDelete)
    inner.append(spanUser)
    inner.append(spanPhone)
    inner.append(spanTime)
    inner.append(spanDoctor)
    div.append(inner)
    div.append(buttonSend)
    list.append(div)

    buttonSend.setAttribute('user', patient.user)
    buttonDelete.setAttribute('user', patient.user)

    buttonSend.addEventListener('click', event => remove(event))
    buttonDelete.addEventListener('click', event => remove(event, true))
  })
}
