//
// check if an element has a specific class
// --------------------------------------------------

export default (element, name) => {
  const className = name.replace('.', '') // clean className first
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1
}
