import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

const ToolTip = styled.div.attrs(({ position }) => ({
  style: {
    left: position.x,
    top: position.y
  }
}))`
  position: fixed;
  z-index: 10;

  width: 384px;
  max-width: calc(100vw - 2em);
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

  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &::after {
    content: "";

    position: absolute;

    border: 0.4em solid;
    border-color: transparent #222 #222 transparent;
    border-bottom-right-radius: 0.25em;
  }

  transform: translate(-${props => props.dx}px, -100%);

  &::after {
    left: ${props => props.dx}px;
    top: calc(100% - 1px);

    border-color: transparent #222 #222 transparent;
    border-bottom-right-radius: 0.25em;

    transform: translate(-50%, -50%) rotate(45deg);
  }
`

const toolTipRoot = document.querySelector("#tooltip-root")
export default props => {
  const ref = useRef(null)
  const position = useRef(null)
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = useCallback(event => {
    event.stopPropagation()
    const rect = ref.current.parentElement.getClientRects()[0]
    position.current = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    }
    setVisibility(v => !v)
  }, [])

  useEffect(() => {
    ref.current.parentElement.addEventListener("click", toggleVisibility)
    return () => {
      ref.current.parentElement.removeEventListener("click", toggleVisibility)
    }
  }, [])

  return (
    <div ref={ref}>
      {isVisible &&
        createPortal(
          <ToolTip
            {...props}
            position={position.current}
            dx={Math.min(position.current.x - 10, 192)}
          />,
          toolTipRoot
        )}
    </div>
  )
}
