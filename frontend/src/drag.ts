import {
  loadJulia,
  loadMandelbrot,
} from "./render"

export function setupDrag(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
) {

  let dragging = false

  let lastX = 0
  let lastY = 0

  mandelbrotCanvas.addEventListener(
    "mousedown",
    (event) => {

      dragging = true

      lastX = event.offsetX
      lastY = event.offsetY

    }
  )

  mandelbrotCanvas.addEventListener(
    "mouseup",
    () => {

      if (!dragging) {
        return
      }

      dragging = false

      const cx =
        Number(cxInput.value)

      const cy =
        Number(cyInput.value)

      const scale =
        Number(scaleInput.value)

      // マンデルブロ集合を再描画
      loadMandelbrot(
        mandelbrotCanvas,
        cx,
        cy,
        scale,
      )

      // 対応するジュリア集合を再描画
      loadJulia(
        juliaCanvas,
        0.0,
        0.0,
        cx,
        cy,
        scale,
      )

    }
  )

  mandelbrotCanvas.addEventListener(
    "mouseleave",
    () => {

      dragging = false

    }
  )

  mandelbrotCanvas.addEventListener(
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
        - dx / mandelbrotCanvas.width * width
      )

      cyInput.value = String(
        Number(cyInput.value)
        + dy / mandelbrotCanvas.height * height
      )

    }
  )
}
