---
title: The Design of Infinite Impulse Response Filter
description: Design of IIR filter.
date: '2025-08-15'
categories:
    - signal-processing
published: true
---

An Infinite Impulse Response system is described by the following difference equation:

$$
y[n] = -\sum_{k = 0}^{N} a_k x[n - k] + \sum_{k = 0}^{M - 1} b_k x[n - k]
\label{eq:lti-constant-difference} \tag{1}
$$

And its system function is given by,
$$
H(z) = \frac{\sum_{k = 0}^{M - 1}b_k z^{-k}}{1 + \sum_{k = 1}^{N}a_k z^{-k}}
\label{eq:lti-system-function} \tag{2}
$$

## Design of IIR Filter: Bilinear Transformation

Let us consider a system function as shown below:

$$
H(s) = \frac{b}{s + a}
\label{eq:first-order-system-fn} \tag{3}
$$

which is characterized by the differential equation
$$
\frac{dy}{dt} + ay(t) = bx(t)
\label{eq:first-order-system-diff-eqn} \tag{4}
$$

The solution to this differential equation can be approximated using Trapezoidal rule as
$$
y(t) = \int_{t_0}^t y'(t) dt + y(t_0)
\label{eq:trapezoidal-rule} \tag{5}
$$

At $t = nT_s$ and $t_0 = nT_s - T_s$, where $T_s$ is the sampling time period, the above equation becomes,
$$
y(nT_s) = \frac{T_s}{2} \left[y'(nT_s) + y'(nT_s - T_s)\right] + y(nT_s - T_s)
\label{eq:trapezoidal-rule-sampling-time-period} \tag{6}
$$

At $t = nT_s$, the equation $\eqref{eq:first-order-system-diff-eqn}$ becomes,
$$
y'(nT_s) = -ay(nT_s) + bx(nT_s)
\label{eq:first-order-system-diff-eqn-nTs} \tag{7}
$$

With $y(nT_s) \equiv y[n]$ and $y(nT_s - T_s) \equiv y[n - 1]$, $\eqref{eq:trapezoidal-rule-sampling-time-period}$ becomes,
$$
y[n] = \frac{T_s}{2}\left[y'[n] + y'[n - 1]\right] + y[n - 1]
\label{eq:trapezoidal-rule-n} \tag{8}
$$

And $\eqref{eq:first-order-system-diff-eqn-nTs}$ becomes,
$$
y'[n] = -ay[n] + bx[n]
\label{eq:first-order-system-diff-eqn-n} \tag{9}
$$

Substituting $\eqref{eq:first-order-system-diff-eqn-n}$ in $\eqref{eq:trapezoidal-rule-n}$,
$$
\begin{align}
&y[n] = \frac{T_s}{2}\left[-ay[n] + bx[n] - ay[n - 1] + bx[n - 1]\right] + y[n - 1] \\
&\left(1 + \frac{aT_s}{2}\right)y[n] - \left(1 - \frac{aT_s}{2}\right)y[n - 1] = \frac{bT_s}{2}\left[x[n] + x[n - 1]\right]
\label{eq:system-diff-eqn} \tag{10}
\end{align}
$$

Taking $Z$-transform on both sides of $\eqref{eq:system-diff-eqn}$,
$$
\begin{align}
\left(1 + \frac{aT_s}{2}\right)Y(z) - \left(1 - \frac{aT_s}{2}\right)z^{-1}Y(z) &= \frac{bT_s}{2}\left(1 + z^{-1}\right)X(z)
\label{eq:z-transform-system-eqn} \tag{11}
\end{align}
$$
which can be written as,
$$
\begin{align}
H(z) = \frac{Y(z)}{X(z)} &= \frac{\frac{bT_s}{2}\left(1 + z^{-1}\right)}{1 + \frac{aT_s}{2} - \frac{1 - aT_s}{2}z^{-1}} \\
&= \frac{b}{\frac{2}{T_s}\left(\frac{1 - z^{-1}}{1 + z^{-1}}\right) + a}
\label{eq:system-function} \tag{12}
\end{align}
$$

Comparing $\eqref{eq:first-order-system-fn}$ and $\eqref{eq:system-function}$, the mapping from the $s$-plane to the $z$-plane is obtained as
$$
s = \frac{2}{T_s}\left(\frac{1 - z^{-1}}{1 + z^{-1}}\right)
\label{eq:mapping} \tag{13}
$$

### Design Procedure

To design an IIR filter given the filter specificatoins ($\omega_p$, $\omega_s$, etc.), the following steps need to be followed:

1. Choose $T_s$ (usually 1) and determine the analog frequencies
    $$
    \Omega_p = \frac{2}{T_s} \tan\left(\frac{\omega_p}{2}\right)
    \label{eq:analog-passband} \tag{14}
    $$
    and 
    $$
    \Omega_s = \frac{2}{T_s} \tan\left(\frac{\omega_s}{2}\right)
    \label{eq:analog-stopband} \tag{15}
    $$
2. Design an analog filter $H_a(s)$ using the specifications (Butterworth, Chebyshev, or Elliptic) to meet the specifications.
3. Set 
    $$
    H(z) = H_a\left(\frac{2}{T_s}\left(\frac{1 - z^{-1}}{1 + z^{-1}}\right)\right)
    \label{eq:filter-system-function-formula} \tag{16}
    $$

