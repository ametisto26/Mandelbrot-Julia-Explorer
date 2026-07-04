import { loadJulia, loadMandelbrot } from "./render"
import { updateInfo } from "./updateJuliaPanel"

export async function redraw(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  cx: number,
  cy: number,
  scale: number,
) {

  await Promise.all([
    loadMandelbrot(
      mandelbrotCanvas,
      cx,
      cy,
      scale,
    ),

    loadJulia(
      juliaCanvas,
      0.0,
      0.0,
      cx,
      cy,
      scale,
    ),
  ])

  updateInfo(
    0.0,
    0.0,
    cx,
    cy,
    scale,
  )
}
