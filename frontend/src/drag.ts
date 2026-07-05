import { redraw } from "./redraw"

import type {
  MandelbrotState,
  JuliaState,
} from "./redraw"

export function setupDrag(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
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

    },
  )

  mandelbrotCanvas.addEventListener(
    "mouseup",
    () => {

      if (!dragging) {
        return
      }

      dragging = false

      redraw(
        mandelbrotCanvas,
        juliaCanvas,
        mandelbrotState,
        juliaState,
      )

    },
  )

  mandelbrotCanvas.addEventListener(
    "mouseleave",
    () => {

      dragging = false

    },
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

      const width =
        3.0 / mandelbrotState.scale

      const height =
        3.0 / mandelbrotState.scale

      mandelbrotState.cx -=
        dx / mandelbrotCanvas.width * width

      mandelbrotState.cy +=
        dy / mandelbrotCanvas.height * height

      // 入力欄も更新
      cxInput.value =
        String(mandelbrotState.cx)

      cyInput.value =
        String(mandelbrotState.cy)

      scaleInput.value =
        String(mandelbrotState.scale)

    },
  )
}
