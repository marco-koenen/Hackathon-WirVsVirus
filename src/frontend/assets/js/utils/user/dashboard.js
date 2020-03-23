import config from 'config'

//
// update user's dashboard
// --------------------------------------------------

export default data => {
  const content = document.querySelector(config.userStatus)
  const hash = data.hash
  const phone = data.phone
  const status = data.status
  const time = data.time_created

  console.warn(data)

  content.innerHTML = status === 'waiting' ? config.statusWaiting : config.statusReady
}
