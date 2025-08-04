var k=Object.defineProperty;var E=(a,t,n)=>t in a?k(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n;var c=(a,t,n)=>E(a,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();let b=!1;class S extends HTMLElement{constructor(){super();c(this,"modal");c(this,"content");c(this,"loadFileCallback");const n=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),n.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
    <input
      accept=".zcad, .gltf, .glb, gltf, .obj"
      multiple
      type="file"
      class="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0"
      id="dropHotSpot"
    />
      <div
        class="border-2 border-gray-400 py-12 justify-center items-center p-4 m-auto rounded-lg w-3/12 h-1/3 bg-gray-200 bg-opacity-25 hover:bg-blue-200 hover:bg-opacity-25 text-black grid justify-items-center"
      >
        <div class="m-auto">
          <div class="flex flex-col space-y-2 items-center justify-center">
            <i class="fas fa-cloud-upload-alt fa-3x text-currentColor" />
            <p class="text-gray-700 text-center">Drag your gltf, obj or zcad files here or click in this area.</p>
          </div>
        </div>
      </div>
  </div>`;const s=i=>{b&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),i.preventDefault()},e=i=>{i.preventDefault()},o=i=>{if(i.dataTransfer){for(var r=0;r<i.dataTransfer.items.length;r++)if(i.dataTransfer.items[r].kind==="file"){const l=i.dataTransfer.items[r].getAsFile();l&&p(l)}}i.preventDefault()},d=i=>{for(var r=0;r<i.target.files.length;r++){let l=i.target.files[r];p(l)}i.preventDefault()},p=i=>{const r=new FileReader;r.addEventListener("load",()=>{const l=r.result,v=i.name;this.loadFile(l,v)},!1),r.readAsDataURL(i)},h=this.shadowRoot.getElementById("dropHotSpot");h.addEventListener("change",d),h.addEventListener("drop",o),document.body.addEventListener("dragover",e),document.body.addEventListener("dragenter",s),document.body.addEventListener("drop",o);const m=document.createElement("style");m.appendChild(document.createTextNode(`
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
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
  background-color: #eeeeee88;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  max-width: 600px;
}

`)),n.appendChild(m),this.hide()}display(n){this.loadFileCallback=n,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(n,s){this.hide(),b=!0,this.loadFileCallback&&this.loadFileCallback(n,s)}}customElements.define("drop-zone",S);async function w(){const a="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-12-13T00:40:19Z&st=2025-08-04T15:25:19Z&spr=https,http&sig=7LSdsX4SkTUHUfRuVEKC0MPln0K0G1kAhOY1v9bJUKs%3D";try{console.log("Attempting to fetch whitelist from Azure blob...");const t=await fetch(a,{cache:"no-cache",method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});if(console.log("Response status:",t.status),console.log("Response statusText:",t.statusText),!t.ok)throw console.error(`HTTP Error ${t.status}: ${t.statusText}`),t.status===403&&console.error("Access forbidden - SAS token may have expired or CORS not configured"),new Error(`Failed to fetch whitelisted emails: ${t.status} ${t.statusText}`);const n=await t.text();console.log("Raw response:",n);let s;try{s=JSON.parse(n)}catch(o){throw console.error("Failed to parse JSON response:",o),new Error("Invalid JSON response from blob storage")}const e=new Set;return Array.isArray(s)?s.forEach(o=>{typeof o=="string"?e.add(o.toLowerCase()):o&&typeof o=="object"&&(o.Email?e.add(o.Email.toLowerCase()):o.email&&e.add(o.email.toLowerCase()))}):s&&typeof s=="object"&&Object.values(s).forEach(o=>{typeof o=="string"&&o.includes("@")&&e.add(o.toLowerCase())}),console.log("Fetched whitelisted emails:",e),e.size===0?(console.warn("No emails found in the response, using fallback"),new Set(["hshields@trebro.com"])):e}catch(t){return console.error("Error fetching whitelist. Error details:",t),t instanceof TypeError&&t.message.includes("fetch")&&console.error("Network error - check CORS settings and SAS token"),console.log("Returning fallback email set"),new Set(["hshields@trebro.com","test@trebro.com","admin@trebro.com"])}}let x=[];(async()=>{const a=await w();x=Array.from(a)})();function C(a){{const n=new URLSearchParams(window.location.search),s=n.get("auth");if(s){document.cookie=`auth=${encodeURIComponent(s)}; Path=/; Expires=Fri, 31 Dec 2099 23:59:59 GMT; SameSite=None; Secure;`,n.delete("auth");const e=n.toString(),o=window.location.pathname+(e?`?${e}`:"");window.history.replaceState({},"",o)}}const t=document.cookie.match(new RegExp("(^| )"+a+"=([^;]+)"));return t?decodeURIComponent(t[2]):null}class L{async isAuthenticated(){return!!C("auth")}async setUserData(t){const n=t.email.toLowerCase();if(!x.includes(n))throw new Error("Email not registered. Please request access.");window.localStorage.zeaUserData=JSON.stringify({email:n})}async getUserData(){const{zeaUserData:t}=window.localStorage;return t?JSON.parse(t):null}async signOut(){localStorage.removeItem("zeaUserData"),document.cookie="auth=; Path=/; Max-Age=0"}}const u=new L;let f=null;function T(a){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)}class A extends HTMLElement{constructor(){super();c(this,"modal");c(this,"content");c(this,"onCloseCallback");const n=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),n.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
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
    `;const s=this.shadowRoot.getElementById("uname"),e=this.shadowRoot.getElementById("sendLinkBtn"),o=this.shadowRoot.getElementById("msFormContainer"),d=this.shadowRoot.getElementById("msForm");e.style.display="none",s.addEventListener("input",async()=>{const i=s.value.trim().toLowerCase();f||(f=await w()),T(i)?Array.from(f).some(l=>l.startsWith(i))?(e.style.display="block",o.style.display="none"):(e.style.display="none",d.src="https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u&embed=true",o.style.display="block"):(e.style.display="none",o.style.display="none")});const p=e.innerHTML,h=async()=>{const i=s.value.trim().toLowerCase();await u.setUserData({email:i}),e.disabled=!0,e.classList.add("loading");try{await fetch("https://trebrosinglesignon.azurewebsites.net/api/send_magic_link_function",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i})}),e.classList.remove("loading"),e.classList.add("success"),e.textContent="Success! Check your email",setTimeout(()=>{e.disabled=!1,e.textContent="Click to try again",e.onclick=()=>{e.classList.remove("success"),e.innerHTML=p,e.onclick=h}},1e4)}catch(r){console.error(`Error: ${r}`),e.disabled=!1,e.classList.remove("loading"),e.innerHTML=p}};e.onclick=h;const m=document.createElement("style");m.appendChild(document.createTextNode(`
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
      animation: colorTransition 0.5s ease forwards; /* Add color transition */
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
      height: 8px;
      margin: 0 6px;
      border-radius: 20%; /* Rotate to form diamond shape */
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

      /* Color Transition Animation */
      @keyframes colorTransition {
      0% {
      background-color: #f36f21;
      }
      100% {
      background-color: #ffffff;
      }
      }

      @keyframes successTransition {
        0% {

          background-color:rgb(255, 255, 255);
        }
        50% {
          background-color: #ffffff;
        }
        100% {
          background-color: #28a745;
        }
      }

      /* Success State Styling */
      .btn.success {
        animation: successTransition 0.7s ease forwards;
        background-color: #28a745;  /* Green */
        color: #fff;
      }
      `)),n.appendChild(m)}show(n){this.onCloseCallback=n,u.isAuthenticated().then(s=>{s?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",A);function F(){const t=new URLSearchParams(window.location.search).get("auth");t&&(document.cookie=`auth=${t}; Path=/; Expires=Fri, 31 Dec 2099 23:59:59 GMT; Secure; SameSite=None`,window.history.replaceState({},document.title,window.location.pathname),console.log("Auth parameter found and cookie set:",t))}F();async function g(){const a=document.getElementById("catalog"),t=document.getElementById("logoutButton");await u.isAuthenticated()?(a.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",t.style.display="block"):(a.src="",t.style.display="none",y.show(()=>{g()})),t.onclick=async()=>{await u.signOut(),a.src="",t.style.display="none",y.show(()=>{g()})}}const y=document.getElementById("login");y.show(()=>{g()});
