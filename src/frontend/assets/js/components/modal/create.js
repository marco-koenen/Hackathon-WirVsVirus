import config from 'config'

//
// create a new modal
// --------------------------------------------------

export default (success, message) => {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const animationTime = 3000

  div.className += 'modal-wrapper '
  div.className += success ? 'is-success' : 'is-error'
  p.innerHTML = message

  div.append(p)
  document.body.append(div)

  // remove it
  setTimeout(() => div.remove(), animationTime)
}
