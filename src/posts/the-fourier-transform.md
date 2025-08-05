---
title: The Discrete Time Fourier Transform
description: Implementation of discrete time Fourier transform in Python.
date: '2025-02-23'
categories:
    - sveltekit
    - svelte
published: true
---

This discrete time Fourier transform (DTFT) is given by,
<!-- \[ -->
<!-- \hat{f}_k = \sum_{n = 0}^{N - 1} f_j e^{-k2 \pi n k / n} -->
<!-- \] -->
$$
\begin{equation}
X[k] = \sum_{n = 0}^{N - 1} x[n] e^{-j 2\pi n k / N}
\label{eq:forward}
\tag{1}
\end{equation}
$$

and the inverse discrete time Fourier transform (IDTFT) is given by,
$$
\begin{equation}
x[k] = \frac{1}{N} \sum_{n = 0}^{N - 1} X[n] e^{i2\pi n k / N}
\tag{2}
\end{equation}
$$

For $N$ points, the DTFT represents the data using sine and cosine functions with integer multiples of a fundamental frequency in the twiddle factor, $w_N = e^{-2\pi j / N}$.

From $\eqref{eq:forward}$, it can be observed that the DTFT is a linear operator which maps data points $\textbf{x}$ in spatial domain to $\textbf{X}$ in frequency domain. 

$$
\begin{align}
\textbf{X} &= \textbf{W} \textbf{x} \\
\begin{bmatrix}
X[0] \\
X[1] \\
X[2] \\
\vdots \\
X[N - 1]
\end{bmatrix}
&=
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & w_N & w_N^2 & \cdots & w_N^{(N-1)} \\
1 & w_N^2 & w_N^4 & \cdots & w_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & w_N^{(N-1)} & w_N^{2(N-1)} & \cdots & w_N^{(N - 1)(N - 1)}
\end{bmatrix}
\begin{bmatrix}
x[0] \\
x[1] \\
x[2] \\
\vdots \\
x[N - 1]
\label{eq:DTFT-matrix} \tag{3}
\end{bmatrix} \\
\end{align}
$$
where, the DTFT $\textbf{W}$ is a unitary Vandermonde matrix.

The output vector $\textbf{X}$ contains the Fourier coefficients for the input vector $\textbf{x}$.

The 2D Discrete time Fourier transform can then be given as,
$$
\begin{equation}
X[k, l] = \frac{1}{MN} \sum_{m = 0}^{M - 1} \bigg[\sum_{n = 0}^{N - 1} x[n] e^{-j 2\pi n k / N} \bigg] e^{-j 2\pi m l / N}

\label{eq:2D-forward}
\tag{4}
\end{equation}
$$

## Implementation

### The DTFT Matrix

From $\eqref{eq:DTFT-matrix}$, it can be observed that the DTFT can be computed if we can compute $\textbf{W}$. The code to compute it is given below:

```python
import numpy as np
import plotly.express as px
import requests

from PIL import Image

def DFT_matrix(N: int = 256):
    w = np.exp(-2 * np.pi * 1.j / N)

    j, k = np.meshgrid(np.arange(N), np.arange(N))
    W = np.power(w, j * k)
    return W
```

If we visualize the real part of $\textbf{W}$ for $N = 512$, then we obtain:

```python
W_512 = DFT_matrix(N=512)

px.imshow(np.real(F), width=600, height=600)
```

![W_512](fourier/W_512.png)

Now, the 1D DTFT can be implemented as,

```python
def dft(x):
    W = DFT_matrix(x.shape[-1])
    return W @ x
```

And the 2D DTFT can be implemented as,

```python
def dft2(x):
    W = DFT_matrix(x.shape[-1])
    X = W @ x
    W = DFT_matrix(x.shape[-2])
    return W @ X.T
```
