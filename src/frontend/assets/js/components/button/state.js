import config from 'config'

//
// handle button state
// --------------------------------------------------

export default event => {
  // add isLoading state when the button was clicked
  if (event) {
    event.target.classList.add(config.isLoading)
  }

  // remove loading state when no event is given
  else if (!event) {
    const button = document.querySelector('button.' + config.isLoading)

    button && button.classList.remove(config.isLoading)
  }
}
