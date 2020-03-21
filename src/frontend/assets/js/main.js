/* eslint-disable no-undef, camelcase, no-console */

import {name, version} from 'package'
import 'babel-polyfill'
import config from 'config'
import bindings from 'bindings'
import user from '@utils/user'
import poll from '@utils/poll'

__webpack_public_path__ = config.assets.js

//
// main javascript file
// --------------------------------------------------

const app = () => {
  console.log(`%c${name}: v${version}`, 'color: #6a6a6a')

  // add dom bindings
  bindings()

  // get user hash from url
  user.hash()

  // start polling to get user data
  poll.start()
}

// initiate dom
if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
