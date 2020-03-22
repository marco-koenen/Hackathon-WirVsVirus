import config from 'config'

//
// update user's dashboard
// --------------------------------------------------

export default data => {
  const content = document.querySelector(config.userDashboard)
  const div = document.createElement('div')
  const p = document.createElement('p')
  const hash = data.hash
  const phone = data.phone
  const status = data.status
  const time = data.time_created

  console.warn(data)

  div.className = 'dashboard-item ' + status
  p.innerHTML = 'Status: ' + status

  // check if this status is already visible
  const divStatus = document.querySelector('dashboard-item ' + status)
  if (divStatus) return

  // append new dashboard item
  div.append(p)
  content.append(div)
}
