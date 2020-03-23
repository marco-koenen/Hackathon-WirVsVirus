//
// global settings
// --------------------------------------------------

const config = {
  webpack: '/assets/js/',
  origin: window.location.origin,
  hash: window.location.hash,
  lang: document.documentElement.lang,
  localhost: window.location.hostname === 'localhost',
  room: localStorage.getItem('room') || null,
  user: localStorage.getItem('user') || null,
  fetch: {
    endpoint: 'https://backend.un-chain.us/',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },

  // conditionals
  isLoading: 'is-loading',
  isError: 'is-error',
  isSuccess: 'is-success',
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
  doctorFirstName: '.doctor-first-name',
  doctorList: '.doctor-list',
  doctorTitle: '.doctor-title',
  doctorSelect: '.doctor-select',
  roomCreate: '.room-create',
  roomRemove: '.room-remove',
  userCreate: '.user-create',
  userFirstName: 'input.user-first-name',
  userName: 'input.user-name',
  userPhone: 'input.user-phone',
  userList: '.patient-list',
  userStatus: '.user-status',

  // miscs
  poll: null,
  pollInterval: 1000 * 10,
  pollTimeout: 1000 * 60 * 30,

  // timings
  pageTransitionTime: 350,

  // messages
  messageLink: 'Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden Sie unter:',
  messageCall: 'empfängt Sie jetzt. Bitte betreten Sie die Praxis.',
  notificationSuccess: 'Der Patient hat eine SMS erhalten.',
  notificationError: 'Es ist leider ein Fehler aufgetreten.',
  deleteSuccess: 'Der Patient wurde erfolgreich gelöscht.',
  doctorAlreadyAvailable: 'Dieser Arzt ist bereits in der Liste.',
  doctorMissing: 'Sie müssen mindestens einen Arzt erstellen.',
  generalError: 'Es ist leider ein Problem aufgetreten. Bitte versuchen Sie es später noch einmal.',
  missingField: 'Bitte füllen Sie alle benötigten Felder aus.',
  statusWaiting: 'Sie befinden sich aktuell in der Warteschlange.',
  statusReady: 'Sie sind als nächstes dran. Machen Sie sich bitte auf den Weg in die Praxis'
}

export default config
