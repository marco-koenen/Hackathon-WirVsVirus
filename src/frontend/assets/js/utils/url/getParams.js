//
// get url parameters
// --------------------------------------------------

export default () => {
  let vars = {}

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value
  })
  return vars
}
