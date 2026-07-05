import type { JuliaState, MandelbrotState } from "./redraw"

export function updateInfo(
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  // Julia parameter
  document.querySelector("#julia-re")!.textContent =
    mandelbrotState.cx.toFixed(9)

  document.querySelector("#julia-im")!.textContent =
    mandelbrotState.cy.toFixed(9)

  // Julia view center
  document.querySelector("#view-re")!.textContent =
    juliaState.viewCx.toFixed(9)

  document.querySelector("#view-im")!.textContent =
    juliaState.viewCy.toFixed(9)

  // Julia scale
  document.querySelector("#view-scale")!.textContent =
    `${juliaState.scale.toFixed(2)}×`
}
