import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'
import remove from './remove'

//
// create a new doctor
// --------------------------------------------------

export default () => {
  const input = document.querySelector(config.doctorName)
  const doctor = input.value
  const title = document.querySelector(config.doctorTitle).value
  const label = document.querySelector(config.doctorList).querySelector('label')

  label.classList.remove(config.isClose)

  if (!doctor) {
    modal.create(false, config.missingField)
    return
  }

  const select = document.querySelector(config.doctorSelect)
  const options = select.querySelectorAll('option')
  let alreadyAvailable = false

  // check if doctor is already in list
  options.forEach(option => {
    const value = option.value
    if (value === doctor) alreadyAvailable = true
  })

  if (alreadyAvailable) {
    modal.create(false, config.doctorAlreadyAvailable)
  } else {
    const option = document.createElement('option')

    option.text = title + ' ' + doctor
    option.value = title + ' ' + doctor

    select.appendChild(option)
    input.value = ''

    // save to local storage
    let storageDoctors = storage.get('doctors')

    storageDoctors = storageDoctors === null ? [] : storageDoctors
    storageDoctors.push({
      name: title + ' ' + doctor,
      value: title + ' ' + doctor
    })

    storage.set('doctors', storageDoctors)

    // add doctor to doctor list
    const list = document.querySelector(config.doctorList)
    const div = document.createElement('div')
    const inner = document.createElement('div')
    const span = document.createElement('span')
    const buttonRemove = document.createElement('button')

    div.className = 'list-wrapper'
    inner.className = 'list-inner'
    buttonRemove.className = 'doctor-remove icon icon-remove'
    span.innerHTML = title + ' ' + doctor

    inner.append(span)
    inner.append(buttonRemove)
    div.append(inner)
    list.append(div)

    buttonRemove.addEventListener('click', event => remove(event, doctor.name))
  }
}
