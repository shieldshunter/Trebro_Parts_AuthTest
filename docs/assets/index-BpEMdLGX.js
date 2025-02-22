var v=Object.defineProperty;var E=(i,e,t)=>e in i?v(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var p=(i,e,t)=>E(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();let w=!1;class k extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"loadFileCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const a=n=>{w&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),n.preventDefault()},o=n=>{n.preventDefault()},s=n=>{if(n.dataTransfer){for(var l=0;l<n.dataTransfer.items.length;l++)if(n.dataTransfer.items[l].kind==="file"){const u=n.dataTransfer.items[l].getAsFile();u&&r(u)}}n.preventDefault()},d=n=>{for(var l=0;l<n.target.files.length;l++){let u=n.target.files[l];r(u)}n.preventDefault()},r=n=>{const l=new FileReader;l.addEventListener("load",()=>{const u=l.result,x=n.name;this.loadFile(u,x)},!1),l.readAsDataURL(n)},m=this.shadowRoot.getElementById("dropHotSpot");m.addEventListener("change",d),m.addEventListener("drop",s),document.body.addEventListener("dragover",o),document.body.addEventListener("dragenter",a),document.body.addEventListener("drop",s);const c=document.createElement("style");c.appendChild(document.createTextNode(`
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

`)),t.appendChild(c),this.hide()}display(t){this.loadFileCallback=t,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(t,a){this.hide(),w=!0,this.loadFileCallback&&this.loadFileCallback(t,a)}}customElements.define("drop-zone",k);async function b(){const i="https://partsmanual.blob.core.windows.net/authenticationhash/credentials.json?sp=r&st=2025-02-22T04:11:14Z&se=2025-03-08T12:11:14Z&sv=2022-11-02&sr=b&sig=lbb2TljS4yUSeTo8iDYcCmQgeZVq3uu7d90h6uqg4jM%3D";try{const e=await fetch(i);if(!e.ok)throw new Error(`Failed to fetch auth data: ${e.statusText}`);const t=await e.json(),a={};return t.forEach(o=>{a[o.Email.toLowerCase()]=o.Password}),console.log("Fetched authentication data:",a),a}catch(e){return console.error("Error fetching authentication data:",e),{}}}let h={};(async()=>h=await b())();async function C(){return Object.keys(h).length===0&&(h=await b()),h}async function L(i){const e=new TextEncoder().encode(i),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(o=>o.toString(16).padStart(2,"0")).join("")}class T{async isAuthenticated(){const e=await this.getUserData();return!e||!e.email?!1:h[e.email.toLowerCase()]===e.hashedPassword||!1}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async setUserData(e){{const t=e.email.toLowerCase();if(!h[t])throw new Error("Email not registered. Please request access.");if(!e.password)throw new Error("Password not provided.");const a=await L(e.password);if(h[t]!==a)throw new Error("Wrong password.");e.hashedPassword=a,e.password="".padEnd(6,"*")}window.localStorage.zeaUserData=JSON.stringify(e)}async signOut(){localStorage.removeItem("zeaUserData")}}const f=new T;class A extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"onCloseCallback");const t=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),t.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
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
    `;const a=this.shadowRoot.getElementById("uname"),o=this.shadowRoot.getElementById("passwordContainer"),s=this.shadowRoot.getElementById("login"),d=this.shadowRoot.getElementById("requestAccess");let r=null;r=this.shadowRoot.getElementById("psw"),r.addEventListener("input",()=>{r.style.border=""}),f.getUserData().then(c=>{c&&r&&(r.value=c.password,a.value=c.firstName)}),a.addEventListener("input",async()=>{const c=a.value.trim().toLowerCase(),n=await C();c===""?(o.style.display="none",s.style.display="none",d.style.display="block"):n[c]?(o.style.display="block",s.style.display="block",d.style.display="none"):(o.style.display="none",s.style.display="none",d.style.display="block")}),d.style.display="block",d.addEventListener("click",()=>{window.open("https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u","_blank")}),s.onclick=async()=>{const c=a.value.trim().toLowerCase(),n=r==null?void 0:r.value.trim();try{await f.setUserData({email:c,password:n}),this.close()}catch(l){console.warn("Authentication failed:",l),l instanceof Error?alert(l.message):alert("An unknown error occurred"),r&&(r.style.border="2px solid red")}};const m=document.createElement("style");m.appendChild(document.createTextNode(`
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
      `)),t.appendChild(m)}show(t){this.onCloseCallback=t,f.isAuthenticated().then(a=>{a?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",A);async function y(){const i=document.getElementById("catalog"),e=document.getElementById("logoutButton");await f.isAuthenticated()?(i.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(i.src="",e.style.display="none",g.show(()=>{y()})),e.onclick=async()=>{await f.signOut(),i.src="",e.style.display="none",g.show(()=>{y()})}}const g=document.getElementById("login");g.show(()=>{y()});
