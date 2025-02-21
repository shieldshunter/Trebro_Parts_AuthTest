var v=Object.defineProperty;var E=(s,e,a)=>e in s?v(s,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[e]=a;var c=(s,e,a)=>E(s,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();let y=!1;class k extends HTMLElement{constructor(){super();c(this,"modal");c(this,"content");c(this,"loadFileCallback");const a=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),a.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`;const l=n=>{y&&this.shadowRoot.getElementById("fileDropZone").classList.remove("pointer-events-none"),n.preventDefault()},t=n=>{n.preventDefault()},o=n=>{if(n.dataTransfer){for(var d=0;d<n.dataTransfer.items.length;d++)if(n.dataTransfer.items[d].kind==="file"){const p=n.dataTransfer.items[d].getAsFile();p&&h(p)}}n.preventDefault()},r=n=>{for(var d=0;d<n.target.files.length;d++){let p=n.target.files[d];h(p)}n.preventDefault()},h=n=>{const d=new FileReader;d.addEventListener("load",()=>{const p=d.result,x=n.name;this.loadFile(p,x)},!1),d.readAsDataURL(n)},i=this.shadowRoot.getElementById("dropHotSpot");i.addEventListener("change",r),i.addEventListener("drop",o),document.body.addEventListener("dragover",t),document.body.addEventListener("dragenter",l),document.body.addEventListener("drop",o);const m=document.createElement("style");m.appendChild(document.createTextNode(`
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

`)),a.appendChild(m),this.hide()}display(a){this.loadFileCallback=a,this.modal.style.setProperty("pointer-events","auto"),this.modal.style.setProperty("display","block")}hide(){this.modal.style.setProperty("pointer-events","none"),this.modal.style.setProperty("display","none")}loadFile(a,l){this.hide(),y=!0,this.loadFileCallback&&this.loadFileCallback(a,l)}}customElements.define("drop-zone",k);const b="2d37e395cc590b4e127317494566f1aaf881f0ac1b5ff7d4180506fd682d68ea";async function w(s){const e=new TextEncoder().encode(s),a=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(a)).map(o=>o.toString(16).padStart(2,"0")).join("")}class C{async isAuthenticated(){const e=await this.getUserData();return console.log("isAuthenticated userData:",e),e&&(e.hashedPassword===b||!1)}async getUserData(){const{zeaUserData:e}=window.localStorage;return e&&JSON.parse(e)}async setUserData(e){{if(!e.password)throw new Error("Password not provided.");if(console.log("Original userData:",e),(!e.hashedPassword||e.hashedPassword!==await w(e.password))&&(e.hashedPassword=await w(e.password),console.log("Hashed password:",e.hashedPassword),e.password="".padEnd(6,"*")),e.hashedPassword!==b)throw new Error("Wrong password.")}console.log("Setting userData:",e),window.localStorage.zeaUserData=JSON.stringify(e)}async signOut(){console.log("Signing out"),localStorage.removeItem("zeaUserData"),console.log("User data removed:",!localStorage.getItem("zeaUserData"))}}const u=new C;class L extends HTMLElement{constructor(){super();c(this,"modal");c(this,"content");c(this,"onCloseCallback");const a=this.attachShadow({mode:"open"});this.modal=document.createElement("div"),this.modal.classList.add("modal"),a.appendChild(this.modal),this.content=document.createElement("div"),this.content.classList.add("modal-content"),this.modal.appendChild(this.content),this.content.innerHTML=`
  <div class="container">
    <div class="imgcontainer">
      <img src="data/TrebroLogo2025Resized.png" alt="Logo" class="logo">
    </div>
    <label for="uname"><b>Username</b></label>
    <input id="uname" type="text" placeholder="Enter Username" name="uname" required>
    <label for="psw"><b>Password</b></label>
    <input id="psw" type="password" placeholder="Enter Password" name="psw" required>
    <button type="submit" id="login">Login</button>
  </div>`;const l=this.shadowRoot.getElementById("uname");let t;t=this.shadowRoot.getElementById("psw"),t.addEventListener("input",()=>{t.style.border=""});let o;u.getUserData().then(i=>{o=i||{},i&&(t.value=i.password,l.value=i.firstName)});const r=this.shadowRoot.getElementById("login");r.onclick=async()=>{o.firstName=l.value,o.lastName="",o.password=t.value,o.username=l.value;try{await u.setUserData(o)}catch{t.style.border="2px solid #f00";return}this.close()};const h=document.createElement("style");h.appendChild(document.createTextNode(`
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
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
      max-width: 600px;
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
  `)),a.appendChild(h)}show(a){this.onCloseCallback=a,u.isAuthenticated().then(l=>{l&&this.close()}),this.modal.style.display="block"}close(){this.modal.style.display="none",this.onCloseCallback&&this.onCloseCallback()}}customElements.define("login-dialog",L);async function g(){const s=document.getElementById("catalog"),e=document.getElementById("logoutButton");await u.isAuthenticated()?(s.src="https://app.zea.live/parts/9Zux5BOyy4ccTlCeoMxk",e.style.display="block"):(s.src="",e.style.display="none",f.show(()=>{g()})),e.addEventListener("click",async()=>{await u.signOut(),s.src="",e.style.display="none",f.show(()=>{g()})})}const f=document.getElementById("login");f.show(()=>{g()});
