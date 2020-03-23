import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import storage from '@utils/localStorage'
import remove from './remove'

//
// create a fallback text
// --------------------------------------------------

export default (show, className) => {
  const fallbackText = document.querySelector(className).querySelector('p')

  if (show) {
    fallbackText.classList.remove(config.isHidden)
    return
  }

  fallbackText.classList.add(config.isHidden)
}
