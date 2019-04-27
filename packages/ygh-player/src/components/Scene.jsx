import React from "react"
import styled from "styled-components"

import useWindowSize from "hooks/useWindowSize"

const SceneOuter = styled.div`
  position: relative;
  overflow: hidden;
  z-index: 0;

  font-size: ${props => props.size}px;
  width: ${props => props.width}em;
  height: ${props => props.height}em;
  border-radius: ${props => props.theme.borderRadius};
`

const SceneInner = styled.div`
  position: absolute;
  left: ${props => -props.left}em;
  top: ${props => -props.top}em;
`

export default ({ children, ...props }) => {
  const { width, height } = useWindowSize()

  const size = Math.max(12, width / props.width, height / props.height)

  return (
    <SceneOuter {...props} size={size}>
      <SceneInner {...props}>{children}</SceneInner>
    </SceneOuter>
  )
}
