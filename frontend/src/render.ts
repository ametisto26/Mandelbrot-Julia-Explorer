import { colorMap } from "./colormap"

export async function loadMandelbrot(
  cx: number,
  cy: number,
  scale: number
) {
  const canvas =
  document.querySelector<HTMLCanvasElement>("#canvas")!

  const ctx = canvas.getContext("2d")!

  const response = await fetch(
    `http://localhost:8000/mandelbrot?cx=${cx}&cy=${cy}&scale=${scale}`
  )

  const data = await response.json()

  canvas.width = data.width
  canvas.height = data.height

  canvas.style.width = "800px"
  canvas.style.height = "800px"

  canvas.style.imageRendering = "auto"  

  const imageData =
    ctx.createImageData(
      data.width,
      data.height
    )

  for (let y = 0; y < data.height; y++) {

    for (let x = 0; x < data.width; x++) {

      const value = data.data[
        data.height - 1 - y
      ][x]

      const i =
        (y * data.width + x) * 4

      const c = colorMap(
        value,
        data.max_iter
      )

      imageData.data[i]     = c.r
      imageData.data[i + 1] = c.g
      imageData.data[i + 2] = c.b
      imageData.data[i + 3] = 255
    }
  }

  ctx.putImageData(
    imageData,
    0,
    0
  )

}
