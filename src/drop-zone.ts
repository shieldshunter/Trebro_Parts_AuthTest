let fileLoaded = false

class DropZone extends HTMLElement {
  modal: HTMLDivElement
  content: HTMLDivElement
  loadFileCallback?: (url: string, filename: string) => void
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.modal = document.createElement('div')
    this.modal.classList.add('modal')
    shadowRoot.appendChild(this.modal)

    this.content = document.createElement('div')
    this.content.classList.add('modal-content')
    this.modal.appendChild(this.content)

    this.content.innerHTML = `<div id="fileDropZone" class="fixed w-full flex h-screen">
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
  </div>`
    // const fileDropZone = this.shadowRoot.getElementById("fileDropZone");

    // Based on this answer: https://stackoverflow.com/a/61417954
    const dragEnter = (ev: Event) => {
      // To enable the drop zone to
      if (fileLoaded) {
        const fileDropZone = this.shadowRoot!.getElementById('fileDropZone')
        fileDropZone!.classList.remove('pointer-events-none')
      }
      ev.preventDefault()
    }
    const dragOver = (ev: Event) => {
      ev.preventDefault()
    }

    const handleDrop = (ev: DragEvent) => {
      if (ev.dataTransfer) {
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            const file = ev.dataTransfer.items[i].getAsFile()
            if (file) handlefile(file)
          }
        }
      }
      ev.preventDefault()
    }
    const handleSelect = (ev: Event) => {
      // @ts-ignore
      for (var i = 0; i < ev.target.files.length; i++) {
        // @ts-ignore
        let file = <File>ev.target.files[i]
        handlefile(file)
      }
      ev.preventDefault()
    }
    const handlefile = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          const url = <string>reader.result
          const filename = file.name
          this.loadFile(url, filename)
        },
        false
      )

      reader.readAsDataURL(file)
    }
    const select = <HTMLInputElement>this.shadowRoot!.getElementById('dropHotSpot')!
    select.addEventListener('change', handleSelect)
    select.addEventListener('drop', handleDrop)
    document.body.addEventListener('dragover', dragOver)
    document.body.addEventListener('dragenter', dragEnter)
    document.body.addEventListener('drop', handleDrop)

    const styleTag = document.createElement('style')
    styleTag.appendChild(
      document.createTextNode(`
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

`)
    )
    shadowRoot.appendChild(styleTag)

    this.hide()
  }

  display(loadFileCallback: (url: string, filename: string) => void) {
    this.loadFileCallback = loadFileCallback
    this.modal.style.setProperty('pointer-events', 'auto')
    this.modal.style.setProperty('display', 'block')
  }

  hide() {
    this.modal.style.setProperty('pointer-events', 'none')
    this.modal.style.setProperty('display', 'none')
  }

  private loadFile(url: string, filename: string) {
    this.hide()
    fileLoaded = true
    if (this.loadFileCallback) this.loadFileCallback(url, filename)
  }
}

customElements.define('drop-zone', DropZone)

export { DropZone }
