//@ts-ignore
import { auth, shouldAuthenticate, shouldProvideRoomID } from './auth.js'
import { Color } from '@zeainc/zea-engine'

export const getRandomString = (charCount = 3) =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, charCount)

const getRandomRoomId = () => {
  return `${getRandomString(3)}-${getRandomString(3)}-${getRandomString(3)}`
}

const setURLParam = (key: string, value: string) => {
  var url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.pushState({}, '', url.href)
}

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
        <div class="imgcontainer">
          <img src="./data/logo-zea.svg" alt="Avatar" class="avatar">
        </div>

        <div class="container">
          <label for="uname"><b>Username</b></label>
          <input id="uname" type="text" placeholder="Enter Username" name="uname" required>

          ${
            shouldAuthenticate
              ? `<label for="psw"><b>Password</b></label>
          <input id="psw" type="password" placeholder="Enter Password" name="psw" required>`
              : ``
          }

          ${
            shouldProvideRoomID
              ? `<label for="room"><b>Room ID</b></label>
          <input id="room" type="text" placeholder="Enter Room ID" name="room" required>`
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

    let room: HTMLInputElement
    if (shouldProvideRoomID) {
      room = <HTMLInputElement>this.shadowRoot!.getElementById('room')
      const urlParams = new URLSearchParams(window.location.search)
      const roomId = urlParams.get('roomId') || getRandomRoomId()
      room.value = roomId
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
      const userId = getRandomString()
      userData.color = Color.random().toHex()
      userData.firstName = uname.value
      userData.id = userId
      userData.lastName = ''
      userData.password = shouldAuthenticate ? psw.value : ''
      userData.username = uname.value

      if (shouldProvideRoomID && room.value) setURLParam('roomId', room.value)

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
  background-color: #f9ce03;
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

`)
    )
    shadowRoot.appendChild(styleTag)
  }

  show(onCloseCallback: () => void) {
    this.onCloseCallback = onCloseCallback

    // Under a few conditions we don't need to display the dialog.
    // 1. A room id is required, and provided and cached authentication passes.
    // 2. a room id is not required, and cached authentication passes.
    const urlParams = new URLSearchParams(window.location.search)
    if (shouldAuthenticate && !shouldProvideRoomID) {
      auth.isAuthenticated().then((result: any) => {
        if (result) this.close()
      })
    } else if (shouldProvideRoomID && urlParams.has('roomId')) {
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
