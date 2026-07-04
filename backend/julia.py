import time

import numpy as np
from numba import njit, prange


@njit(cache=True, fastmath=True)
def _julia_value(
    zr,
    zi,
    cr,
    ci,
    max_iter,
):
    LOG2 = np.log(2.0)

    for i in range(max_iter):

        zr2 = zr * zr
        zi2 = zi * zi

        if zr2 + zi2 > 4.0:

            modulus = np.sqrt(zr2 + zi2)

            return (
                i + 1
                - np.log(np.log(modulus))
                / LOG2
            )

        new_zr = zr2 - zi2 + cr
        zi = 2.0 * zr * zi + ci
        zr = new_zr

    return 0.0


@njit(cache=True, parallel=True, fastmath=True)
def _calculate(
    xmin,
    xmax,
    ymin,
    ymax,
    width,
    height,
    cr,
    ci,
    max_iter,
):
    result = np.zeros(
        (height, width),
        dtype=np.float64
    )

    dx = (xmax - xmin) / (width - 1)
    dy = (ymax - ymin) / (height - 1)

    offset = 0.25

    for py in prange(height):
        for px in range(width):

            x0 = xmin + px * dx
            y0 = ymin + py * dy

            value = (
                _julia_value(
                    x0 + offset * dx,
                    y0 + offset * dy,
                    cr,
                    ci,
                    max_iter,
                )
                + _julia_value(
                    x0 + (1.0 - offset) * dx,
                    y0 + offset * dy,
                    cr,
                    ci,
                    max_iter,
                )
                + _julia_value(
                    x0 + offset * dx,
                    y0 + (1.0 - offset) * dy,
                    cr,
                    ci,
                    max_iter,
                )
                + _julia_value(
                    x0 + (1.0 - offset) * dx,
                    y0 + (1.0 - offset) * dy,
                    cr,
                    ci,
                    max_iter,
                )
            ) * 0.25

            result[py, px] = value

    return result


def calculate_julia(
    view_cx: float,
    view_cy: float,
    cr: float,
    ci: float,
    scale: float,
):
    start = time.perf_counter()

    # 最大反復回数
    max_iter = int(
        300 + 50 * np.log2(scale + 1)
    )

    # 描画範囲
    base_width = 3.0
    base_height = 3.0

    # 解像度
    width = min(
        int(
            1200
            + 150 * np.log2(scale + 1)
        ),
        2000
    )

    height = width

    x_width = base_width / scale
    y_height = base_height / scale

    # 表示中心
    xmin = view_cx - x_width / 2
    xmax = view_cx + x_width / 2
    ymin = view_cy - y_height / 2
    ymax = view_cy + y_height / 2

    divergence_step = _calculate(
        xmin,
        xmax,
        ymin,
        ymax,
        width,
        height,
        cr,
        ci,
        max_iter,
    )

    calc_end = time.perf_counter()

    result = {
        "width": width,
        "height": height,
        "data": divergence_step.tolist(),
        "max_iter": max_iter,
    }

    json_end = time.perf_counter()

    print(
        f"calculate: "
        f"{calc_end - start:.3f}s"
    )

    print(
        f"tolist : "
        f"{json_end - calc_end:.3f}s"
    )

    return result
