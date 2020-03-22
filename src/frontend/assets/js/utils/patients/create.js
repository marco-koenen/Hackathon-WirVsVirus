import config from 'config'
import remove from './remove'

//
// create a single patient
// --------------------------------------------------

export default (name, phone, user = null, doctor) => {
  const content = document.querySelector(config.waitingRoom)
  const div = document.createElement('div')
  const buttonSend = document.createElement('button')
  const buttonDelete = document.createElement('button')
  const spanUser = document.createElement('span')
  const spanPhone = document.createElement('span')

  div.className = 'user-wrapper'
  buttonSend.innerHTML = 'SMS schicken'
  buttonDelete.innerHTML = 'Patient löschen'
  spanUser.innerHTML = 'Patient: ' + name
  spanPhone.innerHTML = ' / Telefon: ' + phone + ' / Doktor: ' + doctor + ' / hash: #' + user

  div.append(buttonSend)
  div.append(buttonDelete)
  div.append(spanUser)
  div.append(spanPhone)
  content.append(div)

  buttonSend.setAttribute('user', user)
  buttonDelete.setAttribute('user', user)

  buttonSend.addEventListener('click', event => remove(event))
  buttonDelete.addEventListener('click', event => remove(event, true))
}
