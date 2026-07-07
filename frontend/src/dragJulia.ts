import { redraw } from "./redraw"

import type {
  MandelbrotState,
  JuliaState,
} from "./redraw"

export function setupJuliaDrag(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  let dragging = false

  let lastX = 0
  let lastY = 0

  juliaCanvas.addEventListener(
    "mousedown",
    (event) => {

      dragging = true

      lastX = event.offsetX
      lastY = event.offsetY

    },
  )

  juliaCanvas.addEventListener(
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

  juliaCanvas.addEventListener(
    "mouseleave",
    () => {

      dragging = false

    },
  )

  juliaCanvas.addEventListener(
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
        3.0 / juliaState.scale

      const height =
        3.0 / juliaState.scale

      juliaState.viewCx -=
        dx / juliaCanvas.width * width

      juliaState.viewCy +=
        dy / juliaCanvas.height * height
    },
  )
}
