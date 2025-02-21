//@ts-ignore
import { auth, shouldAuthenticate } from './auth.js'

class LoginDialog extends HTMLElement {
  modal: HTMLDivElement
  content: HTMLDivElement
  onCloseCallback?: () => void
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.modal = document.createElement('div')
    this.modal.classList.add('modal')
    shadowRoot.appendChild(this.modal)

    this.content = document.createElement('div')
    this.content.classList.add('modal-content')
    this.modal.appendChild(this.content)

    this.content.innerHTML = `
  <div class="container">
    <div class="imgcontainer">
      <img src="/data/TrebroLogo2025Resized.png" alt="Logo" class="logo">
    </div>
    <label for="uname"><b>Username</b></label>
    <input id="uname" type="text" placeholder="Enter Username" name="uname" required>
    ${
      shouldAuthenticate
        ? `<label for="psw"><b>Password</b></label>
    <input id="psw" type="password" placeholder="Enter Password" name="psw" required>`
        : ``
    }
    <button type="submit" id="login">Login</button>
  </div>`

    const uname = <HTMLInputElement>this.shadowRoot!.getElementById('uname')
    let psw: HTMLInputElement
    if (shouldAuthenticate) {
      psw = <HTMLInputElement>this.shadowRoot!.getElementById('psw')
      psw.addEventListener('input', () => {
        psw.style.border = ''
      })
    }

    let userData: any
    auth.getUserData().then((result: any) => {
      userData = result ? result : {}
      if (result) {
        psw.value = result.password
        uname.value = result.firstName
      }
    })

    // When the user clicks on <span> (x), close the modal
    const loginBtn = <HTMLButtonElement>this.shadowRoot!.getElementById('login')
    loginBtn.onclick = async () => {
      userData.firstName = uname.value
      userData.lastName = ''
      userData.password = shouldAuthenticate ? psw.value : ''
      userData.username = uname.value

      try {
        await auth.setUserData(userData)
      } catch (e) {
        // Authentication failed.
        psw.style.border = '2px solid #f00'
        return
      }
      this.close()
    }

    const styleTag = document.createElement('style')
    styleTag.appendChild(
      document.createTextNode(`
    /* The Modal (background) */
    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
      background-color: #eeeeee;
      margin: 15% auto; /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
      max-width: 600px;
    }

    /* The Close Button */
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    /* Full-width inputs */
    input[type=text], input[type=password] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    /* Set a style for all buttons */
    button {
      background-color: #f36f21;
      color: black;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
    }

    /* Add a hover effect for buttons */
    button:hover {
      opacity: 0.8;
    }

    /* Extra style for the cancel button (red) */
    .cancelbtn {
      width: auto;
      padding: 10px 18px;
      background-color: #f44336;
    }

    /* Center the avatar image inside this container */
    .imgcontainer {
      text-align: center;
      margin: 24px 0 12px 0;
    }

    /* Avatar image */
    img.avatar {
      height: 40px;
    }

    /* Add padding to containers */
    .container {
      padding: 16px;
    }

    /* The "Forgot password" text */
    span.psw {
      float: right;
      padding-top: 16px;
    }

    /* Change styles for span and cancel button on extra small screens */
    @media screen and (max-width: 300px) {
      span.psw {
        display: block;
        float: none;
      }
      .cancelbtn {
        width: 100%;
      }
    }

    /* Style for the logo image */
    .logo {
      width: 200px; /* Adjust the width as needed */
      height: auto;
    }
  `)
    )
    shadowRoot.appendChild(styleTag)
  }

  show(onCloseCallback: () => void) {
    this.onCloseCallback = onCloseCallback

    if (shouldAuthenticate) {
      auth.isAuthenticated().then((result: any) => {
        if (result) this.close()
      })
    }

    this.modal.style.display = 'block'
  }

  close() {
    this.modal.style.display = 'none'
    if (this.onCloseCallback) this.onCloseCallback()
  }
}

customElements.define('login-dialog', LoginDialog)

export { LoginDialog }
