import notification from './notification'

//
// create a single patient
// --------------------------------------------------

export default (name, phone, user = null) => {
  const div = document.createElement('div')
  const buttonSend = document.createElement('button')
  const buttonDelete = document.createElement('button')
  const spanUser = document.createElement('span')
  const spanPhone = document.createElement('span')

  div.className = 'user-wrapper'
  buttonSend.innerHTML = 'SMS schicken'
  buttonDelete.innerHTML = 'Patient löschen'
  spanUser.innerHTML = 'Patient: ' + name
  spanPhone.innerHTML = 'Telefon: ' + phone

  div.append(buttonSend)
  div.append(buttonDelete)
  div.append(spanUser)
  div.append(spanPhone)
  document.body.append(div)

  buttonSend.setAttribute('user', user)
  buttonDelete.setAttribute('user', user)

  buttonSend.addEventListener('click', event => notification(event))
  buttonDelete.addEventListener('click', event => notification(event, true))
}
