import React from "react"
import styled, { css } from "styled-components"
import { HORIZONTAL } from "./constants"

const Pane = styled.div`
  position: relative;
  z-index: 0;

  flex-shrink: 0;

  ${props =>
    props.constraintFailed &&
    css`
      background-color: #f12;
    `}

  ${props => (props.split === HORIZONTAL ? "width" : "height")}: 100%;
`

export default ({ split, size, ...otherProps }) => (
  <Pane
    style={
      size
        ? { [split === HORIZONTAL ? "height" : "width"]: `${size}px` }
        : { flexGrow: 1 }
    }
    split={split}
    {...otherProps}
  />
)
