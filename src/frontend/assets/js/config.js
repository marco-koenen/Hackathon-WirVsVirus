//
// global settings
// --------------------------------------------------

const config = {
  fetch: {
    endpoint: 'https://backend.un-chain.us/',
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
  isClose: 'is-close',
  isOpen: 'is-open',

  // global selectors
  content: document.querySelector('.page-content'),
  overlay: document.querySelector('.overlay'),

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
  origin: window.location.origin,
  hash: window.location.hash,
  lang: document.documentElement.lang,
  room: localStorage.getItem('room') || null,
  user: localStorage.getItem('user') || null,
  poll: null,
  pollInterval: 1000 * 10,
  pollTimeout: 1000 * 60 * 30,

  // timings
  pageTransitionTime: 350,

  // messages
  messageLink: 'Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden Sie unter:',
  messageCall: 'empfängt Sie jetzt. Bitte betreten Sie die Praxis.',
  notificationSuccess: 'Der Patient hat eine SMS erhalten',
  notificationError: 'Es ist leider ein Fehler aufgetreten',
  deleteSuccess: 'Der Patient wurde erfolgreich gelöscht.',
  doctorAlreadyAvailable: 'Dieser Arzt ist bereits in der Liste.',
  doctorMissing: 'Sie müssen mindestens einen Arzt erstellen.',
  generalError: 'Es ist leider ein Problem aufgetreten. Bitte versuchen Sie es später noch einmal.'
}

export default config
