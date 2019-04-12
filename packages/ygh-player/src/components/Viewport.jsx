import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"

const Viewport = styled.div`
  position: relative;
  flex-grow: 1;

  overflow: auto;
`

const scrollToCenter = el => {
  el &&
    el.scrollTo(
      (el.scrollWidth - el.offsetWidth) / 2,
      (el.scrollHeight - el.offsetHeight) / 2
    )
}

export default props => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    scrollToCenter(ref.current)
  }, [])

  return <Viewport ref={ref} {...props} />
}
