import config from 'config'
import init from './init'

//
// start polling to get user data
// --------------------------------------------------

export default () => {
  if (!config.user) return

  init(
    // eslint-disable-next-line lines-around-comment
    // poll until this condition is met
    function() {
      return config.poll === true
    },

    // the condition is met
    function() {},

    // timeout
    function() {}
  )
}
