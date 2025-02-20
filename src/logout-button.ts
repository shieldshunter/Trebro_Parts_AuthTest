// //@ts-ignore
// import { auth, shouldAuthenticate } from './auth.js'

// class LogoutButton extends HTMLElement {
//   button: HTMLButtonElement
//   iframe: HTMLIFrameElement | null = null
//   constructor() {
//     super()
//     const shadowRoot = this.attachShadow({ mode: 'open' })

//     this.button = document.createElement('button')
//     shadowRoot.appendChild(this.button)
//     this.button.addEventListener('click', () => {
//       auth.logout()
//       this.iframe.src = ''
//     })

//     const styleTag = document.createElement('style')
//     styleTag.appendChild(
//       document.createTextNode(`
// `)
//     )
//     shadowRoot.appendChild(styleTag)
//   }

//   setiFrame(iframe: HTMLIFrameElement) {
//     this.iframe = iframe
//     // if (this.onCloseCallback) this.onCloseCallback()
//   }
// }

// customElements.define('logout-button', LogoutButton)

// export { LogoutButton }
