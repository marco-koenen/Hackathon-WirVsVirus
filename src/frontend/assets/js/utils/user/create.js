import config from 'config'
import storage from '@utils/localStorage'
import patients from '@utils/patients'

//
// create a new user
// --------------------------------------------------

export default () => {
  const phone = document.querySelector(config.userPhone).value
  const name = document.querySelector(config.userName).value
  const room = 'ö1358sfjf38'

  if (!phone || !room || !name) return

  const body = {
    phone: phone,
    room: room
  }

  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const user = data.user_hash

      if (user) {
        let storagePatients = storage.get('patients')

        patients.create(name, phone, user)

        // save the user to the patients list
        storagePatients = storagePatients === null ? [] : storagePatients
        storagePatients.push({
          user: user,
          name: name,
          phone: phone
        })

        storage.set('patients', storagePatients)
      }
    })
    .catch(error => {
      console.warn(error)
    })
}
