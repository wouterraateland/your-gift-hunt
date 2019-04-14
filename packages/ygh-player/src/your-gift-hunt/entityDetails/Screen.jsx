import React, { useRef } from "react"
import styled, { css } from "styled-components"

const Screen = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  overflow-x: hidden;
  overflow-y: auto;

  @media (orientation: portrait) {
    left: 0;
    bottom: 5.5em;
  }

  @media (orientation: landscape) {
    left: 5.5em;
    bottom: 0;
  }

  ${props =>
    props.centerContent &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    `}

  background-color: #0004;

  transition: opacity 0.2s ease-out;

  ${props =>
    !props.isVisible &&
    css`
      pointer-events: none;
      opacity: 0;
    `}
`

Screen.defaultProps = {
  centerContent: false,
  isVisible: false
}

export default ({ onClick = () => {}, ...props }) => {
  const screen = useRef(null)

  return (
    <Screen
      ref={screen}
      onClick={event => (event.target === screen.current ? onClick() : null)}
      {...props}
    />
  )
}
