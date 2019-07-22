import React from "react"
import styled, { css } from "styled-components"
import { HORIZONTAL } from "./constants"

const Pane = styled.div`
  position: relative;
  z-index: 0;

  flex-grow: 1;

  ${props =>
    props.constraintFailed &&
    css`
      background-color: #f12;
    `}
`

const HorizontalPane = styled(Pane)`
  width: 100%;
`

const VerticalPane = styled(Pane)`
  height: 100%;
`

export default ({ split, ...otherProps }) =>
  split === HORIZONTAL ? (
    <HorizontalPane
      style={{ height: `${otherProps.size}px` }}
      {...otherProps}
    />
  ) : (
    <VerticalPane style={{ width: `${otherProps.size}px` }} {...otherProps} />
  )
