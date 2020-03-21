/* eslint-disable no-undef, camelcase, no-console */

import {name, version} from 'package'
import 'babel-polyfill'
import 'es6-promise'
import 'isomorphic-fetch'
import 'babel-polyfill'
import config from 'config'
import bindings from 'bindings'
import user from '@utils/user'
import patients from '@utils/patients'
import poll from '@utils/poll'
import polyfill from '@utils/polyfill'

__webpack_public_path__ = config.assets.js

//
// main javascript file
// --------------------------------------------------

const app = () => {
  console.log(`%c${name}: v${version}`, 'color: #6a6a6a')
  console.log('hash: ' + config.hash)
  console.log('room: ' + config.room)
  console.log('user: ' + config.user)

  // pollyfills
  polyfill.forEach()
  polyfill.closest()
  polyfill.append()

  // add dom bindings
  bindings()

  // get user hash from url
  user.hash()

  // create patient list
  patients.init()

  // start polling to get user data
  poll.start()
}

// initiate dom
if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
