/* eslint-disable no-undef, camelcase, no-console */

import {name, version} from 'package'
import 'babel-polyfill'
import config from 'config'
import user from '@utils/user'
import data from '@utils/database'

__webpack_public_path__ = config.assets.js

//
// main javascript file
// --------------------------------------------------

const app = () => {
  console.log(`%c${name}: v${version}`, 'color: #6a6a6a')

  // create the user and get the data
  user.create()
  data.get()
}

if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
