export function updateInfo(
  viewCx: number,
  viewCy: number,
  cr: number,
  ci: number,
  scale: number,
) {

  document.querySelector("#julia-c")!.textContent =
    `${cr.toFixed(9)} + ${ci.toFixed(9)}i`

  document.querySelector("#view-re")!.textContent =
    viewCx.toFixed(9)

  document.querySelector("#view-im")!.textContent =
    viewCy.toFixed(9)

  document.querySelector("#view-scale")!.textContent =
    `${scale.toFixed(2)}×`
}
