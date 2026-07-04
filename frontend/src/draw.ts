import { loadMandelbrot } from "./render"

export function setupDraw(
  button: HTMLButtonElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement
) {

  button.addEventListener(
    "click",
    () => {

      loadMandelbrot(
        Number(cxInput.value),
        Number(cyInput.value),
        Number(scaleInput.value)
      )

    }
  )

}
