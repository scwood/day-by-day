import EmailSent from './EmailSent';

function ConfirmEmailSent() {
  const message = 'Please click the link in that message to activate your account.'
  return <EmailSent message={message}>
}
