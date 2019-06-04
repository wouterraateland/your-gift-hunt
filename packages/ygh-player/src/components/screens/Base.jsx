import React, { useRef } from "react"
import styled from "styled-components"

const Screen = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  overflow-x: hidden;
  overflow-y: auto;

  background: #0009;

  @media (orientation: portrait) {
    left: 0;
    bottom: 5.5em;
  }

  @media (orientation: landscape) {
    left: 5.5em;
    bottom: 0;
  }
`

const BaseScreen = ({ close, ...props }) => {
  const screen = useRef(null)

  return (
    <Screen
      ref={screen}
      onClick={event => event.target === screen.current && close && close()}
      {...props}
    />
  )
}
BaseScreen.defaultProps = {
  close: () => {}
}

export default BaseScreen
