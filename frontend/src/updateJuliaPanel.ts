import type { JuliaState, MandelbrotState } from "./redraw"

export function updateInfo(
  mandelbrotState: MandelbrotState,
  juliaState: JuliaState,
) {

  // Julia parameter
  document.querySelector("#julia-re")!.textContent =
    mandelbrotState.cx.toFixed(10)

  document.querySelector("#julia-im")!.textContent =
    mandelbrotState.cy.toFixed(10)

  // Julia view center
  // document.querySelector("#view-re")!.textContent =
  //   juliaState.viewCx.toFixed(10)

  // document.querySelector("#view-im")!.textContent =
  //   juliaState.viewCy.toFixed(10)

  // 入力欄
  const juliaCxInput =
    document.querySelector<HTMLInputElement>("#julia-cx")!

  const juliaCyInput =
    document.querySelector<HTMLInputElement>("#julia-cy")!

  const juliaScaleInput =
    document.querySelector<HTMLInputElement>("#julia-scale")!

  juliaCxInput.value =
    juliaState.viewCx.toString(10)

  juliaCyInput.value =
    juliaState.viewCy.toString(10)

  juliaScaleInput.value =
    juliaState.scale.toFixed(0)

}
