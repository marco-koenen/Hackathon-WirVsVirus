/* eslint-disable no-undef, camelcase, no-console */

import {name, version} from 'package'
import config from 'config'
import 'babel-polyfill'

__webpack_public_path__ = config.assets.js

//
// main javascript file
// --------------------------------------------------

const app = () => {
  console.log(`%c${name}: v${version}`, 'color: #6a6a6a')
}

if (document.readyState !== 'loading') {
  app()
} else {
  document.addEventListener('DOMContentLoaded', app)
}
