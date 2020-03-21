//
// set local storage item
// --------------------------------------------------

export default (key, obj) => {
  return window.localStorage.setItem(key, JSON.stringify(obj))
}
