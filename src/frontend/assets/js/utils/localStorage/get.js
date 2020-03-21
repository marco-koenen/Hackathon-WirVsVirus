//
// get local storage
// --------------------------------------------------

export default key => {
  return JSON.parse(window.localStorage.getItem(key))
}
