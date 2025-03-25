var k=Object.defineProperty;var E=(n,e,o)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;var p=(n,e,o)=>E(n,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();let b=!1;class C extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"loadFileCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const s=i=>{b&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),i.preventDefault()},t=i=>{i.preventDefault()},a=i=>{if(i.dataTransfer){for(var r=0;r<i.dataTransfer.items.length;r++)if(i.dataTransfer.items[r].kind==="file"){const h=i.dataTransfer.items[r].getAsFile();h&&m(h)}}i.preventDefault()},c=i=>{for(var r=0;r<i.target.files.length;r++){let h=i.target.files[r];m(h)}i.preventDefault()},m=i=>{const r=new FileReader;r.addEventListener("load",()=>{const h=r.result,v=i.name;this.loadFile(h,v)},!1),r.readAsDataURL(i)},l=this.shadowRoot.getElementById("dropHotSpot");l.addEventListener("change",c),l.addEventListener("drop",a),document.body.addEventListener("dragover",t),document.body.addEventListener("dragenter",s),document.body.addEventListener("drop",a);const d=document.createElement("style");d.appendChild(document.createTextNode(`
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

`)),o.appendChild(d),this.hide()}display(o){this.loadFileCallback=o,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(o,s){this.hide(),b=!0,this.loadFileCallback&&this.loadFileCallback(o,s)}}customElements.define("drop-zone",C);async function w(){const n="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=racwdli&st=2025-03-10T16:47:55Z&se=2025-08-01T00:47:55Z&sv=2022-11-02&sr=c&sig=4BjCw6SBZmI606wTM3GEQUYRcuhRQMlgKrj0Wy%2B4Y8g%3D";try{const e=await fetch(n,{cache:"no-cache"});if(!e.ok)throw new Error(`Failed to fetch whitelisted emails: ${e.statusText}`);const o=await e.json(),s=new Set;return o.forEach(t=>{s.add(t.Email.toLowerCase())}),console.log("Fetched whitelisted emails:",s),s}catch(e){return console.error("Error fetching whitelist. Returning fallback set:",e),new Set(["hshields@trebro.com"])}}let x=[];(async()=>{const n=await w();x=Array.from(n)})();function L(n){const e=document.cookie.match(new RegExp("(^| )"+n+"=([^;]+)"));return e?decodeURIComponent(e[2]):null}class S{async isAuthenticated(){return!!L("auth")}async setUserData(e){const o=e.email.toLowerCase();if(!x.includes(o))throw new Error("Email not registered. Please request access.");window.localStorage.zeaUserData=JSON.stringify({email:o})}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async signOut(){localStorage.removeItem("zeaUserData"),document.cookie="auth=; Path=/; Max-Age=0"}}const u=new S;let g=null;function T(n){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)}class F extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"onCloseCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
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
    `;const s=this.shadowRoot.getElementById("uname"),t=this.shadowRoot.getElementById("sendLinkBtn"),a=this.shadowRoot.getElementById("msFormContainer"),c=this.shadowRoot.getElementById("msForm");s.addEventListener("input",async()=>{const l=s.value.trim().toLowerCase();g||(g=await w()),T(l)?Array.from(g).some(i=>i.startsWith(l))?(t.style.display="block",a.style.display="none"):(t.style.display="none",c.src="https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u&embed=true",a.style.display="block"):(t.style.display="none",a.style.display="none")}),t.onclick=async()=>{const l=s.value.trim().toLowerCase();await u.setUserData({email:l}),t.disabled=!0,t.classList.add("loading");try{const d=await fetch("https://trebrosinglesignon.azurewebsites.net/api/send_magic_link_function",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l})});d.ok||console.log(`Failed to send magic link: ${d.statusText}`),alert("Magic link sent! Check your email."),this.close()}catch(d){console.log(`Error: ${d}`)}finally{t.disabled=!1,t.classList.remove("loading")}};const m=document.createElement("style");m.appendChild(document.createTextNode(`
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

      `)),o.appendChild(m)}show(o){this.onCloseCallback=o,u.isAuthenticated().then(s=>{s?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",F);function B(){const e=new URLSearchParams(window.location.search).get("auth");e&&(document.cookie=`auth=${e}; Path=/; Max-Age=3600; Secure; SameSite=None`,window.history.replaceState({},document.title,window.location.pathname),console.log("Auth parameter found and cookie set:",e))}B();async function f(){const n=document.getElementById("catalog"),e=document.getElementById("logoutButton");await u.isAuthenticated()?(n.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(n.src="",e.style.display="none",y.show(()=>{f()})),e.onclick=async()=>{await u.signOut(),n.src="",e.style.display="none",y.show(()=>{f()})}}const y=document.getElementById("login");y.show(()=>{f()});
