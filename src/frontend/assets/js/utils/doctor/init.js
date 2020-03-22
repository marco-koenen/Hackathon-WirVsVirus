import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'
import remove from './remove'

//
// initiate doctor list
// --------------------------------------------------

export default () => {
  const doctors = storage.get('doctors')
  const select = document.querySelector(config.doctorSelect)
  const list = document.querySelector(config.doctorList)
  const fallbackText = document.querySelector(config.doctorList).querySelector('p')

  if (!select || !doctors) {
    fallbackText.classList.remove(config.isHidden)
    return
  }

  fallbackText.classList.add(config.isHidden)

  doctors.forEach(doctor => {
    // append select items
    const option = document.createElement('option')

    option.text = doctor.name
    option.value = doctor.value

    select.appendChild(option)

    // append list items
    const div = document.createElement('div')
    const inner = document.createElement('div')
    const span = document.createElement('span')
    const buttonRemove = document.createElement('button')

    div.className = 'list-wrapper'
    inner.className = 'list-inner'
    buttonRemove.className = 'doctor-remove icon icon-remove'
    span.innerHTML = doctor.name

    inner.append(span)
    inner.append(buttonRemove)
    div.append(inner)
    list.append(div)

    buttonRemove.addEventListener('click', event => remove(event, doctor.name))
  })
}
