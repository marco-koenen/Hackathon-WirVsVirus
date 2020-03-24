import config from 'config'
import dom from '@utils/dom'

//
// enter key
// --------------------------------------------------

export default event => {
  const element = event.target
  const enter = dom.hasClass(element, 'trigger-enter')

  // trigger: add doctor, add patient
  if (enter) {
    const wrapper = element.parentNode
    const button = wrapper.querySelector('.js-enter')
    const buttonClickDuration = 150

    button.click()
    button.classList.add(config.isHover)

    setTimeout(() => button.classList.remove(config.isHover), buttonClickDuration)
  }
}
