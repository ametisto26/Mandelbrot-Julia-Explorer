import { loadMandelbrot } from "./render"

export function setupDrag(
  canvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement
) {

  let dragging = false

  let lastX = 0
  let lastY = 0

  canvas.addEventListener(
    "mousedown",
    (event) => {

      dragging = true

      lastX = event.offsetX
      lastY = event.offsetY

    }
  )

  canvas.addEventListener(
    "mouseup",
    () => {

      if (!dragging) {
        return
      }

      dragging = false

      loadMandelbrot(
        Number(cxInput.value),
        Number(cyInput.value),
        Number(scaleInput.value)
      )

    }
  )

  canvas.addEventListener(
    "mouseleave",
    () => {

      dragging = false

    }
  )

  canvas.addEventListener(
    "mousemove",
    (event) => {

      if (!dragging) {
        return
      }

      const dx =
        event.offsetX - lastX

      const dy =
        event.offsetY - lastY

      lastX = event.offsetX
      lastY = event.offsetY

      const scale =
        Number(scaleInput.value)

      const width =
        3.0 / scale

      const height =
        3.0 / scale

      cxInput.value = String(
        Number(cxInput.value)
        - dx / canvas.width * width
      )

      cyInput.value = String(
        Number(cyInput.value)
        + dy / canvas.height * height
      )

    }
  )
}
