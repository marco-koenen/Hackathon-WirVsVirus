import config from 'config'

//
// we create the user using the hash
// --------------------------------------------------

export default () => {
  if (!config.hash) return

  const user = config.hash.replace('#', '')
  config.user = user
}
