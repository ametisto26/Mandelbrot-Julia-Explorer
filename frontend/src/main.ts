import { loadMandelbrot } from "./render"
import { setupDrag } from "./drag"
import { setupZoom } from "./zoom"
import { setupDraw } from "./draw"

// アプリケーションのUIを生成
const app = document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Mandelbrot Explorer</h1>

  <div>
    <label>
      cx:
      <input id="cx" value="-0.75">
    </label>

    <label>
      cy:
      <input id="cy" value="0.1">
    </label>

    <label>
      scale:
      <input id="scale" value="1">
    </label>

    <button id="draw">
      Draw
    </button>
  </div>

  <canvas id="canvas"></canvas>
`

// UI要素を取得
const cxInput =
  document.querySelector<HTMLInputElement>("#cx")!

const cyInput =
  document.querySelector<HTMLInputElement>("#cy")!

const scaleInput =
  document.querySelector<HTMLInputElement>("#scale")!

const drawButton =
  document.querySelector<HTMLButtonElement>("#draw")!

const canvas =
  document.querySelector<HTMLCanvasElement>("#canvas")!

// イベントを登録
setupDrag(
  canvas,
  cxInput,
  cyInput,
  scaleInput
)

setupZoom(
  canvas,
  cxInput,
  cyInput,
  scaleInput
)

setupDraw(
  drawButton,
  cxInput,
  cyInput,
  scaleInput
)

// 初期描画
loadMandelbrot(
  -0.75,
  0.1,
  1
)
