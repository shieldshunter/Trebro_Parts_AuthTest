import { LoginDialog } from './login-dialog'
import './drop-zone'
import './login-dialog'
// import './logout-button'
// import { LogoutButton } from './logout-button'
import { auth } from './auth'

function init() {
  const iframe = <HTMLIFrameElement>document.getElementById('catalog')
  iframe.src = 'https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk'

  const logoutButton = <HTMLButtonElement>document.getElementById('logoutButton')
  logoutButton.style.display = 'block'
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('zeaUserData')
    iframe.src = ''
    login.show(() => {
      // When it is closed, init the scene.
      init()
    })
  })
}

// Show the login page.
const login = <LoginDialog>document.getElementById('login')
login.show(() => {
  // When it is closed, init the scene.
  init()
})
