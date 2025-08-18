---
title: The Design of Linear Phase Finite Impulse Response Filter
description: Design of FIR filter.
date: '2025-08-15'
categories:
    - signal-processing
published: true
---

A Finite Impulse Response system is described by the following difference equation:

$$
y[n] = \sum_{k = 0}^{M - 1} b_k x[n - k]
$$

And its system function is given by,

$$
H(z) = \sum_{k = 0}^{M - 1} b_k z^{-k}
$$

To design a FIR filter with desired properties, the coefficients of the FIR filter are required. For this purpose, the coefficients of a causal FIR that closely approximates the desired frequency response specification is determined.

## Linear Phase Finite Impulse Response Filter

*The coefficients are approximated for causal FIR. these are then used as the coefficients of the required FIR.*

*Why IIR requires less memory and has lower computational complexity than FIR?*

*Are we using Linear phase FIR filter for approximation?*

*This line is better written as we considering a linear phase FIR filter*

A FIR filter has a linear phase if all the frequency comopnents of a signal are shifted in time by the same amount, resulting in a constant **group delay**, i.e.
$$
h[n] = \pm h[M - 1 - n], \quad n = 0, 1, \ldots, M - 1
$$

*Why does FIR filter need to be linear phase? Or is linear phase just a propery of FIR filter?*

*Does symmetricity and anti-symmetricity arise due to the linear phase?*

Incorporating symmetry (+) and anti-symmetry (-) conditions, for odd M,
$$
H(z) = \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] z^{-n} + h\bigg[\frac{M - 1}{2}\bigg]z^{[M - 1]/2} +  \sum_{n = \frac{M - 1}{2} + 1}^{M - 1} h[n] z^n
$$
Subtituting $n$ by $M - 1 - n$ in the last term in the above equation,
$$
\begin{align}
H(z) &= \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] z^{-n} + h\bigg[\frac{M - 1}{2}\bigg]z^{[M - 1]/2} +  \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[M - 1- n] z^{M - 1 - n} \\
&= \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] z^{-n} + h\bigg[\frac{M - 1}{2}\bigg]z^{[M - 1]/2} \pm  \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] z^{M - 1 - n} \\
&= h\bigg[\frac{M - 1}{2}\bigg]z^{[M - 1]/2} +  \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] \bigg[z^{-n} \pm z^{-(M - 1 - n)}\bigg] \\
&= z^{[M - 1]/2}\bigg[h\bigg[\frac{M - 1}{2}\bigg] + \sum_{n = 0}^{\frac{M - 1}{2} - 1} h[n] \bigg[z^{\frac{M - 1 - 2n}{2}} \pm z^{-\frac{M - 1 - 2n}{2}}\bigg]\bigg]
\end{align}
$$


Similarly, for even $M$,
$$
H(z) = z^{[M - 1] / 2} \sum_{n = 0}^{\frac{M}{2} - 1} h[n] \bigg[z^{\frac{M - 1 - 2n}{2}} \pm z^{-\frac{M - 1 - 2n}{2}}\bigg]
$$

## Design of a Linear Phase FIR Filter: Windowing

Consider a problem of designing a FIR filter with a desired frequency response $H_d(e^{j \omega})$ and impulse response $h_d[n]$ of an ideal system.

The impulse response $h_d[n]$ is generally infinitely long. So, we need to design a FIR filter of order $M$, which approximates the infinitely long $h_d[n]$ with a finite sequence $h[n]$, where $h[n] = 0$ except for $0 \le n \le M - 1$. 

Let $H(e^{j \omega})$ be the approximated frequency response of the designed FIR filter. Then, a possible criterion for this approximation can be defined as:

$$
\epsilon = \frac{1}{2\pi} \int_{-\pi}^{\pi}\left|H_d(e^{j \omega}) - H(e^{j \omega})\right|^2 d\omega
$$

By using Parseval's identity,
$$
\epsilon = \sum_{n = -\infty}^{\infty}\left| h_d[n] - h[n]\right|^2
$$

For a FIR filter of order $M$, the optimal value of $h[n]$ is,
$$
h[n] = 
\begin{cases}
    h_d[n], &\quad \text{for } 0 \le n \le M - 1 \\
    0, &\quad \text{otherwise}
\end{cases}
$$

This can be represented as a product of $h_d[n]$ with a finite duration rectangular window $w[n]$:
$$
h[n] = h_d[n]w[n], 
\quad \text{where }
w[n] = 
\begin{cases}
    1 \quad & \text{for } 0 \le n \le M - 1 \\
    0 \quad & \text{otherwise}
\end{cases}
$$

So, what kind of effect does this window have on the desired frequency response $H_d(\omega)$?  We can find this out by analyzing the convolution of $H_d(\omega)$ and $W(\omega)$, as multiplcation in time domain is equivalent to convolution in frequency domain.
$$
H(\omega) = \frac{1}{2\pi} \int_{-\pi}^{\pi} H_d(\nu) W(\omega - \nu) d\nu
$$
Here,
$$
\begin{align}
W(\omega) &= \sum_{n = 0}^{M - 1} e^{-j \omega n} \\
&= \frac{1 - e^{-j \omega M}}{1 - e^{-j \omega}} \\
&= e^{-j \omega [M - 1] / 2} \left[\frac{e^{j \omega M / 2} - e^{-j \omega M /2}}{e^{j \omega / 2} - e^{-j \omega /2 }}\right] \\
&= \frac{\sin{\omega M / 2}}{\sin{\omega / 2}} e^{-j \omega [M - 1] / 2} \\
\end{align}
$$
This equation equals zero whenever
$$
\begin{align}
\frac{\omega M}{2} = k \pi \\
\omega = \frac{2 \pi k}{M}
\end{align}
$$
where, $k$ is any non-zero integer.

*Plot Graph of W*

From the above plot, it can be observed that the width of the main-lobe is $4 \pi / M$. As $M$ increases, the main-lobe of the rectangular window becomes narrower.

The convolution of $H_d(\omega)$ with $W(\omega)$ has a smoothing effect on $H_d(\omega)$. The smoothing effect reduces as $M$ increases.
