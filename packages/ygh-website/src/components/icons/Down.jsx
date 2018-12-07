import React from 'react'
import Icon from './'

export default props => (
  <Icon viewBox="0 0 32 32" {...props} colorStroke colorFill={false}>
    <circle cx="16" cy="16" r="14.5" strokeWidth="3" />
    <path d="M10 12.5l6 10 6-10z" strokeWidth="2" />
  </Icon>
)
