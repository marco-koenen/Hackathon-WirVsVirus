import config from 'config'

//
// initiate user dashboard
// --------------------------------------------------

export default (data = false) => {
  const content = document.querySelector(config.userStatus)
  const status = data.status

  // const hash = data.hash
  // const phone = data.phone
  // const time = data.time_created

  console.warn(data)

  content.innerHTML = status === 'waiting' ? config._statusWaiting : config._statusReady
}
