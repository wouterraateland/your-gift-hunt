import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import useClickOutside from "hooks/useClickOutside"
import useScroll from "hooks/useScroll"
import useViewport from "hooks/useViewport"

const ToolTip = styled.div.attrs(({ position }) => ({
  style: {
    left: position.x,
    top: position.y
  }
}))`
  position: fixed;
  z-index: 10;
  pointer-events: none;

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
    -${props => props.dx}px,
    ${props => (props.bottom ? `calc(0.4em)` : `calc(-100% - 0.4em)`)}
  );

  &::after {
    content: "";

    position: absolute;

    border: 0.4em solid;
    left: ${props => props.dx}px;
    top: ${props => (props.bottom ? "1px" : "calc(100% - 1px)")};

    border-color: transparent #222 #222 transparent;
    border-bottom-right-radius: 0.25em;

    transform: translate(-50%, -50%)
      rotate(${props => (props.bottom ? 225 : 45)}deg);
  }
`

const toolTipRoot = document.querySelector("#tooltip-root")
export default props => {
  const { viewportRef } = useViewport()
  const container = useRef(null)
  const toolTip = useRef(null)
  const [position, _setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setVisibility] = useState(false)

  useClickOutside({ ref: toolTip, onClickOutside: () => setVisibility(false) })

  const setPosition = () => {
    const rect = container.current.parentElement.getClientRects()[0]
    if (rect) {
      _setPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      })
    }
  }

  const scroll = useScroll(viewportRef)
  useEffect(setPosition, [scroll])

  const show = useCallback(() => {
    setPosition()
    setVisibility(true)
  }, [])

  const hide = useCallback(() => {
    setVisibility(false)
  }, [])

  useEffect(() => {
    container.current.parentElement.addEventListener("mouseenter", show)
    container.current.parentElement.addEventListener("mouseleave", hide)
    return () => {
      container.current.parentElement.removeEventListener("mouseenter", show)
      container.current.parentElement.removeEventListener("mouseleave", hide)
    }
  }, [])

  const width = toolTip.current
    ? Math.min(toolTip.current.offsetWidth, window.innerWidth - 32)
    : 0

  return (
    <div ref={container}>
      {isVisible &&
        createPortal(
          <ToolTip
            {...props}
            ref={toolTip}
            position={position}
            bottom={position.y < window.innerHeight / 2}
            dx={Math.max(16, Math.min(position.x - 16, width - 16))}
          />,
          toolTipRoot
        )}
    </div>
  )
}
