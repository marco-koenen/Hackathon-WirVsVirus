import notification from './notification'

//
// create a patient
// --------------------------------------------------

export default (name, phone, user = null) => {
  const div = document.createElement('div')
  const button = document.createElement('button')
  const spanUser = document.createElement('span')
  const spanPhone = document.createElement('span')

  div.className = 'user-wrapper'
  button.innerHTML = 'SMS schicken'
  spanUser.innerHTML = 'Patient: ' + name
  spanPhone.innerHTML = 'Telefon: ' + phone

  div.append(button)
  div.append(spanUser)
  div.append(spanPhone)
  document.body.append(div)

  button.setAttribute('user', user)
  button.addEventListener('click', event => notification(event))
}
