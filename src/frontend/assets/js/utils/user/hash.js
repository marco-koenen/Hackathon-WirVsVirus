import config from 'config'

//
// get user hash from url
// --------------------------------------------------

export default () => {
  if (!config.hash) return

  const user = config.hash.replace('#', '')
  config.user = user
}
