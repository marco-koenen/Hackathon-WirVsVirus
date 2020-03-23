import config from 'config'
import remove from './remove'
import fallbackText from '@utils/fallbackText'
import timer from '@components/timer'

//
// create a single patient
// --------------------------------------------------

export default (name, phone, user = null, doctor, time) => {
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
  fallbackText.create(!doctor, config.userList)

  div.className = 'list-wrapper'
  inner.className = 'list-inner'
  buttonSend.innerHTML = 'SMS schicken'
  buttonSend.className = 'send primary'
  buttonDelete.innerHTML = 'Patient löschen'
  buttonDelete.className = 'doctor-remove icon icon-remove'

  // start timer
  timer.start(time, spanTime)

  spanUser.innerHTML = name
  spanPhone.innerHTML = phone
  spanDoctor.innerHTML = doctor

  inner.append(buttonDelete)
  inner.append(spanUser)
  inner.append(spanPhone)
  inner.append(spanTime)
  inner.append(spanDoctor)
  div.append(inner)
  div.append(buttonSend)
  list.append(div)

  buttonSend.setAttribute('user', user)
  buttonDelete.setAttribute('user', user)

  buttonSend.addEventListener('click', event => remove(event))
  buttonDelete.addEventListener('click', event => remove(event, true))
}
