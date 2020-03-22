import config from 'config'
import room from '@utils/room'
import user from '@utils/user'

//
// dom bindings
// --------------------------------------------------

export default () => {
  // create new room
  const roomCreate = document.querySelector(config.roomCreate)
  roomCreate && roomCreate.addEventListener('click', room.create)

  // remove waiting room
  const roomRemove = document.querySelector(config.roomRemove)
  roomRemove && roomRemove.addEventListener('click', room.remove)

  // create user account
  const userCreate = document.querySelector(config.userCreate)
  userCreate && userCreate.addEventListener('click', user.create)
}
