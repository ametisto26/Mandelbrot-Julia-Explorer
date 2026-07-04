import { loadMandelbrot } from "./render"

export function setupZoom(
  canvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement
) {

  canvas.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault()

      const oldScale =
        Number(scaleInput.value)

      const newScale =
        event.deltaY < 0
          ? oldScale * 1.2
          : oldScale / 1.2

      const x =
        event.offsetX / canvas.clientWidth

      const y =
        1 - event.offsetY / canvas.clientHeight

      const viewWidth =
        3.0 / oldScale

      const viewHeight =
        3.0 / oldScale

      const xmin =
        Number(cxInput.value)
        - viewWidth / 2

      const ymin =
        Number(cyInput.value)
        - viewHeight / 2

      const mouseCx =
        xmin + x * viewWidth

      const mouseCy =
        ymin + y * viewHeight

      const newViewWidth =
        3.0 / newScale

      const newViewHeight =
        3.0 / newScale

      const newCx =
        mouseCx
        - (x - 0.5) * newViewWidth

      const newCy =
        mouseCy
        - (y - 0.5) * newViewHeight

      cxInput.value =
        String(newCx)

      cyInput.value =
        String(newCy)

      scaleInput.value =
        String(newScale)

      loadMandelbrot(
        newCx,
        newCy,
        newScale
      )

    },
    {
      passive: false
    }
  )

}
