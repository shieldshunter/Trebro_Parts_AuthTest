//@ts-ignore
import { auth, shouldAuthenticate, getCachedAuthData} from './auth.js'

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

    // Build initial HTML including hidden password container & request access button
    this.content.innerHTML = `
      <div class="container">
        <div class="imgcontainer">
          <img src="data/TrebroLogo2025Resized.png" alt="Logo" class="logo">
        </div>
        <label for="uname"><b>Username</b></label>
        <input id="uname" type="text" placeholder="Enter Username" name="uname" required>

        <!-- Container for Password Label+Input so we can hide/show together -->
        <div id="passwordContainer" style="display: none;">
          <label for="psw" id="pswLabel"><b>Password</b></label>
          <input id="psw" type="password" placeholder="Enter Password" name="psw" required>
        </div>

        <!-- Login button. Initially hidden until valid email is entered -->
        <button type="submit" id="login" style="display: none;">Login</button>

        <!-- Request Access button initially hidden -->
        <button type="button" id="requestAccess" style="display: none; background-color: #aaa; color: white;">
          Request Access
        </button>
      </div>
    `

    const uname = this.shadowRoot!.getElementById('uname') as HTMLInputElement
    const passwordContainer = this.shadowRoot!.getElementById('passwordContainer') as HTMLDivElement
    const loginBtn = this.shadowRoot!.getElementById('login') as HTMLButtonElement
    const requestAccessBtn = this.shadowRoot!.getElementById('requestAccess') as HTMLButtonElement
    let psw: HTMLInputElement | null = null

    if (shouldAuthenticate) {
      psw = this.shadowRoot!.getElementById('psw') as HTMLInputElement
      psw.addEventListener('input', () => {
        psw!.style.border = ''
      })
    }

    auth.getUserData().then((result: any) => {
      if (result && psw) {
        psw.value = result.password
        uname.value = result.firstName
      }
    })

    /*
     * Show/Hide Password + Buttons On Email Input
     */
    uname.addEventListener('input', async () => {
      const typedEmail = uname.value.trim().toLowerCase();

      // Fetch the latest credentials
      const emailPasswordMap = await getCachedAuthData();

      if (typedEmail === '') {
      // No input: Hide password & login button, show “Request Access”
      passwordContainer.style.display = 'none';
      loginBtn.style.display = 'none';
      requestAccessBtn.style.display = 'block';
      } else if (emailPasswordMap[typedEmail]) {  // Use direct lookup instead of hasOwnProperty
      // Valid email: Show password container & login button
      passwordContainer.style.display = 'block';
      loginBtn.style.display = 'block';
      requestAccessBtn.style.display = 'none';
      } else {
      // Invalid email: Hide password & login button, show “Request Access”
      passwordContainer.style.display = 'none';
      loginBtn.style.display = 'none';
      requestAccessBtn.style.display = 'block';
      }
    });

    // Show request access button by default
    requestAccessBtn.style.display = 'block';


    /*
     * Request Access Button - link to MS Form
     */
    requestAccessBtn.addEventListener('click', () => {
      window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u', '_blank')
    })

    /*
     * Login Button Click - Validate Before Login
     */
    loginBtn.onclick = async () => {
      const email = uname.value.trim().toLowerCase()
      const password = psw?.value.trim()

      try {
        await auth.setUserData({ email, password })
        this.close() // Close dialog on successful login
      } catch (error) {
        console.warn('Authentication failed:', error)
        if (error instanceof Error) {
          alert(error.message)
        } else {
          alert('An unknown error occurred')
        }
        if (psw) {
          psw.style.border = '2px solid red'
        }
      }
    }

    /*
     * Inject stylesheet
     */
    const styleTag = document.createElement('style')
    styleTag.appendChild(
      document.createTextNode(`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px);
          }
        }
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
          background-color:rgb(255, 255, 255);
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #888;
          width: 80%; /* Could be more or less, depending on screen size */
          max-width: 600px;
        }
        /* By default, hide animations (unless class is added) */
        opacity: 0;
        transform: translateY(-50px);
       }

        /* Opening animation */
        .opening-animation {
          animation: slideDown 0.4s ease forwards;
        }

        /* Closing animation */
        .closing-animation {
          animation: slideUp 0.4s ease forwards;
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

  /*
   * Shows the modal. If user is already authenticated, it closes immediately.
   */
  show(onCloseCallback: () => void) {
    this.onCloseCallback = onCloseCallback

    if (shouldAuthenticate) {
      auth.isAuthenticated().then((result: any) => {
        if (result) {
          this.close()
        } else {
          this.modal.style.display = 'block'
        }
      })
    } else {
      this.modal.style.display = 'block'
    }
  }

  /**
   * Hides the modal. Calls onCloseCallback if provided.
   */
  close() {
    this.modal.style.display = 'none'
    if (this.onCloseCallback) {
      this.onCloseCallback()
    }
  }
}

customElements.define('login-dialog', LoginDialog)
export { LoginDialog }
