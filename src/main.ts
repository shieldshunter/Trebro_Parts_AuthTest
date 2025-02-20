import { LoginDialog } from './login-dialog'
import './drop-zone'
import './login-dialog'

function init() {
  const iframe = <HTMLIFrameElement>document.getElementById('catalog')
  iframe.src = 'https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk'
}

// Show the login page.
const login = <LoginDialog>document.getElementById('login')
login.show(() => {
  // When it is closed, init the scene.
  init()
})
