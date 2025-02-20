// A function is used for dragging and moving
function dragElement(element: HTMLElement, leftPanel: HTMLElement, mainPanel: HTMLElement, direction: string) {
  var md: Record<any, any> // remember mouse down info

  element.onmousedown = onMouseDown

  function onMouseDown(e: MouseEvent) {
    //console.log("mouse down: " + e.clientX);
    md = {
      e,
      offsetLeft: element.offsetLeft,
      offsetTop: element.offsetTop,
      leftPanelWidth: leftPanel.offsetWidth,
      mainPanelWidth: mainPanel.offsetWidth,
      leftPanelHeight: leftPanel.offsetHeight,
      mainPanelHeight: mainPanel.offsetHeight,
    }

    document.onmousemove = onMouseMove
    document.onmouseup = () => {
      //console.log("mouse up");
      document.onmousemove = document.onmouseup = null
    }
  }

  function onMouseMove(e: MouseEvent) {
    // console.log("mouse move: " + e.clientX);
    const delta = {
      x: e.clientX - md.e.clientX,
      y: e.clientY - md.e.clientY,
    }

    if (direction === 'H') {
      // Horizontal
      // Prevent negative-sized elements
      delta.x = Math.min(Math.max(delta.x, -md.leftPanelWidth), md.mainPanelWidth)

      element.style.left = md.offsetLeft + delta.x + 'px'
      leftPanel.style.width = md.leftPanelWidth + delta.x + 'px'
      // mainPanel.style.width = md.mainPanelWidth - delta.x + "px";
    } else if (direction === 'V') {
      // Vertical
      // element.style.top = md.offsetLeft + delta.y + "px";
      mainPanel.style.height = md.mainPanelHeight - delta.y + 'px'
      // mainPanel.style.height = md.mainPanelHeight - delta.y + "px";
    }
  }
}

export default dragElement
