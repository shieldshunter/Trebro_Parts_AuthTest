var k=Object.defineProperty;var v=(a,e,o)=>e in a?k(a,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[e]=o;var p=(a,e,o)=>v(a,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();let b=!1;class C extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"loadFileCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const s=i=>{b&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),i.preventDefault()},t=i=>{i.preventDefault()},n=i=>{if(i.dataTransfer){for(var l=0;l<i.dataTransfer.items.length;l++)if(i.dataTransfer.items[l].kind==="file"){const h=i.dataTransfer.items[l].getAsFile();h&&m(h)}}i.preventDefault()},c=i=>{for(var l=0;l<i.target.files.length;l++){let h=i.target.files[l];m(h)}i.preventDefault()},m=i=>{const l=new FileReader;l.addEventListener("load",()=>{const h=l.result,E=i.name;this.loadFile(h,E)},!1),l.readAsDataURL(i)},r=this.shadowRoot.getElementById("dropHotSpot");r.addEventListener("change",c),r.addEventListener("drop",n),document.body.addEventListener("dragover",t),document.body.addEventListener("dragenter",s),document.body.addEventListener("drop",n);const d=document.createElement("style");d.appendChild(document.createTextNode(`
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

`)),o.appendChild(d),this.hide()}display(o){this.loadFileCallback=o,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(o,s){this.hide(),b=!0,this.loadFileCallback&&this.loadFileCallback(o,s)}}customElements.define("drop-zone",C);async function w(){const a="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=racwdli&st=2025-03-10T16:47:55Z&se=2025-08-01T00:47:55Z&sv=2022-11-02&sr=c&sig=4BjCw6SBZmI606wTM3GEQUYRcuhRQMlgKrj0Wy%2B4Y8g%3D";try{const e=await fetch(a,{cache:"no-cache"});if(!e.ok)throw new Error(`Failed to fetch whitelisted emails: ${e.statusText}`);const o=await e.json(),s=new Set;return o.forEach(t=>{s.add(t.Email.toLowerCase())}),console.log("Fetched whitelisted emails:",s),s}catch(e){return console.error("Error fetching whitelist. Returning fallback set:",e),new Set(["hshields@trebro.com"])}}let x=[];(async()=>{const a=await w();x=Array.from(a)})();function L(a){const e=document.cookie.match(new RegExp("(^| )"+a+"=([^;]+)"));return e?decodeURIComponent(e[2]):null}class S{async isAuthenticated(){return!!L("auth")}async setUserData(e){const o=e.email.toLowerCase();if(!x.includes(o))throw new Error("Email not registered. Please request access.");window.localStorage.zeaUserData=JSON.stringify({email:o})}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async signOut(){localStorage.removeItem("zeaUserData"),document.cookie="auth=; Path=/; Max-Age=0"}}const u=new S;let f=null;function T(a){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)}class F extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"onCloseCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
      <div class="container">
        <div class="imgcontainer">
          <img src="data/TrebroLogo2025.png" alt="Logo" class="logo">
        </div>
        <label for="uname"><b>Email</b></label>
        <input id="uname" type="text" placeholder="Enter Email" name="uname" required>

        <!-- CHANGED: remove password container entirely -->
        <button type="submit" id="sendLinkBtn" style="display: none;">Send Magic Link</button>

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
    `;const s=this.shadowRoot.getElementById("uname"),t=this.shadowRoot.getElementById("sendLinkBtn"),n=this.shadowRoot.getElementById("msFormContainer"),c=this.shadowRoot.getElementById("msForm");s.addEventListener("input",async()=>{const r=s.value.trim().toLowerCase();f||(f=await w()),T(r)?Array.from(f).some(i=>i.startsWith(r))?(t.style.display="block",n.style.display="none"):(t.style.display="none",c.src="https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u&embed=true",n.style.display="block"):(t.style.display="none",n.style.display="none")}),t.onclick=async()=>{const r=s.value.trim().toLowerCase();await u.setUserData({email:r}),t.disabled=!0,t.innerHTML='<span class="loader"></span> Sending...';try{const d=await fetch("https://trebrosinglesignon.azurewebsites.net/api/send_magic_link_function",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})});d.ok||console.log(`Failed to send magic link: ${d.statusText}`),alert("Magic link sent! Check your email."),this.close()}catch(d){console.log(`Error: ${d}`)}finally{t.innerHTML="Send Magic Link",t.disabled=!1}};const m=document.createElement("style");m.appendChild(document.createTextNode(`
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
        .loader {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3; 
          border-top: 2px solid #3498db;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `)),o.appendChild(m)}show(o){this.onCloseCallback=o,u.isAuthenticated().then(s=>{s?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",F);function M(){const e=new URLSearchParams(window.location.search).get("auth");e&&(document.cookie=`auth=${e}; Path=/; Max-Age=3600; Secure; SameSite=None`,window.history.replaceState({},document.title,window.location.pathname),console.log("Auth parameter found and cookie set:",e))}M();async function g(){const a=document.getElementById("catalog"),e=document.getElementById("logoutButton");await u.isAuthenticated()?(a.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(a.src="",e.style.display="none",y.show(()=>{g()})),e.onclick=async()=>{await u.signOut(),a.src="",e.style.display="none",y.show(()=>{g()})}}const y=document.getElementById("login");y.show(()=>{g()});
