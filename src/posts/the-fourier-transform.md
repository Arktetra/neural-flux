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
\label{eq:dtft} \tag{1}
$$
And its inverse is given by,
$$
x[n] = \int_{\infty}^{\infty} X(\omega) e^{j \omega n} d \omega
\label{eq:idtft} \tag{2}
$$
The DTFT calculates the frequency spectrum of a discrete-time signal. Its result is continuous in frequency as well as periodic.

## The Discrete Fourier Transform
The DTFT can not directly be computed by a computer as it requires the calculation of an infinite summation. Discrete Fourier transform (DFT) resolves this problem by assuming a finite length signal.

Let $x[n]$ be non-zero only for $0 \le n \le N - 1$. Then, the DTFT can be computed as,
$$
X(\omega) = \sum_{n = 0}^{N - 1} x[n] e^{-j \omega n}
\label{eq:dft_unsampled} \tag{3}
$$

Since, the time domain consists of only $N$ samples, the frequency domain will also have only $N$ independent samples,
$$
\begin{align}
X[k] &= X(\omega_k) \\
&= \sum_{n = 0}^{N - 1} x[n] e^{-j \omega_k n} \\
&= \sum_{n = 0}^{N - 1} x[n] e^{-j 2\pi n k / N}
\label{eq:dft} \tag{4}
\end{align}
$$
where, $\omega_k = \dfrac{2 \pi k}{n}$, $0 \le k \le N - 1$.

Equation $\eqref{eq:dft}$ is the DFT, and its inverse is given by,
$$
x[n] = \frac{1}{N}\sum_{k = 0}^{N - 1} X[k] e ^{j 2 \pi n k / N}
\label{eq:idft} \tag{5}
$$

### The DFT matrix
For $N$ points, the DFT represents the data using sine and cosine functions with integer multiples of a fundamental frequency in the twiddle factor, $w_N = e^{-2\pi j / N}$.

From $\eqref{eq:dft}$, it can be observed that the DFT is a linear operator which maps data points $\textbf{x}$ in spatial domain to $\textbf{X}$ in frequency domain. 

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
\label{eq:dft-matrix} \tag{6}
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
\label{eq:2d-dft}
\tag{7}
\end{equation}
$$
And its inverse as,
$$
\begin{equation}
x[m, n] = \frac{1}{MN}\sum_{k = 0}^{M - 1} \bigg[\sum_{l = 0}^{N - 1} X[k, l] e^{j 2\pi n k / N} \bigg] e^{j 2\pi m l / N}
\label{eq:2d-idft} \tag{8}
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

### Using DTFT Matrix

From $\eqref{eq:dft-matrix}$, it can be observed that the DFT can be computed if we can compute $\textbf{W}$. The code to compute it is given below:

```python
def dft_matrix(N: int = 256):
    w = np.exp(-2 * np.pi * 1.j / N)

    j, k = np.meshgrid(np.arange(N), np.arange(N))
    W = np.power(w, j * k)
    return W
```

If we visualize the real part of $\textbf{W}$ for $N = 512$, then we obtain:

```python
W_512 = DFT_matrix(N=512)

px.imshow(np.real(W_512), width=600, height=600)
```

![W_512](fourier/W_512.png)

Now, the 1D DFT can be implemented as,

```python
def dft(x):
    W = dft_matrix(x.shape[-1])
    return W @ x
```

And the 2D DFT can be implemented as,

```python
def dft2(x):
    W = DFT_matrix(x.shape[-1])
    X = W @ x
    W = DFT_matrix(x.shape[-2])
    return (W @ X.T).T
```

Now, let's apply our implementation to perform the discrete Fourier transform. For this we need to obtain an image first

```python
url = "https://c02.purpledshub.com/uploads/sites/48/2024/04/helix-nebula.jpg"
img = Image.open(requests.get(url, stream=True).raw).convert("L").resize((512, 512))
```

![Eye Nebula](fourier/eye_nebula.png)

Now, we can apply the discrete Fourier transform on it

```python
img_np = np.array(img)
img_dft2 = dft2(img_np)
```

Let us check that our implementation is correct by comparing it with the fast fourier transform provided by numpy.

