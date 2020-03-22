import config from 'config'
import remove from './remove'

//
// create a single patient
// --------------------------------------------------

export default (name, phone, user = null, doctor) => {
  const list = document.querySelector(config.userList)
  const div = document.createElement('div')
  const inner = document.createElement('div')
  const buttonSend = document.createElement('button')
  const buttonDelete = document.createElement('button')
  const spanUser = document.createElement('span')
  const spanPhone = document.createElement('span')
  const spanTime = document.createElement('span')
  const spanDoctor = document.createElement('span')
  const label = document.querySelector(config.userList).querySelector('label')

  label.classList.remove(config.isClose)

  div.className = 'list-wrapper'
  inner.className = 'list-inner'
  buttonSend.innerHTML = 'SMS schicken'
  buttonSend.className = 'send primary'
  buttonDelete.innerHTML = 'Patient löschen'
  buttonDelete.className = 'doctor-remove icon icon-remove'

  const d = new Date()
  const time = d.toLocaleTimeString() + ' Uhr'

  spanUser.innerHTML = name
  spanPhone.innerHTML = phone
  spanTime.innerHTML = time
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
