import React from 'react'
import Icon from '../'

export default props => (
  <Icon viewBox="0 0 64 64" {...props}>
    <circle cx="32" cy="32" r="23" fill="none" strokeWidth="2" strokeOpacity="1"/>
    <path d="M27 37l18 8-13-15-5 7z" fillOpacity="1"/>
    <path d="M19 19l8 18 5-7-13-11zM32 30l13 15-8-18-5 3z" fillOpacity=".5"/>
    <path d="M19 19l13 11 5-3-18-8z" fillOpacity=".25"/>
  </Icon>
)
