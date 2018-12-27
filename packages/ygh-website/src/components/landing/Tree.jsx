import React from 'react'
import { darken } from 'utils/colors'
import { Box } from 'utils/functionals'

const Present = ({ color='#366dc7', ...props }) => (
  <svg viewBox="0 0 78 128" {...props}>
    <defs>
      <linearGradient x1="0%" y1="39.55%" y2="39.55%" id={`${color}-a`}>
        <stop stopColor={darken(.05, color)} offset="0%"/>
        <stop stopColor={darken(.1, color)} offset="100%"/>
      </linearGradient>
    </defs>
    <path d="M39 127.95c7.18 0 13-3.347 13-7.475V108.5H26v11.975c0 4.128 5.82 7.475 13 7.475z" fill={`url(#${color}-a)`} />
    <path fill={color} d="M0 93.5L39 116V0z"/>
    <path fill={darken(.05, color)} d="M78 93.5L39 116V0z"/>
  </svg>
)

export default Present
