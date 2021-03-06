/* eslint-disable prettier/prettier */

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
  roomActivated: localStorage.getItem('roomActivated') || false,
  user: localStorage.getItem('user') || null,
  mail: 'mako(at)4thmotion.com',
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
  isHover: 'is-hover',

  // global selectors
  content: document.querySelector('.page-content'),
  overlay: document.querySelector('.overlay'),

  // global classNames
  view: '.view',
  modal: '.modal-wrapper',
  modalClose: '.modal-close',
  userDashboard: '.user-dashboard',
  waitingRoom: '.waiting-room',
  createWaitingRoom: '.create-waiting-room',
  doctorCreate: '.doctor-create',
  doctorFirstName: '.doctor-first-name',
  doctorLastName: '.doctor-name',
  doctorList: '.doctor-list',
  doctorTitle: '.doctor-title',
  doctorSelect: '.doctor-select',
  roomCreate: '.room-create',
  roomRemove: '.room-remove',
  roomActivate: '.room-activate',
  userCreate: '.user-create',
  userFirstName: 'input.user-first-name',
  userLastName: 'input.user-name',
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
  _errorGeneral: 'Es ist leider ein Problem aufgetreten. Bitte versuchen Sie es später noch einmal.',
  _messageLink: 'Sie wurden in die Warteschlange aufgenommen. Bitte halten Sie sich in der Nähe der Praxis auf. Sobald Sie an der Reihe sind erhalten Sie von uns eine SMS.',
  _messageCall: 'empfängt Sie jetzt. Bitte betreten Sie die Praxis.',
  _messageError: 'Es ist leider ein Problem mit dem SMS-Provider aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie den Patienten an.',
  _messageSuccess: 'Der Patient hat eine SMS erhalten.',
  _roomDelete: 'Sind Sie sicher? Alle Daten werden gelöscht.',
  _roomActivated: 'Der Warteraum wurde erfolgreich freigeschaltet.',
  _roomNotActivated: 'Es können keine SMS verschickt werden, da dieser Warteraum noch nicht aktiviert ist.',
  _roomCouldNotActivated: 'Ihr Warteraum konnte nicht aktiviert werden. Bitte kontaktieren Sie unseren Support!',
  _roomInvalid: 'Der Warteraum ist nicht mehr gültig. Bitte löschen Sie alle Daten und erstellen Sie einen neuen Warteraum!',
  _patientDelete: 'Der Patient wurde erfolgreich gelöscht.',
  _doctorExists: 'Dieser Arzt ist bereits in der Liste.',
  _doctorMissing: 'Sie müssen mindestens einen Arzt erstellen.',
  _doctorRemove: 'Ihr Arzt wurde erfolgreich gelöscht.',
  _missingField: 'Bitte füllen Sie alle benötigten Felder aus.',
  _missingCode: 'Bitte geben Sie einen Aktivierungscode ein.',
  _statusWaiting: 'Sie befinden sich aktuell in der Warteschlange.',
  _statusReady: 'Sie wurden aufgerufen. Bitte betreten Sie die Praxis.',
  _waitingTime: 'Wartezeit:',
  _wrongPhone: 'Bitte geben Sie eine gültige Handynummer ein. (z.B. +491758462456)',
  _optInvalid: 'Ihr eingebener Code ist falsch.'
}

export default config
