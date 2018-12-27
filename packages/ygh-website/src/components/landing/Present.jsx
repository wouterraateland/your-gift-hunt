import React from 'react'
import * as polished from 'polished'
import { Box } from 'utils/functionals'

const darken = (amount, color) => {
  // const { hue } = polished.parseToHsl(color)
  return Box(color)
    .map(c => polished.adjustHue(360 - amount * 100, c))
    .map(c => polished.darken(amount, c))
    .value()
}

const Present = ({ boxColor='#fff', ribbonColor='#e60202', ...props }) => (
  <svg {...props} viewBox="0 0 56 67">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-a`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.15, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="6.562%" y1="7.51%" y2="100%" id={`${ribbonColor}-b`}>
        <stop stopColor={darken(.3, ribbonColor)} offset="0%" />
        <stop stopColor={ribbonColor} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-c`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.1, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="8.667%" y1="6.387%" x2="140.258%" y2="100%" id={`${ribbonColor}-d`}>
        <stop stopColor={darken(.25, ribbonColor)} offset="0%" />
        <stop stopColor={ribbonColor} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-e`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.15, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-f`}>
        <stop stopColor={darken(.2, ribbonColor)} offset="0%" />
        <stop stopColor={darken(.1, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="43.954%" y1="26.919%" y2="63.656%" id={`${ribbonColor}-g`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.05, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-h`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.2, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`${ribbonColor}-i`}>
        <stop stopColor={darken(.2, ribbonColor)} offset="0%" />
        <stop stopColor={darken(.15, ribbonColor)} offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="22.946%" y2="62.628%" id={`${ribbonColor}-j`}>
        <stop stopColor={ribbonColor} offset="0%" />
        <stop stopColor={darken(.1, ribbonColor)} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill={darken(.1, boxColor)} d="M2 28.142v24L28 67V43z" />
      <path fill={darken(.15, boxColor)} d="M54 28.15v24L28 67V43z" />
      <path d="M11 33.285l8 4.572v24l-8-4.572v-24z" fill={darken(.1, ribbonColor)} />
      <path d="M45 57.29l-8 4.57v-24l8-4.57v24z" fill={darken(.15, ribbonColor)} />
      <g>
        <path fill={darken(.05, boxColor)} d="M0 19v8l28 16v-8z" />
        <path fill={darken(.1, boxColor)} d="M56 19v8L28 43v-8z" />
        <path d="M46 32.714l-8 4.572v-8l8-4.572v8z" fill={darken(.1, ribbonColor)} />
        <path d="M10 24.714l8 4.572v8l-8-4.572v-8z" fill={darken(.05, ribbonColor)} />
        <g>
          <path fill={boxColor} d="M28 3L0 19l28 16 28-16z" />
          <path fill={ribbonColor} d="M10 13.304l28 16.019 8-4.609-28-16z" />
          <path fill={ribbonColor} d="M46 13.304L18 29.323l-8-4.609 28-16z" />
        </g>
        <g>
          <path d="M9.004 1.007c.826-.63 2.085-.549 3.496.385C14.985 3.036 17 6.7 17 9.577v4.851h-.002L9 19.033 1 5.59 9 1l.004.007z" fill={`url(#${ribbonColor}-a)`} transform="translate(11)" />
          <path d="M4.5 16.408c2.485 1.644 4.5.645 4.5-2.231C9 11.3 6.985 7.636 4.5 5.992 2.015 4.348 0 5.347 0 8.223c0 2.877 2.015 6.541 4.5 8.185z" fill={`url(#${ribbonColor}-b)`} transform="translate(11)" />
          <path d="M9.004 1.007c.826-.63 2.085-.549 3.496.385C14.985 3.036 17 6.7 17 9.577v4.851h-.002L9 19.033 1 5.59 9 1l.004.007z" fill={`url(#${ribbonColor}-c)`} transform="matrix(-1 0 0 1 45 0)" />
          <path d="M4.5 16.408c2.485 1.644 4.5.645 4.5-2.231C9 11.3 6.985 7.636 4.5 5.992 2.015 4.348 0 5.347 0 8.223c0 2.877 2.015 6.541 4.5 8.185z" fill={`url(#${ribbonColor}-d)`} transform="matrix(-1 0 0 1 45 0)" />
          <g>
            <path d="M9.118.627C9.943.086 11.152.2 12.5 1.092 14.985 2.736 17 6.4 17 9.277c0 1.457-.517 2.433-1.351 2.827l-7.812 4.533L1.309 5.218 9.116.624l.002.003z" fill={`url(#${ribbonColor}-e)`} transform="matrix(-1 0 0 1 28 10)" />
            <path d="M2.859 15.238l1.812 1.036a1211.367 1211.367 0 0 0-1.812-1.037zM0 13.602V8.023c0-2.876 2.015-3.875 4.5-2.231 1.194.79 2.28 2.046 3.086 3.458L0 13.602z" fill={`url(#${ribbonColor}-f)`} transform="matrix(-1 0 0 1 28 10)" />
            <path d="M2.859 15.238L0 13.602 7.586 9.25C8.456 10.776 9 12.482 9 13.977c0 2.811-1.865 3.63-4.329 2.297L2.86 15.238z" fill={`url(#${ribbonColor}-g)`} transform="matrix(-1 0 0 1 28 10)" />
          </g>
          <g>
            <path d="M9.118.627C9.943.086 11.152.2 12.5 1.092 14.985 2.736 17 6.4 17 9.277c0 1.457-.517 2.433-1.351 2.827l-7.812 4.533L1.309 5.218 9.116.624l.002.003z" fill={`url(#${ribbonColor}-h)`} transform="translate(28 10)" />
            <path d="M2.859 15.238l1.812 1.036a1211.367 1211.367 0 0 0-1.812-1.037zM0 13.602V8.023c0-2.876 2.015-3.875 4.5-2.231 1.194.79 2.28 2.046 3.086 3.458L0 13.602z" fill={`url(#${ribbonColor}-i)`} transform="translate(28 10)" />
            <path d="M2.859 15.238L0 13.602 7.586 9.25C8.456 10.776 9 12.482 9 13.977c0 2.811-1.865 3.63-4.329 2.297L2.86 15.238z" fill={`url(#${ribbonColor}-j)`} transform="translate(28 10)" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Present
