import { loadJulia, loadMandelbrot } from "./render"

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

      const cx =
        Number(cxInput.value)

      const cy =
        Number(cyInput.value)

      const scale =
        Number(scaleInput.value)

      // マンデルブロ集合を描画
      loadMandelbrot(
        mandelbrotCanvas,
        cx,
        cy,
        scale,
      )

      // 対応するジュリア集合を描画
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
}
