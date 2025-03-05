var E=Object.defineProperty;var v=(s,e,t)=>e in s?E(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var h=(s,e,t)=>v(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();let w=!1;class C extends HTMLElement{constructor(){super();h(this,"modal");h(this,"content");h(this,"loadFileCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const a=n=>{w&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),n.preventDefault()},o=n=>{n.preventDefault()},i=n=>{if(n.dataTransfer){for(var r=0;r<n.dataTransfer.items.length;r++)if(n.dataTransfer.items[r].kind==="file"){const p=n.dataTransfer.items[r].getAsFile();p&&l(p)}}n.preventDefault()},c=n=>{for(var r=0;r<n.target.files.length;r++){let p=n.target.files[r];l(p)}n.preventDefault()},l=n=>{const r=new FileReader;r.addEventListener("load",()=>{const p=r.result,x=n.name;this.loadFile(p,x)},!1),r.readAsDataURL(n)},m=this.shadowRoot.getElementById("dropHotSpot");m.addEventListener("change",c),m.addEventListener("drop",i),document.body.addEventListener("dragover",o),document.body.addEventListener("dragenter",a),document.body.addEventListener("drop",i);const d=document.createElement("style");d.appendChild(document.createTextNode(`
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

`)),t.appendChild(d),this.hide()}display(t){this.loadFileCallback=t,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(t,a){this.hide(),w=!0,this.loadFileCallback&&this.loadFileCallback(t,a)}}customElements.define("drop-zone",C);async function b(){const s="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=r&st=2025-02-22T04:11:14Z&se=2025-03-08T12:11:14Z&sv=2022-11-02&sr=b&sig=lbb2TljS4yUSeTo8iDYcCmQgeZVq3uu7d90h6uqg4jM%3D";try{const e=await fetch(s,{cache:"no-cache"});if(!e.ok)throw new Error(`Failed to fetch auth data: ${e.statusText}`);const t=await e.json(),a={};return t.forEach(o=>{a[o.Email.toLowerCase()]=o.Password}),console.log("Fetched authentication data:",a),a}catch(e){return console.error("Error fetching authentication data:",e),{}}}let u={};(async()=>u=await b())();async function L(){return Object.keys(u).length===0&&(u=await b()),u}async function k(s){const e=new TextEncoder().encode(s),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(o=>o.toString(16).padStart(2,"0")).join("")}class T{async isAuthenticated(){const e=await this.getUserData();return!e||!e.email?!1:u[e.email.toLowerCase()]===e.hashedPassword||!1}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async setUserData(e){{const t=e.email.toLowerCase();if(!u[t])throw new Error("Email not registered. Please request access.");if(!e.password)throw new Error("Password not provided.");const a=await k(e.password);if(u[t]!==a)throw new Error("Wrong password.");e.hashedPassword=a,e.password="".padEnd(6,"*")}window.localStorage.zeaUserData=JSON.stringify(e)}async signOut(){localStorage.removeItem("zeaUserData")}}const f=new T;function D(s){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)}class F extends HTMLElement{constructor(){super();h(this,"modal");h(this,"content");h(this,"onCloseCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
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
          <iframe
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u"
            width="100%"
            height="900"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    `;const a=this.shadowRoot.getElementById("uname"),o=this.shadowRoot.getElementById("passwordContainer"),i=this.shadowRoot.getElementById("login"),c=this.shadowRoot.getElementById("msFormContainer");let l=null;l=this.shadowRoot.getElementById("psw"),l.addEventListener("input",()=>{l.style.border=""}),f.getUserData().then(d=>{d&&l&&(l.value=d.password,a.value=d.firstName)}),a.addEventListener("input",async()=>{const d=a.value.trim().toLowerCase();if(o.style.display="none",i.style.display="none",c.style.display="none",D(d)){const n=await L();Object.keys(n).some(p=>p.startsWith(d))?(o.style.display="block",i.style.display="block"):c.style.display="block"}}),i.onclick=async()=>{const d=a.value.trim().toLowerCase(),n=l==null?void 0:l.value.trim();try{await f.setUserData({email:d,password:n}),this.close()}catch(r){console.warn("Authentication failed:",r),r instanceof Error?alert(r.message):alert("An unknown error occurred"),l&&(l.style.border="2px solid red")}};const m=document.createElement("style");m.appendChild(document.createTextNode(`
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
      `)),t.appendChild(m)}show(t){this.onCloseCallback=t,f.isAuthenticated().then(a=>{a?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",F);async function g(){const s=document.getElementById("catalog"),e=document.getElementById("logoutButton");await f.isAuthenticated()?(s.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(s.src="",e.style.display="none",y.show(()=>{g()})),e.onclick=async()=>{await f.signOut(),s.src="",e.style.display="none",y.show(()=>{g()})}}const y=document.getElementById("login");y.show(()=>{g()});
