import config from 'config'

//
// get user hash from url
// --------------------------------------------------

export default () => {
  if (!config.hash) localStorage.removeItem('user')
  if (config.user || config.user === '') return

  const user = config.hash.replace('#', '')

  localStorage.setItem('user', user)
  config.user = user
}
