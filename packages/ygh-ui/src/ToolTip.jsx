import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import _ from "ygh-utils"

const ToolTip = styled.div`
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
`

const MARGIN = 8

export default ({ direction = "vertical", ...props }) => {
  const toolTipRoot = document.querySelector("#tooltip-root")

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
    window.addEventListener("mousemove", setPosition)
    setVisibility(true)
  }, [])

  const hide = useCallback(() => {
    window.removeEventListener("mousewheel", setPosition)
    window.removeEventListener("mousemove", setPosition)
    setVisibility(false)
  }, [])

  useEffect(() => {
    container.current.parentElement.addEventListener("mouseenter", show)
    container.current.parentElement.addEventListener("mouseleave", hide)

    return () => {
      container.current.parentElement.removeEventListener("mouseenter", show)
      container.current.parentElement.removeEventListener("mouseleave", hide)
      window.removeEventListener("mousewheel", setPosition)
      window.removeEventListener("mousemove", setPosition)
    }
  }, [])

  const wWidth = typeof window === "undefined" ? 0 : window.innerWidth
  const wHeight = typeof window === "undefined" ? 0 : window.innerHeight
  const width = toolTip.current ? toolTip.current.offsetWidth : 0
  const height = toolTip.current ? toolTip.current.offsetHeight : 0

  const _direction =
    direction === "vertical"
      ? position.y < wHeight / 2
        ? "bottom"
        : "top"
      : direction === "horizontal"
      ? position.x < wWidth / 2
        ? "right"
        : "left"
      : direction

  return (
    <div ref={container}>
      {isVisible &&
        createPortal(
          <ToolTip
            {...props}
            ref={toolTip}
            style={{
              left:
                _direction === "left"
                  ? position.x - (width + MARGIN)
                  : _direction === "right"
                  ? position.x + MARGIN
                  : _.clamp(MARGIN, wWidth - (width + MARGIN))(
                      position.x - width / 2
                    ),
              top:
                _direction === "bottom"
                  ? position.y + MARGIN
                  : _direction === "top"
                  ? position.y - (height + MARGIN)
                  : _.clamp(MARGIN, wHeight - (height + MARGIN))(
                      position.y - height / 2
                    )
            }}
          />,
          toolTipRoot
        )}
    </div>
  )
}
