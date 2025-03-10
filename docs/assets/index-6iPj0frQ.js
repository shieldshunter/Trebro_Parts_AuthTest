var E=Object.defineProperty;var v=(s,e,t)=>e in s?E(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var p=(s,e,t)=>v(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();let b=!1;class C extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"loadFileCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const n=a=>{b&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),a.preventDefault()},o=a=>{a.preventDefault()},i=a=>{if(a.dataTransfer){for(var r=0;r<a.dataTransfer.items.length;r++)if(a.dataTransfer.items[r].kind==="file"){const d=a.dataTransfer.items[r].getAsFile();d&&f(d)}}a.preventDefault()},c=a=>{for(var r=0;r<a.target.files.length;r++){let d=a.target.files[r];f(d)}a.preventDefault()},f=a=>{const r=new FileReader;r.addEventListener("load",()=>{const d=r.result,g=a.name;this.loadFile(d,g)},!1),r.readAsDataURL(a)},l=this.shadowRoot.getElementById("dropHotSpot");l.addEventListener("change",c),l.addEventListener("drop",i),document.body.addEventListener("dragover",o),document.body.addEventListener("dragenter",n),document.body.addEventListener("drop",i);const m=document.createElement("style");m.appendChild(document.createTextNode(`
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

`)),t.appendChild(m),this.hide()}display(t){this.loadFileCallback=t,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(t,n){this.hide(),b=!0,this.loadFileCallback&&this.loadFileCallback(t,n)}}customElements.define("drop-zone",C);async function x(){const s="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=racwdli&st=2025-03-10T16:47:55Z&se=2025-08-01T00:47:55Z&sv=2022-11-02&sr=c&sig=4BjCw6SBZmI606wTM3GEQUYRcuhRQMlgKrj0Wy%2B4Y8g%3D";try{const e=await fetch(s,{cache:"no-cache"});if(!e.ok)throw new Error(`Failed to fetch auth data: ${e.statusText}`);const t=await e.json(),n={};return t.forEach(o=>{n[o.Email.toLowerCase()]=o.Password}),console.log("Fetched authentication data:",n),n}catch(e){return console.error("Error fetching authentication data:",e),{}}}let h={};(async()=>h=await x())();async function k(){return Object.keys(h).length===0&&(h=await x()),h}async function L(s){const e=new TextEncoder().encode(s),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(o=>o.toString(16).padStart(2,"0")).join("")}class F{async isAuthenticated(){const e=await this.getUserData();return!e||!e.email?!1:h[e.email.toLowerCase()]===e.hashedPassword||!1}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async setUserData(e){{const t=e.email.toLowerCase();if(!h[t])throw new Error("Email not registered. Please request access.");if(!e.password)throw new Error("Password not provided.");const n=await L(e.password);if(h[t]!==n)throw new Error("Wrong password.");e.hashedPassword=n,e.password="".padEnd(6,"*")}window.localStorage.zeaUserData=JSON.stringify(e)}async signOut(){localStorage.removeItem("zeaUserData")}}const u=new F;function T(s){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)}class B extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"onCloseCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
      <div class="container">
        <div class="imgcontainer">
          <img src="data/TrebroLogo2025Resized.png" alt="Logo" class="logo">
        </div>
        <label for="uname"><b>Email</b></label>
        <input id="uname" type="text" placeholder="Enter Email" name="uname" required>

        <!-- Password Container (initially hidden) -->
        <div id="passwordContainer" style="display: none;">
          <label for="psw" id="pswLabel"><b>Password</b></label>
          <input id="psw" type="password" placeholder="Enter Password" name="psw" required>
        </div>

        <!-- Login button (initially hidden) -->
        <button type="submit" id="login" style="display: none;">Login</button>

        <!-- Microsoft Form container (initially hidden) -->
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
            >
            </iframe>
        </div>
    `;const n=this.shadowRoot.getElementById("uname"),o=this.shadowRoot.getElementById("passwordContainer"),i=this.shadowRoot.getElementById("login"),c=this.shadowRoot.getElementById("msFormContainer"),f=this.shadowRoot.getElementById("msForm");let l=null;l=this.shadowRoot.getElementById("psw"),l.addEventListener("input",()=>{l.style.border=""}),u.getUserData().then(a=>{a&&l&&(l.value=a.password,n.value=a.firstName)}),n.addEventListener("input",async()=>{const a=n.value.trim().toLowerCase();if(o.style.display="none",i.style.display="none",c.style.display="none",T(a)){const r=await k();Object.keys(r).some(g=>g.startsWith(a))?(o.style.display="block",i.style.display="block"):(f.src="https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u&embed=true",c.style.display="block")}}),i.onclick=async()=>{const a=n.value.trim().toLowerCase(),r=l==null?void 0:l.value.trim();try{await u.setUserData({email:a,password:r}),this.close()}catch(d){console.warn("Authentication failed:",d),d instanceof Error?alert(d.message):alert("An unknown error occurred"),l&&(l.style.border="2px solid red")}};const m=document.createElement("style");m.appendChild(document.createTextNode(`
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
      `)),t.appendChild(m)}show(t){this.onCloseCallback=t,u.isAuthenticated().then(n=>{n?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",B);async function y(){const s=document.getElementById("catalog"),e=document.getElementById("logoutButton");await u.isAuthenticated()?(s.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(s.src="",e.style.display="none",w.show(()=>{y()})),e.onclick=async()=>{await u.signOut(),s.src="",e.style.display="none",w.show(()=>{y()})}}const w=document.getElementById("login");w.show(()=>{y()});
