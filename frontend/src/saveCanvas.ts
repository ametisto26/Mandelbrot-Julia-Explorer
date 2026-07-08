
// 画像保存
export function saveCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
) {
  const link = document.createElement("a")

  link.download = filename
  link.href = canvas.toDataURL("image/png")

  link.click()
}

// 連結画像保存（念のため）
export function saveCombinedCanvas(
  left: HTMLCanvasElement,
  right: HTMLCanvasElement,
  filename: string,
) {
  const margin = 20

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  const size = Math.max(left.width, right.width)

  canvas.width = size * 2 + margin
  canvas.height = size

  // 背景色（任意）
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.drawImage(left, 0, 0, size, size)
  ctx.drawImage(right, size + margin, 0, size, size)

  const link = document.createElement("a")

  link.download = filename
  link.href = canvas.toDataURL("image/png")

  link.click()
}
