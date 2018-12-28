import React from 'react'
import Icon from '../'

export default props => (
  <Icon viewBox="0 0 64 64" {...props}>
    <circle cx="45" cy="25" r="5" fillOpacity=".5"/>
    <path fill="none" strokeWidth="2" strokeOpacity="1" d="M9 16h46v32H9z"/>
    <path d="M33 44l1-6 7-5 3 11H33zM14 44l8-23 4 23H14z" fillOpacity="1"/>
    <path d="M26 44l-4-23 12 17-1 6h-7zM44 44l-3-11 9 11h-6z" fillOpacity=".25"/>
  </Icon>
)
