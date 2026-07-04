import { redraw } from "./redraw"

// drawボタンイベント
export function setupDraw(
  drawButton: HTMLButtonElement,
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
) {

  drawButton.addEventListener(
    "click",
    () => {
      redraw(
        mandelbrotCanvas,
        juliaCanvas,
        Number(cxInput.value),
        Number(cyInput.value),
        Number(scaleInput.value),
      )
    }
  )
}