```python
img_fft2 = np.fft.fft2(img_np)
print(np.isclose(img_dft2, img_fft2).all())
```

The above code results in the following output

```bash
np.True_
```

This means that our implementation is correct.

Let us visualize the transformed image.

```python
plt.imshow(np.log(np.abs(img_dft2)**2))
```

![Eye Nebuala DFT2](fourier/eye_nebula_dft2.png)

Based on our current implementation, the frequencies [0, 0] is at the top left corner. Centering the Fourier transform can make it easier to interpret the frequency content of the image. However, to center the transform, we require negative frequency components. So, where are these negative frequency components? The second half of the frequency components are the negative frequency components.

```python
def dftshift(x, axes=None):
    if axes is None:
        axes = tuple(range(x.ndim))
        shift = [dim // 2 for dim in x.shape]
    elif isinstance(axes, integer_types):
        shift = x.shape[axes] // 2
    else:
        shift = [x.shape[ax] // 2 for ax in axes]

    return np.roll(x, shift, axes)
```

Now, the fourier transform of the image can be centered as,

```python
shifted_img_dft2 = dftshift(img_dft2)
plt.imshow(np.log(np.abs(shifted_img_dft2)**2))
```

![Eye Nebula DFT2 Shifted](fourier/eye_nebula_dft2_shifted.png)

### Using Basis Images

Equation $\eqref{eq:2d-dft}$ can be written as,
$$
X[k, l] = \sum_{m = 0}^{M - 1} \sum_{n = 0}^{N - 1} x[m, n] \underbrace{e^{-j 2\pi (n k  + m l) / N}}_{\text{forms basis image}}
\label{eq:2d-dft-basis} \tag{9}
$$
The exponential part in the above equation forms the basis image for horizontal $k$ and vertical frequency $l$ when evaluated at each pixel coordinates $(m, n)$

```python
def dft_basis_2d(N: int, M: int, u: int, v: int):
    n, m = np.meshgrid(np.arange(0, N), np.arange(0, M), indexing="ij")
    return np.exp(-1.j * 2 * np.pi * (n * u / N + m * v / M), dtype=np.complex128)
```

It can be observed that an image of width $M=8$ and height $N=8$ will have $8 \times 8 = 64$ basis images as shown below

```python
M, N = 8, 8
fig, axes = plt.subplots(M, N, figsize=(12, 12))

for i in range(M):
    for j in range(N):
        basis_img = np.real(dft_basis_2d(M, N, i, j)).astype(np.float32)
        axes[i][j].set_yticks([])
        axes[i][j].set_xticks([])
        axes[i][j].imshow(basis_img, cmap="gray", vmin=0., vmax=1.)
```

![8x8 Bases](fourier/bases.png)

The discrete Fourier transform can be performed by computing the linear combination of the pixel values in the original image with the corresponding basis images.

Implementing DFT using such linear combination is computationally expensive, so let us limit ourselve to an image of size $4 \times 4$ for now.

```python
url = "https://www.cs.montana.edu/courses/spring2005/430/lectures/06/programs/checker32.jpg"
img = Image.open(requests.get(url, stream=True).raw).convert("L").resize((4, 4))
```

![Checker Like](fourier/checker.png)

Since the image is of size $4 \times 4$, there will be 16 basis images.

![4x4 Bases](fourier/bases-4x4.png)

Then the Fourier transform can be performed using the linear combination discusses earlier as shown below

```python
M, N = 4, 4
bases = [dft_bases_2d(M, N, i, j) for j in range(M) for i in range(N)]
bases_np = np.stack(bases, axis=2)

img_dft2_lin_comb = (img_np.reshape(1, 1, -1) * bases_np).sum(axis=2).reshape(4, 4)

plt.matshow(np.log(np.abs(img_dft2_lin_comb)**2))
```

![Checker DFT Linear Combination](fourier/checker_dft2_lin_comb.png)

Let us again compare it with the fast Fourier transform from numpy to verify that it is correct.

```python
print(np.isclose(img_dft2_lin_comb, np.fft.fft2(img_np)).all())
```

```bash
np.True_
```

This means that our implementation is correct.

## References

- https://math.stackexchange.com/questions/1113398/discrete-fourier-transfomation-and-harmonics
- https://databookuw.com/
