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
  juliaCxInput: HTMLInputElement,
  juliaCyInput: HTMLInputElement,
  juliaScaleInput: HTMLInputElement,
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

      juliaState.viewCx =
        Number(juliaCxInput.value)

      juliaState.viewCy =
        Number(juliaCyInput.value)

      juliaState.scale =
        Number(juliaScaleInput.value)

      redraw(
        mandelbrotCanvas,
        juliaCanvas,
        mandelbrotState,
        juliaState,
      )
    }
  )
}
