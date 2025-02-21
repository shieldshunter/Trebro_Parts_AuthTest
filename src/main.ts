import { LoginDialog } from './login-dialog'
import './drop-zone'
import './login-dialog'
import auth from './auth'

async function init() {
  const iframe = <HTMLIFrameElement>document.getElementById('catalog')
  const logoutButton = <HTMLButtonElement>document.getElementById('logoutButton')

  if (await auth.isAuthenticated()) {
    iframe.src = 'https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk'
    logoutButton.style.display = 'block'
  } else {
    iframe.src = ''
    logoutButton.style.display = 'none'
    login.show(() => {
      // When it is closed, init the scene.
      init()
    })
  }

  logoutButton.addEventListener('click', async () => {
    await auth.signOut()
    iframe.src = ''
    logoutButton.style.display = 'none'
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
