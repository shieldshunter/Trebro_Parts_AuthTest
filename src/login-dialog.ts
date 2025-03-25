//@ts-ignore
import { auth, shouldAuthenticate } from './auth.js'
import { fetchAuthData } from './fetchAuthData.js'; // Make sure path is correct

let cachedWhitelist: Set<string> | null = null;
function isValidEmail(email: string): boolean {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(email);
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

    // Build initial HTML including hidden password container & request access button
    this.content.innerHTML = `
      <div class="container">
        <div class="imgcontainer">
          <img src="data/TrebroLogo2025.png" alt="Logo" class="logo">
        </div>
        <label for="uname"><b>Email</b></label>
        <input id="uname" type="text" placeholder="Enter Email" name="uname" required>

        <!-- CHANGED: remove password container entirely -->
        <button id="sendLinkBtn" class="btn">
          <span class="icon-text">
            <i class="far fa-paper-plane"></i>
            <span class="text">Send Magic Link</span>
          </span>
          <span class="wave-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </button>


        <!-- Microsoft Form container (unchanged) -->
        <div id="msFormContainer" style="display: none; margin-top: 1rem;">
          <p>If you don’t have an account, please fill out the form below:</p>
          <iframe id="msForm"
            width="640px"
            height="480px"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            style="border: none; max-width: 100%; max-height: 100vh;"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen
            msallowfullscreen
          ></iframe>
        </div>
      </div>
    `;

    const uname = this.shadowRoot!.getElementById('uname') as HTMLInputElement;
    const sendLinkBtn = this.shadowRoot!.getElementById('sendLinkBtn') as HTMLButtonElement;
    const msFormContainer = this.shadowRoot!.getElementById('msFormContainer') as HTMLDivElement;
    const msForm = this.shadowRoot!.getElementById('msForm') as HTMLIFrameElement;
    /*
     * Show/Hide Password + Buttons On Email Input
     */
    uname.addEventListener('input', async () => {
      const typedEmail = uname.value.trim().toLowerCase();
    
      // Only fetch once
      if (!cachedWhitelist) {
        cachedWhitelist = await fetchAuthData();
      }
    
      if (isValidEmail(typedEmail)) {
        // Convert the set to an array and check if any item starts with typedEmail
        const partialMatchExists = Array.from(cachedWhitelist).some(
          (whitelistedEmail) => whitelistedEmail.startsWith(typedEmail)
        );
    
        if (partialMatchExists) {
          sendLinkBtn.style.display = 'block';
          msFormContainer.style.display = 'none';
        } else {
          sendLinkBtn.style.display = 'none';
          msForm.src = "https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u&embed=true";
          msFormContainer.style.display = 'block';
        }
      } else {
        // hide both if not a valid email pattern
        sendLinkBtn.style.display = 'none';
        msFormContainer.style.display = 'none';
      }
    });
    


    // By default, show requestAccess if you want



    /*
     * Request Access Button - link to MS Form
     */

    /*
     * Login Button Click - Validate Before Login
     */
    sendLinkBtn.onclick = async () => {
      const email = uname.value.trim().toLowerCase();
    
      await auth.setUserData({ email });
    
      // Activate loading animation
      sendLinkBtn.disabled = true;
      sendLinkBtn.classList.add("loading");
    
      try {
        const response = await fetch("https://trebrosinglesignon.azurewebsites.net/api/send_magic_link_function", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        if (!response.ok) {
          console.log(`Failed to send magic link: ${response.statusText}`);
        }
        alert("Magic link sent! Check your email.");
        this.close(); // close dialog
      } catch (err) {
        console.log(`Error: ${err}`);
      } finally {
        // Restore
        sendLinkBtn.disabled = false;
        sendLinkBtn.classList.remove("loading");
      }
    };
    
    
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
        border-radius: 12px;
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
        border-radius: 12px;
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
      /* Base Button Styles */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #f36f21;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        height: 45px;
        margin: auto;
        padding: 0 16px;
        transition: width 0.25s ease, height 0.25s ease, padding 0.25s ease;
        overflow: hidden;
      }

      /* Container for Icon and Text */
      .btn .icon-text {
        display: absolute;
        align-items: center;
        justify-content: center;
        transition: opacity 0.25s ease;
      }

      .btn .icon-text i {
        margin-right: 8px;
      }

      /* Wave Spinner Container (hidden by default) */
      .btn .wave-spinner {
        display: none;
      }

      /* Loading State: Button shrinks to a specific size */
      .btn.loading {
        width: 140px;
        height: 60px;
        border-radius: 25px;
        background-color:rgb(255, 255, 255);
        padding: 0; /* Remove extra padding */
      }

      /* In Loading State, remove the icon/text and reveal the spinner */
      .btn.loading .icon-text {
        display: none;
      }

      .btn.loading .wave-spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Wave Spinner Dot Styles */
      .wave-spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .wave-spinner > div {
        width: 6px;
        height: 8px; /* Start shorter */
        margin: 0 6px;
        border-radius: 25%;
        background-color: rgb(255, 255, 255);
        animation: scaling 1.2s ease-in-out infinite;
      }

      /* Set staggered animation delays for a wave effect */
      .wave-spinner > div:nth-child(1) {
        animation-delay: -0.6s;
      }
      .wave-spinner > div:nth-child(2) {
        animation-delay: -0.4s;
      }
      .wave-spinner > div:nth-child(3) {
        animation-delay: -0.2s;
      }
      .wave-spinner > div:nth-child(4) {
        animation-delay: 0s;
      }
      .wave-spinner > div:nth-child(5) {
        animation-delay: 0.2s;
      }

      /* Wave Dot Keyframes */
      @keyframes scaling {
        0%, 100% {
        transform: scaleY(0.5); /* Shorter */
        background-color:rgb(255, 255, 255);
        }
        40% {
        transform: scaleY(1.5); /* Taller */
        background-color: rgb(255, 160, 105);
        }
        50% {
        transform: scaleY(3); /* Taller */
        background-color:  #f36f21;
        }
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
