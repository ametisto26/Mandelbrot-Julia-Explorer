import "../style.css"

import { setupDrag } from "./drag"
import { setupZoom } from "./zoom"

import { setupJuliaDrag } from "./dragJulia"
import { setupJuliaZoom } from "./zoomJulia"

import { setupDraw } from "./draw"
import { redraw } from "./redraw"
import { saveCanvas, saveCombinedCanvas } from "./saveCanvas"

import type { MandelbrotState, JuliaState } from "./redraw"

// ====================
// UIの生成
// ====================

const app =
  document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Mandelbrot–Julia Explorer</h1>

  <div class="controls">

    <section class="panel">
      <h2>Mandelbrot Set</h2>

      <h3>Mandelbrot parameter</h3>

      <label>View center</label>

      <div class="row">
        <span>Re(z):</span>
        <input id="cx" value="-0.75">
      </div>

      <div class="row">
        <span>Im(z):</span>
        <input id="cy" value="0.1">
      </div>

      <div class="row">
        <span>Scale:</span>
        <input id="scale" value="1">
      </div>

      <button id="draw">
        Draw
      </button>
    </section>

    <section class="panel">

      <h2>Julia Set</h2>

      <h3>Julia parameter</h3>

      <div class="row">
        <span>Re(c):</span>
        <span id="julia-re">-0.75</span>
      </div>

      <div class="row">
        <span>Im(c):</span>
        <span id="julia-im">0.10</span>
      </div>

      <h3>View center</h3>

      <div class="row">
        <span>Re(z):</span>
        <span id="view-re">0.0</span>
      </div>

      <div class="row">
        <span>Im(z):</span>
        <span id="view-im">0.0</span>
      </div>

      <div class="row">
        <span>Scale:</span>
        <input
          id="julia-scale"
          value="1"
        >
      </div>

      <div class="row">
        <span>Render:</span>
        <span id="render-time">--</span>
      </div>

      <div class="row">
        <span>Resolution:</span>
        <span id="resolution">--</span>
      </div>

      <div class="row">
        <span>Iterations:</span>
        <span id="iterations">--</span>
      </div>

      <button id="julia-home">
          Home
      </button>

    </section>

  </div>

  <div class="viewer">

    <div>
      <canvas id="mandelbrot"></canvas>
    </div>

    <div>
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

const juliaHomeButton =
  document.querySelector<HTMLButtonElement>("#julia-home")!

const juliaScaleInput =
  document.querySelector<HTMLInputElement>("#julia-scale")!

// ====================
// 状態
// ====================

const mandelbrotState: MandelbrotState = {
  cx: -0.75,
  cy: 0.1,
  scale: 1,
}

const juliaState: JuliaState = {
  viewCx: 0.0,
  viewCy: 0.0,
  scale: 1,
}

// ====================
// ユーザー操作を登録
// ====================

// ----------
// Mandelbrot側
// ----------
// ドラッグによる平行移動
setupDrag(
  mandelbrotCanvas,
  juliaCanvas,
  cxInput,
  cyInput,
  scaleInput,
  mandelbrotState,
  juliaState,
)

// ホイールによるズーム
setupZoom(
  mandelbrotCanvas,
  juliaCanvas,
  cxInput,
  cyInput,
  scaleInput,
  mandelbrotState,
  juliaState,
)

// ----------
// Julia側
// ----------
// ドラッグによる平行移動
setupJuliaDrag(
  mandelbrotCanvas,
  juliaCanvas,
  mandelbrotState,
  juliaState,
)

// ホイールによるズーム
setupJuliaZoom(
  mandelbrotCanvas,
  juliaCanvas,
  mandelbrotState,
  juliaState,
)

// Julia集合の表示初期化
juliaHomeButton.addEventListener("click", () => {

    juliaState.viewCx = 0.0
    juliaState.viewCy = 0.0
    juliaState.scale  = 1.0

    redraw(
        mandelbrotCanvas,
        juliaCanvas,
        mandelbrotState,
        juliaState,
    )
})

// ----------
// 共通操作
// ----------
// Drawボタンによる再描画
setupDraw(
  drawButton,
  mandelbrotCanvas,
  juliaCanvas,
  mandelbrotState,
  juliaState,
  cxInput,
  cyInput,
  scaleInput,
  juliaScaleInput,
)

// Sキー押下による画像保存
window.addEventListener("keydown", (event) => {

  // 入力欄にフォーカス中は無効
  const target = event.target as HTMLElement

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    return
  }

  // Sキー以外は無視
  if (
    event.key !== "s" &&
    event.key !== "S"
  ) {
    return
  }

  // ブラウザの「名前を付けて保存」を防ぐ
  event.preventDefault()

  // Sキーで保存
  if (event.key === "s" || event.key === "S") {

    const parameter =
        `${mandelbrotState.cx.toFixed(6)}_${mandelbrotState.cy.toFixed(6)}`

    const mandelbrotZoom =
        `m${mandelbrotState.scale.toFixed(0)}`

    const juliaZoom =
        `j${juliaState.scale.toFixed(0)}`

    const mandelbrotName =
        `mandelbrot_${parameter}_${mandelbrotZoom}.png`

    const juliaName =
        `julia_${parameter}_${juliaZoom}.png`

    const combinedName =
        `mandelbrot_julia_${parameter}_${mandelbrotZoom}_${juliaZoom}.png`

    saveCanvas(
      mandelbrotCanvas,
      mandelbrotName,
    )

    saveCanvas(
      juliaCanvas,
      juliaName,
    )

    saveCombinedCanvas(
      mandelbrotCanvas,
      juliaCanvas,
      combinedName,
    )
  }
})

// ====================
// 初期表示
// ====================

redraw(
  mandelbrotCanvas,
  juliaCanvas,
  mandelbrotState,
  juliaState,
)
