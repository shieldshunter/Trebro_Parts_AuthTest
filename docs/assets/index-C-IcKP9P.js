var v=Object.defineProperty;var E=(i,e,o)=>e in i?v(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var p=(i,e,o)=>E(i,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();let y=!1;class k extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"loadFileCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const n=t=>{y&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),t.preventDefault()},a=t=>{t.preventDefault()},s=t=>{if(t.dataTransfer){for(var l=0;l<t.dataTransfer.items.length;l++)if(t.dataTransfer.items[l].kind==="file"){const h=t.dataTransfer.items[l].getAsFile();h&&d(h)}}t.preventDefault()},c=t=>{for(var l=0;l<t.target.files.length;l++){let h=t.target.files[l];d(h)}t.preventDefault()},d=t=>{const l=new FileReader;l.addEventListener("load",()=>{const h=l.result,x=t.name;this.loadFile(h,x)},!1),l.readAsDataURL(t)},r=this.shadowRoot.getElementById("dropHotSpot");r.addEventListener("change",c),r.addEventListener("drop",s),document.body.addEventListener("dragover",a),document.body.addEventListener("dragenter",n),document.body.addEventListener("drop",s);const u=document.createElement("style");u.appendChild(document.createTextNode(`
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

`)),o.appendChild(u),this.hide()}display(o){this.loadFileCallback=o,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(o,n){this.hide(),y=!0,this.loadFileCallback&&this.loadFileCallback(o,n)}}customElements.define("drop-zone",k);const b=["hshields@trebro.com","Barry"],w="2d37e395cc590b4e127317494566f1aaf881f0ac1b5ff7d4180506fd682d68ea",C=!0;async function L(i){const e=new TextEncoder().encode(i),o=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}class S{async isAuthenticated(){const e=await this.getUserData();return console.log("isAuthenticated userData:",e),e&&e.hashedPassword===w||!1}async getUserData(){const{zeaUserData:e}=window.localStorage;return e?JSON.parse(e):null}async setUserData(e){{if(!e.email||!b.includes(e.email.trim().toLowerCase()))throw new Error("Email not whitelisted. Please request access.");if(!e.password)throw new Error("Password not provided.");console.log("Original userData:",e);const o=await L(e.password);if((!e.hashedPassword||e.hashedPassword!==o)&&(e.hashedPassword=o,console.log("Hashed password:",e.hashedPassword),e.password="".padEnd(6,"*")),e.hashedPassword!==w)throw new Error("Wrong password.")}console.log("Setting userData:",e),window.localStorage.zeaUserData=JSON.stringify(e)}async signOut(){console.log("Signing out"),localStorage.removeItem("zeaUserData"),console.log("User data removed:",!localStorage.getItem("zeaUserData"))}}const m=new S;class A extends HTMLElement{constructor(){super();p(this,"modal");p(this,"content");p(this,"onCloseCallback");const o=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),o.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
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

        <!-- Login button. We might hide it too if no valid email -->
        <button type="submit" id="login">Login</button>

        <!-- Request Access button initially hidden -->
        <button type="button" id="requestAccess" style="display: none; background-color: #aaa; color: white;">
          Request Access
        </button>
      </div>
    `;const n=this.shadowRoot.getElementById("uname"),a=this.shadowRoot.getElementById("passwordContainer"),s=this.shadowRoot.getElementById("login"),c=this.shadowRoot.getElementById("requestAccess");let d=null;d=this.shadowRoot.getElementById("psw"),d.addEventListener("input",()=>{d.style.border=""});let r;m.getUserData().then(t=>{r=t||{},t&&d&&(d.value=t.password,n.value=t.firstName)}),n.addEventListener("input",()=>{const t=n.value.trim().toLowerCase();b.some(l=>l.toLowerCase()===t)?(a.style.display="block",s.style.display="block",c.style.display="none"):(a.style.display="none",s.style.display="none",c.style.display="block")}),c.addEventListener("click",()=>{window.open("https://forms.office.com/Pages/ResponsePage.aspx?id=J-soOqbWJUmXJZuWlVm4i-iWZheT5UVMtvugZuufuFtUQjI1TExGSjhGTFdRTlMxRlBXTFVPV1NLMy4u","_blank")}),s.onclick=async()=>{r.firstName=n.value,r.lastName="",r.email=n.value,r.username=n.value,d&&C?r.password=d.value:r.password="";try{await m.setUserData(r)}catch(t){console.warn("Authentication failed:",t),d&&(d.style.border="2px solid #f00");return}this.close()};const u=document.createElement("style");u.appendChild(document.createTextNode(`

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
          background-color: #eeeeee;
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
      `)),o.appendChild(u)}show(o){this.onCloseCallback=o,m.isAuthenticated().then(n=>{n?this.close():this.modal.style.display="block"})}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",A);async function f(){const i=document.getElementById("catalog"),e=document.getElementById("logoutButton");await m.isAuthenticated()?(i.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(i.src="",e.style.display="none",g.show(()=>{f()})),e.onclick=async()=>{await m.signOut(),i.src="",e.style.display="none",g.show(()=>{f()})}}const g=document.getElementById("login");g.show(()=>{f()});
