import config from 'config'

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
