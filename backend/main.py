from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.mandelbrot import calculate_mandelbrot
from backend.julia import calculate_julia

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "hello mandelbrot-julia"
    }

@app.get("/mandelbrot")
def mandelbrot(
    cx: float,
    cy: float,
    scale: float
):
    return calculate_mandelbrot(cx, cy, scale)

@app.get("/julia")
def julia(
    view_cx: float,
    view_cy: float,
    cr: float,
    ci: float,
    scale: float
):
    return calculate_julia(view_cx, view_cy, cr, ci, scale)
