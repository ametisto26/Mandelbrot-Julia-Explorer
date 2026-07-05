import { redraw } from "./redraw"

import type {
  MandelbrotState,
  JuliaState,
} from "./redraw"

export function setupZoom(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  mandelbrotCanvas.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault()

      const oldScale =
        mandelbrotState.scale

      const newScale =
        event.deltaY < 0
          ? oldScale * 1.2
          : oldScale / 1.2

      const x =
        event.offsetX
        / mandelbrotCanvas.clientWidth

      const y =
        1
        - event.offsetY
        / mandelbrotCanvas.clientHeight

      const viewWidth =
        3.0 / oldScale

      const viewHeight =
        3.0 / oldScale

      const xmin =
        mandelbrotState.cx
        - viewWidth / 2

      const ymin =
        mandelbrotState.cy
        - viewHeight / 2

      const mouseCx =
        xmin + x * viewWidth

      const mouseCy =
        ymin + y * viewHeight

      const newViewWidth =
        3.0 / newScale

      const newViewHeight =
        3.0 / newScale

      mandelbrotState.cx =
        mouseCx
        - (x - 0.5) * newViewWidth

      mandelbrotState.cy =
        mouseCy
        - (y - 0.5) * newViewHeight

      mandelbrotState.scale =
        newScale

      // 入力欄を更新
      cxInput.value =
        String(mandelbrotState.cx)

      cyInput.value =
        String(mandelbrotState.cy)

      scaleInput.value =
        String(mandelbrotState.scale)

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
