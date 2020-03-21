import config from 'config'

//
// update user's dashboard
// --------------------------------------------------

export default data => {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const hash = data.hash
  const phone = data.phone
  const room = data.room
  const status = data.status

  div.className = 'dashboard-item'
  p.innerHTML = 'Status: ' + status

  div.append(p)
  document.body.append(div)

  console.warn(data)
}
