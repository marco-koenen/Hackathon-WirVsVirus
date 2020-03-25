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
import poll from '@utils/poll'
import room from '@utils/room'
import polyfill from '@utils/polyfill'
import doctor from '@components/doctor'
import patient from '@components/patient'
import modal from '@components/modal'

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

  // open 'activate your room' modal
  config.room && modal.open('modal-room-activate')

  // activate a room
  room.activate()

  // add dom bindings
  bindings()

  // create our lists
  patient.init()
  doctor.init()

  // start polling to get user data
  poll.start()

  // only log message for development
  if (config.localhost) {
    console.log('room: ' + config.room)
    console.log('user: ' + config.user)
  }
}

// initiate dom
if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
