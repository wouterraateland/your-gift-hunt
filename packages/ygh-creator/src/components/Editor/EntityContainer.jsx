import React from "react"
import styled from "styled-components"

const Outer = styled.div`
  position: relative;
  width: ${props => props.width}em;
  height: ${props => props.height}em;
  pointer-events: none;
`

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  pointer-events: none;

  transform: scale(${props => props.scale});
`

export default ({
  maxWidth,
  maxHeight,
  component: {
    defaultProps: { width, height }
  },
  children,
  ...props
}) => (
  <Outer width={maxWidth} height={maxHeight} {...props}>
    <Inner scale={Math.min(maxWidth / width, maxHeight / height)}>
      {children}
    </Inner>
  </Outer>
)
