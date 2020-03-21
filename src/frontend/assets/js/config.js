//
// global settings
// --------------------------------------------------

const config = {
  fetch: {
    endpoint: 'http://dagobahsystem.no-ip.org:5000/',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  assets: {
    icons: '/assets/img/icons/',
    css: '/assets/css/',
    js: '/assets/js/'
  },

  // global selectors
  content: document.querySelector('.page-content'),

  // global classNames
  roomCreate: '.room-create',
  userCreate: '.user-create',
  userName: 'input.user-name',
  userPhone: 'input.user-phone',

  // miscs
  hash: window.location.hash,
  lang: document.documentElement.lang,
  room: localStorage.getItem('room'),
  user: localStorage.getItem('user'),
  poll: null,
  pollInterval: 1000 * 30,
  pollTimeout: 1000 * 60 * 30
}

export default config
