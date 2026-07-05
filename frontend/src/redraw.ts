import { loadJulia, loadMandelbrot } from "./render"
import { updateInfo } from "./updateJuliaPanel"

export type MandelbrotState = {
  cx: number
  cy: number
  scale: number
}

export type JuliaState = {
  viewCx: number
  viewCy: number
  scale: number
}

export async function redraw(
  mandelbrotCanvas: HTMLCanvasElement,
  juliaCanvas: HTMLCanvasElement,
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  await Promise.all([

    // マンデルブロ集合を描画
    loadMandelbrot(
      mandelbrotCanvas,
      mandelbrotState.cx,
      mandelbrotState.cy,
      mandelbrotState.scale,
    ),

    // 対応するジュリア集合を描画
    loadJulia(
      juliaCanvas,
      juliaState.viewCx,
      juliaState.viewCy,
      mandelbrotState.cx,
      mandelbrotState.cy,
      juliaState.scale,
    ),
  ])

  // 情報パネルを更新
  updateInfo(
    mandelbrotState,
    juliaState,
  )
}
