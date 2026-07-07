import { redraw } from "./redraw"

import type {
  MandelbrotState,
  JuliaState,
} from "./redraw"

export function setupJuliaZoom(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  juliaCanvas.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault()

      const oldScale =
        juliaState.scale

      const newScale =
        event.deltaY < 0
          ? oldScale * 1.2
          : oldScale / 1.2

      const x =
        event.offsetX
        / juliaCanvas.clientWidth

      const y =
        1
        - event.offsetY
        / juliaCanvas.clientHeight

      const viewWidth =
        3.0 / oldScale

      const viewHeight =
        3.0 / oldScale

      const xmin =
        juliaState.viewCx
        - viewWidth / 2

      const ymin =
        juliaState.viewCy
        - viewHeight / 2

      const mouseCx =
        xmin + x * viewWidth

      const mouseCy =
        ymin + y * viewHeight

      const newViewWidth =
        3.0 / newScale

      const newViewHeight =
        3.0 / newScale

      juliaState.viewCx =
        mouseCx
        - (x - 0.5) * newViewWidth

      juliaState.viewCy =
        mouseCy
        - (y - 0.5) * newViewHeight

      juliaState.scale =
        newScale

      redraw(
        mandelbrotCanvas,
        juliaCanvas,
        mandelbrotState,
        juliaState,
      )

    },
    {
      passive: false,
    },
  )

}
