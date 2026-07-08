# Mandelbrot–Julia Explorer

An interactive visualization tool for exploring the relationship between the Mandelbrot set and Julia sets.

The project combines a FastAPI backend for high-performance numerical computation with a TypeScript frontend for interactive visualization using HTML Canvas.

---

# マンデルブロ集合・ジュリア集合可視化ツール

マンデルブロ集合とジュリア集合の対応関係を可視化するためのインタラクティブな可視化ツールです。

バックエンドでは FastAPI と Numba を用いて集合を高速に計算し，フロントエンドでは TypeScript と HTML Canvas を用いて描画を行います。

本プロジェクトは，将来的に**複素力学系の可視化・教育ツール**として発展させることを目標としています。

---

## Screenshots

### Initial View

![Initial View](images/initial_view.png)

The initial view displays the Mandelbrot parameter plane together with the corresponding Julia set.

The interface shows:

- Mandelbrot view center and zoom level
- Julia parameter \(c\)
- Julia view center and zoom level
- Rendering statistics (render time, resolution, iterations)

### Mandelbrot Set

```text
View center
Re(z) = -0.75
Im(z) = 0.10

Scale
1×
```

### Julia Set

```text
Parameter
c = -0.75 + 0.10i

View center
Re(z) = 0.00
Im(z) = 0.00

Scale
1×
```

---

### Favorite Region

![Favorite Region](images/favorite_region1.png)

A moderately magnified region showing filament structures near the boundary of the Mandelbrot set.

The Julia panel is updated automatically to visualize the dynamics associated with the current parameter.

### Mandelbrot Set

```text
View center
Re(z) = -0.74
Im(z) = 0.18

Scale
2×
```

### Julia Set

```text
Parameter
c = -0.74 + 0.18i

View center
Re(z) = 0.00
Im(z) = 0.00

Scale
2×
```

![Favorite Region](images/favorite_region2.png)

A highly magnified region exhibiting intricate self-similar structures.

The Julia view can be navigated independently using drag and zoom operations while keeping the selected parameter fixed.

### Mandelbrot Set

```text
View center
Re(z) = -0.743643887
Im(z) = 0.131825904

Scale
128×
```

### Julia Set

```text
Parameter
c = -0.743643887 + 0.131825904i

View center
Re(z) = 0.00
Im(z) = 0.00

Scale
128×
```

---

## Features

### Implemented

- Real-time correspondence between the Mandelbrot set and Julia sets
- Independent navigation of the Julia set
- Mouse drag for panning
- Mouse wheel zoom
- FastAPI backend
- TypeScript frontend
- HTML Canvas rendering
- Numba-accelerated computation
- Smooth coloring
- 2×2 supersampling

### Planned

- Click on the Mandelbrot set to change the Julia parameter
- Multiple color maps
- Favorite locations
- High-resolution image export
- Animation along parameter paths
- Orbit visualization

---

## Project Structure

```text
Mandelbrot-Julia-Explorer/
├── backend/
│   ├── main.py
│   ├── mandelbrot.py
│   └── julia.py
│
├── frontend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── render.ts
│   │   ├── redraw.ts
│   │   ├── drag.ts
│   │   ├── zoom.ts
│   │   ├── draw.ts
│   │   ├── dragJulia.ts
│   │   ├── zoomJulia.ts
│   │   ├── updateJuliaPanel.ts
│   │   └── colormap.ts
│   │
│   ├── index.html
│   └── style.css
│
└── README.md
```

---

## Run Backend

```bash
uvicorn backend.main:app --reload
```

Backend

```
http://localhost:8000
```

---

## Run Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend

```
http://localhost:5173
```

---

## Technologies

### Backend

- Python
- FastAPI
- NumPy
- Numba

### Frontend

- TypeScript
- HTML Canvas
- Vite

---

## Design

The application is intentionally separated into two independent layers.

- FastAPI is responsible only for numerical computation.
- TypeScript is responsible only for rendering and interaction.

This separation allows future extensions such as GPU computation, image export, and additional fractal families without changing the frontend architecture.

---

## Future Vision

The long-term goal of this project is to become a research and educational visualization tool for complex dynamics.

Planned extensions include interactive parameter exploration, orbit visualization, external rays, bifurcation structures, and other topics related to the dynamics of complex quadratic polynomials.

---

## Mathematical Background

This application visualizes two different complex planes.

### Mandelbrot Set (Parameter Plane)

The Mandelbrot set consists of complex parameters c for which the orbit

\[
z\_{n+1}=z_n^2+c,\qquad z_0=0
\]

remains bounded.

The left panel displays a region of this parameter plane.

### Julia Set (Dynamical Plane)

For a fixed parameter c, the Julia set is obtained by iterating

\[
z\_{n+1}=z_n^2+c
\]

for different initial values z.

The right panel displays this dynamical plane using the parameter currently selected in the Mandelbrot view.

---

## License

Licensed under the MIT License.
