import { setupDrag } from "./drag"
import { setupZoom } from "./zoom"
import { setupDraw } from "./draw"
import { redraw } from "./redraw"

// ====================
// UIの生成
// ====================

const app =
  document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Mandelbrot–Julia Explorer</h1>

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

  <div class="viewer">
    <div>
      <h2>Mandelbrot Set</h2>
      <canvas id="mandelbrot"></canvas>
    </div>

    <div>
      <h2>Julia Set</h2>
      <canvas id="julia"></canvas>
    </div>
  </div>
`

// ====================
// UI要素の取得
// ====================

const cxInput =
  document.querySelector<HTMLInputElement>("#cx")!

const cyInput =
  document.querySelector<HTMLInputElement>("#cy")!

const scaleInput =
  document.querySelector<HTMLInputElement>("#scale")!

const drawButton =
  document.querySelector<HTMLButtonElement>("#draw")!

const mandelbrotCanvas =
  document.querySelector<HTMLCanvasElement>("#mandelbrot")!

const juliaCanvas =
  document.querySelector<HTMLCanvasElement>("#julia")!

// ====================
// ユーザー操作を登録
// ====================

// ドラッグによる平行移動
setupDrag(
  mandelbrotCanvas,
  juliaCanvas,
  cxInput,
  cyInput,
  scaleInput,
)

// ホイールによるズーム
setupZoom(
  mandelbrotCanvas,
  juliaCanvas,
  cxInput,
  cyInput,
  scaleInput,
)

// Drawボタンによる再描画
setupDraw(
  drawButton,
  mandelbrotCanvas,
  juliaCanvas,
  cxInput,
  cyInput,
  scaleInput,
)

// ====================
// 初期表示
// ====================

const initialMandelbrot = {
  cx: -0.75,
  cy: 0.1,
  scale: 1,
}

// 初期状態でマンデルブロ集合と
// 対応するジュリア集合を描画
redraw(
  mandelbrotCanvas,
  juliaCanvas,
  initialMandelbrot.cx,
  initialMandelbrot.cy,
  initialMandelbrot.scale,
)
