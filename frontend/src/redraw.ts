import { loadJulia, loadMandelbrot } from "./render"

export function redraw(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cx: number,
  cy: number,
  scale: number,
) {

  // マンデルブロ集合
  loadMandelbrot(
    mandelbrotCanvas,
    cx,
    cy,
    scale,
  )

  // 対応するジュリア集合
  loadJulia(
    juliaCanvas,
    0.0,
    0.0,
    cx,
    cy,
    scale,
  )

}
