/* eslint-disable no-undef, camelcase, no-console */

import {name, version} from 'package'
import 'babel-polyfill'
import 'es6-promise'
import 'isomorphic-fetch'
import 'babel-polyfill'
import config from 'config'
import bindings from 'bindings'
import page from '@utils/page'
import user from '@utils/user'
import doctor from '@utils/doctor'
import patients from '@utils/patients'
import poll from '@utils/poll'
import polyfill from '@utils/polyfill'

__webpack_public_path__ = config.webpack

//
// main javascript file
// --------------------------------------------------

const app = () => {
  console.log(`%c${name}: v${version}`, 'color: #6a6a6a')

  // pollyfills
  polyfill.forEach()
  polyfill.closest()
  polyfill.append()

  // get user hash from url
  user.hash()

  // update global variables and change view
  page.vars()
  page.view(true)

  // add dom bindings
  bindings()

  // create patient list
  patients.init()

  // create doctor list
  doctor.init()

  // start polling to get user data
  poll.start()

  console.log('page: ' + config.page)
  console.log('room: ' + config.room)
  console.log('user: ' + config.user)
}

// initiate dom
if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
