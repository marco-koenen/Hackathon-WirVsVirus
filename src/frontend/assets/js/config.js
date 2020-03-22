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

  // conditionals
  isLoading: 'is-loading',
  isHidden: 'is-hidden',
  isVisible: 'is-visble',

  // global selectors
  content: document.querySelector('.page-content'),

  // global classNames
  view: '.view',
  userDashboard: '.user-dashboard',
  waitingRoom: '.waiting-room',
  createWaitingRoom: '.create-waiting-room',
  doctorCreate: '.doctor-create',
  doctorName: '.doctor-name',
  doctorSelect: '.doctor-select',
  roomCreate: '.room-create',
  roomRemove: '.room-remove',
  userCreate: '.user-create',
  userName: 'input.user-name',
  userPhone: 'input.user-phone',

  // miscs
  hash: window.location.hash,
  lang: document.documentElement.lang,
  room: localStorage.getItem('room') || null,
  user: localStorage.getItem('user') || null,
  poll: null,
  pollInterval: 1000 * 30,
  pollTimeout: 1000 * 60 * 30,

  // messages
  notificationSuccess: 'Der Patient hat eine SMS erhalten',
  notificationError: 'Es ist leider ein Fehler aufgetreten',
  deleteSuccess: 'Der Patient wurde erfolgreich gelöscht.',
  doctorAlreadyAvailable: 'Dieser Arzt ist bereits in der Liste',
  generalError: 'Es ist leider ein Problem aufgetreten. Bitte versuchen Sie es später noch einmal.'
}

export default config
