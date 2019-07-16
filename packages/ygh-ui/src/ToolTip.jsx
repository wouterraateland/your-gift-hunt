import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const ToolTip = styled.div.attrs(({ position }) => ({
  style: {
    left: position.x,
    top: position.y
  }
}))`
  pointer-events: none;
  position: fixed;
  z-index: 10;

  max-width: calc(100vw - 32px);
  padding: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  text-align: left;
  line-height: 1.5;
  font-size: 0.8rem;
  font-family: ${props => props.theme.font.copy};

  background: #222;
  color: #fff;

  & strong {
    color: #fff;
  }

  transform: translate(
    -50%,
    ${({ bottom }) => (bottom ? "1em" : "calc(-1em - 100%)")}
  );

  &::after {
    content: "";

    position: absolute;

    border: 0.4em solid;
    left: 50%;
    top: ${props => (props.bottom ? "1px" : "calc(100% - 1px)")};

    border-color: transparent #222 #222 transparent;
    border-bottom-right-radius: 0.25em;

    transform: translate(-50%, -50%)
      rotate(${props => (props.bottom ? 225 : 45)}deg);
  }
`

const toolTipRoot = document.querySelector("#tooltip-root")

export default props => {
  const container = useRef(null)
  const toolTip = useRef(null)
  const [position, _setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setVisibility] = useState(false)

  const setPosition = useCallback(() => {
    const rect = container.current.parentElement.getClientRects()[0]
    _setPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    })
  }, [])

  const show = useCallback(() => {
    setPosition()
    window.addEventListener("mousewheel", setPosition)
    setVisibility(true)
  }, [])

  const hide = useCallback(() => {
    window.removeEventListener("mousewheel", setPosition)
    setVisibility(false)
  }, [])

  useEffect(() => {
    container.current.parentElement.addEventListener("mouseenter", show)
    container.current.parentElement.addEventListener("mouseleave", hide)

    return () => {
      container.current.parentElement.removeEventListener("mouseenter", show)
      container.current.parentElement.removeEventListener("mouseleave", hide)
      window.removeEventListener("mousewheel", setPosition)
    }
  }, [])

  const isBottom = position.y < window.innerHeight / 2

  return (
    <div ref={container}>
      {isVisible &&
        createPortal(
          <ToolTip
            {...props}
            ref={toolTip}
            position={position}
            bottom={isBottom}
          />,
          toolTipRoot
        )}
    </div>
  )
}
