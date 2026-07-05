import { redraw, type JuliaState, type MandelbrotState } from "./redraw"

// drawボタンイベント
export function setupDraw(
  drawButton: HTMLButtonElement,
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
) {

  drawButton.addEventListener(
    "click",
    () => {
      
      mandelbrotState.cx =
        Number(cxInput.value)

      mandelbrotState.cy =
        Number(cyInput.value)

      mandelbrotState.scale =
        Number(scaleInput.value)

      redraw(
        mandelbrotCanvas,
        juliaCanvas,
        mandelbrotState,
        juliaState,
      )
    }
  )
}
