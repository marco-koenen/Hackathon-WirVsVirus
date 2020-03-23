import config from 'config'

//
// validates a phone number
// --------------------------------------------------

export default number => {
  return number.match(/\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/)
}
