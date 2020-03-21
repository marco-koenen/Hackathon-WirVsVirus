import config from 'config'
import user from '@utils/user'

//
// dom bindings
// --------------------------------------------------

export default () => {
  // create user account
  const userCreate = document.querySelector(config.userCreate)

  userCreate.addEventListener('click', user.create)
}
