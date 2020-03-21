//
// global settings
// --------------------------------------------------

const config = {
  fetch: {
    endpoint: 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  assets: {
    icons: '/assets/img/icons/',
    css: '/assets/css/',
    js: '/assets/js/'
  },

  // global classNames
  userCreate: '.user-create',

  // miscs
  hash: window.location.hash,
  lang: document.documentElement.lang,
  user: null,
  poll: null,
  pollInterval: 1000 * 30,
  pollTimeout: 1000 * 60 * 30
}

export default config
