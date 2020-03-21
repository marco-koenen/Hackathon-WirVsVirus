import config from 'config'
import init from './init'
import user from '@utils/user'

//
// start polling to get user data
// --------------------------------------------------

export default () => {
  if (!config.hash) return

  init(
    // eslint-disable-next-line lines-around-comment
    // poll until this condition is met
    function() {
      user.get()
      return config.poll === true
    },

    // the condition is met
    function() {},

    // timeout
    function() {}
  )
}
