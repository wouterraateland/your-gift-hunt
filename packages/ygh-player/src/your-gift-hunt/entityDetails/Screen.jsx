import React, { useRef } from 'react'
import styled, { css } from 'styled-components'

const Screen = styled.div`
  position: fixed;
  left: 0; top: 0;
  right: 0; bottom: 7em;
  z-index: 2;

  overflow-x: hidden;
  overflow-y: auto;

  ${props => props.centerContent && css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `}

  background-color: #0004;

  transition: opacity .2s ease-out;

  ${props => !props.isVisible && css`
    pointer-events: none;
    opacity: 0;
  `}
`

Screen.defaultProps = {
  centerContent: false,
  isVisible: false
}

export default ({
  onClick=(() => {}),
  ...props
}) => {
  const screen = useRef(null)

  return (
    <Screen
      ref={screen}
      onClick={event => event.target === screen.current
        ? onClick() : null}
      {...props}
    />
  )
}
