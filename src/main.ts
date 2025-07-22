// main.ts

import { LoginDialog } from './login-dialog'
import './drop-zone'
import './login-dialog'
import auth from './auth'

// Utility: Check for "auth" query parameter and set a cookie if found.
function setAuthFromQueryParam() {
  const params = new URLSearchParams(window.location.search);
  const authParam = params.get("auth");
  if (authParam) {
    // Set a cookie named "auth" valid for the entire domain.
    // Adjust Max-Age and other attributes as needed.
    document.cookie = `auth=${authParam}; Path=/; Expires=Fri, 31 Dec 2099 23:59:59 GMT; Secure; SameSite=None`;

    // Optionally, remove the "auth" query parameter from the URL:
    window.history.replaceState({}, document.title, window.location.pathname);

    console.log("Auth parameter found and cookie set:", authParam);
  }
}

// Run this check as soon as the script loads.
setAuthFromQueryParam();

async function init() {
  const iframe = document.getElementById('catalog') as HTMLIFrameElement;
  const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;

  // Check if user is already authenticated (via the "auth" cookie)
  if (await auth.isAuthenticated()) {
    // If authenticated, show the main content
    iframe.src = 'https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk';
    logoutButton.style.display = 'block';
  } else {
    // If not authenticated, clear the content and show the login dialog
    iframe.src = '';
    logoutButton.style.display = 'none';
    loginDialog.show(() => {
      // After the dialog closes (successful login), run init again
      init();
    });
  }

  // Handle logout
  logoutButton.onclick = async () => {
    await auth.signOut();
    iframe.src = '';
    logoutButton.style.display = 'none';
    // Show the login again so the user can re-auth
    loginDialog.show(() => {
      init();
    });
  }
}

// Grab a reference to your <login-dialog> element
const loginDialog = document.getElementById('login') as LoginDialog;

// Show the login dialog when the page first loads.
// After the user logs in (or closes the dialog), call `init()`.
loginDialog.show(() => {
  init();
});
