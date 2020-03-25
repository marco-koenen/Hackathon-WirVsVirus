import config from 'config'
import modal from '@components/modal'

//
// send activation message
// --------------------------------------------------

export default () => {
  const mail = config.mail.replace('(at)', '@')
  const subject = 'Patients Pager: Warteraum aktivieren'
  const body = 'Bitte aktivieren Sie folgenden Warteraum: [' + config.room + ']'
  const link = 'mailto:' + mail + '?subject=' + subject + '&body=' + body

  modal.remove('modal-room-activate', 130)

  window.location.href = link
}
