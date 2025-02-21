/*********************************
 * main.ts
 *********************************/
import { LoginDialog } from './login-dialog'
import './drop-zone'
import './login-dialog'
import auth from './auth'

async function init() {
  const iframe = document.getElementById('catalog') as HTMLIFrameElement
  const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement

  // Check if user is already authenticated
  if (await auth.isAuthenticated()) {
    // If authenticated, show the main content
    iframe.src = 'https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk'
    logoutButton.style.display = 'block'
  } else {
    // If not authenticated, clear the content
    iframe.src = ''
    logoutButton.style.display = 'none'
    // Show the login dialog
    loginDialog.show(() => {
      // After the dialog closes (successful login), run init again
      init()
    })
  }

  // Handle logout
  logoutButton.onclick = async () => {
    await auth.signOut()
    iframe.src = ''
    logoutButton.style.display = 'none'
    // Show the login again so the user can re-auth
    loginDialog.show(() => {
      init()
    })
  }
}

// Grab a reference to your <login-dialog> element
const loginDialog = document.getElementById('login') as LoginDialog

// Show the login dialog when the page first loads.
// After the user logs in (or closes the dialog), call `init()`.
loginDialog.show(() => {
  init()
})
