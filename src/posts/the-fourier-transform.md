---
title: The Discrete Fourier Transform
description: Implementation of 2D discrete Fourier transform in Python.
date: '2025-08-06'
categories:
    - signal-processing
published: true
---

## The Discrete Time Fourier Transform
Consider a discrete time signal $x[n]$. Its discrete time Fourier transform (DTFT) is given by,
$$
X(\omega) = \sum_{n = -\infty}^{\infty} x[n] e^{-j \omega n}
$$
And its inverse is given by,
$$
x[n] = \int_{\infty}^{\infty} X(\omega) e^{j \omega n} d \omega
$$
The DTFT calculates the frequency spectrum of a discrete-time signal. Its result is continuous in frequency as well as periodic.

## The Discrete Fourier Transform
The DTFT can not directly be computed by a computer as it requires the calculation of an infinite summation. Discrete Fourier transform (DFT) resolves this problem by assuming a finite length signal.

Let $x[n]$ be non-zero only for $0 \le n \le N - 1$. Then, the DTFT can be computed as,
$$
X(\omega) = \sum_{n = 0}^{N - 1} x[n] e^{-j \omega n}
$$

Since, the time domain consists of only $N$ samples, the frequency domain will also have only $N$ independent samples,
$$
\begin{align}
X[k] &= X(\omega_k) \\
&= \sum_{n = 0}^{N - 1} x[n] e^{-j \omega_k n} \\
&= \sum_{n = 0}^{N - 1} x[n] e^{-j 2\pi n k / N}
\label{eq:DFT} \tag{4}
\end{align}
$$
where, $\omega_k = \dfrac{2 \pi k}{n}$, $0 \le k \le N - 1$.

Equation $\eqref{eq:DFT}$ is the DFT, and its inverse is given by,
$$
x[n] = \frac{1}{N}\sum_{k = 0}^{N - 1} X[k] e ^{j 2 \pi n k / N}
$$

### The DFT matrix
For $N$ points, the DFT represents the data using sine and cosine functions with integer multiples of a fundamental frequency in the twiddle factor, $w_N = e^{-2\pi j / N}$.

From $\eqref{eq:DFT}$, it can be observed that the DFT is a linear operator which maps data points $\textbf{x}$ in spatial domain to $\textbf{X}$ in frequency domain. 

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
where, the DFT matrix $\textbf{W}$ is a unitary Vandermonde matrix.

The output vector $\textbf{X}$ contains the Fourier coefficients for the input vector $\textbf{x}$.

### The 2-Dimensional Discrete Fourier Transform
The 2D DFT can then be given as,
$$
\begin{equation}
X[k, l] = \sum_{m = 0}^{M - 1} \bigg[\sum_{n = 0}^{N - 1} x[m, n] e^{-j 2\pi n k / N} \bigg] e^{-j 2\pi m l / N}
\label{eq:2D-DFT}
\tag{4}
\end{equation}
$$
And its inverse as,
$$
\begin{equation}
X[m, n] = \frac{1}{MN}\sum_{k = 0}^{M - 1} \bigg[\sum_{l = 0}^{N - 1} X[k, l] e^{j 2\pi n k / N} \bigg] e^{j 2\pi m l / N}
\end{equation}
$$

The 2D DFT can be viewed as a sequence of two 1D DFT applied to the first variable and then the second. In case of image, this means applying a 1D DFT along the column and then applying another 1D DFT along the row of the result obtained from the first transform.

## The Implementation
Let us first import the libraries that we will be using.

```python
import numpy as np
import plotly.express as px
import requests

from PIL import Image
```

### The DTFT Matrix

From $\eqref{eq:DTFT-matrix}$, it can be observed that the DFT can be computed if we can compute $\textbf{W}$. The code to compute it is given below:

```python
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

Now, the 1D DFT can be implemented as,

```python
def dft(x):
    W = DFT_matrix(x.shape[-1])
    return W @ x
```

And the 2D DFT can be implemented as,

```python
def dft2(x):
    W = DFT_matrix(x.shape[-1])
    X = W @ x
    W = DFT_matrix(x.shape[-2])
    return W @ X.T
```
